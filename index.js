const puppeteer = require('puppeteer');
const fs = require('fs');
const dM = require('./tsv2mat');
const aE = require('./attribEval');
const aC = require('./adsCount')

//parsing of tsv file to matrix
const selectorsMatrix = dM.dataMatrix('selectorsListings.tsv');
const urlsMatrix = dM.dataMatrix('TOP_Organic_urlsListings.tsv');

//output File
const outputFile = 'TopListingsResults.tsv';

//  selection constants
//  selectorType  2 -> desktop  5 -> mSite  8 -> newSite
//  urlType       2 -> desktop  1 -> msite  3 -> newSite
//  TOP Organic   2 -> desktop  3 -> msite  4 -> newSite
const selectorType = 5;
const urlType = 3;

(async () => {
  /// main async function for scraping  ///
  
  //  timer reset
  let prevTasksDuration = 0;
  
  //launch of headless browser and page tab
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  //file headers
  fs.appendFileSync(outputFile, 'id\turl\ttasks_duration\tnum_of_ads\t');
  for (let i = 1; i < selectorsMatrix.length; i++) {
    fs.appendFileSync(outputFile,`${selectorsMatrix[i][0]}\t`);
  }
  fs.appendFileSync(outputFile, '\n');

  for (let i = 154; i < 170/*urlsMatrix.length*/; i++) {
    /// urls iteration  ///
    try {
    await page.goto(urlsMatrix[i][urlType], {
      waitUntil: 'networkidle2',
    });
    //url -> data
    console.log('/// ---------------------------------------- ///');
    console.log('id : ' + urlsMatrix[i][0]);
    console.log('url: ' + page.url());
    fs.appendFileSync(outputFile, `${urlsMatrix[i][0]}\t${page.url()}\t`);

    /// metrics:  ///
    // duration of all browser tasksfor loading the website
    const metrics = await page.metrics();
    let tasksDuration = metrics.TaskDuration;
    let urlTasksDuration = tasksDuration - prevTasksDuration;
    prevTasksDuration = tasksDuration;
    //metrics -> data 
    console.log('Tasks Duration: ' + urlTasksDuration);
    fs.appendFileSync(outputFile, `${urlTasksDuration}\t`);

    /// Number of Ads:  ///
    let numOfAds = 0;
    while(await page.$(`#rowIndex_${numOfAds}`) != null){
      numOfAds++;
    }
    //numOfAds -> data
    console.log('num of ads: ' + numOfAds);
    fs.appendFileSync(outputFile, `${numOfAds}\t`);

    for (let j = 1; j < selectorsMatrix.length; j++) {
      /// Content:  ///
      /// string of selected attribute in each selector ///
      let selectorId = selectorsMatrix[j][0].charAt(0);
      let selector = selectorsMatrix[j][selectorType];
      let attribute = selectorsMatrix[j][selectorType + 1];
      let content = [];
      let counter = 0;
      // evals the attribute content from matrix attribute or counters from ads
      if (selectorId == 'S') {
        try {
          content = await aE.attribContent(page, selector, attribute);
          content = content.trim();
          console.log(selectorsMatrix[j][0] + ': ' + content.slice(0,100));
        }
        catch {
          content = null;
          console.log(selectorsMatrix[j][0] + ': ' + content);
        }
        //attributes -> data
        fs.appendFileSync(outputFile, `${content}\t`);
      }
      else if (selectorId == 'C') {
        try {
        counter = await aC.numOfElements(page, selector);
        }
        catch {
          counter = 0;
        }
        //counters -> data
        console.log(selectorsMatrix[j][0] + ': ' + counter);
        fs.appendFileSync(outputFile, `${counter}\t`);
      } 
    }
    fs.appendFileSync(outputFile, '\n');
    }
    catch (err) {  
      console.log(err);
      fs.appendFileSync(outputFile, `${urlsMatrix[i][0]}\t${page.url()}\t`);
      fs.appendFileSync(outputFile, 'loading error\n');
      continue;
    }
  }

  await browser.close();
})();