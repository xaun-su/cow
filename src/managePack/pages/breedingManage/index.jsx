import React, { useEffect, useState } from 'react';
import { View, Text, Navigator } from '@tarojs/components';
// 导入之前创建的检疫记录卡片组件
import Breeding from '@/components/breeding/index';
import './index.less'; // 引入页面样式文件
import TitleH5 from '@/components/TitleH5/index';
import { getMatingListData } from '@/api/manage'

const QuarantineListPage = () => {

  const [data, setData] = useState([])
  useEffect(() => {
    const getData = async () => {
      await getMatingListData().then((res) => {
        console.log(res.data);
        setData(res.data)
      })
    }
    getData()
  })

  const handleCardClick = (record) => {
    console.log('点击了检疫记录:', record);
  };

  // 处理“新增”按钮点击事件
  const handleAddClick = () => {
    console.log('点击了新增按钮');
  };

  return (
    <View className='quarantine-list-page'>
      <View>
        {process.env.TARO_ENV === 'h5' && <TitleH5 title='配种' />}
      </View>
      {/* 检疫记录卡片列表容器 */}
      <View className='card-list-container'>
        {/* 遍历数据，渲染多个 QuarantineRecordCard 组件 */}
        {data.map(record => (
          <Breeding
            key={record.F_Id} // 列表渲染时需要 key
            livestockId={record.F_PaternalLine}
            imei={record.F_Paternal_IMEI}
            livestockId1={record.F_Matriarchal}
            imei1={record.F_Matriarchal_IMEI}
            operator={record.F_UserName}
            date={record.F_CreateTime}
            onClick={() => handleCardClick(record)} // 传递点击事件处理函数
          />
        ))}
      </View>

      {/* 底部固定新增按钮 */}
      <View className='add-button-container'>
        <Navigator className='add-button' onClick={handleAddClick} url='/recordsPack/pages/newBreeding/index'>
          <Text className='add-button-text'>新增</Text>
        </Navigator>
      </View>
    </View>
  );
};

export default QuarantineListPage;
