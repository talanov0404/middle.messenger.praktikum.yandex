const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { NODE_ENV } = process.env || 'production';

module.exports = {
  mode: NODE_ENV,
  target: ['web', 'es5'],
  context: path.join(__dirname, './src'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  entry: {
    index: ['./index.ts'],
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Messenger Yandex Praktikum',
      chunks: ['index'],
      template: path.join(__dirname, './index.ejs'),
      minify: false,
      inject: 'head',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.hbs$/,
        use: ['handlebars-loader'],
        exclude: /(node_modules)/,
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.(useable|module)\.scss/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { esModule: false } },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/inline',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  devtool: NODE_ENV === 'development' ? 'inline-cheap-module-source-map' : false,
  watch: NODE_ENV === 'development',
  watchOptions: {
    aggregateTimeout: 100,
    ignored: /node_modules/,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
      watch: true,
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
    liveReload: true,
    open: true,
    hot: true,
  },
};
