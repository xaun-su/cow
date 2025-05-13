import React, { useEffect, useState } from 'react';

import { View, Text, Image, Navigator } from '@tarojs/components'
import './index.less'
import { ArrowRight } from '@nutui/icons-react-taro'
import TitleH5 from '@/components/TitleH5/index';
import { getDeviceErrorData, getDeviceOfflineData } from '@/api/index';


export default function DeviceError() {
  const [offline, setOffline] = useState([]);
  const [error, setError] = useState([]);
  useEffect(() => {
    //获取低电量数据
    const getAlertData = async () => {
      const res = await getDeviceErrorData()
      console.log('低电量数据', res.data)
      setOffline(res.data)
    }
    // 获取离线数据
    const getOfflineData = async () => {
      const res = await getDeviceOfflineData()
      console.log('离线数据', res.data)
      setError(res.data)
    }
    getAlertData()
    getOfflineData()
  }, [])
  return (
    <View className='deviceError'>
      <View>
        {process.env.TARO_ENV === 'h5' && <TitleH5 title='异常设备' />}
      </View>
      {offline.length > 0 ? offline.map(item => {
        return (
          <View className='deviceError-content'>
            <View className='deviceError-content-left'>
              <i className='iconfont icon-electricity-full'></i>
              <Text style={'color:#ff5725'}>低电量报价</Text>
            </View>
            <Navigator className='deviceError-content-right' url='/homePack/pages/animalDetailsError/index'>{new Date(item.F_CreateTime).toISOString().replace('T', ' ').substr(0, 19)}<ArrowRight /></Navigator>
          </View>
        )
      }) : ''}

      {error.length > 0 ? error.map(item => {
        return (
          <View className='deviceError-content'>
            <View className='deviceError-content-left'>
              <i className='iconfont icon-wifi-10'></i>
              <Text style={'color:#eacb35'} >离线</Text>
            </View>
            <Text className='deviceError-content-right'>{new Date(item.F_CreateTime).toISOString().replace('T', ' ').substr(0, 19)} <ArrowRight /></Text>
          </View>
        )
      }) : ''}
    </View>
  )
}
