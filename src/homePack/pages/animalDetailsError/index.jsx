// src/pages/animal-details/index.jsx
import React, { useState } from 'react';
import { View, Text, Image,Navigator } from '@tarojs/components';
import './index.less'; // 引入样式文件
import imge from '@/static/images/animal.png';
import { Cell, ConfigProvider, CellGroup } from '@nutui/nutui-react-taro';

const AnimalDetails = () => {

  // 定义一个自定义主题变量对象，用于覆盖 NutUI 的默认样式变量
  const customTheme = {
    // 将 Cell.Group 的外边距设置为 0
    '--nutui-cell-group-wrap-margin': '0',
    '--nutui-cell-group-wrap-padding': '0',
    '--nutui-button-border-radius':'0'
  };
  const marginStyle = {width: '100%'}
  // 渲染电池和 IMEI 的函数或组件
  const renderBatteryInfo = (percentage, imei) => {
    // 根据百分比选择电池图标颜色
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
    );

    return (
      <View className='battery-info'> {/* 添加一个容器方便布局 */}
        <Text style={{ color: batteryColor,  fontSize: '12px', marginRight: '5px' }}>{percentage}%</Text> {/* 百分比和图标之间的间距 */}
        {batteryIcon}
        <Text style={{ color: '#a0a0a0', fontSize: '12px' }}>{imei}</Text>
      </View>
    );
  };

  console.log('image path:', imge); // 打印图片路径

  return (
    <View className='animal-detail'>
      <View className='animal-detail-header'>
        <Image src={imge} className='animal-detail-header-image' mode='aspectFill' /> {/* 添加 mode='aspectFill' */}
      </View>
      <View className='animal-detail-content'>
        {/* 使用 ConfigProvider 包裹需要应用自定义主题的组件 */}
        <ConfigProvider themeVars={customTheme}>
            <Cell
              title="牲畜编号"
              extra=<Text style={{color:"#fe5520"}}>偏瘦</Text> // 右侧内容
              isLink // 添加箭头
              radius={0} // Cell 本身不带圆角
            />
          {/* 设备信息分组 */}
          <CellGroup title="设备信息" radius={0}  >
            <Cell
              title="智能耳标"
              extra={renderBatteryInfo(80, 'IMEI 123456789')} // 自定义右侧内容
              radius={0}
              isLink // 添加 isLink
            />
            <Cell
              title="智能项圈"
              extra={renderBatteryInfo(1, 'IMEI 123456789')} // 自定义右侧内容
              radius={0}
              isLink // 添加 isLink
            />
          </CellGroup>

          {/* 牲畜信息分组 */}
          <CellGroup title="牲畜信息" radius={0}>
            <Cell title="牲畜种类" extra="牛" radius={0} isLink /> {/* 添加 isLink */}
            <Cell title="品种" extra="小黄牛" radius={0} isLink /> {/* 添加 isLink */}
            <Cell title="性别" extra="公" radius={0} isLink /> {/* 添加 isLink */}
            <Cell title="年龄" extra="5岁两个月" radius={0} isLink /> {/* 添加 isLink */}
            <Cell title="当前体重" extra="900KG" radius={0} isLink /> {/* 添加 isLink */}
            <Cell title="当前状态" extra="生长中" radius={0} isLink /> {/* 添加 isLink */}
            <Cell title="是否绝育" extra="否" radius={0} isLink /> {/* 添加 isLink */}
            <Cell title="疫苗" extra="2022-22-22 22:22" radius={0} isLink /> {/* 添加 isLink */}
          </CellGroup>
           {/* 溯源信息按钮 - 使用 Navigator 包裹 Button */}
           <Navigator url='/pages/traceability/index' className='traceability-button-container'>
              <button type='primary' size='large' className='traceability-button'>前往追踪</button>
           </Navigator>
        </ConfigProvider>
      </View>
    </View>
  );
};

export default AnimalDetails;
