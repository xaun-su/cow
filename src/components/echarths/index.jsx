import { useRef, useEffect } from 'react';
import { View } from '@tarojs/components';
import Echarts from 'taro-react-echarts';
// 导入 ECharts 库
import * as echarts from 'echarts'; // <-- 改为正确的名称
import Taro from '@tarojs/taro'; // **确保导入 Taro**

export default function LineChartDemo() {
  // echartsRef 会引用 taro-react-echarts 组件的实例，
  // taro-react-echarts 的 ref 通常会暴露底层的 ECharts 实例
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

  // 在组件挂载后调用 resize
  useEffect(() => {
    console.log('EchartsZ component mounted.');

    // 使用 Taro.nextTick 确保在 DOM 更新完成后执行
    Taro.nextTick(() => {
      console.log('Inside Taro.nextTick.');
      // 检查 ref 是否存在以及是否是有效的 ECharts 实例
      if (echartsRef.current && typeof echartsRef.current.resize === 'function') {
        console.log('Echarts instance found, calling resize().');
        echartsRef.current.resize();

        // 可选：再次设置 option 尝试强制刷新
        // echartsRef.current.setOption(option);
        // console.log('Also called setOption after resize.');

      } else {
        console.warn('Echarts ref is not available or resize method is missing.');
        console.log('Current echartsRef.current:', echartsRef.current);
      }
    });

    // 返回一个清理函数，在组件卸载时销毁 ECharts 实例
    // taro-react-echarts 内部通常会处理销毁，但为了健壮性可以保留
    return () => {
      console.log('EchartsZ component unmounting.');
      if (echartsRef.current && typeof echartsRef.current.dispose === 'function') {
         console.log('Disposing Echarts instance.');
         echartsRef.current.dispose();
      }
    };

  }, []); // 空依赖数组表示只在组件挂载和卸载时执行

  return (
    // 确保 View 有明确的尺寸
    <View style={{ width: '100%', height: '600rpx' }}>
      <Echarts
        echarts={echarts}
        option={option}
        ref={echartsRef} // 将 ref 传递给 Echarts 组件
        isPage={false} // **明确设置为 false，因为是组件内的图表**
        style={{ width: '100%', height: '100%' }}
      />
    </View>
  );
}
