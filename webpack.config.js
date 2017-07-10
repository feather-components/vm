var path = require('path');
var webpack = require('webpack');

function resolve (dir) {
	return path.join(__dirname, '/', dir)
}

module.exports = {
    entry: {
        vue: ['vue'],
        vmui: './src/index',
        rem: './rem'
    },

    resolve: {
        alias: {
            type: 'type-of',
            ajax: 'component-ajax'
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
            name: ['vmui', 'vue', 'rem'],
        })
    ]
};
