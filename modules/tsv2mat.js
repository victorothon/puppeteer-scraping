const fs = require('fs');

/**
 * @function parcer de archivo .tsv en arreglo matricial
 * 
 * @param {string} filePath ruta y nombre de archivo .tsv a parcear 
 * @returns {matrix} fileMatrix | matriz con información
 */
exports.dataMatrix = function dataMatrix(filePath) {
    /** lectura del archivo */
    const file = fs.readFileSync(filePath, "utf-8");
    let lines = file.split("\r\n");
    let fileMatrix = [];
    /** creación de las filas de la matríz == lonmgitud del archivo */
    for (let i = 0; i < lines.length; i++ ) {
        fileMatrix[i] = [];
        /** división de las líneas en elementos por columnas */
        let rows = lines[i].split("\t");
        for (let j = 0; j < rows.length; j++) {
            fileMatrix[i][j] = rows[j];
        } 
    }
    return fileMatrix;
};


