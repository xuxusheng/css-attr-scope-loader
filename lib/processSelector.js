var Tokenizer = require('css-selector-tokenizer')
var postcss = require('postcss')

module.exports = function (selectorStr, scope) {

    // 使用 Tokenizer 将选择器字符串转换为语法树
    var root = Tokenizer.parse(selectorStr)

    root.nodes = root.nodes.map(function (selector) {

        // 是否存在 id 选择器
        var hasId = false
        // 是否存在 global
        var hasGlobal = false
        // 是否存在伪元素 ::after ::before
        var hasPseudoEle = false
        // 待添加属性选择器的位置
        var toInsert = []
        var len = selector.nodes.length

        // 判断当前选择器是不是 :global { } 这种形式，如果是的话，不做任何处理
        if (selector.nodes[0].type === 'pseudo-class' && selector.nodes[0].name === 'global') {
            return selector
        }

        // 判断当前选择器是不是 form 或者 to，如果是，不做任何处理
        if (selector.nodes[0].type === 'element' && (selector.nodes[0].name === 'from' || selector.nodes[0].name === 'to') ) {
            return selector
        }

        // 判断是否为动画中的 0%、100%之类的，如果是，不做任何处理
        if (selector.nodes[0].type === 'invalid') {
            return selector
        }

        selector.nodes.forEach(function (item, index) {

            // 判断是否为 id 选择器
            hasId = item.type === 'id' ? true : hasId
            // 判断是否为 global 节点
            hasGlobal = (item.type === 'nested-pseudo-class' && item.name === 'global') ? true : hasGlobal
            // 判断是否为 伪元素 节点
            hasPseudoEle = (item.type === 'pseudo-element') ? true : hasPseudoEle

            // 判断是否为空格或者 + , > , ~ 等符号
            if (item.type === 'operator' || item.type === 'spacing') {

                // 判断前一个元素是否为 伪元素
                if (!hasId && !hasGlobal) !hasPseudoEle ? toInsert.unshift(index) : toInsert.unshift(index - 1)

                hasId = false
                hasGlobal = false
                hasPseudoEle = false
            }

            // 判断选择器最末尾部分是否需要添加，以及添加的位置
            if (!hasId && !hasGlobal && index === len - 1) !hasPseudoEle ? toInsert.unshift(len) : toInsert.unshift(len - 1)
        })

        // 向相应位置添加上 属性选择器
        toInsert.forEach(function (item) {
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