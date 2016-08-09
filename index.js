module.exports = loader

// 返回 loader.js 的绝对路径
function loader() {
    return [
        require.resolve('./lib/loader.js')
    ].join('!')
}