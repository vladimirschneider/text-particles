import HtmlWebpackPlugin from 'html-webpack-plugin';

import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

export default {
  output: {
    library: 'ParticlesJS',
    libraryExport: 'default',
  },

  devtool: 'source-map',

  mode: 'production',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    })
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
};
