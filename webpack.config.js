const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./pages/main.jsx", // Entry point of your application
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js', // Output bundle file name
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Use Babel for .js and .jsx files
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"], // Handling CSS files
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                use: {
                    loader: 'url-loader?limit=100000'
                }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // Use this HTML file as a template
        }),
    ],
};
