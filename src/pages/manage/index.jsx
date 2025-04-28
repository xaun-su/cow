// src/pages/index/index.jsx

import React, { useState } from 'react';
import Taro from '@tarojs/taro';
import CustomNavBar from '../../components/CustomNavBar/CustomNavBar';
import './index.less'; // 引入首页的样式文件
import { View, Text, Image , Navigator} from '@tarojs/components'; // 导入 Image 组件
import Person from '../../components/Person/index';

// ... 获取系统信息计算导航栏高度的代码 ...
const systemInfo = Taro.getSystemInfoSync();
const statusBarHeight = systemInfo.statusBarHeight; // 状态栏高度
const customNavHeight = 44; // 自定义导航栏的高度
const totalNavHeight = statusBarHeight + customNavHeight; // 导航栏总高度


const Index = () => {
  return (
    <View className='index-container'> {/* 容器 */}

      {/* 背景图片元素 */}
      <View className='index-background'></View>
      {/* 导航栏组件，确保它在背景元素的上方 */}
      <CustomNavBar title='管理' className='index-nav-bar' />


      {/* 内容区域 */}
      <View
        className='index-content'
        style={{
          marginTop: `10vh`,
        }}
      >
      <Person/>
        {/* 牲畜报道 */}
        <View className='reports'>
          
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
      </View>
    </View>
  );
};

export default Index;
