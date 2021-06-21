const fs = require('fs');

exports.dataMatrix = function dataMatrix(filePath) {
    //función de lectura y parsing a matriz
    const file = fs.readFileSync(filePath, "utf-8");
    let lines = file.split("\r\n");
    let fileMatrix = [];
    for (let i = 0; i < lines.length; i++ ) {
        fileMatrix[i] = [];
        let rows = lines[i].split("\t");
        for (let j = 0; j < rows.length; j++) {
            fileMatrix[i][j] = rows[j];
        } 
    }
    return fileMatrix;
};


