/**
 * File for searching and extracting random properties, from determined serches
 */
 const puppeteer = require('puppeteer');
 const fs = require('fs');
 const config = require('./config.json');
 const dM = require('./modules/tsv2mat');
 const dT = require('./modules/diferentialTimer');
 const fG = require('./modules/fileGen');
 const iE = require('./modules/infoExtractor');

 /**
 * @param {File} locaciones.tsv | tsv format file for places to find
 * @param {File} output.csv | csv file output information recolected
 */
const searchMatrix = dM.dataMatrix('./tsvFiles/locaciones.tsv');
let outputFile = fs.appendFileSync('./outputFiles/example.csv', '\"id\",\"url\",\"dialog_message\",\"tasks_duration\",\"num_of_ads\",');

/**
 * @async function | puppeteer execution methods
 */
 (async () => {

    /** browser and headless page launch */
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://www.fincaraiz.com.co", {
        waitUntil: 'networkidle0',
      });
    console.log('página principal cargada!')

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < searchMatrix[1].length; j++) {

            await page.click(searchMatrix[i][0]);
            
            await page.click("#divContainerCategories > div > span");
            
            await page.click("#chkCategory8");
            
            await page.type("#txtWord", searchMatrix[j][1]);
            
            page.click("#btnSearchAdvert")
                .then(() => page.waitForNavigation({waitUntil: 'networkidle0'}));
            console.log('página de búsqueda cargada');
            // /** counter of number of ads in first page */
            // let numOfAds = 0;
            // while(await page.$(`#rowIndex_${numOfAds}`) != null){
            //     numOfAds++;
            // }
            // console.log(`num of ads in listing = ${numOfAds}`)

            // let selectedAd = Math.ceil(Math.random()*numOfAds - 1);
            // console.log(`ad to be selected = ${selectedAd} `);

            // page.click(`#rowIndex_${selectedAd}`);
            // await page.waitForNavigation({waitUntil: 'networkidle2'});

            // await page.goto("https://www.fincaraiz.com.co", {
            //     waitUntil: 'networkidle0',
            //     });
        }
    }

    /** end: closing browser  */
    await browser.close();
  })();