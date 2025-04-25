// src/pages/somePage/index.jsx (示例页面)

import React from 'react';
import Taro from '@tarojs/taro'; 
import CustomNavBar from '../../components/CustomNavBar/CustomNavBar'
import Footer from '../../components/Footer'
import './index.less';
import { View } from '@tarojs/components';

// 获取系统信息，用于计算页面内容偏移量
const systemInfo = Taro.getSystemInfoSync();
const statusBarHeight = systemInfo.statusBarHeight; // 状态栏高度
const customNavHeight = 44; // 自定义导航栏的高度
const totalNavHeight = statusBarHeight + customNavHeight; // 导航栏总高度

const SomePage = () => {
  return (
    <View className='page-container'>
    <View>
      
    </View>
      <CustomNavBar title='首页' />
      {/* 内容区域 */}
      <View
        className='page-content'
        style={{
          marginTop: `${totalNavHeight}px`, // 内容区域向下偏移导航栏总高度
        }}
      >
      {/* 底部区域 */}
       <View>
       <Footer/>
       </View>
        
      </View>
    </View>
  );
};

export default SomePage;
