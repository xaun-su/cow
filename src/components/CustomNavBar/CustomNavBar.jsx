// src/components/CustomNavBar/index.jsx

import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { ArrowLeft } from '@nutui/icons-react-taro'
import './index.less'; 
import { View,Text } from '@tarojs/components';

// 获取系统信息，用于计算状态栏高度和导航栏总高度
const systemInfo = Taro.getSystemInfoSync();
const statusBarHeight = systemInfo.statusBarHeight; // 状态栏高度
const customNavHeight = 44; // 自定义导航栏的高度，通常是 44px

const CustomNavBar = (props) => {
  const { title = '页面标题' } = props; // 接收标题作为 props，并设置默认值
  const [showBackButton, setShowBackButton] = useState(false);

  useEffect(() => {
    // 判断当前页面栈的长度
    const pages = Taro.getCurrentPages();
    // 如果页面栈长度大于 1，说明不是第一个页面，可以显示返回按钮
    // 注意：首页通常是页面栈的第一个页面，不应该有返回按钮
    if (pages.length > 1) {
      setShowBackButton(true);
    } else {
      setShowBackButton(false);
    }
  }, []);

  const handleBack = () => {
    Taro.navigateBack();
  };

  // 计算导航栏的总高度
  const totalNavHeight = statusBarHeight + customNavHeight;

  return (
    <View
      className='custom-navbar'
      style={{
        paddingTop: `${statusBarHeight}px`, // 顶部填充状态栏高度
        height: `${totalNavHeight}px`, // 导航栏总高度 = 状态栏高度 + 自定义高度
      }}
    >
      {/* 返回按钮区域，只有当 showBackButton 为 true 时才渲染 */}
      {showBackButton && (
        <View className='back-button' onClick={handleBack}>
        <ArrowLeft />
        </View>
      )}

      {/* 导航栏标题 */}
      <View className='navbar-title'>
        <Text>{title}</Text>
      </View>

      {/* 右侧占位或其他按钮（如果需要） */}
      <View className='right-placeholder'></View>
    </View>
    
  );
};

export default CustomNavBar;
