// src/pages/index/index.jsx

import React, { useState } from 'react';
import Taro from '@tarojs/taro';
import CustomNavBar from '../../components/CustomNavBar/CustomNavBar'; // 假设 CustomNavBar 内部使用了 NutUI 的 NavBar
import './index.less'; // 引入首页的样式文件
import { View, Text } from '@tarojs/components';
import { Clock } from '@nutui/icons-react-taro'
import imge1 from '../../static/images/惊叹号、感叹号.png'
import imge2 from '../../static/images/标示_道路摄像机_在线.png'
import { Tabs } from '@nutui/nutui-react-taro'
// ... 获取系统信息计算导航栏高度的代码 ...
const systemInfo = Taro.getSystemInfoSync();
const statusBarHeight = systemInfo.statusBarHeight; // 状态栏高度
const customNavHeight = 44; // 自定义导航栏的高度 
const totalNavHeight = statusBarHeight + customNavHeight; // 导航栏总高度


const Index = () => {
  const [tab1value, setTab1value] = useState('0')
  return (
    <View className='index-container'> {/* 容器 */}

      {/* 背景图片元素 */}
      <View className='index-background'></View>
      <CustomNavBar title='首页' className='index-nav-bar' />

      {/* 内容区域 */}
      <View
        className='index-content'
        style={{
          marginTop: `10vh`, // 假设背景图片高度是 30vh
        }}
      >
        {/* 牲畜报道 */}
        <View className='reports'>
          <View className='report'>
            <View className='title'> 牲畜报道</View>
            <View className='time'><Clock size={10} /> 00:00~15:30</View>
          </View>

          <View className='report-list'>
            <View className='report-item'>
              <View className='num'>62</View>
              <View className='text'>应到</View>
            </View>
            <View className='report-item'>
              <View className='num'>61</View>
              <View className='text'>一到</View>
            </View>
            <View className='report-item'>
              <View className='prompt'>1</View>
              <View className='text'>未到</View>
            </View>
          </View>
        </View>

        {/* 设备 */}
        <View className='device'>
          <View className='device-content'>
            <img src={imge1} />
            <Text className='device-title'>设备异常</Text>
          </View>
          <Text>34</Text>
        </View>
        <View className='device'>
          <View className='device-content'>
            <img src={imge2} />
            <Text className='device-title'>监控设备</Text>
          </View>
          <Text>34</Text>
        </View>

        {/* 养殖环境监控 */}
        <View className='environment'>
          <View className='environment-title'>养殖棚环境监控</View>
          <Tabs
            value={tab1value}
            activeType="card"
            onChange={(value) => {
              setTab1value(value)
            }}
            align="left"
          >
            <Tabs.TabPane title="养殖棚1号"> 
            
            </Tabs.TabPane>
            <Tabs.TabPane title="养殖棚2号"> 
            
             </Tabs.TabPane>
          </Tabs>
        </View>
      </View>
    </View>
  );
};

export default Index;
