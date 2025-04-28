// src/pages/index/index.jsx

import React, { useState } from 'react';
import Taro from '@tarojs/taro';
import CustomNavBar from '../../components/CustomNavBar/CustomNavBar';
import './index.less'; // 引入首页的样式文件
import { View, Text, Image, Navigator } from '@tarojs/components';
import { Clock } from '@nutui/icons-react-taro'
import { Tabs ,Badge} from '@nutui/nutui-react-taro'
import imge1 from '../../static/images/惊叹号、感叹号.png'
import imge2 from '../../static/images/标示_道路摄像机_在线.png'

// ... 获取系统信息计算导航栏高度的代码 ...
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
      <CustomNavBar title='首页' className='index-nav-bar' />
      {/* 内容区域 */}
      <Navigator className='bell' url='/pages/message/index' >
          <Badge value={8}>
            <i className='iconfont icon-lingdang'></i>
          </Badge>
        </Navigator>
      <View
        className='index-content'
        style={{
          marginTop: `10vh`,
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
     
        <Navigator className='device' url='/pages/device/index'>
          <View className='device-content'>
            <i className='iconfont icon-jingtanhaogantanhao'></i>
            <Text className='device-title'>设备异常</Text>
          </View>
          <Text>34</Text>
        </Navigator>
        <View className='device'>
          <View className='device-content'>
            <i className='iconfont icon-biaoshi_daolushexiangji_zaixian'></i>
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
            // autoHeight={true}
            activeColor="#4CAF50" // <-- 设置选中 Tab 的颜色为绿色
          >
            <Tabs.TabPane title="养殖棚1号" >

              <View className='environment-content'>
                <View className='environment-card'>
                  <View className='card-left'>
                    <Text className='card-title'>空气湿度</Text>
                    <View className='card-body'>
                      <Text className='humidity-value'>99.2</Text>
                      <Text className='humidity-unit'>%RH</Text>
                    </View>
                    <Text className='update-time'>2024-01-18 15:00</Text>
                  </View>
                  <View className='card-right'>
                    <View className='indicator-circle'></View>
                  </View>
                </View>
                <View className='environment-card'>
                  <View className='card-left'>
                    <Text className='card-title'>空气湿度</Text>
                    <View className='card-body'>
                      <Text className='humidity-value'>99.2</Text>
                      <Text className='humidity-unit'>%RH</Text>
                    </View>
                    <Text className='update-time'>2024-01-18 15:00</Text>
                  </View>
                  <View className='card-right'>
                    <View className='indicator-circle'></View>
                  </View>
                </View>
              </View>
            </Tabs.TabPane>
            <Tabs.TabPane title="养殖棚2号">
              <View className='environment-content'>
                <View className='environment-card'>
                  <View className='card-left'>
                    <Text className='card-title'>空气湿度</Text>
                    <View className='card-body'>
                      <Text className='humidity-value'>99.2</Text>
                      <Text className='humidity-unit'>%RH</Text>
                    </View>
                    <Text className='update-time'>2024-01-18 15:00</Text>
                  </View>
                  <View className='card-right'>
                    <View className='indicator-circle'></View>
                  </View>
                </View>                <View className='environment-card'>
                  <View className='card-left'>
                    <Text className='card-title'>空气湿度</Text>
                    <View className='card-body'>
                      <Text className='humidity-value'>99.2</Text>
                      <Text className='humidity-unit'>%RH</Text>
                    </View>
                    <Text className='update-time'>2024-01-18 15:00</Text>
                  </View>
                  <View className='card-right'>
                    <View className='indicator-circle'></View>
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
