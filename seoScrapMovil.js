const puppeteer = require('puppeteer');
const fs = require('fs');
const dM = require('./tsv2mat');
const aE = require('./attribEval');
const aC = require('./adsCount');

//parsing of tsv file to matrix
const selectorsMatrix = dM.dataMatrix('SEO_Selectors.tsv');
const urlsMatrix = dM.dataMatrix('topUrls.tsv');

//output File
const outputFile = 'resultsMovil.tsv';

//  selection constants
//  selectorType  2 -> desktop  5 -> mSite  8 -> newSite
//  urlType       2 -> desktop  1 -> msite  3 -> newSite
//  TOP Organic   2 -> desktop  3 -> msite  4 -> newSite
const selectorType = 1;
const urlType = 3;

(async () => {
    /// main async function for scraping  ///
  
    //  timer reset
    let prevTasksDuration = 0;
    let dialogMsg = "";
  
    //launch of headless browser and page tab
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    //console message handling
    page.on('dialog', async (dialog) => {
      dialogMsg = dialog.message();
      console.log(dialog.accept());
    });

    //file headers
    //fs.appendFileSync(outputFile, 'id\tcola\ttitle\tmeta_description\th1\n');

    for (let i = 1345; i < urlsMatrix.length; i++) {
        try {
            await page.goto(urlsMatrix[i][urlType], { timeout: 10000 }/*, {
            waitUntil: 'networkidle0',
            }*/);
            //url -> data
            console.log('/// ---------------------------------------- ///');
            console.log('id : ' + urlsMatrix[i][0]);
            console.log('url: ' + page.url());
            fs.appendFileSync(outputFile, `${urlsMatrix[i][0]}\t${urlsMatrix[i][1]}\t${page.url()}\t`);

            for (let j = 1; j < selectorsMatrix.length; j++) {
            /// Content:  ///
            /// string of selected attribute in each selector ///
                let selectorId = selectorsMatrix[j][0].charAt(0);
                let selector = selectorsMatrix[j][selectorType];
                let attribute = selectorsMatrix[j][selectorType + 1];
                let content = [];
                let counter = 0;
                // evals the attribute content from matrix attribute or counters from ads
    
                try {
                    content = await aE.attribContent(page, selector, attribute);
                    content = content.trim();
                    console.log(selectorsMatrix[j][0] + ': ' + content.slice(0,100));
                } catch {
                    content = null;
                    console.log(selectorsMatrix[j][0] + ': ' + content);
                }
                //attributes -> data
                fs.appendFileSync(outputFile, `${content}\t`);
            }
            fs.appendFileSync(outputFile, '\n');
            dialogMsg = "";
        } catch (e) {
            fs.appendFileSync(outputFile, `${urlsMatrix[i][0]}\t${urlsMatrix[i][1]}\t${urlsMatrix[i][urlType]}\t`);
            fs.appendFileSync(outputFile, e + '\n')
        }
    }
  await browser.close();
})();