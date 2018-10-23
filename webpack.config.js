const path = require('path');

const HtmlPlugin = require('html-webpack-plugin');

const config = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
  ],
  resolve: {
    alias: {
      particles: path.resolve(__dirname, 'src/particles/index.js')
    }
  }
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.plugins = [
      ...config.plugins,
      new HtmlPlugin({
        template: path.resolve(__dirname, 'public/index.html')
      })
    ]
  }

  return config;
}
