const puppeteer = require('puppeteer');

exports.numOfElements = function (page, selector) {
    let counter = page.$$eval(selector, el => el.length);
    return counter;
}