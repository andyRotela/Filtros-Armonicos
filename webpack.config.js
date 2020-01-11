const path = require('path');

module.exports = {
  entry: {
      app: './src/js/app.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.bundle.js'
  }
};