import React, { useEffect, useState } from 'react';
import { View, Text, Navigator } from '@tarojs/components';
// 导入之前创建的检疫记录卡片组件
import Vaccine from '@/components/vaccine/index';
import './index.less'; // 引入页面样式文件
import Taro from '@tarojs/taro'; // 导入 Taro API
import { getVaccineListData } from '@/api/manage';
import TitleH5 from '@/components/TitleH5/index';

const QuarantineListPage = () => {
  const [data, setData] = React.useState([])
  useEffect(() => {
    //获取数据列表
    const getData = async () => {
      await getVaccineListData().then((res) => {
        console.log(res.data);
        setData(res.data);
      });
    };
    getData();

  }, []);


  const handleCardClick = (record) => {
    console.log('点击了检疫记录:', record);
  Taro.navigateTo({
    url: '/managePack/pages/vaccineDetails/index?id=' + record.F_Id
  })
  };

  // 处理“新增”按钮点击事件
  const handleAddClick = () => {
    console.log('点击了新增按钮');
  };

  return (
    <View className='quarantine-list-page'>
      <View>
        {process.env.TARO_ENV === 'h5' && <TitleH5 title='检疫管理' />}
      </View>
      {/* 检疫记录卡片列表容器 */}
      <View className='card-list-container'>
        {/* 遍历数据，渲染多个 QuarantineRecordCard 组件 */}
        {data.map(record => (
          <Vaccine
            key={record.F_Id} // 列表渲染时需要 key
            livestockId={record.livestockId}
            imei={record.F_IMEI}
            quarantineUnit={record.F_Batch}
            quarantineType={record.F_Title}
            operator={record.F_Name}
            date={record.F_CreateTime}
            onClick={() => handleCardClick(record)} // 传递点击事件处理函数
          />
        ))}
      </View>

      {/* 底部固定新增按钮 */}
      <Navigator className='add-button-container' url='/recordsPack/pages/vaccineRecords/index'>
        <View className='add-button' onClick={handleAddClick}>
          <Text className='add-button-text'>新增</Text>
        </View>
      </Navigator>
    </View>
  );
};

export default QuarantineListPage;
