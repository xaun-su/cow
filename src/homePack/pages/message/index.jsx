import React, { useEffect, useState } from 'react';
import { View, Text } from '@tarojs/components';
import { ArrowRight } from '@nutui/icons-react-taro'; 
import './index.less'; 
import TitleH5 from '@/components/TitleH5/index';
import { getMessageData } from '@/api/index'; 

const padZero = (num) => {
  return String(num).padStart(2, '0');
};

const formatAlertDate = (isoString) => {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const time = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const alertDateMidnight = new Date(date);
  alertDateMidnight.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  let group;
  if (alertDateMidnight.getTime() === today.getTime()) {
    group = '今天';
  } else if (alertDateMidnight.getTime() === yesterday.getTime()) {
    group = '昨天';
  } else {
    group = `${year}-${padZero(month)}-${padZero(day)}`;
  }

  return { group, time };
};

const AlertList = () => {
  const [alerts, setAlerts] = useState([]); // 存储处理后的告警数据
  const [loading, setLoading] = useState(true); // 添加加载状态

  useEffect(() => {
    // 获取消息数据
    const fetchAlerts = async () => {
      try {
        const res = await getMessageData(); 
        console.log('原始消息数据', res.data);

        const processedAlerts = res.data.map(alert => {
          // 确保 alarmtime 存在且是字符串
          const { group, time } = alert.alarmtime ? formatAlertDate(alert.alarmtime) : { group: '未知日期', time: '未知时间' };
          return {
            ...alert, // 保留原始数据的所有属性
            dateGroup: group, // 添加日期分组属性
            formattedTime: time, // 添加格式化后的时间属性
          };
        });

        setAlerts(processedAlerts); // 更新状态
      } catch (error) {
        console.error('获取消息数据失败', error);
       
      } finally {
        setLoading(false); 
      }
    };

    fetchAlerts(); 
  }, []); 
  // 简单按日期分组
  const groupedAlerts = alerts.reduce((acc, alert) => {
    const dateGroup = alert.dateGroup; // 使用处理后的 dateGroup 属性
    if (!acc[dateGroup]) {
      acc[dateGroup] = [];
    }
    acc[dateGroup].push(alert);
    return acc;
  }, {});

  // 获取并按日期排序分组键
  const sortedDateGroups = Object.keys(groupedAlerts).sort((a, b) => {
      // 特殊处理“今天”和“昨天”，让它们排在前面
      if (a === '今天') return -1;
      if (b === '今天') return 1;
      if (a === '昨天') return -1;
      if (b === '昨天') return 1;

      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateB.getTime() - dateA.getTime(); // 降序
  });


  const handleAlertClick = (alert) => {
    console.log('点击了告警:', alert);
  };

  return (
    <View className='alert-list-page'>
      <View>
        {process.env.TARO_ENV === 'h5' && <TitleH5 title='消息' />}
      </View>

      {/* 加载状态提示 */}
      {loading && <View className='loading-indicator'>加载中...</View>}

      {/* 没有数据时的提示 */}
      {!loading && alerts.length === 0 && (
          <View className='no-data'>暂无告警消息</View>
      )}

      {/* 渲染分组后的告警列表 */}
      {!loading && alerts.length > 0 && sortedDateGroups.map(dateGroup => (
        <View key={dateGroup}>
          {/* 日期分组标题 */}
          <View className='date-group-title'>{dateGroup}</View>

          {/* 告警列表 */}
          <View className='alert-items-container'>
            {/* 使用处理后的 alerts 数组进行渲染 */}
            {groupedAlerts[dateGroup].map(alert => (
              <View
                key={alert.id} // 使用 API 返回的唯一 id 作为 key
                className='alert-item-card' // 卡片样式类
                onClick={() => handleAlertClick(alert)} // 点击事件
              >
                {/* 左侧内容区域 */}
                <View className='alert-content'>
                  {/* 告警标题 (使用 alarmtitle) */}
                  <Text className='alert-title'>{alert.alarmtitle}</Text>
                  {/* 告警时间 (使用格式化后的时间) */}
                  <Text className='alert-detail'>时间: {alert.formattedTime}</Text>
               
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
