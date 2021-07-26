# puppeteer-scraping
---
scraping for fetching information concerning body and meta content on Desktop, Movil and New site of Firca Raiz web.

## Installation
Installation made for mac-os, usin homebrew package manager

- package manager *HomeBrew*:
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
- package manager *npm*:
```
brew install node
```
- library *puppeteer*:
```
npm i puppeteer
```

## usage

- two files must be configured in .tsv format:

    - Files containing selectors to scrap (example in: **/selectorsFiles**)
    - Files of selectors (example in: **/urlFiles**)

- In the **config.json** file, the configuration for de extraction columns for each file can be configured

###  **selectors.tsv**
---
#### Column structure:
- **Id:**
	- of the form **S1**:- *S* stands for selector and *1* the index of the selector.
	- of the form **C1**:- *C* stands for counter and *1* the index of the element to be counted
	
- **Description:** small description of selectors content
- **Selector:** css selector string
- **Attribute:** attribute of selector to be extracted from the following options
	- *.content*
	- *.textContent*
	- *.className*
	- *.title*

### **urls.tsv**
---
#### Column structure:
- **Id:** of the form selected by user, it will be printed in first column of output file

- **Tail:** the tail of the url to be scraped

- **urls(3 columns):** three different urls can be listed in the file in the preceding columns, they will share the same id, this is for later cross examination of the content

### **Output file**
---

The format of the output file is .csv, with double quotation, data structure is as follows:

*"id","url","dialog_message","tasks_duration","num_of_ads","S1","S2",...,"C1","C2","C3",...*