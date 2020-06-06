const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const minify = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
};

module.exports = {
  entry: {
    main: './main.js',
  },
  devServer: {
    contentBase: path.join(__dirname),
    publicPath: '/',
    port: 9000,
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, './dist'),
    filename: '[chunkhash].js',
  },
  target: 'web',
  mode: 'development',
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            {
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-transform-modules-commonjs',
              ],
            },
          ],
        },
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: '/images/',
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: '/fonts/',
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      // {
      //   test: /\.handlebars$/,
      //   use: {
      //     loader: 'html-loader',
      //     options: {
      //       interpolate: 'require',
      //     },
      //   },
      // },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[chunkhash].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      minify,
      template: path.join('./index.html'),
      filename: path.join('./index.html'),
    }),
  ],
};
