const path = require('path');
var webpack = require('webpack');
var HtmlWepackPlugin = require('html-webpack-plugin');

module.exports = {
    watch: true,

    entry: {
        main: './main/app',
        vue: 'vue',
        vmui: '../src'
    },

    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
            vmui: path.resolve(__dirname, '../src/index.js')
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
                use: 'vue-loader'
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vmui', 'vue'],
        }),
        new HtmlWepackPlugin()
    ]
};