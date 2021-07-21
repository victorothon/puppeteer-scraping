/** @class difTimer representa un timer diferencial  */
exports.difTimer = class {
    /**
    * crea instancia de un timer diferencial
    * 
    * @author VOG
    * @param {number} initTime | inicialización del timer 
    */
    constructor() {
        this.initTime = 0;
    }

    /**
     * obtiene el inicio del timer
     * 
     * @param {number} initTime | inicializa tiempo inicial de contéo 
     */
    setInit(initTime) {
    /**
     * @private {initTime} timer inicial
     */
        this.initTime = initTime;
    }

    /**
     * realiza el cálculo del tiempo diferencial
     * 
     * @param {number} currentTime | tiempo actual/final 
     * @returns {number} dt | diferencia entre los tiempos
     */
    difTime(currentTime) {
        let dt = currentTime - this.initTime;
        this.initTime = currentTime;
        return dt 
        
    }
};