// src/pages/animal-details/components/HealthInfoSection.jsx
import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import { Cell, CircleProgress, Tabs } from '@nutui/nutui-react-taro';
import EchartsZ from '@/components/echarths/index'; // 确保路径正确

const gradientColor = {
  '0%': '#FF5E5E',
  '100%': '#FFA062',
};

const HealthInfoSection = () => {
  const [movementTabIndex, setMovementTabIndex] = useState('0'); // 运动量 Tab 状态
  const [temperatureTabIndex, setTemperatureTabIndex] = useState('0'); // 体温 Tab 状态

  return (
    <> {/* 使用 Fragment 包裹 */}
      <Cell title='活跃度' radius={0} style={
        {
          '--nutui-cell-background-color': '#efefef',
        }
      } />
      <View style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-evenly', padding: '40px 0' }}>
        <View style={{ fontSize: '30px' }}>活跃</View>
        <View style={{ fontSize: '30px' }}>123</View>
      </View>

      <Cell title='健康指标' radius={0} style={
        {
          '--nutui-cell-background-color': '#efefef',
        }
      } />
      <View style={{ display: 'flex', justifyContent: 'space-evenly', padding: '40px 0' }}>
        <CircleProgress percent={50} color="#1988fa">
          50%
        </CircleProgress>
        <CircleProgress percent={100} color={gradientColor}>
          100%
        </CircleProgress>
      </View>

      <Cell title='运动量' radius={0} style={
        {
          '--nutui-cell-background-color': '#efefef',
        }
      } />
      <> {/* 内层 Tab 保持不变 */}
        <Tabs
          value={movementTabIndex}
          onChange={(value) => {
            setMovementTabIndex(value)
          }}
          activeType='none'
          style={{
            '--nutui-tabs-titles-item-color': '#686868',
            '--nutui-tabs-titles-item-active-color': '#56c695',
          }}
        >
          <Tabs.TabPane title="一周内">
            <EchartsZ />
          </Tabs.TabPane>
          <Tabs.TabPane title="一个月内"> <EchartsZ /></Tabs.TabPane>
          <Tabs.TabPane title="一年内"><EchartsZ /> </Tabs.TabPane>
        </Tabs>
      </>

      <Cell title='体温' radius={0} style={
        {
          '--nutui-cell-background-color': '#efefef',
        }
      } />
      <> {/* 内层 Tab 保持不变 */}
        <Tabs
          activeType='none'
          value={temperatureTabIndex}
          onChange={(value) => {
            setTemperatureTabIndex(value)
          }}
          style={{
            '--nutui-tabs-titles-item-color': '#686868',
            '--nutui-tabs-titles-item-active-color': '#56c695 ',
          }}
        >
          <Tabs.TabPane title="一周内">
            <EchartsZ />
          </Tabs.TabPane>
          <Tabs.TabPane title="一个月内"> <EchartsZ /> </Tabs.TabPane>
          <Tabs.TabPane title="一年内"> <EchartsZ /> </Tabs.TabPane>
        </Tabs>
      </>
    </>
  );
};

export default HealthInfoSection;
