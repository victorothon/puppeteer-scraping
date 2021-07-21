# puppeteer-scraping
 scraping para encontrar inconsistencias de contenido en las versiones desktop, móvil y nueva de finca raiz.
 
# Descripción de uso
- Se deben configurar la ruta de dos archivos en formato .tsv:
    - Archivo de Urls a revisar (archivo ejemplo en: **/selectorsFiles**)
    - archivo con selectores y atributos a evaluar (archivo ejemplo en: **/urlFiles**)

- En el archivo **config.json** se realiza la configuración de las columnas en las cuales se encuentran los datos a extraer, tanto de los selectores como de las urls a examinar.

## Archivo *selectors.tsv*:
- 