import React,{  useState, useEffect } from 'react';
import { View, Text ,Navigator} from '@tarojs/components';
// 导入之前创建的检疫记录卡片组件
import QuarantineRecordCard from '@/components/QuarantineRecordCard';
import './index.less'; // 引入页面样式文件
import Taro from '@tarojs/taro'; // 导入 Taro API
import TitleH5 from '@/components/TitleH5/index';
import {getQuarantineListData} from '@/api/manage'


const QuarantineListPage = () => {
  const [data,setData] = useState([])
  useEffect(() => {
    const getData = async () => {
      await getQuarantineListData().then((res) => {
        console.log(res.data.quarantine);
        setData(res.data.quarantine)
      })
    } 
    getData()
  },[])
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
      {process.env.TARO_ENV === 'h5' && <TitleH5 title='疫苗管理' />}
      </View>
      {/* 检疫记录卡片列表容器 */}
      <View className='card-list-container'>
        {/* 遍历数据，渲染多个 QuarantineRecordCard 组件 */}
        {data.map((record,index) => (
          <QuarantineRecordCard
            key={index} // 列表渲染时需要 key
            livestockId={record.F_liveid}
            imei={record.F_IMEI}
            quarantineUnit={record.F_Stand}
            quarantineType={record.F_Title}
            quarantinePersonnel={record.F_UserName}
            operator={record.F_UserName}
            date={record.F_StTime}
            onClick={() => handleCardClick(record)} // 传递点击事件处理函数
          />
        ))}
      </View>

      {/* 底部固定新增按钮 */}
      <Navigator className='add-button-container' url='/recordsPack/pages/quarantineRecords/index'>
        <View className='add-button' onClick={handleAddClick}>
          <Text className='add-button-text'>新增</Text>
        </View>
      </Navigator>
    </View>
  );
};

export default QuarantineListPage;
