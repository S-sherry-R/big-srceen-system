const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 5174,
    //代理服务器
    proxy: {
      '/api': {
        //获取服务器地址的设置
        target: 'http://47.109.155.179:3007',
        //是否跨域
        changeOrigin: false,
        //是否重写
        pathRewrite: {
          '^/api': ''
        },
      },
    },
  },
  // chainWebpack: config => {
  //   config.module.rule('glsl')
  //       .test(/\.(vert|frag)$/)
  //       .use('raw-loader')
  //       .loader('raw-loader')
  //       .end()
  // }
})
