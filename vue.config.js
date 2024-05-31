const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
  compress: true,
  inline: true,
  allowedHosts: [
      'https://kbin-frontend-2c0c17ed7b02.herokuapp.com/'
  ]
},
})
