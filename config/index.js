// config/index.js
import { defineConfig } from '@tarojs/cli'

import devConfig from './dev'
import prodConfig from './prod'
const path = require('path'); // 导入 path 模块

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig(async (merge, { command, mode }) => {
  const baseConfig = {
    projectName: 'cow',
    date: '2025-4-24',
    designWidth: 750, // 默认设计宽度
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: ['@tarojs/plugin-html'], // 开启 HTML 插件
    defineConstants: {},
    copy: {
      patterns: [],
      options: {}
    },
    framework: 'react',
    compiler: {
      type: 'webpack5',
      prebundle: {
        exclude: ['@nutui/nutui-react-taro', '@nutui/icons-react-taro']
      }
    },
    cache: {
      enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    mini: {
      // *** 在 mini 配置中添加 webpackChain ***
      webpackChain (chain) {
        chain.resolve.alias
          .set('@', path.resolve(__dirname, '..', 'src'));
      },
      postcss: {
        pxtransform: {
          enable: true,
          config: {
          selectorBlackList: ['nut-'],
          baseFontSize: 14,
          maxRootSize: 14,
        },
        },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
    },
    h5: {
      // *** 在 h5 配置中添加 webpackChain ***
      webpackChain (chain) {
        chain.resolve.alias
          .set('@', path.resolve(__dirname, '..', 'src'));
      },
      publicPath: '/',
      staticDirectory: 'static',
      output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css'
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
          selectorBlackList: ['nut-'],
          baseFontSize: 14,
          maxRootSize: 14,
        },
        },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          }
        }
      }
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        }
      },
      output: {
        iosSourceMapUrl: '', // sourcemap 文件url
        iosSourcemapOutput: '../taro-native-shell/ios/main.map', // sourcemap 文件输出路径
        iosSourcemapSourcesRoot: '', // 将 sourcemap 资源路径转为相对路径时的根目录
        androidSourceMapUrl: '',
        androidSourcemapOutput: '../taro-native-shell/android/app/src/main/assets/index.android.map',
        androidSourcemapSourcesRoot: '',
        ios: '../taro-native-shell/ios/main.jsbundle',
        iosAssetsDest: '../taro-native-shell/ios',
        android: '../taro-native-shell/android/app/src/main/assets/index.android.bundle',
        androidAssetsDest: '../taro-native-shell/android/app/src/main/res'
      },
    },
    // 这里是你提供的配置，加入 designWidth 和 deviceRatio
    designWidth(input) {
      if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
        return 375; // 对 NutUI 设置设计宽度 375
      }
      return 750; // 默认设计宽度为 750
    },
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      828: 1.81 / 2,
      375: 2 / 1
    }
  }

  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})
