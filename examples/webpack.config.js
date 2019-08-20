var path = require('path');
var webpack = require('webpack');
var HtmlWepackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV != 'ci' && require('./app');

function resolve (dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    watch: process.env.NODE_ENV != 'ci',

    entry: {
        main: resolve('src')
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
            }
        ]
    },

    plugins: [
        new HtmlWepackPlugin({
            template: resolve('src/index.html'),
            chunks: ['main', 'lib', 'vm']
        })
    ]
};