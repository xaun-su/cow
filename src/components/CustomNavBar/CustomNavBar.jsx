// src/components/CustomNavBar/index.jsx

import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import './index.less';
import { View, Text, Navigator } from '@tarojs/components';
import { Badge } from '@nutui/nutui-react-taro'

// 获取系统信息，用于计算状态栏高度
const systemInfo = Taro.getSystemInfoSync();
const statusBarHeight = systemInfo.statusBarHeight; // 状态栏高度

// 注意：customNavHeight 和 totalNavHeight 不再用于计算总高度，因为我们使用 vh 单位

const CustomNavBar = (props) => {
  const { title = '页面标题' } = props; // 接收标题作为 props，并设置默认值
  const {number=0} = props; // 接收标题作为 props，并设置默认值
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

  // 导航栏的总高度将设置为 8vh，其中包含状态栏的 paddingTop

  return (
    <View
      className='custom-navbar'
      style={{
        paddingTop: `${statusBarHeight}px`, // 顶部填充状态栏高度
        height: '10vh', // 导航栏总高度设置为视口高度的 8%
        boxSizing: 'border-box', // 确保 padding 包含在 height 内，使总高度精确为 8vh
      }}
    >
      {/* 返回按钮区域，只有当 showBackButton 为 true 时才渲染 */}
      {showBackButton || (
        <Navigator className='index-bell' url='/homePack/pages/message/index' style={ { marginRight: 16 }} >
          <Badge value={number}>
            {/* iconfont 是全局类名，不加前缀 */}
            <i className='iconfont icon-lingdang'></i>
          </Badge>
        </Navigator>
      )}


      {/* 导航栏标题 */}
      <View className='navbar-title'>
        <Text>{title}</Text>
      </View>
      <View className='right-placeholder'></View>
    </View>
  );
};

export default CustomNavBar;
