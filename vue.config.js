const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  // Your existing Vue CLI configurations ...
  transpileDependencies: true,

  // Add the module rules for handling markdown and HTML files
  chainWebpack: (config) => {
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end();

    config.module
      .rule('html')
      .test(/\.html$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end();
  },
});

