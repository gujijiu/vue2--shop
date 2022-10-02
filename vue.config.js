const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // productionSourceMap:falsel, //去除打包后未压缩加密的源文件（map文件）
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy:{
      '/api':{
        target: 'http://gmall-h5-api.atguigu.cn',
        changeOrigin: true,
        // pathRewrite: {'^/api': ''},
      }
    }
  }
})
