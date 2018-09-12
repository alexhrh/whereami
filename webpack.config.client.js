const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const ROOT = path.resolve( __dirname, 'client' );
const DESTINATION = path.resolve( __dirname, 'client-dist' );

module.exports = {
    context: ROOT,

    entry: {
        'main': 'src/index.ts'
    },
    
    output: {
        filename: '[name].bundle.js',
        path: DESTINATION
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: './index.html'
        })
    ],

    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            ROOT,
            'node_modules'
        ]
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'source-map-loader'
            },
            {
                enforce: 'pre',
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'tslint-loader'
            },
            {
                test: /\.ts$/,
                exclude: [ /node_modules/ ],
                use: 'awesome-typescript-loader'
            }
        ]
    },

    devtool: 'cheap-module-source-map',
    mode: 'none'
};