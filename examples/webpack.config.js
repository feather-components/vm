const path = require('path');
var webpack = require('webpack');
var HtmlWepackPlugin = require('html-webpack-plugin');

module.exports = {
    watch: true,

    entry: {
        main: './main/index',
        lib: ['vue', 'vue-router'],
        vmui: '../src'
    },

    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
            vmui: path.resolve(__dirname, '../src/index.js'),
            type: 'type-of',
            ajax: 'component-ajax'
        },
        extensions: ['.js', '.vue']
    },

    output: {
        path: path.resolve(__dirname, '_build_'),
        filename: '[name].js',
        library: 'this',
        libraryTarget: 'umd'
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    postcss: [require('autoprefixer')()]
                }
            },

            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader'
            },

            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vmui', 'lib'],
        }),
        new HtmlWepackPlugin({
            template: './main/index.html'
        })
    ]
};