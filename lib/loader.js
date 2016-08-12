var postcss = require('postcss')
var processSelector = require('./processSelector')

module.exports = function (source, query) {

    // 将css字符串转换为 AST 语法树
    var root = postcss.parse(source)

    // 遍历语法树中的每一条css规则
    root.walkRules(rule => {

        // 处理每条规则中的选择器字符串 selector
        rule.selector = processSelector(rule.selector, query.scope)
    })

    // 将处理后的语法树重新转换为css字符串
    var newCss = ''
    postcss.stringify(root, function (str) {
        newCss += str
    })

    return newCss
}