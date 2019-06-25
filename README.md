# css-attr-scope-loader
webpack的自定义loader模块，给css文件中选择器加入自定义属性以起到隔离作用域的作用

### 测试

采用 jasmine 进行单元测试，测试文件在 `spec` 目录中。

`npm install` 安装依赖包后，在项目根目录下输入 `npm run test` 命令进行测试。

### 自定义 attr-loader
tools/attr-loader 文件夹中

以 attr-loader?scope=xxx 的形式接受参数

在所有css文件中的选择器后面加上自定义属性选择器[xxx]

> 如果没有接受到scope参数，则不做任何处理。

**例如：**
```css
a#content.active:first-child .cla > div::first-line[data-content],
#selectTwo:hover + #id2,
.group::after {
    border: 1px solid rebeccapurple;
    height: 200px;
}

a:not(:visited) {
    width: 100px;
    height: 150px;
}
```

执行 webpack 命令后生成的文件中：
```css
a#content.active:first-child .cla[xusheng] > div::first-line[data-content][xusheng],
#selectTwo:hover + #id2,
.group::after[xusheng] {
    border: 1px solid rebeccapurple;
    height: 200px;
}

a:not(:visited)[xusheng] {
    width: 100px;
    height: 150px;
}
```
