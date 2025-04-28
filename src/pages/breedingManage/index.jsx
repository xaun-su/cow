import React from 'react';
import { View, Text ,Navigator} from '@tarojs/components';
// 导入之前创建的检疫记录卡片组件
import Breeding from '../../components/breeding/index';
import './index.less'; // 引入页面样式文件
import Taro from '@tarojs/taro'; // 导入 Taro API

const QuarantineListPage = () => {
  // 模拟一些检疫记录数据
  const quarantineRecords = [
    {
      id: 1,
      livestockId: '牲畜编号',
      imei: '866452264124',
      operator: '韩梅梅',
      date: '2024-01-23',
    },
    {
      id: 2,
      livestockId: '牲畜编号',
      imei: '866452264125',
      operator: '李华',
      date: '2024-02-10',
    },
    // 你可以在这里添加更多模拟数据
    {
      id: 3,
      livestockId: '牲畜编号',
      imei: '866452264126',
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

  return (
    <View className='quarantine-list-page'>
      {/* 检疫记录卡片列表容器 */}
      <View className='card-list-container'>
        {/* 遍历数据，渲染多个 QuarantineRecordCard 组件 */}
        {quarantineRecords.map(record => (
          <Breeding
            key={record.id} // 列表渲染时需要 key
            livestockId={record.livestockId}
            imei={record.imei}
            operator={record.operator}
            date={record.date}
            onClick={() => handleCardClick(record)} // 传递点击事件处理函数
          />
        ))}
      </View>

      {/* 底部固定新增按钮 */}
      <View className='add-button-container'>
        <Navigator  className='add-button' onClick={handleAddClick} url='/pages/newBreeding/index'>
          <Text className='add-button-text'>新增</Text>
        </Navigator>
      </View>
    </View>
  );
};

export default QuarantineListPage;
