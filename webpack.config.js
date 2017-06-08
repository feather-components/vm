const path = require('path');
var webpack = require('webpack');
var HtmlWepackPlugin = require('html-webpack-plugin');

module.exports = {
    watch: true,

    entry: {
        vmui: './src',
        vue: 'vue'
    },

    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        },
        extensions: ['.js', '.vue']
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
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

    vue: {
        loaders: {
            css: 'style!css!autoprefixer'
        }
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vmui', 'vue'],
        }),
        new HtmlWepackPlugin()
    ]
};