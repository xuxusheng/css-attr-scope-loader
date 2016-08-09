var Tokenizer = require('css-selector-tokenizer')
var postcss = require('postcss')

module.exports = function ( selectorStr, scope ) {

    // 使用 Tokenizer 将选择器字符串转换为语法树
    var root = Tokenizer.parse(selectorStr)

    root.nodes = root.nodes.map(function(selector) {

        // 是否存在 id 选择器
        var hasId = false
        // 待添加属性选择器的位置
        var toInsert = []
        var len = selector.nodes.length
        
        selector.nodes.forEach(function(item, index) {

            // 判断是否为 id 选择器
            hasId = item.type === 'id' ? true : hasId

            // 判断是否为空格或者 + , > , ~ 等符号
            if(item.type === 'operator' || item.type === 'spacing') {
                if(!hasId) toInsert.unshift(index)
                hasId = false
            }

            // 判断选择器最末尾部分是否需要添加
            if(!hasId && index === len -1) {
                toInsert.unshift(len)
            }
        })

        // 向相应位置添加上 属性选择器
        toInsert.forEach(function(item) {
            selector.nodes.splice(item, 0, {
                type: 'attribute',
                content: scope
            })
        })

        return selector
    })

    // 将处理过的语法树重新转换为选择器字符串
    return Tokenizer.stringify(root)
}