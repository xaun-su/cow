import React, { useEffect, useState } from 'react';
import { View, Text } from '@tarojs/components';
import { ArrowRight } from '@nutui/icons-react-taro'; // 导入箭头图标
import './index.less'; // 引入样式文件
import TitleH5 from '@/components/TitleH5/index';
import { getMessageData } from '@/api/index'; // 假设这是你的 API 调用函数

// Helper function to pad single digits with a leading zero
const padZero = (num) => {
  return String(num).padStart(2, '0');
};

// Helper function to format date for grouping and display without dayjs
const formatAlertDate = (isoString) => {
  const date = new Date(isoString);

  // Get date components
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() is 0-indexed
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Format time as HH:mm:ss
  const time = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;

  // Determine date group ("今天", "昨天", or "YYYY-MM-DD")
  const today = new Date();
  // Set time to midnight for accurate date comparison
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
    // Format as YYYY-MM-DD for older dates
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
        const res = await getMessageData(); // 假设这是你的 API 调用函数
        console.log('原始消息数据', res.data);

        // 处理 API 返回的数据，添加 dateGroup 和 formattedTime 属性
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
        // 可以在这里处理错误，例如显示错误消息给用户
      } finally {
        setLoading(false); // 无论成功或失败，都结束加载
      }
    };

    fetchAlerts(); // 调用获取数据的函数
  }, []); // 空依赖数组，只在组件挂载时执行一次

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

      // 对于其他日期 (YYYY-MM-DD 格式)，按日期字符串降序排序
      // 可以直接比较字符串，或者转换为 Date 对象再比较时间戳
      // 直接比较字符串 YYYY-MM-DD 降序是 b.localeCompare(a) 或 b > a ? -1 : (b < a ? 1 : 0)
      // 转换为时间戳比较更精确
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateB.getTime() - dateA.getTime(); // 降序
  });


  const handleAlertClick = (alert) => {
    console.log('点击了告警:', alert);
    // 在这里实现点击告警项后的逻辑，例如跳转到详情页
    // 可以使用 Taro.navigateTo 或其他路由方法
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
                  {/* 如果需要，可以显示其他详细信息 */}
                  {/* <Text className='alert-detail'>类型: {alert.alarmtype}</Text> */}
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
