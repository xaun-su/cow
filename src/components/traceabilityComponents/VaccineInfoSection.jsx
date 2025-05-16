// src/pages/animal-details/components/VaccineInfoSection.jsx
import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import { Cell, Steps, Step } from '@nutui/nutui-react-taro';
import { ArrowRight } from '@nutui/icons-react-taro'; // 导入箭头图标
import { getVaccineInfoData } from '@/api/traceability';

const VaccineInfoSection = ({ id }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const basid = id;
    console.log('挂载疫苗信息id是', basid);
    const fetchData = async () => {
      const res = await getVaccineInfoData(id);
      console.log('疫苗信息', res.data);
      setData(res.data);
    }
    if (id) {
      fetchData();
    }
  }, [id])
  return (
    <> {/* 使用 Fragment 包裹 */}
      <Cell title='证明材料' radius={0} style={
        {
          '--nutui-cell-background-color': '#f5f5f5',
        }
      } />
      <Cell title='动物诊疗许可证' extra={<ArrowRight />} radius={0} />
      <Cell title='动物防疫合格证' extra={<ArrowRight />} radius={0} />
      <Cell title='疫苗生产批次和有效期证明' extra={<ArrowRight />} radius={0} />
      <Cell title='疫苗运输和储存温度记录' extra={<ArrowRight />} radius={0} />
      <Cell title='免疫接种记录' extra={<ArrowRight />} radius={0} />

      <Cell title='疫苗记录' radius={0} style={
        {
          '--nutui-cell-background-color': '#f5f5f5',
        }
      } />
      {data.length === 0 ? <View>暂无疫苗信息</View> :

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
          <Steps direction="vertical" dot value={data.length}> {/* value 可能需要根据实际数据动态设置 */}
            {data.map((item, index) => (
              <Step
               key={item.id || index}
                value={index+1}
                title={item.F_CreateTime}
                description={
                  <>
                    <p>疫苗批次号:{item.F_Batch}</p>
                    <p>疫苗名称:{item.F_Title}</p>
                    <p>操作人员:{item.F_Name}</p>
                  </>
                }
              />
            ))}

          </Steps>
        </View>
      }
    </>
  );
};

export default VaccineInfoSection;
