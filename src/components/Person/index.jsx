import React,{ useEffect, useState } from 'react'
import { Avatar } from '@nutui/nutui-react-taro'
import { View,Text ,Navigator} from '@tarojs/components'
import { User,ArrowRight } from '@nutui/icons-react-taro'
import './index.less'
const Demo9 = (props) => {
  const {icon=<User />}=props
  return (
    <View className='category'>   
      <View  className='category-item'> {/* 将 className 和 key 放在同一层 View */}
        {/* 左侧：头像和文本 */}
        <View className='item-left'> {/* 包裹头像和文本的容器，水平 flex */}
          {/* 确保导入了 User 图标 */}
          <Avatar icon={icon} size="normal" color="#fff"
            background="#0bcb77" className='normal' /> {/* 头像 */}
          <View className='item-text'> {/* 包裹文本的容器，垂直 flex */}
            <Text className='item-title'>牲畜编号</Text> {/* 标题文本 */}
            <Text className='item-imei'>IMEI: 1234567890</Text> {/* IMEI 文本 */}
          </View>
        </View>

        {/* 右侧：箭头 */}
        <Navigator className='item-right' url='/pages/animalDetails/index'> {/* 包裹箭头的容器 */}
          <ArrowRight /> {/* 箭头图标 */}
        </Navigator>
      </View>
  </View>
  )
}
export default Demo9
