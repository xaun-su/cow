import React from 'react'
import { NavBar } from '@nutui/nutui-react-taro'
import { Share, More, Cart, ArrowLeft, Close } from '@nutui/icons-react-taro'
import Taro from '@tarojs/taro'

const Title = () => {
  return (
    <>
      <NavBar
        back={
          <>
            <ArrowLeft size={14} />
          </>
        }
        onBackClick={(e) => Taro.showToast({ title: '返回' })}
      >
        <span onClick={(e) => Taro.showToast({ title: '标题' })}>订单详情</span>
      </NavBar>
    
    </>
  )
}
export default Title
