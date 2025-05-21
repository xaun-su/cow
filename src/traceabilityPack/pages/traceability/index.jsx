import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components';
import './index.less'; // 引入样式文件
import imge from '@/static/images/animal.png';
import { ConfigProvider, Tabs, Swiper } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro'; // 导入 Taro API
import TitleH5 from '@/components/TitleH5/index';

// 导入分离出的组件
import BasicInfoSection from '@/components/traceabilityComponents/BasicInfoSection';
import HealthInfoSection from '@/components/traceabilityComponents/HealthInfoSection';
import QuarantineInfoSection from '@/components/traceabilityComponents/QuarantineInfoSection';
import VaccineInfoSection from '@/components/traceabilityComponents/VaccineInfoSection';
import BreedingInfoSection from '@/components/traceabilityComponents/BreedingInfoSection';


const AnimalDetails = () => {
  const [id ,setId] = useState('')
  useEffect(() => {
    console.log('id是', Taro.getCurrentInstance().router.params.id);
    const id = Taro.getCurrentInstance().router.params.id;
    setId(id)
    //获取溯源数据
  })

  // Swiper 的 ref
  const swiperRef = useRef(null)
  // Tab 和 Swiper 共用的当前索引状态
  const [tabIndex, setTabIndex] = useState(0)

  const customTheme = {
    // 将 Cell.Group 的外边距设置为 0
    '--nutui-cell-group-wrap-margin': '0',
    '--nutui-cell-group-wrap-padding': '0',
    '--nutui-button-border-radius': '0',
    '--nutui-tabs-titles-background-color': '#fff', // Tab 背景色为白色
    '--nutui-tabs-titles-item-color': '#686868', // 未选择文字颜色
    '--nutui-tabs-titles-item-active-color': '#56c695', // 选中文字颜色
  };

  // 定义 TabPane 的 value (现在主要通过 index 来控制 Swiper)
  const tabValues = {
    basicInfo: 0, // 使用数字索引
    healthInfo: 1,
    quarantineInfo: 2,
    vaccineInfo: 3,
    breedingInfo: 4,
  };

  // Swiper 容器的高度状态，用于动态设置
  const [swiperHeight, setSwiperHeight] = useState(300); // 初始设置为一个合理的最小高度

  // 动态计算内容高度
  const calculateHeight = (index) => {
    // 只有当对应的组件被渲染时才尝试测量高度
    if (tabIndex !== index) {
      return; // 如果不是当前激活的Tab，不进行测量
    }

    // 确保在 DOM 更新后执行
    Taro.nextTick(() => {
      Taro.createSelectorQuery()

        .select(`#content-${index}`)
        .boundingClientRect(rect => {
          if (rect && rect.height > 0) {
   
            setSwiperHeight(rect.height);
          } else {
            // 如果测量失败或高度为0，设置一个默认高度
            console.warn(`Failed to measure height for tab index ${index}, using default height.`);
            setSwiperHeight(300); // 测量失败时使用默认高度
          }
        })
        .exec()
    })
  }

  // 初始化获取首屏高度
  useEffect(() => {
    // 在组件挂载后测量初始 Tab 的高度
    // 使用 setTimeout 确保 DOM 已经渲染完成
    // 初始 tabIndex 是 0，所以测量第一个 Tab 的高度
    const timer = setTimeout(() => {
      calculateHeight(tabIndex);
    }, 50); // 延迟 50ms，可以根据需要调整

    return () => clearTimeout(timer); // 清理定时器
  }, []); // 空依赖数组表示只在组件挂载和卸载时执行

  // 当 tabIndex 改变时，测量新 Tab 的高度
  useEffect(() => {
    // 只有当 tabIndex 改变时才重新测量
    // calculateHeight 内部已经做了判断，只测量当前激活的 Tab
    calculateHeight(tabIndex);
  }, [tabIndex]); // 依赖 tabIndex，当 tabIndex 变化时触发

  // console.log('image path:', imge); // 打印图片路径

  return (
    <View className='animal-detail'>
      <View>
        {process.env.TARO_ENV === 'h5' && <TitleH5 title='溯源记录' />}
      </View>
      {/* 条件渲染：只有在 "基本信息" Tab (索引为0) 中才显示图片 */}
      {tabIndex === tabValues.basicInfo && (
        <View className='animal-detail-header'>
          <Image src={imge} className='animal-detail-header-image' />
        </View>
      )}

      <View className='animal-detail-content'>
        {/* 使用 ConfigProvider 包裹需要应用自定义主题的组件 */}
        <ConfigProvider themeVars={customTheme}>
          {/* Tabs 组件，只用于显示标题和切换 Swiper */}
          <Tabs
            value={tabIndex} // 绑定当前索引
            onChange={(page) => {
              // 点击 Tab 时，切换 Swiper
              swiperRef.current.to(page)
            }}
            activeType='none' // 样式已移至 ConfigProvider
            style={{
              '--nutui-tabs-titles-item-color': '#686868',
              '--nutui-tabs-titles-item-active-color': '#56c695',
            }}
          >
            {/* TabPane 只保留标题，内容移至 Swiper.Item */}
            <Tabs.TabPane title='基本信息' value={tabValues.basicInfo} />
            <Tabs.TabPane title='健康信息' value={tabValues.healthInfo} />
            <Tabs.TabPane title='检疫信息' value={tabValues.quarantineInfo} />
            <Tabs.TabPane title='疫苗信息' value={tabValues.vaccineInfo} />
            <Tabs.TabPane title='繁殖信息' value={tabValues.breedingInfo} />
          </Tabs>

          {/* Swiper 组件，用于显示每个 Tab 对应的内容 */}
          <Swiper
            defaultValue={0} // 初始显示第一个 Item
            loop={false} // 不循环滑动
            ref={swiperRef} // 获取 Swiper 实例
            // 动态设置 Swiper 容器的高度
            height={swiperHeight}
            onChange={(e) => {
              // 滑动 Swiper 时，更新 Tab 的选中状态
              const newIndex = e.detail.current;
              setTabIndex(newIndex); // e.detail.current 是当前显示的 Item 索引
            }}
          >
            <Swiper.Item>
              {/* 将分离出的组件放在这个 View 内部 */}
              <View id={`content-${tabValues.basicInfo}`}>
                {/* 只有当主 Tab 是基本信息时，才渲染 BasicInfoSection */}
                {tabIndex === tabValues.basicInfo && <BasicInfoSection id={id}/>}
              </View>
            </Swiper.Item>

            <Swiper.Item>
              <View id={`content-${tabValues.healthInfo}`}>
                {tabIndex === tabValues.healthInfo && <HealthInfoSection id={id} />}
              </View>
            </Swiper.Item>

            <Swiper.Item>
              <View id={`content-${tabValues.quarantineInfo}`}>
                {tabIndex === tabValues.quarantineInfo && <QuarantineInfoSection id={id}/>}
              </View>
            </Swiper.Item>

            <Swiper.Item>
              <View id={`content-${tabValues.vaccineInfo}`}>
                {tabIndex === tabValues.vaccineInfo && <VaccineInfoSection id={id}/>}
              </View>
            </Swiper.Item>

            <Swiper.Item>
              <View id={`content-${tabValues.breedingInfo}`}>
                {tabIndex === tabValues.breedingInfo && <BreedingInfoSection id={id} />}
              </View>
            </Swiper.Item>
          </Swiper>
        </ConfigProvider>
      </View>
    </View>
  );
};

export default AnimalDetails;
