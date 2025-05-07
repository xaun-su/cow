import React from 'react';
import Taro from '@tarojs/taro';
import { View, Text,Image,Navigator } from '@tarojs/components'
import './index.less'
import { ArrowRight} from '@nutui/icons-react-taro'
import TitleH5 from '@/components/TitleH5/index';


export default function DeviceError () {
  return (
    
    <View className='deviceError'>
      <View>
      {process.env.TARO_ENV === 'h5' && <TitleH5 title='异常设备' />}
      </View>
      <View className='deviceError-content'>
        <View className='deviceError-content-left'>
          <i className='iconfont icon-electricity-full'></i>
          <Text style={'color:#ff5725' }>低电量报价</Text>
        </View>
        <Navigator  className='deviceError-content-right' url='/homePack/pages/animalDetailsError/index'>2024-01-20 20:20:20<ArrowRight /></Navigator>
      </View>
       <View className='deviceError-content'>
       <View className='deviceError-content-left'>
         <i className='iconfont icon-wifi-10'></i>
          <Text style={'color:#eacb35' } >离线</Text>
        </View>
        <Text className='deviceError-content-right'>2024-01-20 20:20:20 <ArrowRight /></Text>
      </View>

    </View>
  )
}
