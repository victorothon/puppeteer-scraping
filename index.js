const puppeteer = require('puppeteer');
const fs = require('fs');
const config = require('./config.json');
const dM = require('./modules/tsv2mat');
const dT = require('./modules/diferentialTimer');
const fG = require('./modules/fileGen');
const iE = require('./modules/infoExtractor');

/** configuration:
 * @param {File} selectorsListings.tsv | tsv format file for selector extraction
 * @param {File}   
 */
const selectorsMatrix = dM.dataMatrix('./selectorsFiles/selectorsListings.tsv');
const urlsMatrix = dM.dataMatrix('./urlFiles/crawlingUrls.tsv');
let outputFile = new fG.fileGen('tests.csv');
const userConfig = config["desktop"];

/**
 * @async function | puppeteer execution methods
 */
(async () => {
  /**
   * @param {number} taskduration | object responable for diferential time update
   * refered to url tasks duration
   * @param {string} dialogMsg | inicialization of variable and default value
  */
  let tasksDuration = new dT.difTimer();
  let dialogMsg = "";
  
  /** browser and headless page launch */
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  /** dialog box handling */
  page.on('dialog', async (dialog) => {
    dialogMsg = dialog.message();
    console.log(dialog.accept());
  });

  /** creation of output file header */
  outputFile.header(selectorsMatrix);

  /**
   * loop of list of urls to be scraped
   */
  for (let i = 0; i < urlsMatrix.length; i++) {

    /** load of url with handling flag and loop variables inicialization
     * @param {networkidle0} | wait until no network conections are left
     * @param {string} lineString | string representing url scraping results
    */
    await page.goto(urlsMatrix[i][userConfig.urlType], {
      waitUntil: 'networkidle0',
    });

    /** metrics: duration of time that takes the url to excetute all tasks */
    const metrics = await page.metrics();
    urlTasksDuration = tasksDuration.difTime(metrics.TaskDuration);

    /** counter of number of ads in first page */
    let numOfAds = 0;
    while(await page.$(`#rowIndex_${numOfAds}`) != null){
      numOfAds++;
    }

    /** data extraction */
    let lineArray = "";
    lineArray = (`\"${urlsMatrix[i][0]}\",\"${page.url()}\",\"${dialogMsg}\",` +
                 `\"${urlTasksDuration}\",\"${numOfAds}\",`);
    /** selector data extraction into string */
    lineArray += await iE.info(page,selectorsMatrix,userConfig);
    outputFile.appendline(lineArray);
    dialogMsg = "";
  }
  /** end: closing browser  */
  await browser.close();
})();