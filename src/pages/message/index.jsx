import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import { ArrowRight } from '@nutui/icons-react-taro'; // 导入箭头图标
import './index.less'; // 引入样式文件

const AlertList = () => {
  // 模拟告警数据，结构更贴近图片展示
  const [alerts, setAlerts] = useState([
    { id: 1, dateGroup: '今天', type: '活跃度降低', livestockLabel: '牲畜编号', livestockValue: '866452264124', imeiLabel: 'IMEI', imeiValue: '866452264124' },
    { id: 2, dateGroup: '今天', type: '设备异常', livestockLabel: '牲畜编号', livestockValue: '866452264124', imeiLabel: 'IMEI', imeiValue: '866452264124' },
    { id: 3, dateGroup: '今天', type: '设备异常', livestockLabel: '牲畜编号', livestockValue: '866452264124', imeiLabel: 'IMEI', imeiValue: '866452264124' },
    // ... 更多数据，如果需要不同日期，可以在这里添加
  ]);

  // 简单按日期分组（如果数据中有不同日期，需要此步骤）
  const groupedAlerts = alerts.reduce((acc, alert) => {
    if (!acc[alert.dateGroup]) {
      acc[alert.dateGroup] = [];
    }
    acc[alert.dateGroup].push(alert);
    return acc;
  }, {});

  const handleAlertClick = (alert) => {
    console.log('点击了告警:', alert);
    // 在实际应用中，可以通过 Taro.navigateTo 实现跳转到详情页
    // Taro.navigateTo({ url: `/pages/alert-detail/index?id=${alert.id}` });
  };

  return (
    <View className='alert-list-page'>
      {Object.keys(groupedAlerts).map(dateGroup => (
        <View key={dateGroup}>
          {/* 日期分组标题 */}
          <View className='date-group-title'>{dateGroup}</View>

          {/* 告警列表 */}
          <View className='alert-items-container'>
            {groupedAlerts[dateGroup].map(alert => (
              <View
                key={alert.id}
                className='alert-item-card' // 卡片样式类
                onClick={() => handleAlertClick(alert)} // 点击事件
              >
                {/* 左侧内容区域 */}
                <View className='alert-content'>
                  {/* 告警类型 (红色) */}
                  <Text className='alert-title'>{alert.type}</Text>
                  {/* 牲畜编号 (灰色) */}
                  <Text className='alert-detail'>{alert.livestockLabel}</Text>
                  {/* IMEI (灰色) */}
                  <Text className='alert-detail'>{alert.imeiLabel}: {alert.imeiValue}</Text>
                </View>

                {/* 右侧箭头 */}
                <View className='arrow-container'>
                  <ArrowRight size={16} color='#999' /> {/* 使用 NutUI 的箭头图标 */}
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default AlertList;
