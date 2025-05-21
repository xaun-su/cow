import React, { useEffect, useState } from 'react';
import { View, Text } from '@tarojs/components';
// 导入之前创建的繁殖记录卡片组件
import Estrus from '@/components/estrus/index'; // 对应繁殖记录
import BirthControl from '@/components/birthControl/index'; // 对应节育记录
import './index.less'; // 引入页面样式文件
import { Tabs } from '@nutui/nutui-react-taro'
import TitleH5 from '@/components/TitleH5/index';
import {getBreedingListData} from '@/api/manage' // 导入获取繁殖管理数据的 API 函数
import Taro from '@tarojs/taro'; // 导入 Taro 用于页面跳转

const ReproductionManagement = () => {
  // 获取繁殖管理的数据
  const [estrusData,setEstrusData]=useState([]) // 繁殖数据 (对应 Tabs.TabPane title="繁殖")
  const [birthControlData,setBirthControlData]=useState([]) // 节育数据 (对应 Tabs.TabPane title="节育")
  const [loading, setLoading] = useState(true); // 加载状态
  const [error, setError] = useState(null); // 错误状态

  useEffect(() => {
    const getData=async()=>{
      try {
        setLoading(true); // 开始加载
        const res=await getBreedingListData()
        console.log('繁殖管理数据:',res.data)

        if (res.data) {
           // 假设 API 返回的数据结构中，繁殖记录在 breedingList，节育记录在 neverbreedList
          setEstrusData(res.data.breedingList || []); // 确保是数组，默认为空数组
          setBirthControlData(res.data.neverbreedList || []); // 确保是数组，默认为空数组
          setError(null); // 清除错误
        } else {
           setEstrusData([]);
           setBirthControlData([]);
           console.warn("API did not return expected data structure:", res);
           setError("Invalid data format from API.");
        }

      } catch (err) {
        console.error('Error fetching breeding data:', err);
        setError('Failed to load breeding data.'); // 设置错误信息
        setEstrusData([]);
        setBirthControlData([]);
      } finally {
        setLoading(false); // 结束加载
      }
    }
    getData()
  },[]) // 空依赖数组，只在组件挂载时执行一次

  const handleCardClick = (record) => {
    console.log('点击了记录卡片:', record);
    // TODO: 可以根据 record 的类型或字段跳转到详情页
  };

  // 处理“新增”按钮点击事件
  const handleAddClick = () => {
    console.log('点击了新增按钮',tab2value);
    // 根据当前选中的 Tab 跳转到对应的新增页面
    if (tab2value == '0') { // 当前是“繁殖” Tab
      console.log('跳转到新增繁殖记录页面');
      Taro.navigateTo({
        url: '/recordsPack/pages/estrusRecording/index' // 确保路径正确
      });
    } else if (tab2value == '1') { // 当前是“节育” Tab
      console.log('跳转到新增节育记录页面');
      Taro.navigateTo({
        url: '/recordsPack/pages/birthControlRecords/index' // 确保路径正确
      });
    }
  };

  // 状态用于控制当前选中的 Tab
  const [tab2value, setTab2value] = useState('0')

  return (
    <View className='quarantine-list-page'> {/* 沿用样式类名 */}
      <View>
      {process.env.TARO_ENV === 'h5' && <TitleH5 title='繁殖管理' />}
      </View>
      {/* Tab 容器 */}
      <View className='tabs-container'>
        <Tabs
          value={tab2value}
          autoHeight // 根据内容自动调整高度
          onChange={(value) => {
            setTab2value(value) // 更新选中的 Tab 状态
          }}
          // 可以添加其他 Tabs 配置，例如 lineWidth, activeColor 等
        >
          {/* 繁殖记录 Tab */}
          <Tabs.TabPane title="繁殖">
            <View className='card-list-container'>
              {loading && <View style={{ textAlign: 'center', padding: '20px' }}>加载中...</View>}
              {error && <View style={{ textAlign: 'center', padding: '20px', color: 'red' }}>{error}</View>}
              {!loading && !error && estrusData.length === 0 ? (
                 <View style={{ textAlign: 'center', padding: '20px' }}>暂无繁殖记录数据</View>
              ) : (
                 // 遍历繁殖数据，渲染 Estrus 卡片
                estrusData.map((record,index) => (
                  <Estrus
                    key={index} // 列表渲染时需要 key
                    livestockId={record.F_liveid}
                    imei={record.F_IMEI}
                    // 假设这些字段对应卡片上的信息
                    quarantineUnit={record.F_EsTimateTime} // 示例：可能需要根据实际字段映射
                    quarantineType={record.F_SjTimateTime} // 示例
                    operator={record.F_Opert}
                    date={record.F_CreateTime}
                    onClick={() => handleCardClick(record)} // 传递点击事件处理函数
                  />
                ))
              )}
            </View>
          </Tabs.TabPane>

          {/* 节育记录 Tab */}
          <Tabs.TabPane title="节育">
            <View className='card-list-container'>
               {loading && <View style={{ textAlign: 'center', padding: '20px' }}>加载中...</View>}
               {error && <View style={{ textAlign: 'center', padding: '20px', color: 'red' }}>{error}</View>}
               {!loading && !error && birthControlData.length === 0 ? (
                  <View style={{ textAlign: 'center', padding: '20px' }}>暂无节育记录数据</View>
               ) : (
                 // 遍历节育数据，渲染 BirthControl 卡片
                birthControlData.map((record,index) => (
                  <BirthControl
                    key={index} // 列表渲染时需要 key
                    livestockId={record.F_liveid}
                    imei={record.F_IMEI}
                    // 假设这些字段对应卡片上的信息
                    quarantineUnit={record.F_SjTimateTime} // 示例：可能需要根据实际字段映射
                    quarantineType={record.F_SjTimateTime} // 示例
                    operator={record.F_Opert}
                    date={record.F_CreateTime}
                    onClick={() => handleCardClick(record)} // 传递点击事件处理函数
                  />
                ))
               )}
            </View>
          </Tabs.TabPane>
        </Tabs>
      </View>

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
