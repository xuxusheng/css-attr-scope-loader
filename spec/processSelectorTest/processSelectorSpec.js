var processSelector = require('../../lib/processSelector');

var path = require('path');
var fs = require('fs');
var testCasesPath = path.join(__dirname, 'cases');
var testCases = fs.readdirSync(testCasesPath);

var scope = 'scope';

describe('process a cssSelector string', function() {

    testCases.forEach(function(name) {
        var source = fs.readFileSync(path.join(testCasesPath, name, 'source.css'), 'utf-8');
        var expected = fs.readFileSync(path.join(testCasesPath, name, 'expected.css'), 'utf-8');

        it(name, function() {
            expect(processSelector(source, scope)).toBe(expected)
        })
    })
})