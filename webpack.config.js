const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const alias = require('./alias');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js?version=[chunkhash:8]'
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
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
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
