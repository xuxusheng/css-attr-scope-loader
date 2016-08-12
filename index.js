var loader = require('./lib/loader')
var loaderUtils = require('loader-utils')

module.exports = function (source) {

    // 缓存
    if (this.cacheable) this.cacheable();
    var callback = this.async()
    // 参数
    var query = loaderUtils.parseQuery(this.query)

    // 如果未获取到scope参数，则直接返回
    if (!query.scope) {
        callback(null, source)
        return
    }

    var newCss = loader(source, query)

    callback(null, newCss)
}