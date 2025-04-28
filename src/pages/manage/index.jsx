// src/pages/index/index.jsx

import React, { useState } from 'react';
import Taro from '@tarojs/taro';
import CustomNavBar from '../../components/CustomNavBar/CustomNavBar';
import './index.less'; // 引入首页的样式文件
import { View, Text, Image, Navigator } from '@tarojs/components'; // 导入 Image 组件
import { Add, ArrowRight, User } from '@nutui/icons-react-taro'
import { Avatar } from '@nutui/nutui-react-taro'

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
        <View className='category'>
          <View className='category-item'> {/* 将 className 和 key 放在同一层 View */}
            {/* 左侧：头像和文本 */}
            <View className='item-left'> {/* 包裹头像和文本的容器，水平 flex */}
              {/* 确保导入了 User 图标 */}
              <Avatar icon=<Add /> size="50" color="#fff"
                background="#0bcb77" className='normal' /> {/* 头像 */}
              <View className='item-text'> {/* 包裹文本的容器，垂直 flex */}
                <Text className='item-title'>牲畜编号</Text> {/* 标题文本 */}
                <Text className='item-imei'>IMEI: 1234567890</Text> {/* IMEI 文本 */}
              </View>
            </View>
              
            {/* 右侧：箭头 */}
            <Navigator className='item-right' url='/pages/basicInformation/index'> {/* 包裹箭头的容器 */}
              <ArrowRight /> {/* 箭头图标 */}
            </Navigator>
          </View>
        </View>
        {/* 牲畜报道 */}
        <View className='reports'>

          <View className='report-list'>
            <View className='report-item'>
              <View className='num'>62</View>
              <View className='text'>社畜数量</View>
            </View>
            <View className='report-item'>
              <View className='num'>61</View>
              <View className='text'>健康数量</View>
            </View>
            <View className='report-item'>
              <View className='prompt'>1</View>
              <View className='text'>异常数量</View>
            </View>
          </View>
        </View>


        {/* 图标区域 */}
        <View className='icon-container'>
          {/* {Array.from({ length: 8 }, (_, i) => ( */}
          <View className='icon-item'>
            <Avatar icon={<User />} color="#fff" background="#0bcb77" shape="round" size="50" />
            <Text className='text'>牲畜信息</Text>
          </View>
          <View className='icon-item'>
            <Avatar icon={<User />} color="#fff" background="#0bcb77" shape="round" size="50" />
            <Text className='text'>检疫管理</Text>
          </View>
          <View className='icon-item'>
            <Avatar icon={<User />} color="#fff" background="#0bcb77" shape="round" size="50" />
            <Text className='text'>疫苗管理</Text>
          </View>
          <View className='icon-item'>
            <Avatar icon={<User />} color="#fff" background="#0bcb77" shape="round" size="50" />
            <Text className='text'>配种管理</Text>
          </View>
          <View className='icon-item'>
            <Avatar icon={<User />} color="#fff" background="#0bcb77" shape="round" size="50" />
            <Text className='text'>繁殖管理</Text>

          </View>
          <View className='icon-item'>
            <Avatar icon={<User />} color="#fff" background="#0bcb77" shape="round" size="50" />
            <Text className='text'>牧场信息</Text>

          </View>
          <View className='icon-item'>
            <Avatar icon={<User />} color="#fff" background="#0bcb77" shape="round" size="50" />
            <Text className='text'>视频监控</Text>

          </View>
          <View className='icon-item'>
            <Avatar icon={<User />} color="#fff" background="#0bcb77" shape="round" size="50" />
            <Text className='text'>报警记录</Text>

          </View>
          {/* ))} */}
        </View>
      </View>
    </View>
  );
};

export default Index;
