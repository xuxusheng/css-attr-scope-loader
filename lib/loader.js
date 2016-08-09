var postcss = require('postcss')
var processSelector = require('./processSelector')
var loaderUtils = require('loader-utils')

module.exports = function (source) {

    // 缓存
    if(this.cacheable) this.cacheable();
    var callback = this.async()
    // 参数
    var query = loaderUtils.parseQuery(this.query)

    // 如果未获取到scope参数，则直接返回
    if (!query.scope) {
        callback(null, source)
        return
    }

    // 将css字符串转换为 AST 语法树
    var root = postcss.parse(source)
    
    // 遍历语法树中的每一条css规则
    root.walkRules(rule => {
        
        // 处理每条规则中的选择器字符串 selector
        rule.selector = processSelector(rule.selector, query.scope)
    })
    
    // 将处理后的语法树重新转换为css字符串
    var newCss = ''
    postcss.stringify(root, function( str ) {
        newCss += str
    })
    
    callback(null, newCss)
}