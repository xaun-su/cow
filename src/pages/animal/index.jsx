import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { SearchBar, Avatar } from '@nutui/nutui-react-taro';
import { View, Text, Navigator } from '@tarojs/components'; // 确保导入了 Text
import { ArrowRight, Add } from '@nutui/icons-react-taro'; // 确保导入了 User 和 ArrowRight
import TitleH5 from '../../components/TitleH5/index';
import { getAnimalListData } from '../../api/animal'
import './index.less';

const Demo7 = () => {
  const [value, setValue] = useState('');
  const [listData, setListData] = useState([]); // 用于存储搜索结果的状态

  //获取牲畜列表数据
  const getAnimalList = async () => {
    const res = await getAnimalListData()
    console.log(res.data)
    setListData(res.data)
  }
  useEffect(() => {
    getAnimalList()
  }, [])


  return (

    <View className='animal'>
      <View>
        {process.env.TARO_ENV === 'h5' && <TitleH5 title='牲畜管理' />}
      </View>
      {/* SearchBar */}
      <SearchBar onChange={(val) => setValue(val)} maxLength={10} placeholder="输入牲畜名称或IMEI查询" />

      <View className='category'>
        {/* 动态生成 category-item */}
        {listData.length > 0 && listData.map((item, i) => (
          <View key={i} className='category-item'> {/* 将 className 和 key 放在同一层 View */}
            {/* 左侧：头像和文本 */}
            <View className='item-left'> {/* 包裹头像和文本的容器，水平 flex */}
              {/* 确保导入了 User 图标 */}
              <Avatar icon={<Text className='iconfont icon-yaoqingniuren'></Text>} size="normal" color="#fff"
                background="#0bcb77" className='normal' /> {/* 头像 */}
              <View className='item-text'> {/* 包裹文本的容器，垂直 flex */}
                <Text className='item-title'>牲畜编号</Text> {/* 标题文本 */}
                <Text className='item-imei'>IMEI:{item.F_IMEI}</Text> {/* IMEI 文本 */}
              </View>
            </View>

            {/* 右侧：箭头 */}
            {/* 点击跳转页面传递参数 */}

            <View className='item-right' onClick={() => {
              // 点击事件处理函数，跳转到目标页面并传递参数
              Taro.navigateTo({
                url: `/animalPack/pages/animalDetails/index?id=${item.F_Id}`,
              });
            }}> {/* 包裹箭头的容器 */}
              <ArrowRight /> {/* 箭头图标 */}
            </View>
          </View>
        ))}
      </View>
      {/* 小程序显示 */}
      {process.env.TARO_ENV === 'weapp' && (
        <Avatar
          color="#fff"
          background="#0bcb77"
          size="large"
          className='animal_add'
          icon=<Add />
        >
        </Avatar>
      )}
      {/* H5显示 */}
      {process.env.TARO_ENV === 'h5' && (
        <Avatar
          color="#fff"
          background="#0bcb77"
          size="large"
          className='animal_add'
          style={{
            bottom: '8%'
          }}
          icon=<Add />
        >
        </Avatar>
      )}

    </View>
  );
};

export default Demo7;
