const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_DEVELOPMENT = NODE_ENV === 'development';

module.exports = {
  mode: NODE_ENV,
  devtool: IS_DEVELOPMENT ? 'inline-cheap-module-source-map' : false,
  entry: {
    bundle: ['./src/js/index.ts'],
    style: ['./src/style/index.scss'],
  },
  output: {
    path: path.resolve(__dirname, './dist/js'),
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '../css/[name].css',
      chunkFilename: '[id].css',
    })
  ],
  resolve: {
    extensions: ['.ts', '.js', 'scss', 'css']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(png|svg|jpg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '../images/',
            limit: 1024,
            esModule: false
          }
        }],
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          {
            loader: 'css-loader',
            options: { sourceMap: IS_DEVELOPMENT }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: IS_DEVELOPMENT }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: IS_DEVELOPMENT }
          },
        ],
      },
    ]
  }
}