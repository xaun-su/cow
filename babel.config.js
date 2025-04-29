// babel-preset-taro 更多选项和默认值：
// https://docs.taro.zone/docs/next/babel-config
module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      ts: false,
      compiler: 'webpack5',
    }]
  ],
  "plugins": [
    "@babel/plugin-proposal-optional-chaining"
  ]
}
