import { useRef, useEffect } from 'react';
import { View } from '@tarojs/components';
import Echarts from 'taro-react-echarts';
// 导入 ECharts 库
import * as echarts from '../../ec-canvas/echarts.min.js';
import Taro from '@tarojs/taro'; // **确保导入 Taro**

export default function LineChartDemo() {
  const echartsRef = useRef(null);

  // 根据图片估算的数据点
  const dates = ['11-07', '11-08', '11-09', '11-10', '11-11', '11-12', '11-13'];
  const values = [200, 300, 400, 600, 150, 250, 370]; // 估算的数据

  const option = {
    // ... (option 配置保持不变)
    grid: {
      left: '10%',
      right: '10%',
      bottom: '10%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: dates,
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: '#ccc'
        }
      },
      axisLabel: {
        color: '#333'
      },
      axisTick: {
          alignWithLabel: true
      },
      splitLine: {
          show: true,
          lineStyle: {
              color: '#eee'
          }
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 800,
      interval: 200,
      axisLine: {
        lineStyle: {
          color: '#ccc'
        }
      },
       axisLabel: {
        color: '#333'
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#eee'
        }
      }
    },
    series: [
      {
        data: values,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#4ECDC4'
        },
        lineStyle: {
            color: '#4ECDC4'
        }
      }
    ]
  };

  useEffect(() => {
    console.log('Echarts component mounted.');

    Taro.nextTick(() => {
      console.log('Inside Taro.nextTick.');
      if (echartsRef.current && typeof echartsRef.current.resize === 'function') {
        console.log('Echarts instance found, calling resize().');
        // 在确保父容器有正确尺寸后，再次调用 resize
        echartsRef.current.resize();

      } else {
        console.log('Current echartsRef.current:', echartsRef.current);
      }
    });

    return () => {
      console.log('Echarts component unmounting.');
      if (echartsRef.current && typeof echartsRef.current.dispose === 'function') {
         console.log('Disposing Echarts instance.');
         echartsRef.current.dispose();
      }
    };

  }, []);

  return (
    <View style={{ width: '100%', height: '200px' }}>
      <Echarts
        echarts={echarts}
        option={option}
        ref={echartsRef} // 将 ref 传递给 Echarts 组件
        isPage={false}
        style={{ width: '350px', height: '200px' }} // Echarts 组件填充父容器
      />
    </View>
  );
}
