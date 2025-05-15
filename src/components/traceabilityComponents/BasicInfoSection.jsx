import React, { useEffect, useState } from 'react';
import { View, Text } from '@tarojs/components';
import { Cell, CellGroup } from '@nutui/nutui-react-taro';
import { getBasicInfoData } from '@/api/traceability';

const BasicInfoSection = (props) => {
  const { id } = props;

  //接受父组件传来的id
  const [data, setData] = useState({});

  useEffect(() => {
    const basid = id;
    console.log('挂载基本信息id是', basid);

    const fetchData = async () => {
      try {
        const result = await getBasicInfoData(basid);
        console.log('基本信息', result.data);
        if (result && result.data && typeof result.data === 'object') {
          // 进一步检查 data 对象中是否包含你需要的关键字段，例如 cowinfo
          // 确保 data.cowinfo 是一个数组且有元素
          if (result.data.cowinfo && Array.isArray(result.data.cowinfo) && result.data.cowinfo.length > 0) {
            setData(result.data); // 数据有效，设置 state
          } else {
            // API 返回的 data 对象没有 cowinfo 字段，或者 cowinfo 是空数组
            console.warn('获取到的基本信息数据结构不完整或无牛信息', result.data);
            setData({}); // 设置为空对象，完整或无牛信息', result.data);
            setData({}); // 设置为空对象，表示没有有效数据
          }
        } else {
          console.error('获取基本信息失败或返回数据无效', result);
          setData({}); // 设置为空对象，表示数据获取失败或无效
        }
      } catch (error) {
        // 捕获网络请求本身的错误
        console.error('获取基本信息请求出错', error);
        setData({}); // 请求出错时也设置为空对象
      }
    };

    if (id) {
      fetchData();
    } else {
      console.log('id 尚未有效，不执行数据获取');
      setData({});
    }
  }, [id]);

  // 渲染电池和 IMEI 的函数或组件
  const renderBatteryInfo = (percentage, imei) => {
    const batteryColor = percentage > 20 ? '#0bcb75' : '#ff4d4f'; // 绿色或红色
    const batteryIcon = (
      <Text
        className='iconfont icon-electricity-full' // iconfont 的基础类和你的电池图标类
        style={{
          color: batteryColor, // 根据百分比动态设置颜色
          fontSize: '16px', // 设置图标大小，根据需要调整
          verticalAlign: 'middle', // 垂直居中对齐
          marginRight: '5px' // 图标和 IMEI 之间的间距
        }}
      ></Text>
    );
    return (
      <View className='battery-info'> {/* 添加一个容器方便布局 */}
        <Text style={{ color: batteryColor, fontSize: '12px', marginRight: '5px' }}>
          {percentage ? `${percentage}%` : 'N/A'}
        </Text> {/* 百分比和图标之间的间距 */}
        {batteryIcon}
        <Text style={{ color: '#a0a0a0', fontSize: '12px' }}>{imei || 'N/A'}</Text>
      </View>
    );
  };

  // 提供一个安全的获取值的函数
  const getValueOrNA = (value) => {
    return value !== undefined && value !== null ? value : 'N/A';
  };

  return (
    <>
      <Cell
        title='牲畜编号'
        extra={<Text style={{ color: "#fe5520" }}>
          {data.cowinfo && data.cowinfo.length > 0
            ? data.cowinfo[0].tzzb === 1
              ? '偏瘦'
              : data.cowinfo[0].tzzb === 2
                ? '正常'
                : data.cowinfo[0].tzzb === 3
                  ? '偏胖'
                  : '未知'
            : 'N/A'}
        </Text>} // 右侧内容
        isLink // 添加箭头
        radius={0} // Cell 本身不带圆角
      />

      {/* 设备信息分组 */}
      <CellGroup title=' 设备信息' radius={0} style={{
        backgroundColor: '#efefef',
      }}>
        <Cell
          title='智能耳标'
          extra={data.eartag && data.eartag.length > 0
            ? renderBatteryInfo(data.eartag[0].F_Quantity, `IMEI ${data.eartag[0].F_IMEI}`)
            : '暂无数据'} // 自定义右侧内容
          radius={0}
        />
        <Cell
          title='智能项圈'
          extra={data.necklace && data.necklace.length > 0
            ? renderBatteryInfo(data.necklace[0].F_Quantity, `IMEI ${data.necklace[0].F_IMEI}`)
            : '暂无数据'} // 自定义右侧内容
          radius={0}
        />
      </CellGroup>

      {/* 牲畜信息分组 */}
      <CellGroup title=' 牲畜信息' radius={0} style={{
        backgroundColor: '#efefef',
      }}>
        <Cell title="牲畜种类" extra={getValueOrNA(data.cowinfo?.[0]?.F_Type_Id)} radius={0} isLink />
        <Cell title="品种" extra={getValueOrNA(data.cowinfo?.[0]?.type)} radius={0} isLink />
        <Cell title="性别" extra={getValueOrNA(data.cowinfo?.[0]?.F_Sex ? '公' : '母')} radius={0} isLink />
        <Cell title="出生时间" extra={getValueOrNA(data.cowinfo?.[0]?.F_Birthday)} radius={0} isLink />
        <Cell title="出生体重" extra={getValueOrNA(data.cowinfo?.[0]?.F_Csweight)} radius={0} isLink />
        <Cell title="年龄" extra={getValueOrNA(data.cowinfo?.[0]?.brithday)} radius={0} isLink />
        <Cell title="当前体重" extra={getValueOrNA(data.cowinfo?.[0]?.F_Weight)} radius={0} isLink />
        <Cell title="当前状态" extra={getValueOrNA(data.cowinfo?.[0]?.F_State ? '异常' : '健康')} radius={0} isLink />
        <Cell title='是否繁殖' extra='正常' radius={0} />
        <Cell title='是否绝育' extra='生长中' radius={0} />
      </CellGroup>
    </>
  );
};

export default BasicInfoSection;
