export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/manage/index',
    'pages/map/index',
    'pages/animal/index',
    'pages/device/index',
    'pages/animalDetails/index',
    'pages/traceability/index',
    'pages/animalDetailsError/index',
    'pages/basicInformation/index',
    'pages/vaccineManagement/index',
    'pages/reproductionManagement/index',
    'pages/quarantineRecords/index',
    'pages/birthControlRecords/index',
    'pages/estrusRecording/index',
    'pages/vaccineRecords/index',
    'pages/quarantineManagement/index',
    'pages/selectLivestock/index',
    'pages/breedingManage/index',
    'pages/newBreeding/index',
    'pages/message/index'
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
      iconPath: 'static/images/tabbar/home.png',
      selectedIconPath: 'static/images/tabbar/home1.png'
    }, {
      pagePath: 'pages/map/index',
      text: '地图',
      iconPath: 'static/images/tabbar/map.png',
      selectedIconPath: 'static/images/tabbar/map1.png'
    }, {
      pagePath: 'pages/animal/index',
      text: '牲畜',
      iconPath: 'static/images/tabbar/anima.png',
      selectedIconPath: 'static/images/tabbar/amima1.png'
    }, {
      pagePath: 'pages/manage/index',
      text: '管理',
      iconPath: 'static/images/tabbar/manage.png',
      selectedIconPath: 'static/images/tabbar/manage1.png'
    }]
  }
})
