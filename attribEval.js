const puppeteer = require('puppeteer');

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