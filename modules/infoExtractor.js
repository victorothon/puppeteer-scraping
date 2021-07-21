const aE = require('./attribEval');
const aC = require('./adsCount');

exports.info = async function(page, selectorsMatrix, userConfig) {
    
  let contentString = "";

  for (let j = 1; j < selectorsMatrix.length; j++) {
    let selectorId = selectorsMatrix[j][0].charAt(0);
    let selector = selectorsMatrix[j][userConfig.selectorType];
    let attribute = selectorsMatrix[j][userConfig.selectorType + 1];
    let content = [];
    let counter = 0;

    // evals the attribute content from matrix attribute or counters from ads
    if (selectorId == 'S') {
      try {
        content = await aE.attribContent(page, selector, attribute);
        content = content.trim();
        //console.log(selectorsMatrix[j][0] + ': ' + content.slice(0,100));
      } catch {
        content = null;
        console.log(selectorsMatrix[j][0] + ': ' + content);
      }
       //attributes -> data
      contentString += `\"${content}\",`;
    } else if (selectorId == 'C') {
      try {
        counter = await aC.numOfElements(page, selector);
      } catch {
        counter = 0;
      }
      //counters -> data
      contentString += `\"${counter}\",`;
    }
  }
  contentString += '\n'; 
  return contentString;
}