# protractor-multicapabilities-htmlreporter

A utility to generate HTML report for protractor  multicapabilities automation results.

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
Make sure test description follows the below format and json output file contains description in the same format.
You can pass browsername and version from config to test file using getProcessedConfig() in onPrepare method.

In test file:
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
Refer report.html file

```

## Release History

* 0.0.1 Initial release
