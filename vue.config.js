// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  lintOnSave: true,
  runtimeCompiler: true,
  pages: {
    index: {
      entry: 'src/App.ts',
      template: 'src/index.html',
    },
  },
  filenameHashing: false,
  chainWebpack: config => {
    config.output.filename('[name].js');
    config.plugins.delete('html');
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
    config.optimization.delete('splitChunks');
    config.resolve.alias.set('@@', path.resolve(__dirname, 'src'));
  },
};
