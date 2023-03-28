const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint
  // lintOnSave: false

  // 用webpack的代理(即转发服务器)方式,解决跨域问题
  devServer: {
    proxy: {
      // 如果请求路径中有/api,才可以进行代理转发
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: { '^/api': '' }   // 路径重写,如果路径中没有/api,则给你加上,从而可以被代理转发
      }
    }
  }
})

