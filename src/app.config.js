export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/manage/index',
    'pages/map/index',
    'pages/animal/index',
    'pages/device/index',
    'pages/animalDetails/index',
    'pages/traceability/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#1AAD19',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [{
      pagePath: 'pages/index/index',
      text: '首页',
      // iconPath: 'static/images/tabbar/home.png',
      // selectedIconPath: 'static/images/tabbar/home_active.png'
    },{
      pagePath: 'pages/map/index',
      text: '地图',
    },{
      pagePath: 'pages/animal/index',
      text: '牲畜',
      // iconPath: 'static/images/tabbar/map.png',
      // selectedIconPath: 'static/images/tabbar/map_active.png'
    },{
      pagePath: 'pages/manage/index',
      text: '管理',
    }]
  }
})
