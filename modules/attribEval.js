const puppeteer = require('puppeteer');

/**
 * @function attribContent extrae el string del selector de la página proporcionada
 * 
 * @param {object} page | objeto puppeteer  
 * @param {selector} selector | selector css 
 * @param {attribute} attribute | atributo del selector a extraer
 * @returns {string} contenido del selector
 */
exports.attribContent = function (page, selector, attribute) {
    let content = [];
    
    switch (attribute) {    
        case '.content':
            content = page.$eval(selector, el => el.content);
            break;
  
        case '.textContent':
            content = page.$eval(selector, el => el.textContent);
            break;
  
        case '.className':
            content = page.$eval(selector, el => el.className);
            break;
  
        case '.title':
            content = page.$eval(selector, el => el.title);
            break;  
        }   
    return content;
}