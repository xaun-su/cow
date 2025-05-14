import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image, Navigator } from '@tarojs/components';
import './index.less'; // 引入样式文件
import imge from '@/static/images/animal.png';
import { Cell, ConfigProvider, CellGroup } from '@nutui/nutui-react-taro';
import { getAnimalDetailsData } from '@/api/animal';
import TitleH5 from '@/components/TitleH5/index';

const AnimalDetails = () => {
  const [animalDetails, setAnimalDetails] = useState({});
  const [loading, setLoading] = useState(true); // 添加加载状态

  useEffect(() => {
    console.log('id是', Taro.getCurrentInstance().router.params.id);
    const id = Taro.getCurrentInstance().router.params.id;

    // 获取牲畜详情数据
    const getAnimalDetails = async () => {
      const res = await getAnimalDetailsData(id);
      console.log(res.data); // 打印获取的数据
      setAnimalDetails(res.data);
      setLoading(false); // 数据加载完成，关闭加载状态
    };

    getAnimalDetails();
  }, []);

  // 定义一个自定义主题变量对象，用于覆盖 NutUI 的默认样式变量
  const customTheme = {
    '--nutui-cell-group-wrap-margin': '0',
    '--nutui-cell-group-wrap-padding': '0',
    '--nutui-button-border-radius': '0',
  };

  const marginStyle = { width: '100%' };

  const renderBatteryInfo = (percentage, imei) => {
    const batteryColor = percentage > 20 ? '#0bcb75' : '#ff4d4f'; // 绿色或红色

    const batteryIcon = (
      <Text
        className='iconfont icon-electricity-full'
        style={{
          color: batteryColor,
          fontSize: '16px',
          verticalAlign: 'middle',
          marginRight: '5px',
        }}
      ></Text>
    );

    return (
      <View className='battery-info'>
        <Text style={{ color: batteryColor, fontSize: '12px', marginRight: '5px' }}>
          {percentage}%
        </Text>
        {batteryIcon}
        <Text style={{ color: '#a0a0a0', fontSize: '12px' }}>{imei}</Text>
      </View>
    );
  };

  // 如果正在加载数据，显示加载中
  if (loading) {
    return <Text>加载中...</Text>;
  }

  return (
    <View className='animal-detail'>
      <View>
        {process.env.TARO_ENV === 'h5' && <TitleH5 title='牲畜详情' />}
      </View>
      <View className='animal-detail-header'>
        <Image src={imge} className='animal-detail-header-image' mode='aspectFill' />
      </View>
      <View className='animal-detail-content'>
        <ConfigProvider themeVars={customTheme}>
          <Cell
            title="牲畜编号"
            extra={
              animalDetails.cowinfo && animalDetails.cowinfo.length > 0
                ? animalDetails.cowinfo[0].tzzb === 1
                  ? '偏瘦'
                  : animalDetails.cowinfo[0].tzzb === 2
                    ? '正常'
                    : animalDetails.cowinfo[0].tzzb === 3
                      ? '偏胖'
                      : '未知'
                : ''
            }
            isLink
            radius={0}
          />

          <CellGroup title="设备信息" radius={0}>
            <Cell
              title="智能耳标"
              extra={
                animalDetails.eartag && animalDetails.eartag.length > 0
                  ? renderBatteryInfo(animalDetails.eartag[0].F_Quantity, `IMEI ${animalDetails.eartag[0].F_IMEI}`)
                  : '暂无数据'
              }
              radius={0}
            />
            <Cell
              title="智能项圈"
              extra={
                animalDetails.necklace && animalDetails.necklace.length > 0
                  ? renderBatteryInfo(animalDetails.necklace[0].F_Quantity, `IMEI ${animalDetails.necklace[0].F_IMEI}`)
                  : '暂无数据'
              }
              radius={0}
            />
          </CellGroup>

          <CellGroup title="牲畜信息" radius={0}>
            <Cell title="牲畜种类" extra={animalDetails.cowinfo[0].F_Type_Id} radius={0} isLink />
            <Cell title="品种" extra={animalDetails.cowinfo[0].type} radius={0} isLink />
            <Cell title="性别" extra={animalDetails.cowinfo[0].F_Sex?'公':'母'} radius={0} isLink />
            <Cell title="出生时间" extra={animalDetails.cowinfo[0].F_Birthday} radius={0} isLink />
            <Cell title="出生体重" extra={animalDetails.cowinfo[0].F_Csweight} radius={0} isLink />
            <Cell title="年龄" extra={animalDetails.cowinfo[0].brithday} radius={0} isLink />
            <Cell title="当前体重" extra={animalDetails.cowinfo[0].F_Weight} radius={0} isLink />
            <Cell title="当前状态" extra={animalDetails.cowinfo[0].F_State?'异常':'健康'} radius={0} isLink />
            <Cell title="当前状态" extra={animalDetails.cowinfo[0].F_Type_Id} radius={0} isLink />
          </CellGroup>

          <Navigator url='/traceabilityPack/pages/traceability/index' className='traceability-button-container'>
            <button type='primary' size='large' className='btn'>
              溯源信息
            </button>
          </Navigator>
        </ConfigProvider>
      </View>
    </View>
  );
};

export default AnimalDetails;
