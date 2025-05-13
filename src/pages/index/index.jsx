// src/pages/index/index.jsx

import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import CustomNavBar from '@/components/CustomNavBar/CustomNavBar';
import './index.less'; // 引入首页的样式文件
import { View, Text, Navigator } from '@tarojs/components';
import { Clock } from '@nutui/icons-react-taro';
import { Tabs } from '@nutui/nutui-react-taro';
import TitleH2 from '@/components/Title2/index';
import { getHomeData, getFarmData, getFarmDetailData } from '@/api/index';

const systemInfo = Taro.getSystemInfoSync();
const statusBarHeight = systemInfo.statusBarHeight;
const customNavHeight = 44; // 自定义导航栏的高度
const totalNavHeight = statusBarHeight + customNavHeight; // 导航栏总高度

const Index = () => {
  // 默认设置为 '0'，或者更安全的做法是 null 或 ''
  const [tab1value, setTab1value] = useState('0');
  const [index, setIndex] = useState({});
  // 初始化 farm 为一个包含 data 数组的空对象，避免 farm.data 访问错误
  const [farm, setFarm] = useState({ data: [] });
  // 初始化 farmContent 为一个包含 data 数组的空对象
  const [farmContent, setFarmContent] = useState({ data: [] });

  useEffect(() => {
    // 获取首页数据
    getHomeData().then(res => {
      console.log('首页数据', res.data);
      setIndex(res.data || {}); // 确保设置的是一个对象
    }).catch(error => {
      console.error('首页数据加载失败', error);
      setIndex({}); // 失败时设置空对象
    });

    // 获取养殖棚数据
    getFarmData().then(res => {
      console.log('养殖棚数据', res);
      // 确保 res 是对象且包含 data 数组
      const farmData = (res && Array.isArray(res.data)) ? res : { data: [] };
      setFarm(farmData);

      // 设置默认 Tab 值
      if (farmData.data.length > 0) {
        setTab1value(farmData.data[0].F_Id); // 默认选中第一个 Tab
      } else {
        setTab1value('0'); // 没有数据时保持默认值或设置为其他指示状态
      }
    }).catch(error => {
      console.error('养殖棚数据加载失败', error);
      setFarm({ data: [] }); // 失败时设置空数据
      setTab1value('0'); // 失败时也重置 tab 值
    });
  }, []);

  useEffect(() => {
    // 获取养殖棚内容数据
    // 只有当 tab1value 有效时才请求数据
    if (tab1value && tab1value !== '0') { // 假设 '0' 是一个无效或初始状态
      getFarmDetailData(tab1value).then(res => {
        console.log('养殖棚内容数据', res.data); // 打印整个 data 数组方便调试
        // 确保 res 是对象且包含 data 数组
        const contentData = (res && Array.isArray(res.data)) ? res : { data: [] };
        setFarmContent(contentData);
      }).catch(error => {
        console.error(`养殖棚内容数据加载失败 (Tab: ${tab1value})`, error);
        setFarmContent({ data: [] }); // 失败时设置空数据
      });
    } else {
         // 如果 tab1value 无效，清空内容数据
         setFarmContent({ data: [] });
    }
  }, [tab1value]); // 依赖 tab1value

  // 获取当前选中的养殖棚的环境数据对象
  // 假设 farmContent.data 数组中只包含一个对象，即当前养殖棚的环境数据
  const currentFarmEnvData = Array.isArray(farmContent.data) && farmContent.data.length > 0
    ? farmContent.data[0]
    : null; // 如果没有数据，则为 null

  return (
    <View className="index-container">
      {/* 背景图片元素 */}
      <View className="index-background"></View>
      {/* 导航栏组件 */}
      <View>
        <CustomNavBar title="首页" number={index.warning_count} className="index-nav-bar" />
      </View>
      <View className="index-content" style={{ marginTop: `10vh` }}>
        {/* 牲畜报道区域 */}
        <View className="index-reports">
          <View className="index-report">
            <View className="index-title">牲畜报道</View>
            <View className="index-time">
              <Clock size={10} /> 00:00~15:30
            </View>
          </View>
          <View className="index-report-list">
            <View className="index-report-item">
              <View className="index-num">{index.allCattle_count || 0}</View> {/* 添加默认值 */}
              <View className="index-text">应到</View>
            </View>
            <View className="index-report-item">
              <View className="index-num">{index.present_cattle_count || 0}</View> {/* 添加默认值 */}
              <View className="index-text">实到</View>
            </View>
            <View className="index-report-item">
              {/* 确保计算结果是数字，避免 NaN */}
              <View className="index-prompt">
                {((index.allCattle_count || 0) - (index.present_cattle_count || 0)) || 0}
              </View>
              <View className="index-text">未到</View>
            </View>
          </View>
        </View>

        {/* 设备区域 */}
        <Navigator className="index-device" url="/homePack/pages/device/index">
          <View className="index-device-content">
            <i className="iconfont icon-jingtanhaogantanhao"></i>
            <Text className="index-device-title">设备异常</Text>
          </View>
          {/* 添加默认值 */}
          <Text>{((index.eartag_count || 0) + (index.offline_count || 0)) || 0}</Text>
        </Navigator>
        <View className="index-device">
          <Navigator className="index-device-content" url="/managePack/pages/videoSurveillance/index">
            <i className="iconfont icon-biaoshi_daolushexiangji_zaixian"></i>
            <Text className="index-device-title">监控设备</Text>
          </Navigator>
          {/* 添加默认值 */}
          <Text>{index.video_count || 0}</Text>
        </View>

        {/* 养殖环境监控区域 */}
        <View className="index-environment">
          <View className="index-environment-title">养殖棚环境监控</View>
          <Tabs
            value={tab1value}
            activeType="card"
            onChange={(value) => setTab1value(value)}
            align="left"
            style={{
              '--nutui-tabs-titles-item-color': '#686868',
              '--nutui-tabs-titles-item-active-color': '#56c695',
            }}
          >
            {/* 外层 map 循环生成 TabPane */}
            {Array.isArray(farm.data) && farm.data.map((item) => (
              <Tabs.TabPane title={item.F_Title} key={item.F_Id} value={item.F_Id}>
                {/* *** 修正结构: 容器 View 放在 map 外部 *** */}
                <View className="index-environment-content">
                  {/* *** 修正渲染: 不再对 farmContent.data 进行 map *** */}
                  {/* 直接根据 currentFarmEnvData 是否存在来渲染卡片内容 */}
                  {currentFarmEnvData ? (
                    <>
                      {/* 卡片1: 空气湿度 */}
                      <View className="index-environment-card">
                        <View className="index-card-left">
                          <Text className="index-card-title">空气湿度</Text>
                          <View className="index-card-body">
                            {/* 直接访问 currentFarmEnvData 的属性 */}
                            <Text className="index-humidity-value">{currentFarmEnvData.F_Humidity || '--'}</Text>
                            <Text className="index-humidity-unit"> %RH</Text>
                          </View>
                          <Text className="index-update-time">{currentFarmEnvData.F_PustTime || '未知时间'}</Text>
                        </View>
                        <View className="index-card-right">
                          <View className="index-indicator-circle"></View>
                        </View>
                      </View>

                      {/* 卡片2: 空气温度 */}
                      <View className="index-environment-card">
                        <View className="index-card-left">
                          <Text className="index-card-title">空气温度</Text>
                          <View className="index-card-body">
                            <Text className="index-humidity-value">{currentFarmEnvData.F_Temp || '--'}</Text>
                            <Text className="index-humidity-unit">°C</Text> {/* 使用正确的温度符号 */}
                          </View>
                          <Text className="index-update-time">{currentFarmEnvData.F_PustTime || '未知时间'}</Text>
                        </View>
                        <View className="index-card-right">
                          <View className="index-indicator-circle"></View>
                        </View>
                      </View>

                      {/* 卡片3: 光照强度 */}
                      <View className="index-environment-card">
                        <View className="index-card-left">
                          <Text className="index-card-title">光照强度</Text>
                          <View className="index-card-body">
                            <Text className="index-humidity-value">{currentFarmEnvData.F_Illumination || '--'}</Text>
                            <Text className="index-humidity-unit"> lux</Text>
                          </View>
                          <Text className="index-update-time">{currentFarmEnvData.F_PustTime || '未知时间'}</Text>
                        </View>
                        <View className="index-card-right">
                          <View className="index-indicator-circle"></View>
                        </View>
                      </View>

                                     {/* 卡片4: 硫化氢 */}
                      <View className="index-environment-card">
                        <View className="index-card-left">
                          <Text className="index-card-title">硫化氢</Text>
                          <View className="index-card-body">
                            <Text className="index-humidity-value">{currentFarmEnvData.F_Pm || '--'}</Text>
                            <Text className="index-humidity-unit"> ppm</Text>
                          </View>
                          {/* 修正：将 currentFarmEnvEnvData 改为 currentFarmEnvData */}
                          <Text className="index-update-time">{currentFarmEnvData.F_PustTime || '未知时间'}</Text>
                        </View>
                        <View className="index-card-right">
                          <View className="index-indicator-circle"></View>
                        </View>
                      </View>


                      {/* 卡片5: 二氧化碳 */}
                      <View className="index-environment-card">
                        <View className="index-card-left">
                          <Text className="index-card-title">二氧化碳</Text>
                          <View className="index-card-body">
                            <Text className="index-humidity-value">{currentFarmEnvData.F_Carbon || '--'}</Text>
                            <Text className="index-humidity-unit"> ppm</Text>
                          </View>
                          <Text className="index-update-time">{currentFarmEnvData.F_PustTime || '未知时间'}</Text>
                        </View>
                        <View className="index-card-right">
                          <View className="index-indicator-circle"></View>
                        </View>
                      </View>

                      {/* 卡片6: 甲烷 */}
                      <View className="index-environment-card">
                        <View className="index-card-left">
                          <Text className="index-card-title">甲烷</Text>
                          <View className="index-card-body">
                            <Text className="index-humidity-value">{currentFarmEnvData.F_Ch || '--'}</Text>
                            <Text className="index-humidity-unit"> %LEL</Text>
                          </View>
                          <Text className="index-update-time">{currentFarmEnvData.F_PustTime || '未知时间'}</Text>
                        </View>
                        <View className="index-card-right">
                          <View className="index-indicator-circle"></View>
                        </View>
                      </View>

                      {/* 卡片7: 氨气 */}
                      <View className="index-environment-card">
                        <View className="index-card-left">
                          <Text className="index-card-title">氨气</Text>
                          <View className="index-card-body">
                            <Text className="index-humidity-value">{currentFarmEnvData.F_Ammonia || '--'}</Text>
                            <Text className="index-humidity-unit"> ppm</Text>
                          </View>
                          <Text className="index-update-time">{currentFarmEnvData.F_PustTime || '未知时间'}</Text>
                        </View>
                        <View className="index-card-right">
                          <View className="index-indicator-circle"></View>
                        </View>
                      </View>
                    </>
                  ) : (
                    // 没有数据时显示提示
                    <Text>暂无环境数据</Text>
                  )}
                </View>
              </Tabs.TabPane>
            ))}
          </Tabs>
        </View>
      </View>
    </View>
  );
};

export default Index;
