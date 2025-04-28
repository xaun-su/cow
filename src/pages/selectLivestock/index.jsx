import React, { useState } from 'react';
import { SearchBar, Avatar ,Checkbox} from '@nutui/nutui-react-taro';
import { View, Text, Navigator } from '@tarojs/components';
import { ArrowRight, User, Add } from '@nutui/icons-react-taro';
import './index.less';

const Demo7 = () => {
  const [value, setValue] = useState('');
  // 修改这里：使用一个数组来存储每个列表项的选中状态
  // 假设你有 5 个列表项，初始都为 false (未选中)
  const [checkedItems, setCheckedItems] = useState(Array(5).fill(false));

  // 处理单个 Checkbox 变化的函数
  const handleCheckboxChange = (index, isChecked) => {
    // 创建一个新的数组，基于旧的 checkedItems
    const newCheckedItems = [...checkedItems];
    // 更新对应索引位置的状态
    newCheckedItems[index] = isChecked;
    // 使用新数组更新状态
    setCheckedItems(newCheckedItems);
  };

  return (
    <View className='animal'>
      {/* SearchBar */}
      <SearchBar onChange={(val) => setValue(val)} maxLength={10} />

      <View className='category'>
        {/* 动态生成 category-item */}
        {Array.from({ length: 5 }, (_, i) => (
          <View key={i} className='category-item'>
            {/* 左侧：头像和文本 */}
            <View className='item-left'>
              <Avatar icon={<User />} size="normal" color="#fff"
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
      <Avatar
        color="#fff"
        background="#0bcb77"
        size="large"
        className='add-btn'
        // 修正这里：JSX 属性值需要花括号 {} 包裹
        icon={<Add />}
      >
      </Avatar>
    </View>
  );
};

export default Demo7;
