import React, { useEffect, useState, useRef, Component } from 'react';
import { View, Canvas } from '@tarojs/components';
import './index.less';
import Taro from '@tarojs/taro';
import { NavBar, harmony } from '@nutui/nutui-react-taro';
import { ArrowLeft } from '@nutui/icons-react-taro';
import { Avatar, Cell, CircleProgress, Tabs } from '@nutui/nutui-react-taro';

import '../../assets/fonts/iconfont.css'
import uCharts from './uCharts'

let uChartsInstance = {};
function Index() {
  const [tabvalue, setTabvalue] = useState('0');
  const [chartState, setChartState] = useState({
    cWidth: 750,
    cHeight: 500,
    pixelRatio: 1,
  });

  useEffect(() => {
    const sysInfo = Taro.getSystemInfoSync();
    let pixelRatio = 1;
    // 这里的第一个 750 对应 css .charts 的 width
    let cWidth = 750 / 750 * sysInfo.windowWidth;
    // 这里的 500 对应 css .charts 的 height
    let cHeight = 395 / 750 * sysInfo.windowWidth;

    setChartState({ cWidth, cHeight, pixelRatio });
    getServerData();
  }, []);


  const getServerData = () => {
    // 模拟从服务器获取数据时的延时
    setTimeout(() => {
      // 模拟服务器返回数据
      let res = {
        categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
        series: [
          {
            name: "成交量A",
            data: [35, 8, 25, 37, 4, 20]
          },
          {
            name: "成交量B",
            data: [70, 40, 65, 100, 44, 68]
          },
          {
            name: "成交量C",
            data: [100, 80, 95, 150, 112, 132]
          }
        ]
      };
      drawCharts('ewzrjYiHyWixZINiVtwIGDiiqoKXbCVW', res);
    }, 500);
  };

  const drawCharts = (id, data) => {
    const { cWidth, cHeight, pixelRatio } = chartState;
    let ctx = Taro.createCanvasContext(id);

    uChartsInstance[id] = new uCharts({
      type: "line",
      context: ctx,
      width: cWidth,
      height: cHeight,
      categories: data.categories,
      series: data.series,
      pixelRatio: pixelRatio,
      animation: true,
      background: "#FFFFFF",
      color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
      padding: [15, 10, 0, 15],
      enableScroll: false,
      legend: {},
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        gridType: "dash",
        dashLength: 2
      },
      extra: {
        line: {
          type: "straight",
          width: 2,
          activeType: "hollow"
        }
      }
    });
  };

  const tap = (e) => {
    if (uChartsInstance[e.target.id]) {
      uChartsInstance[e.target.id].touchLegend(e);
      uChartsInstance[e.target.id].showToolTip(e);
    }
  };

  const backFn = () => {
    Taro.navigateBack();
  };

  return (
    <View className='health'>
      {/* <View className='header'>
        <NavBar
          color='#fff'
          className='black'
          title="健康信息"
          back={
            <>
              <ArrowLeft color='#fff' style={harmony() ? { marginRight: 16 } : {}} />
            </>
          }
          onBackClick={backFn}
        />
        <View className='headerImg'>
          <Avatar
            size="100"
            color="#ffffff"
            style={{ marginRight: 30 }}
          />
          <View className='text'>畜牧编号</View>
        </View>
      </View> */}

      <View className='content'>
        <View className='text'>活跃度</View>
        <Cell className='huo'>
          <View className='huoText'>活跃</View>
          <View className='iconfont icon-jiangpai1 jiangIcon'></View>
        </Cell>
        <View className='text'>健康指标</View>
        <Cell className='zhibian'>
          <CircleProgress color="#00c657" style={{ marginTop: '40rpx' }} percent={50} radius={90}>
            <View style={{ fontSize: '12px', color: 'var(--nutui-black-10)' }}>今日运动量</View>
            <View style={{ fontSize: '25px', color: 'var(--nutui-black-10)' }}>
              67844
            </View>
          </CircleProgress>
          <CircleProgress color="#00c657" style={{ marginTop: '40rpx' }} percent={50} radius={90}>
            <View style={{ fontSize: '12px', color: 'var(--nutui-black-10)' }}>当前温度</View>
            <View style={{ fontSize: '25px', color: 'var(--nutui-black-10)' }}>
              39℃
            </View>
          </CircleProgress>
        </Cell>
        <View className='text'>运动量</View>
        <Cell className='yun'>
          <Tabs
            className='tabs'
            value={tabvalue}
            onChange={(value) => {
              setTabvalue(value);
            }}
            activeType="simple"
          >
            <Tabs.TabPane className='item' title="一周内">
              <Canvas
                // {...canvasProps}
                canvas-id="ewzrjYiHyWixZINiVtwIGDiiqoKXbCVW"
                id="ewzrjYiHyWixZINiVtwIGDiiqoKXbCVW"
                className="charts"
                onTouchEnd={tap}
              />
            </Tabs.TabPane>
            <Tabs.TabPane title="一月内" className='item'>
              {/* 其他内容 */}
            </Tabs.TabPane>
            <Tabs.TabPane title="一年内" className='item'>
              {/* 其他内容 */}
            </Tabs.TabPane>
          </Tabs>
        </Cell>
      </View>
    </View>
  );
}

export default Index;
