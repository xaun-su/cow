import { useRef } from 'react';
import { View } from '@tarojs/components'; // 确保导入 View 组件
import Echarts from 'taro-react-echarts';
// 导入 ECharts 库
import * as echarts from 'echarts';

export default function LineChartDemo() {
  const echartsRef = useRef(null);

  // 根据图片估算的数据点
  const dates = ['11-07', '11-08', '11-09', '11-10', '11-11', '11-12', '11-13'];
  const values = [200, 300, 400, 600, 150, 250, 370]; // 估算的数据

  const option = {
    // tooltip: { // 根据需要是否显示 tooltip
    //   trigger: 'axis',
    //   show: true,
    //   confine: true // 限制 tooltip 在图表区域内
    // },
    grid: {
      left: '10%', // 调整左边距，为 Y 轴标签留出空间
      right: '10%', // 调整右边距
      bottom: '10%', // 调整底边距，为 X 轴标签留出空间
      top: '10%', // 调整顶边距
      containLabel: true // 确保标签不会被截断
    },
    xAxis: {
      type: 'category',
      data: dates,
      boundaryGap: false, // 数据点在刻度线上
      axisLine: {
        lineStyle: {
          color: '#ccc' // X 轴线颜色
        }
      },
      axisLabel: {
        color: '#333' // X 轴标签颜色
      },
      axisTick: {
          alignWithLabel: true // 刻度线和标签对齐
      },
      splitLine: {
          show: true, // 显示 X 轴网格线
          lineStyle: {
              color: '#eee' // 网格线颜色
          }
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 800, // 根据图片的 Y 轴最大值设置
      interval: 200, // 根据图片的 Y 轴刻度间隔设置
      axisLine: {
        lineStyle: {
          color: '#ccc' // Y 轴线颜色
        }
      },
       axisLabel: {
        color: '#333' // Y 轴标签颜色
      },
      splitLine: {
        show: true, // 显示 Y 轴网格线
        lineStyle: {
          color: '#eee' // 网格线颜色
        }
      }
    },
    series: [
      {
        // name: '数据系列', // 可选，用于 tooltip
        data: values,
        type: 'line',
        smooth: true, // 使曲线平滑
        symbol: 'circle', // 数据点标记为圆形
        symbolSize: 8, // 数据点标记大小
        itemStyle: {
          color: '#4ECDC4' // 数据点和线的颜色 (类似图片中的颜色)
        },
        lineStyle: {
            color: '#4ECDC4' // 线条颜色
        }
      }
    ]
  };

  return (
    <View style={{ width: '100%', height: '600rpx' }}>
      <Echarts
        echarts={echarts}
        option={option}
        ref={echartsRef}
        // isPage={false} // 根据你的使用场景决定是否需要
        style={{ width: '100%', height: '100%' }}
      />
    </View>
  );
}
