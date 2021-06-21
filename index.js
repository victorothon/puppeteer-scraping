const puppeteer = require('puppeteer');
const dM = require('./tsv2mat');
const aE = require('./attribEval');
const aC = require('./adsCount')

//parsing of tsv file to matrix
const selectorsMatrix = dM.dataMatrix('selectorsListings.tsv');
const urlsMatrix = dM.dataMatrix('TOP_Organic_urlsListings.tsv');

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

  for (let i = 19; i < 28/*urlsMatrix.length*/; i++) {
    /// urls iteration  /// 
    await page.goto(urlsMatrix[i][urlType], {
      waitUntil: 'networkidle2',
    });
    //url -> data
    console.log('/// ---------------------------------------- ///');
    console.log('id : ' + urlsMatrix[i][0]);
    console.log('url: ' + page.url());

    /// metrics:  ///
    // duration of all browser tasksfor loading the website
    const metrics = await page.metrics();
    let tasksDuration = metrics.TaskDuration;
    let urlTasksDuration = tasksDuration - prevTasksDuration;
    prevTasksDuration = tasksDuration;
    //metrics -> data 
    console.log('Tasks Duration: ' + urlTasksDuration);

    /// Number of Ads:  ///
    let numOfAds = 0;
    while(await page.$(`#rowIndex_${numOfAds}`) != null){
      numOfAds++;
    }
    //numOfAds -> data
    console.log('num of ads: ' + numOfAds);

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
        content = await aE.attribContent(page, selector, attribute);
        //attributes -> data
        console.log(selectorsMatrix[j][0] + ': ' + content.slice(0, 100));
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
      } 
    }
  }
  await browser.close();
})();