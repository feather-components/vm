var path = require('path');
var webpack = require('webpack');
var HtmlWepackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV != 'ci' && require('./app');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    watch: process.env.NODE_ENV != 'ci',

    entry: {
        example: resolve('src/example/example'),
        doc: resolve('src/doc/doc')
    },

    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
            vm: resolve('../src'),
            type: 'type-of',
            ajax: 'component-ajax'
        },
        extensions: ['.js', '.vue']
    },

    output: {
        path: resolve('_build_'),
        filename: '[name].js',
        library: 'this',
        libraryTarget: 'umd'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: [
                        'vue-style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: {
                                    autoprefixer: {}
                                }
                            }
                        }
                    ]
                }
            },

            {
                test: /\.js$/,
                loader: 'babel-loader'
            },

            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader'
            },

            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader'
            },

            {
                test: /\.md$/,
                loaders: [
                    'vue-loader',
                    {
                        loader: 'vue-md-loader',
                        options: {
                            preProcess(source) {
                                // console.log('pre', source)
                                return source
                            },
                            afterProcess(result) {
                                // console.log('after', result)
                                return result
                            },
                            afterProcessLiveTemplate(template) {
                                return `<div class="live-wrapper">${template}</div>`
                            },
                            rules: {
                                'table_open': () => '<div class="table-responsive"><table class="table">',
                                'table_close': () => '</table></div>'
                            }
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new HtmlWepackPlugin({
            filename: 'example.html',
            template: resolve('src/example/index.html'),
            chunks: ['example', 'lib', 'vm']
        }),

        new HtmlWepackPlugin({
            filename: 'doc.html',
            template: resolve('src/doc/index.html'),
            chunks: ['doc', 'lib', 'vm']
        })
    ]
};