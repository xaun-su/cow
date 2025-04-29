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
    'pages/message/index',
    'pages/videoSurveillance/index',
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
  },
  "requiredPrivateInfos": [
    "getLocation",
    "chooseLocation"
  ],
  // **添加这个 permission 字段**
  "permission": {
    "scope.userLocation": {
      // **重要：这里的 desc 内容会显示给用户，说明你的小程序为什么需要位置信息**
      "desc": "你的位置信息将用于在地图上显示当前位置和相关牲畜信息"
    }
  }
})
