// src/pages/animal-details/components/BasicInfoSection.jsx
import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Cell, CellGroup } from '@nutui/nutui-react-taro';
// 假设 iconfont 已经在全局样式中引入

const BasicInfoSection = () => {
  // 渲染电池和 IMEI 的函数或组件
  const renderBatteryInfo = (percentage, imei) => {
    const batteryColor = percentage > 20 ? '#0bcb75' : '#ff4d4f'; // 绿色或红色
    const batteryIcon = (
      <Text
        className='iconfont icon-electricity-full' // iconfont 的基础类和你的电池图标类
        style={{
          color: batteryColor, // 根据百分比动态设置颜色
          fontSize: '16px', // 设置图标大小，根据需要调整
          verticalAlign: 'middle', // 垂直居中对齐
          marginRight: '5px' // 图标和 IMEI 之间的间距
        }}
      ></Text>
    )
    return (
      <View className='battery-info'> {/* 添加一个容器方便布局 */}
        <Text style={{ color: batteryColor, fontSize: '12px', marginRight: '5px' }}>{percentage}%</Text> {/* 百分比和图标之间的间距 */}
        {batteryIcon}
        <Text style={{ color: '#a0a0a0', fontSize: '12px' }}>{imei}</Text>
      </View>
    );
  };

  return (
    <> {/* 使用 Fragment 包裹，因为外部的 Swiper.Item 已经提供了 View */}
      <Cell
        title='牲畜编号'
        extra={<Text style={{ color: "#fe5520" }}>偏瘦</Text>} // 右侧内容
        isLink // 添加箭头
        radius={0} // Cell 本身不带圆角
      />
      {/* 设备信息分组 */}
      <CellGroup title=' 设备信息' radius={0} style={
        {
          backgroundColor: '#efefef',
        }
      }>
        <Cell
          title='智能耳标'
          extra={renderBatteryInfo(80, 'IMEI 123456789')} // 自定义右侧内容
          radius={0}
        />
        <Cell
          title='智能项圈'
          extra={renderBatteryInfo(1, 'IMEI 123456789')} // 自定义右侧内容
          radius={0}
        />
      </CellGroup>

      {/* 牲畜信息分组 */}
      <CellGroup title=' 牲畜信息' radius={0} style={
        {
          backgroundColor: '#efefef',
        }
      }>
        <Cell title='牲畜种类' extra='牛' radius={0} />
        <Cell title='品种' extra='小黄牛' radius={0} />
        <Cell title='性别' extra='公' radius={0} />
        <Cell title='出生日期(打标)' extra='2021-1-24' radius={0} />
        <Cell title='出生地' extra='兰蓝牛场' radius={0} />
        <Cell title='年龄' extra='5岁两个月' radius={0} />
        <Cell title='当前体重' extra='900KG' radius={0} />
        <Cell title='当前状态' extra='生长中' radius={0} />
        <Cell title='是否繁殖' extra='900KG' radius={0} />
        <Cell title='是否绝育' extra='生长中' radius={0} />
      </CellGroup>
    </>
  );
};

export default BasicInfoSection;
