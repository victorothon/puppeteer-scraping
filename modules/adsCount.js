const puppeteer = require('puppeteer');

/** 
 * @function numOfElements evalua la cantidad de elementos por selector
 * 
 * @param {object} page | página de puppeteer
 * @param {selector} selector | selector css
 * @returns {number} la cantidad de elementos encontrados   
 */
exports.numOfElements = function (page, selector) {
    let counter = page.$$eval(selector, el => el.length);
    return counter;
}