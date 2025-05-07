import React, { useState } from 'react';
import { SearchBar, Avatar } from '@nutui/nutui-react-taro';
import { View, Text, Navigator } from '@tarojs/components'; // 确保导入了 Text
import { ArrowRight, Add } from '@nutui/icons-react-taro'; // 确保导入了 User 和 ArrowRight
import TitleH5 from '../../components/TitleH5/index';
import './index.less';

const Demo7 = () => {
  const [value, setValue] = useState('');

  return (

    <View className='animal'>
      <View>
      {process.env.TARO_ENV === 'h5' && <TitleH5 title='牲畜管理' />}
      </View>
      {/* SearchBar */}
      <SearchBar onChange={(val) => setValue(val)} maxLength={10} placeholder="输入牲畜名称或IMEI查询" />

      <View className='category'>
        {/* 动态生成 category-item */}
        {Array.from({ length: 5 }, (_, i) => (
          <View key={i} className='category-item'> {/* 将 className 和 key 放在同一层 View */}
            {/* 左侧：头像和文本 */}
            <View className='item-left'> {/* 包裹头像和文本的容器，水平 flex */}
              {/* 确保导入了 User 图标 */}
              <Avatar icon={<Text className='iconfont icon-yaoqingniuren'></Text>} size="normal" color="#fff"
                background="#0bcb77" className='normal' /> {/* 头像 */}
              <View className='item-text'> {/* 包裹文本的容器，垂直 flex */}
                <Text className='item-title'>牲畜编号</Text> {/* 标题文本 */}
                <Text className='item-imei'>IMEI: 1234567890</Text> {/* IMEI 文本 */}
              </View>
            </View>

            {/* 右侧：箭头 */}
            <Navigator className='item-right' url='/animalPack/pages/animalDetails/index'> {/* 包裹箭头的容器 */}
              <ArrowRight /> {/* 箭头图标 */}
            </Navigator>
          </View>
        ))}
      </View>
      <Avatar
        color="#fff"
        background="#0bcb77"
        size="large"
        className='add-btn'
        icon=<Add />
      >
      </Avatar>
    </View>
  );
};

export default Demo7;
