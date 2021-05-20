'use strict'
// const titles = require('./title.js')
// 参考https://segmentfault.com/a/1190000017008697
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

const resolve = function (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  lintOnSave: true,
  // runtimeCompiler: true,
  productionSourceMap: false, // 生产环境的 source map
  parallel: require('os').cpus().length > 1,
  pwa: {},
  devServer: {
    disableHostCheck: true, // 默认检查hostname，如果hostname不是配置内的，将中断访问。
    host: 'local.hwagain.com',
    port: 8080,
    https: false,
    hotOnly: true,
    progress: true
    // proxy: {
    //   '/api': {
    //     target: 'http://127.0.0.1:8080',
    //     changeOrigin: true,
    //     pathRewrite: { '^/api': '' }
    //   }
    // }
  },
  chainWebpack: config => {
    config.plugins.delete('named-chunks')
    config.resolve.symlinks(true) // 修复HMR
  },
  configureWebpack: config => {
    config.resolve = {
      extensions: ['.js', '.vue', '.json', '.css'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        public: resolve('public')
      }
    }
    config.performance = {
      hints: false
    }
    if (IS_PROD) {
      const plugins = []
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
      config.devtool = false
      config.plugins = [...config.plugins, ...plugins]
    } else {
      config.devtool = 'eval-source-map'
    }
  }
}
