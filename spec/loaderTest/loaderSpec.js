var loader = require('../../lib/loader');

var path = require('path');
var fs = require('fs');
var testCasesPath = path.join(__dirname, 'cases');
var testCases = fs.readdirSync(testCasesPath);

var query = {
    scope: 'scope'
}

describe('process a full cssFile string', function() {

    testCases.forEach(function(name) {

        var source = fs.readFileSync(path.join(testCasesPath, name, 'source.css'), 'utf-8')
        var expected = fs.readFileSync(path.join(testCasesPath, name, 'expected.css'), 'utf-8')
        it(name, function() {
            expect(loader(source, query)).toBe(expected)
        })
    })

})