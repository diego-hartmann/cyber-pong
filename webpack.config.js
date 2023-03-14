const path = require('path');

module.exports = {
  
    module: {
        rules: [
            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            }
          ]
    },
    resolve: {
        alias: {
            'master-pitch': path.resolve(__dirname, 'node_modules/master-pitch/index.js'),
        },
    },
};
