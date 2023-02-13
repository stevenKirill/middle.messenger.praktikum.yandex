const { resolve } = require('path');

module.exports = {
  root: resolve(),
  core: resolve('./src/core/'),
  services: resolve('src', 'services'),
  api: resolve('src', 'api'),
  utils: resolve('src', 'utils'),
  constants: resolve('src', 'constants'),
  pages: resolve('src', 'pages'),
  handlebars: 'handlebars/dist/handlebars.min.js',
};
