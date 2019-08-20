var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src',

    resolve: {
        extensions: ['.js', '.vue']
    },

    output: {
        path: path.join(__dirname, 'dist'),
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
    }
};