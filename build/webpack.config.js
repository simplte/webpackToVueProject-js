const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    mode: 'development',
    entry: {
        // @babel/polyfill对一些不支持新语法的客户端提供新语法实现
        main: [path.resolve(__dirname, '../src/main.js')]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[hash:8].js',
        // chunk就是生成的文件 生成的chunk名字
        chunkFilename: 'js/[name].[hash:8].js',
        // z资源引用的目录，和loader plugin里面配置的地址合并使用
        publicPath: '/'
    },
    devServer: {
        hot: true,
        port: 8081,
        contentBase: './dist',
        open: true,
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.runtime.esm.js'
        },
        extensions: [
            '.js',
            '.vue'
        ]
    },
    module: {
        rules: [{
                test: /\.vue$/,
                exclude: /node_modules/,
                use: [{
                        loader: 'cache-loader'
                    },
                    {
                        loader: 'thread-loader'
                    },
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false
                            },
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                        loader: 'cache-loader'
                    },
                    {
                        loader: 'thread-loader'
                    },
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 4096,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'img/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 4096,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'media/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 4096,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'fonts/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }]
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        // 使用 html-webpack-plugin来创建html页面，并自动引入打包生成的js文件
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        // 热更新插件
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],

}