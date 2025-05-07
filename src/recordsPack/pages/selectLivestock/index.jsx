import React, { useState } from 'react';
import { SearchBar, Avatar, Checkbox } from '@nutui/nutui-react-taro';
import { View, Text, Navigator } from '@tarojs/components';
import './index.less';
import TitleH5 from '@/components/TitleH5/index';

const Demo7 = () => {
  const [value, setValue] = useState('');
  // 修改这里：使用一个数组来存储每个列表项的选中状态
  // 假设你有 5 个列表项，初始都为 false (未选中)
  const [checkedItems, setCheckedItems] = useState(Array(5).fill(false));

  // 处理单个 Checkbox 变化的函数
  const handleCheckboxChange = (index, isChecked) => {
    console.log(`Checkbox ${index} changed to: ${isChecked}`); // 添加日志
    // 创建一个新的数组，基于旧的 checkedItems
    const newCheckedItems = [...checkedItems];
    // 更新对应索引位置的状态
    newCheckedItems[index] = isChecked;
    // 使用新数组更新状态
    setCheckedItems(newCheckedItems);
    console.log('Updated checkedItems:', newCheckedItems); // 添加日志
  };

  // 定义 handleSubmit 函数
  const handleSubmit = () => {
    console.log('确定提交 clicked!');
    console.log('当前选中的项:', checkedItems);
    // TODO: 在这里处理提交逻辑，例如根据 checkedItems 数组发送请求
  };

  return (
    <View className='animal'>
      <View>
      {process.env.TARO_ENV === 'h5' && <TitleH5 title='选中牲畜' />}
      </View>
      {/* SearchBar */}
      <SearchBar onChange={(val) => setValue(val)} maxLength={10} />

      <View className='category'>
        {/* 动态生成 category-item */}
        {Array.from({ length: 5 }, (_, i) => (
          <View key={i} className='category-item'>
            {/* 左侧：头像和文本 */}
            <View className='item-left'>
              <Avatar icon={<Text className='iconfont icon-yaoqingniuren'></Text>} size="normal" color="#fff"
                background="#0bcb77" className='normal' />
              <View className='item-text'>
                <Text className='item-title'>牲畜编号</Text>
                <Text className='item-imei'>IMEI: 1234567890</Text>
              </View>
            </View>

            {/* 右侧：复选框 */}
            <View className='item-right'>
              <Checkbox
                className="test"
                // 修改这里：checked 绑定到对应索引的状态
                checked={checkedItems[i]}
                // 修改这里：onChange 调用新的处理函数，并传递当前索引和新的选中状态
                onChange={(isChecked) => handleCheckboxChange(i, isChecked)}
              />
            </View>
          </View>
        ))}
      </View>
      <View className='submit-button-container'>
        {/* 确保 handleSubmit 函数已定义 */}
        <View className='submit-button' onClick={handleSubmit}>
          <Text className='submit-button-text'>确定提交</Text>
        </View>
      </View>
    </View>
  );
};

export default Demo7;

