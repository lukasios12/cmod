const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let config = {
    context: path.resolve(__dirname),
    devtool: 'source_map',
    entry: path.resolve(__dirname, "src/main.ts"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'main.js',
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
    },
    resolve: {
        alias: {
            "src": path.resolve(__dirname, "src"),
            "lib": path.resolve(__dirname, "lib"),
        },
        extensions: [ '.ts', '.js' ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
            {
                test: /\.html$/,
                loader: 'vue-template-loader',
                options: {
                    scoped: false,
                },
            },
            {
                test: /\.scss$/,
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                },
            },
            {
                enforce: 'post',
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css"
        }),
    ]
}

module.exports = config;
