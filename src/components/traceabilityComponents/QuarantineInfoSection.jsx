// src/pages/animal-details/components/QuarantineInfoSection.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components'; // 使用 Text 代替 p 在 Taro 中更常见
import { Cell, Steps, Step } from '@nutui/nutui-react-taro';
import imge2 from '@/static/images/证明.png'; // 确保路径正确，如果图片是动态获取的，则需要从API数据中获取URL
import { getQuarantineInfoData } from '@/api/traceability';

// 假设组件接收一个名为 id 的 prop，它是动物的实际ID值
const QuarantineInfoSection = ({ id }) => {
  // 将 data 初始化为空数组，以便正确判断 length
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
          // 假设 res.data 是一个包含检疫记录的数组
          // 如果 res.data 可能为 null 或 undefined，使用 || [] 提供默认值
          setData(res.data || []);
        } catch (error) {
          console.error('获取检疫信息失败:', error);
          // 发生错误时也清空数据
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
            {/* 使用 map 方法遍历 data 数组，并返回 Step 组件数组 */}
            {data.map((item, index) => (
              <Step
                key={item.id || index} // 列表渲染需要 key，如果数据中有唯一ID更佳，否则使用 index
                value={index + 1} // Step 的 value 通常从 1 开始
                title={item.F_StTime} // 假设数据项中有 date 属性
                description={
                  <View>
                    {/* 假设数据项中有 unit, type, personnel 属性，并使用 Text 组件 */}
                    <Text>检疫单位: {item.F_Stand}</Text>
                    <Text>检疫类型: {item.F_Title}</Text>
                    <Text>检疫人员: {item.F_UserName}</Text>
                    {/* 如果图片是动态的，这里使用 item.imageUrl */}
                    {/* {item.imageUrl && <Image src={item.imageUrl} style={{ width: '250px', height: '400px' }} />} */}
                    {/* 如果图片是静态的，继续使用 imge2 */}
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
