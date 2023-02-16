const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");
const alias = require('./alias');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'output.[hash].bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: path.resolve(__dirname, './build/index.html'),
    }),
    new MiniCssExtractPlugin({
      ignoreOrder: true
    }),
    new DashboardPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(t|j)s?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset/resource',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ],
      },
    ]
  },
  devServer: {
    port: "3001",
    static: ["./build"],
    open: true,
    hot: true,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: false,
        warnings: false,
      },
    },
  },
}
