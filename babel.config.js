module.exports = {
    presets: [
        // 可以根据配置的目标浏览器或者运行环境来自动将ES2015+的代码转换为es5
        ["@babel/preset-env", {
            // es6以上的函数，babel自动导入相关的polyfill，减少打包的体积
            "useBuiltIns": "usage"
        }]
    ],
    // 在没配置路由懒加载的情况下，我们的路由组件在打包的时候，
    // 都会打包到同一个js文件去，当我们的视图组件越来越多的时候，
    // 就会导致这个 js 文件越来越大。然后就会导致请求这个文件的时间变长，
    // 最终影响用户体验
    plugins: [
        // 添加这个
        '@babel/plugin-syntax-dynamic-import'
    ]
}