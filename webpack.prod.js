const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const CopyPlugin = require("copy-webpack-plugin");

const path = require('path');


module.exports = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                ]
            },
            {
                test: /\.css$/i,
                exclude: /styles\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /styles\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    entry: './src/index.js',
    output: {
        filename: 'bundle.[contentHash].js', 
        path: path.resolve(__dirname, './dist'),
    },


    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
              { from: "src/assets", to: "assets/" },
            ]
        }),
        new TerserPlugin(),
        new MinifyPlugin(),
        new CleanWebpackPlugin(),
    ]
}