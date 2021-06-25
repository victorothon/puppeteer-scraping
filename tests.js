const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('dialog', async (dialog) => {
        console.log(dialog.message());
        console.log(dialog.accept());
    });
    page.on('response', (response) => {
        console.log(response.status());
    });

    await page.goto('https://staging.fincaraiz.com.co/finca-raiz/arriendos/manga/cartagena/?ad=30|2||||2|||||58|5800003||||||||||||||||1|||1||price%20asc|||manga|||||', {
        waitUntil: 'networkidle2',
      });
    await browser.close();
  })();