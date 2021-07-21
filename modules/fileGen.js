const fs = require('fs');

/** @class fileGen generador de archivo por lineas */
exports.fileGen = class {
    /**
    * Crea la instancia de la clase tomando el nombre del archivo
    *
    * @author: VOG
    * @param {string} filePath ruta y nombre de archivo a escribir 
    */
    constructor(filePath) {
    /** @private */ this.filePath = filePath;
    }

    /**
     * Crea el header del archivo en dos partes
     * 
     * @param {string} headerStr arreglo de inicio de header
     */
    header(matrix) {
        this.headerStr = '\"id\",\"url\",\"dialog_message\",\"tasks_duration\",\"num_of_ads\",';
        fs.appendFileSync(this.filePath, this.headerStr );
        for (let i = 1; i < matrix.length; i++) {
            fs.appendFileSync(this.filePath,`\"${matrix[i][0]}\",`);
        }
        fs.appendFileSync(this.filePath, '\n');
    }
    
    /**
     * adiciona una línea al archivo con los elementos del arreglo entrante
     * 
     * @param {string} str arreglo con elementos a insertar en la línea
     */
    appendline(str) {
        fs.appendFileSync(this.filePath, str);
    }

};