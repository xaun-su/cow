// src/pages/index/index.jsx

import React, { useState } from 'react';
import Taro from '@tarojs/taro';
import CustomNavBar from '@/components/CustomNavBar/CustomNavBar';
import './index.less'; // 引入首页的样式文件
import { View, Text, Navigator } from '@tarojs/components';
import { Clock } from '@nutui/icons-react-taro'
import { Tabs } from '@nutui/nutui-react-taro'
import TitleH2 from '@/components/Title2/index';

const systemInfo = Taro.getSystemInfoSync();
const statusBarHeight = systemInfo.statusBarHeight;
const customNavHeight = 44; // 自定义导航栏的高度
const totalNavHeight = statusBarHeight + customNavHeight; // 导航栏总高度


const Index = () => {
  const [tab1value, setTab1value] = useState('0')
  return (
    <View className='index-container'> {/* 容器 */}

      {/* 背景图片元素 */}
      <View className='index-background'></View>
      {/* 导航栏组件，确保它在背景元素的上方 */}
      <View>
        <CustomNavBar title='首页' className='index-nav-bar' />
        {/* {process.env.TARO_ENV === 'h5' && <TitleH2 title='首页' />} */}
      </View>
      <View
        className='index-content'
        style={{
          marginTop: `10vh`,
        }}
      >
        {/* 牲畜报道区域 */}
        <View className='index-reports'>
          <View className='index-report'>
            <View className='index-title'> 牲畜报道</View>
            <View className='index-time'><Clock size={10} /> 00:00~15:30</View>
          </View>

          <View className='index-report-list'>
            <View className='index-report-item'>
              <View className='index-num'>62</View>
              <View className='index-text'>应到</View>
            </View>
            <View className='index-report-item'>
              <View className='index-num'>61</View>
              <View className='index-text'>一到</View>
            </View>
            <View className='index-report-item'>
              <View className='index-prompt'>1</View>
              <View className='index-text'>未到</View>
            </View>
          </View>
        </View>

        {/* 设备区域 */}
        <Navigator className='index-device' url='/homePack/pages/device/index'>
          <View className='index-device-content'>
            <i className='iconfont icon-jingtanhaogantanhao'></i>
            <Text className='index-device-title'>设备异常</Text>
          </View>
          <Text>34</Text>
        </Navigator>
        <View className='index-device'>
          <Navigator className='index-device-content' url='/managePack/pages/videoSurveillance/index'>
            {/* iconfont 是全局类名，不加前缀 */}
            <i className='iconfont icon-biaoshi_daolushexiangji_zaixian'></i>
            <Text className='index-device-title'>监控设备</Text>
          </Navigator>
          <Text>34</Text>
        </View>

        {/* 养殖环境监控区域 */}
        <View className='index-environment'>
          <View className='index-environment-title'>养殖棚环境监控</View>
          {/* NutUI Tabs 组件 */}
          <Tabs
            value={tab1value}
            activeType="card"
            onChange={(value) => {
              setTab1value(value)
            }}
            align="left"
            // autoHeight={true} // 注释掉不使用的属性
            // activeColor="#4CAF50" // <-- 设置选中 Tab 的颜色为绿色
            style={{
              '--nutui-tabs-titles-item-color': '#686868',
              '--nutui-tabs-titles-item-active-color': '#56c695',
            }}
          >
            {/* NutUI Tabs.TabPane 组件 */}
            <Tabs.TabPane title="养殖棚1号" >
              <View className='index-environment-content'>
                <View className='index-environment-card'>
                  <View className='index-card-left'>
                    <Text className='index-card-title'>空气湿度</Text>
                    <View className='index-card-body'>
                      <Text className='index-humidity-value'>99.2</Text>
                      <Text className='index-humidity-unit'>%RH</Text>
                    </View>
                    <Text className='index-update-time'>2024-01-18 15:00</Text>
                  </View>
                  <View className='index-card-right'>
                    <View className='index-indicator-circle'></View>
                  </View>
                </View>
                <View className='index-environment-card'>
                  <View className='index-card-left'>
                    <Text className='index-card-title'>空气湿度</Text>
                    <View className='index-card-body'>
                      <Text className='index-humidity-value'>99.2</Text>
                      <Text className='index-humidity-unit'>%RH</Text>
                    </View>
                    <Text className='index-update-time'>2024-01-18 15:00</Text>
                  </View>
                  <View className='index-card-right'>
                    <View className='index-indicator-circle'></View>
                  </View>
                </View>
              </View>
            </Tabs.TabPane>
            {/* NutUI Tabs.TabPane 组件 */}
            <Tabs.TabPane title="养殖棚2号">
              <View className='index-environment-content'>
                <View className='index-environment-card'>
                  <View className='index-card-left'>
                    <Text className='index-card-title'>空气湿度</Text>
                    <View className='index-card-body'>
                      <Text className='index-humidity-value'>99.2</Text>
                      <Text className='index-humidity-unit'>%RH</Text>
                    </View>
                    <Text className='index-update-time'>2024-01-18 15:00</Text>
                  </View>
                  <View className='index-card-right'>
                    <View className='index-indicator-circle'></View>
                  </View>
                </View>
                <View className='index-environment-card'>
                  <View className='index-card-left'>
                    <Text className='index-card-title'>空气湿度</Text>
                    <View className='index-card-body'>
                      <Text className='index-humidity-value'>99.2</Text>
                      <Text className='index-humidity-unit'>%RH</Text>
                    </View>
                    <Text className='index-update-time'>2024-01-18 15:00</Text>
                  </View>
                  <View className='index-card-right'>
                    <View className='index-indicator-circle'></View>
                  </View>
                </View>
              </View>
            </Tabs.TabPane>
          </Tabs>
        </View>
      </View>
    </View>
  );
};

export default Index;
