# puppeteer-scraping
 scraping for fetching information concerning body and meta content on Desktop, Movil and New site of Firca Raiz web. 
 
# Description of usage
- two files must be configured in .tsv format:
    - Files containing selectors to scrap (example in: **/selectorsFiles**)
    - Files of selectors (example in: **/urlFiles**)

- In the **config.json** file, the configuration for de extraction columns for each file can be configured

## **selectors.tsv:**
### - Column structure:
    - Id:
        - of the form **S1**:- *S* stands for selector and *1* the index of the selector
        - of the form **C1**:- *C* stands for counter and *1* the index of the element to be counted

    - Description:
        -   small description of selectors content

    - Selector:
        - css selector string

    - Attribute:
        - Attribute of selector to be extracted from the following options
            - *.content*
            - *.textContent*
            - *.className*
            - *.title*

## **urls.tsv:**
