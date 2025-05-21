// src/pages/animal-details/components/QuarantineInfoSection.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components'; 
import { Cell, Steps, Step } from '@nutui/nutui-react-taro';
import { getQuarantineInfoData } from '@/api/traceability';

const QuarantineInfoSection = ({ id }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('挂载检疫信息id是', id);
    // 只有当 id 存在时才进行数据 fetching
    if (id) {
      const fetchData = async () => {
        try {
          // 将 id 值传递给 API 函数
          const res = await getQuarantineInfoData(id);
          console.log('检疫信息', res.data);
          //  res.data 可能为 null 或 undefined，使用 || [] 提供默认值
          setData(res.data || []);
        } catch (error) {
          console.error('获取检疫信息失败:', error);
          setData([]);
        }
      };
      fetchData();
    } else {
      // 如果 id 不存在，清空数据
      setData([]);
    }
  }, [id]); // 依赖数组包含 id，以便在 id 变化时重新获取数据

  return (
    <> {/* 使用 Fragment 包裹顶层元素 */}
      <Cell title='检疫信息' radius={0} style={{ '--nutui-cell-background-color': '#f5f5f5' }} />

      {/* 修正条件渲染的语法，并使用 map 动态生成 Step */}
      {data.length === 0 ? (
        <View style={{ padding: '15px 30px' }}>暂无检疫信息</View>
      ) : (
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
          {/* value 设置为数据的长度，表示所有步骤都已完成 */}
          <Steps direction='vertical' dot value={data.length}>
            {data.map((item, index) => (
              <Step
                key={item.id || index} 
                value={index + 1} // Step 的 value 通常从 1 开始
                title={item.F_StTime} 
                description={
                  <View>
                    <Text>检疫单位: {item.F_Stand}</Text>
                    <Text>检疫类型: {item.F_Title}</Text>
                    <Text>检疫人员: {item.F_UserName}</Text>
                    {item.F_ResultImage?
                    <Image src={`http://8.137.157.16:9999${item.F_ResultImage}`} style={{ width: '250px', height: '400px' }} />
                    :''}
                  </View>
                }
              />
            ))}
          </Steps>
        </View>
      )}
    </>
  );
};

export default QuarantineInfoSection;
