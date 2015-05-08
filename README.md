# protractor-multicapabilities-htmlreporter

A utility to generate HTML report for protractor  multicapabilities automation results.
Works on latest Protractor & Jasmine2.0

## Installation

 ```
 npm install protractor-multicapabilities-htmlreporter
 ```

## Usage

```
params: (inputFile,reportTitle,outputFile)

var reporter = require('protractor-multicapabilities-htmlreporter');
reporter.generateHtmlReport('./ptor-out.json','Automation Results','./report.html');
```

## Configuration

```
Add the below config for generating output for results in json format

resultJsonOutputFile: 'ptor-out.json'

Make sure test description follows the below format and json output file contains description 
in the same format.

Sample test file below, this below example shows hardcoded browser values, you can dynamically pass 
browsername and version using getProcessedConfig() in onPrepare method.

...
it("Product_Page|iPhone|8.0" ,function () { 
...
```

## Sample Protractor JSON output file
```
[
    {
        "description": "Category_Page|iPhone|8.0|",
        "assertions": [],
        "duration": 4544
    },
    {
        "description": "Product_Page|iPhone|8.0|",
        "assertions": [],
        "duration": 5898
    }
]
```
## Output file

```
![Alt text](/examples/html-report.png?raw=true "Multicapabilities Html Report")

```

## Release History

* 0.0.1 Initial release
