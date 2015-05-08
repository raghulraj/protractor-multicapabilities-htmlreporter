/*jshint node:true*/
'use strict';
var fs = require('fs');
var path = require('path');
var hasOwnProperty = Object.prototype.hasOwnProperty;


	exports.generateHtmlReport = function (inputFile,title,outputFile) {
        	
	var sortedJson = require((path.join(__dirname,'../../'+inputFile)));
            var automationHeader = title;
            sortOn(sortedJson, 'description', false, false);
            var result = generateReport(sortedJson,automationHeader);
            filewrite(result,outputFile);
	
	};


    function generateReport(jsonstr,automationHeader) {
        var passCount = new Array();
        var failCount = new Array();
        var skippedCount = new Array();
        var browserArray = new Array();
        var testArray = new Array();
        var testrunArray = new Array();
        var keyValuePair;

        for (var j = 0; j < jsonstr.length; j++) {
            var browsername = jsonstr[j].description.split('|')[1] + '-' + jsonstr[j].description.split('|')[2];
            browserArray.push(browsername);
        }
        var unique = browserArray.filter(onlyUnique);
        for (var j3 = 0; j3 < jsonstr.length; j3++) {
            testrunArray.push(jsonstr[j3].description.split('|')[0]);
        }
        var trunique = testrunArray.filter(onlyUnique);

        var comboArray = new Array();
        var expectedResults = new Array();
        var diffArray = new Array();
        var failedArray = new Array();
        expectedResults.push(unique);
        expectedResults.push(trunique);


        comboArray = allPossibleCases(expectedResults);
        var runningArray = new Array();
        for (var q = 0; q < jsonstr.length; q++) {
            var browsername = jsonstr[q].description.split('|')[1] + '-' + jsonstr[q].description.split('|')[2];
            var browserrunner = jsonstr[q].description.split('|')[1];
            var testmapper = browsername + '~' + jsonstr[q].description.split('|')[0]
            var assertions = jsonstr[q].assertions;
            var assertionsArray = new Array();
            var passed = "";
            var failedtest = new Array();
            for (var jk = 0; jk < assertions.length; jk++) {
                assertionsArray.push(assertions[jk].passed);
            }
            if (assertionsArray.length > 0) {
                for (var ijk = 0; ijk < assertionsArray.length; ijk++) {
                    if (assertionsArray[ijk] == false) {
                        failedtest.push("failed");
                    }
                    if (failedtest.length > 0) {
                        passed = "false";
                    }
                    if (failedtest.length <= 0) {
                        passed = "true";
                    }
                }
            } else {
                passed = "true";
                //passed = "Skipped";
                //skippedCount.push("Skipped");
            }
            passCount.push(passed);
            testArray.push({
                testName: jsonstr[q].description.split('|')[0],
                browser: browsername,
                browserrunner: browserrunner,
                testmapper: testmapper,
                res: passed
            });
        }
	var resultq = testArray;
        var pass = 0;
        var fail = 0;
        for (var p1 = 0; p1 < passCount.length; p1++) {
            if (passCount[p1] === "true")
                pass++;
        }
        for (var p2 = 0; p2 < passCount.length; p2++) {
            if (passCount[p2] === "false")
                fail++;
        }

        var Total = pass + fail;
        var Passpercentage = Math.floor((pass / Total) * 100);
        var result = '<html><div class="header">'+automationHeader+'</div>';
        result += '<table class="newtable"><tr><td>Total</td><td>Pass</td><td>Fail</td><td>Pass%</td></tr><tr><td>';
        result += Total + "</td><td>";
        result += pass + "</td><td>";
        result += fail + "</td><td>";
        result += Passpercentage + "</td></tr></table>";


        var dummy = {};
        for (var i = 0; i < resultq.length; i++) {
                if (!dummy[resultq[i].testName]) {
                    dummy[resultq[i].testName] = {};
                }
                if (!dummy[resultq[i].testName].browser) {
                    dummy[resultq[i].testName].browser = {};
                }

                dummy[resultq[i].testName].browser[resultq[i].browser] = resultq[i].res;

	}	

		result += '<table class="hovertable" cellpadding="10" cellspacing="5">';

            var kk = unique.sort();
            result += '<tr><td class="brk"><b>Test#</b></td><td class="brk"><b>TestName</b></td>';
            for (var l = 0; l < unique.length; l++) {
                result += '<td class="brk"><b>' + unique[l] + '</b></td>';
            }
            result += '</tr>';

		
            var county = 0;
            var countervalue = "";
            for (var index in dummy) {

                if (dummy.hasOwnProperty(index)) {
                    countervalue = county;
                    county++;
                }

                result += '<tr><td>' + county + '</td><td class="testname">' + index + '</td>';

                for (var iok in dummy[index]) {
                    var bk = new Array();
                    bk = unique.sort();

                    for (var inc in bk) {
                        var bb = bk[inc];
                        for (var iok1 in dummy[index][iok]) {
                            if (bb === iok1) {
     
				if (dummy[index][iok][bb].split('|')[0] == "true") {
                                    result += '<td class="clean"><font color="green">PASS</font></td>';
                                }
                                if (dummy[index][iok][bb].split('|')[0] == "false") {
                                    result += '<td class="clean"><font color="red">FAIL</font></td>';
                                }
                                if (dummy[index][iok][bb].split('|')[0] == "Skipped") {
                                    result += '<td><font color="grey">Skip</font></td>';
                                }
                            }
                        }
                    }

                }
                result += '</tr>';
            
		}

          result += '<tr><td class="brk3"></td><td class="brk3"><b>Pass%</b></td>';
            var lk = new Array();
            var trueCount = new Array();
            var falseCount = new Array();
            var browserCount = new Array();
            var skiptestCount = new Array();
            lk = unique.sort();
            var bbk = "";
            var pcounter = 1;
            var fcounter = 1;
            for (var inc1 in resultq) {
                for (var inc2 in lk) {
                    bbk = lk[inc2];
                    if (bbk == resultq[inc1].browser) {
                        browserCount.push(bbk);
                        if (resultq[inc1].res == "true") {
                            trueCount.push(bbk);
                        }
                        if (resultq[inc1].res == "false") {
                            falseCount.push(bbk);
                        }
                        if (resultq[inc1].res == "Skipped") {
                            skiptestCount.push(bbk);
                        }
                    }
                }
            }
            var uk = unique.sort();
            var bbk1 = "";
            for (var inc4 in uk) {
                bbk1 = uk[inc4];
                var browerpasspercentage = findOccurrences(trueCount, bbk1) / (findOccurrences(browserCount, bbk1) - findOccurrences(skiptestCount, bbk1)) * 100;
                result += '<td class="brk3"><b>' + browerpasspercentage + '%</b></td>';
            }

            result += "</tr></table>";
	return result;
	}

	function filewrite(result,outputFile){
        result += "<style>";
        result += ".header{font-size: 26px;margin-bottom: 10px;margin-left: 150px; text-decoration: underline;}";
        result += ".brk{background-color:burlywood;}";
        result += ".brk1{background-color:coral}"
        result += ".brk3{background-color:darkgoldenrod}";
        result += "table.hovertable {font-family: verdana,arial,sans-serif;font-size:11px;color:#333333;border-width: 1px;border-color: #999999;border-collapse: collapse;margin-top: 20px;}";
        result += "table.hovertable th {background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;}";
        result += "table.hovertable tr {background-color:#D4E4AF}";
        result += "table.hovertable tr.head {background-color:#aaa;}";
        result += "table.hovertable td.pass{background-color:green;}";
        result += "table.hovertable td.clean a{text-decoration:none;}";
        result += "table.hovertable td.fail{background-color:red;}";
        result += "table.hovertable td.testname{text-align:left;}";
        result += "table.hovertable td {border-width: 1px;padding: 8px;border-style: solid;border-color: beige;text-align: center}";
        result += "</style>";

        result += "<style> .newtable td, th { border: 1px solid #999;padding: 0.5rem;} </style>";
	
        fs.writeFileSync(outputFile, result);
    
	}

    function groupBy(array, f) {
        var groups = {};
        array.forEach(function(o) {
            var group = JSON.stringify(f(o));
            groups[group] = groups[group] || [];
            groups[group].push(o);
        });
        return Object.keys(groups).map(function(group) {
            return groups[group];
        })
    }

    function allPossibleCases(arr) {
        if (arr.length == 1) {
            return arr[0];
        } else {
            var result = [];
            var allCasesOfRest = allPossibleCases(arr.slice(1)); // recur with the rest of array
            for (var i = 0; i < allCasesOfRest.length; i++) {
                for (var j = 0; j < arr[0].length; j++) {
                    result.push(arr[0][j] + "~" + allCasesOfRest[i]);
                }
            }
            return result;
        }

    }

    function arr_diff(a1, a2) {
        var o1 = {},
            o2 = {},
            diff = [],
            i, len, k;
        for (i = 0, len = a1.length; i < len; i++) {
            o1[a1[i]] = true;
        }
        for (i = 0, len = a2.length; i < len; i++) {
            o2[a2[i]] = true;
        }
        for (k in o1) {
            if (!(k in o2)) {
                diff.push(k);
            }
        }
        for (k in o2) {
            if (!(k in o1)) {
                diff.push(k);
            }
        }
        return diff;
    }

    function combinearrays(ids) {
        return (ids.length ? "'" + ids.join("','") + "'" : "");
    }

    function findOccurrences(arr, val) {
        var i, j,
            count = 0;
        for (i = 0, j = arr.length; i < j; i++) {
            (arr[i] === val) && count++;
        }
        return count;
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    function sortOn(arr, prop, reverse, numeric) {
        if (!prop || !arr) {
            return arr
        }
        var sort_by = function(field, rev, primer) {
            return function(a, b) {
                a = primer(a[field]), b = primer(b[field]);
                return ((a < b) ? -1 : ((a > b) ? 1 : 0)) * (rev ? -1 : 1);
            }
        }
        if (numeric) {
            arr.sort(sort_by(prop, reverse, function(a) {
                return parseFloat(String(a).replace(/[^0-9.-]+/g, ''));
            }));
        } else {
            arr.sort(sort_by(prop, reverse, function(a) {
                return String(a).toUpperCase();
            }));
        }
    }
