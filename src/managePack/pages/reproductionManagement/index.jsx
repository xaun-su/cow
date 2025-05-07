import React, { useState } from 'react'
import { View, Text } from '@tarojs/components';
// 导入之前创建的检疫记录卡片组件
import Estrus from '@/components/estrus/index';
import BirthControl from '@/components/birthControl/index';
import './index.less'; // 引入页面样式文件
import { Tabs } from '@nutui/nutui-react-taro'
import TitleH5 from '@/components/TitleH5/index';

const ReproductionManagement = () => {
  // 模拟一些检疫记录数据
  const estrus = [
    {
      id: 1,
      livestockId: '牲畜编号',
      imei: '866452264124',
      quarantineUnit: '2022-11-11',
      quarantineType: '2011-11-11',
      operator: '韩梅梅',
      date: '2024-01-23',
    },
    {
      id: 2,
      livestockId: '牲畜编号',
      imei: '866452264125',
      quarantineUnit: '2011-11-11',
      quarantineType: '2011-11-11',
      operator: '李华',
      date: '2024-02-10',
    },
    
    // 你可以在这里添加更多模拟数据
    {
      id: 3,
      livestockId: '牲畜编号',
      imei: '866452264126',
      quarantineUnit: '2011-11-11',
      quarantineType: '2011-11-11',
      operator: '王明',
      date: '2024-03-01',
    },
  ];
  const birthControl = [
    {
      id: 1,
      livestockId: '牲畜编号',
      imei: '866452264124',
      quarantineUnit: '2022-11-11',
      operator: '韩梅梅',
      date: '2024-01-23',
    },
    {
      id: 2,
      livestockId: '牲畜编号',
      imei: '866452264125',
      quarantineUnit: '2011-11-11',
      operator: '李华',
      date: '2024-02-10',
    },
    
    // 你可以在这里添加更多模拟数据
    {
      id: 3,
      livestockId: '牲畜编号',
      imei: '866452264126',
      quarantineUnit: '2011-11-11',
      quarantineType: '2011-11-11',
      operator: '王明',
      date: '2024-03-01',
    },
  ];

  const handleCardClick = (record) => {
    console.log('点击了检疫记录:', record);
  };

  // 处理“新增”按钮点击事件
  const handleAddClick = () => {
    console.log('点击了新增按钮');
  };
  const [tab2value, setTab2value] = useState('0')
  return (

    <View className='quarantine-list-page'>
      <View>
      {process.env.TARO_ENV === 'h5' && <TitleH5 title='繁殖管理' />}
      </View>
      {/* 检疫记录卡片列表容器 */}
      <>
        <Tabs
          value={tab2value}
          autoHeight
          onChange={(value) => {
            setTab2value(value)
          }}
        >
          <Tabs.TabPane title="繁殖">
            <View className='card-list-container'>
              {/* 遍历数据，渲染多个 QuarantineRecordCard 组件 */}
              {estrus.map(record => (
                <Estrus
                  key={record.id} // 列表渲染时需要 key
                  livestockId={record.livestockId}
                  imei={record.imei}
                  quarantineUnit={record.quarantineUnit}
                  quarantineType={record.quarantineType}
                  operator={record.operator}
                  date={record.date}
                  onClick={() => handleCardClick(record)} // 传递点击事件处理函数
                />
              ))}
            </View>
          </Tabs.TabPane>
          <Tabs.TabPane title="节育">
            <View className='card-list-container'>
              {/* 遍历数据，渲染多个 QuarantineRecordCard 组件 */}
              {birthControl.map(record => (
                <BirthControl
                  
                  key={record.id} // 列表渲染时需要 key
                  livestockId={record.livestockId}
                  imei={record.imei}
                  quarantineUnit={record.quarantineUnit}
                  quarantineType={record.quarantineType}
                  operator={record.operator}
                  date={record.date}
                  onClick={() => handleCardClick(record)} // 传递点击事件处理函数
                />
              ))}
            </View>
          </Tabs.TabPane>
        </Tabs>
      </>


      {/* 底部固定新增按钮 */}
      <View className='add-button-container'>
        <View className='add-button' onClick={handleAddClick}>
          <Text className='add-button-text'>新增</Text>
        </View>
      </View>
    </View>
  );
};

export default ReproductionManagement;
