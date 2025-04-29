// src/pages/animal-details/components/QuarantineInfoSection.jsx
import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Cell, Steps, Step } from '@nutui/nutui-react-taro';
import imge2 from '@/static/images/证明.png'; // 确保路径正确

const QuarantineInfoSection = () => {
  return (
    <> {/* 使用 Fragment 包裹 */}
      <Cell title='检疫信息' radius={0} style={
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
            title='2024-12-21'
            description={
              <View>
                <p>检疫单位: 123122143</p>
                <p>
                  检疫类型: 123542135`14`
                </p>
                <p>
                  检疫人员: 2`134`4234
                </p>
                <Image src={imge2} style={{
                  width: '250px',
                  height: '400px'
                }}></Image>
              </View>
            }
          />
          <Step
            value={2}
            title='2024-4-12'
            description={
              <View>
                <p>检疫单位: 123122143</p>
                <p>
                  检疫类型: 123542135`14`
                </p>
                <p>
                  检疫人员: 2`134`4234
                </p>
                <Image src={imge2} style={{
                  width: '250px',
                  height: '400px'
                }}></Image>
              </View>
            }
          />
          {/* 添加更多 Step */}
        </Steps>
      </View>
    </>
  );
};

export default QuarantineInfoSection;
