const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  productionSourceMap: process.env.NODE_ENV === 'development', // 是否打包sourcemap
  outputDir: 'myDist',
  publicPath: process.env.NODE_ENV === 'development' ? '' : '/',
  // devServer: {
  //   proxy: {
  //     '/Api': {
  //       target: 'http://192.168.1.92:8055', // 要访问的接口域名 'http://218.28.143.10:8156'
  //       // target: 'http://218.28.143.10:8156', // 要访问的接口域名 'http://218.28.143.10:8156'
  //       ws: true, // 开启websockets
  //       changeOrigin: true, // 开启代理
  //     },
  //   },
  // },
  configureWebpack: {
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['// console.log'], // 移除console
            },
          },
        }),
      ],
    },
  },
};
