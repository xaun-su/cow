// src/pages/animal-details/index.jsx
import React, { useState } from 'react';
import { View, Text, Image,Navigator } from '@tarojs/components';
import './index.less'; // 引入样式文件
import imge from '../../static/images/animal.png';
// 导入需要的 NutUI 组件，包括 ConfigProvider, Cell, CellGroup, 以及图标
import { Button, Cell, ConfigProvider, CellGroup } from '@nutui/nutui-react-taro';
// 导入 NutUI 图标，例如 Battery
import { Add } from '@nutui/icons-react-taro'; // 导入电池图标

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
    // 根据百分比选择电池图标（这里简化，只用一个图标，实际可以根据值选择不同状态的图标）
    const batteryColor = percentage > 20 ? '#0bcb75' : '#ff4d4f'; // 绿色或红色
    const batteryIcon = <Add size={16} color={batteryColor} style={{ verticalAlign: 'middle' }} />; // 添加样式调整位置

    return (
      <View className='battery-info'> {/* 添加一个容器方便布局 */}
        <Text style={{ color: batteryColor,  fontSize: '12px' }}>{percentage}%</Text>
        {batteryIcon}
        <Text style={{ color: '#a0a0a0', fontSize: '12px' }}>{imei}</Text>
      </View>
    );
  };

  console.log('image path:', imge); // 打印图片路径

  return (
    <View className='animal-detail'>
      <View className='animal-detail-header'>
        <Image src={imge} className='animal-detail-header-image' />
      </View>
      <View className='animal-detail-content'>
        {/* 使用 ConfigProvider 包裹需要应用自定义主题的组件 */}
        <ConfigProvider themeVars={customTheme}>
            <Cell
              title="牲畜编号"
              extra="偏瘦" // 右侧内容
              isLink // 添加箭头
              radius={0} // Cell 本身不带圆角
            />
          {/* 设备信息分组 */}
          <CellGroup title="设备信息" radius={0} >
            <Cell
              title="智能耳标"
              extra={renderBatteryInfo(80, 'IMEI 123456789')} // 自定义右侧内容
              radius={0}
            />
            <Cell
              title="智能项圈"
              extra={renderBatteryInfo(1, 'IMEI 123456789')} // 自定义右侧内容
              radius={0}
            />
          </CellGroup>

          {/* 牲畜信息分组 */}
          <CellGroup title="牲畜信息" radius={0}>
            <Cell title="牲畜种类" extra="牛" radius={0} />
            <Cell title="品种" extra="小黄牛" radius={0} />
            <Cell title="性别" extra="公" radius={0} />
            <Cell title="年龄" extra="5岁两个月" radius={0} />
            <Cell title="当前体重" extra="900KG" radius={0} />
            <Cell title="当前状态" extra="生长中" radius={0} />
            <Cell title="是否绝育" extra="否" radius={0} />
            <Cell title="疫苗" extra="2022-22-22 22:22" radius={0} />
          </CellGroup>
           <Navigator className='btn' url='/pages/traceability/index'>前往追踪</Navigator>
        </ConfigProvider>
      </View>
    </View>
  );
};

export default AnimalDetails;
