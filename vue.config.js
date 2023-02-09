const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:'./',
  devServer: {
    port:80,
    proxy: {
      '/api': { // 触发匹配路径z    
        target: 'http://192.168.3.21:18080', // 代理跳转到的站点
        changeOrigin: true, // 允许跨域
        pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
          '^/api': ''
        }
      }
    }
  }
})


