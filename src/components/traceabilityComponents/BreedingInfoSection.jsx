// src/pages/animal-details/components/BreedingInfoSection.jsx
import React from 'react';
import { View, Text } from '@tarojs/components';
import { Cell, Steps, Step } from '@nutui/nutui-react-taro';

const BreedingInfoSection = (id) => {
  
  return (
    <> {/* 使用 Fragment 包裹 */}
      <Cell title='繁殖记录' radius={0} style={
        {
          '--nutui-cell-background-color': '#f5f5f5',
        }
      } />
      <View style={{
        padding: '15px 30px',
        '--nutui-steps-process-icon-before-bg-color': '#e2f9f2', // 进行中点状进度条点的外边颜色
        '--nutui-steps-process-icon-bg-color': '#e2f9f2', // 进行中icon容器背景色
        '--nutui-steps-process-icon-color': '#70ba77', // 进行中icon容器字体颜色
        '--nutui-steps-finish-icon-bg-color': '#e2f9f2', // 完成状态icon 容器的背景色
        '--nutui-steps-finish-icon-color': '#70ba77', // 完成状态icon 容器的字体颜色
        '--nutui-steps-finish-line-background': '#a5a5a5', // 完成状态分割线的颜色
        '--nutui-steps-base-description-color': '#666666', // 描述文案的字体颜色
        '--nutui-steps-dot-icon-width': '8px', // 点状进度条点的宽度
        '--nutui-steps-dot-icon-height': '8px', // 点状进度条点的高度
        '--nutui-steps-dot-icon-border': 'none', // 点状进度条点的边框
        '--nutui-steps-dot-head-margin': '8px 0 0 0', // 点状进度条点的外边距
        '--nutui-steps-base-title-color': '#a5a5a5',
      }}>
        <Steps direction='vertical' dot value={5}> {/* value 可能需要根据实际数据动态设置 */}
          <Step
            value={1}
            title='出生'
            description={
              <View>
                <p>出生时间: 2024-01-24</p>
                <p>
                  公 畜: IMEI: <Text style={{ color: '#70ba77' }}>866452264124</Text>
                </p>
                <p>
                  母 畜: IMEI: <Text style={{ color: '#70ba77' }}>866452264122</Text>
                </p>
                <p>出生体重: 10KG</p>
                <p>操作 员: xxxx</p>
              </View>
            }
          />
          <Step
            value={2}
            title='**'
            description={
              <View>
                <p>预测交配时间: 2024-01-24</p>
                <p>实际交配时间: 2024-01-24</p>
                <p>操作 员: xxxx</p>
              </View>
            }
          />
          <Step
            value={3}
            title='配种'
            description={
              <View>
                <p>配种时间: 2024-01-24</p>
                <p>
                  配种牲畜: IMEI: <Text style={{ color: '#70ba77' }}>866452264122</Text>
                </p>
                <p>操作 员: xxxx</p>
              </View>
            }
          />
          <Step
            value={4}
            title='生育'
            description={
              <View>
                <p>生育时间: 2024-01-24</p>
                <p>
                  生育牲畜: IMEI: <Text style={{ color: '#70ba77' }}>866452264122</Text>
                </p>
                <p>操作 员: xxxx</p>
              </View>
            }
          />
          <Step
            value={5}
            title='节育'
            description={
              <View>
                <p>节育时间: 2024-01-24</p>
                <p>操作 员: xxxx</p>
              </View>
            }
          />
        </Steps>
      </View>
    </>
  );
};

export default BreedingInfoSection;
