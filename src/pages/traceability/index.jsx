// src/pages/animal-details/index.jsx
import React, { useRef, useState, useEffect } from 'react'; // 导入 useEffect
import { View, Text, Image } from '@tarojs/components';
import './index.less'; // 引入样式文件
import imge from '../../static/images/animal.png';
// 导入需要的 NutUI 组件，包括 ConfigProvider, Cell, CellGroup, Tabs, Swiper 以及图标
import { Button, Cell, ConfigProvider, CellGroup, Tabs, CircleProgress, Swiper } from '@nutui/nutui-react-taro';
// 导入 NutUI 图标，例如 Battery
import { Add, ArrowRight } from '@nutui/icons-react-taro'; // 导入电池图标
import { Steps, Step } from '@nutui/nutui-react-taro'
import imge2 from '../../static/images/证明.png';
import Taro from '@tarojs/taro'; // 导入 Taro API
import EchartsZ from '../../components/echarths/index'
const gradientColor = {
  '0%': '#FF5E5E',
  '100%': '#FFA062',
}

const AnimalDetails = () => {
  // Swiper 的 ref
  const swiperRef = useRef(null)
  // Tab 和 Swiper 共用的当前索引状态
  const [tabIndex, setTabIndex] = useState(0)
  const [movementTabIndex, setMovementTabIndex] = useState('0'); // 运动量 Tab 状态
  const [temperatureTabIndex, setTemperatureTabIndex] = useState('0'); // 体温 Tab 状态

  // 定义一个自定义主题变量对象，用于覆盖 NutUI 的默认样式变量
  const customTheme = {
    // 将 Cell.Group 的外边距设置为 0
    '--nutui-cell-group-wrap-margin': '0',
    '--nutui-cell-group-wrap-padding': '0',
    '--nutui-button-border-radius': '0',
    '--nutui-tabs-titles-background-color': '#fff', // Tab 背景色为白色
    '--nutui-tabs-titles-item-color': '#686868', // 未选择文字颜色
    '--nutui-tabs-titles-item-active-color': '#56c695', // 选中文字颜色
    // 将原来 Tabs 上的 inline 样式也移到这里
    '--nutui-tabs-titles-item-color': '#686868 !important',
    '--nutui-tabs-titles-item-active-color': '#56c695 !important',
  };
  // const marginStyle = { width: '100%' }; // 这个变量似乎没有被使用，可以考虑移除

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
    Taro.nextTick(() => {
      Taro.createSelectorQuery()
        // 使用 ID 选择器选中对应的内容容器 View
        .select(`#content-${index}`)
        .boundingClientRect(rect => {
          if (rect && rect.height > 0) {
            // 设置 Swiper 容器的高度，确保至少有一个最小高度
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
    const timer = setTimeout(() => {
      calculateHeight(tabIndex); // 测量初始选中的 Tab (tabIndex 默认为 0)
    }, 50); // 延迟 50ms，可以根据需要调整

    return () => clearTimeout(timer); // 清理定时器
  }, []); // 空依赖数组表示只在组件挂载和卸载时执行

  // 当 tabIndex 改变时，测量新 Tab 的高度
  useEffect(() => {
    // 只有当 tabIndex 改变时才重新测量
    calculateHeight(tabIndex);
  }, [tabIndex]); // 依赖 tabIndex，当 tabIndex 变化时触发


  // 渲染电池和 IMEI 的函数或组件
  const renderBatteryInfo = (percentage, imei) => {
    // 根据百分比选择电池图标（这里简化，只用一个图标，实际可以根据值选择不同状态的图标）
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
    )
    return (
      <View className='battery-info'> {/* 添加一个容器方便布局 */}
        <Text style={{ color: batteryColor, fontSize: '12px', marginRight: '5px' }}>{percentage}%</Text> {/* 百分比和图标之间的间距 */}
        {batteryIcon}
        <Text style={{ color: '#a0a0a0', fontSize: '12px' }}>{imei}</Text>
      </View>
    );
  };

  console.log('image path:', imge); // 打印图片路径

  return (
    <View className='animal-detail'>
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
              swiperRef.current?.to(page)
              // setTabIndex(page) // tabIndex 的更新交给 Swiper 的 onChange
            }}
            activeType='none' // 样式已移至 ConfigProvider
            style={{    // 将原来 Tabs 上的 inline 样式也移到这里
              '--nutui-tabs-titles-item-color': '#686868 !important',
              '--nutui-tabs-titles-item-active-color': '#56c695 !important',
            }} // 样式已移至 ConfigProvider
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
              // 在这里测量新 Item 的高度并更新 SwiperHeight
              // calculateHeight(newIndex); // 这一步已经通过 useEffect 监听 tabIndex 变化来触发
            }}
          >
            {/* 基本信息内容 */}
            <Swiper.Item>
              {/* !!! 为内容包裹一个 View，并设置 ID 用于测量 !!! */}
              <View id={`content-${tabValues.basicInfo}`}>
                <Cell
                  title='牲畜编号'
                  extra=<Text style={{ color: "#fe5520" }}>偏瘦</Text> // 右侧内容
                  isLink // 添加箭头
                  radius={0} // Cell 本身不带圆角
                />
                {/* 设备信息分组 */}
                <CellGroup title=' 设备信息' radius={0} style={
                  {
                    backgroundColor: '#efefef',
                  }
                }>
                  <Cell
                    title='智能耳标'
                    extra={renderBatteryInfo(80, 'IMEI 123456789')} // 自定义右侧内容
                    radius={0}
                  />
                  <Cell
                    title='智能项圈'
                    extra={renderBatteryInfo(1, 'IMEI 123456789')} // 自定义右侧内容
                    radius={0}
                  />
                </CellGroup>

                {/* 牲畜信息分组 */}
                <CellGroup title=' 牲畜信息' radius={0} style={
                  {
                    backgroundColor: '#efefef',
                  }
                }>
                  <Cell title='牲畜种类' extra='牛' radius={0} />
                  <Cell title='品种' extra='小黄牛' radius={0} />
                  <Cell title='性别' extra='公' radius={0} />
                  <Cell title='出生日期(打标)' extra='2021-1-24' radius={0} />
                  <Cell title='出生地' extra='兰蓝牛场' radius={0} />
                  <Cell title='年龄' extra='5岁两个月' radius={0} />
                  <Cell title='当前体重' extra='900KG' radius={0} />
                  <Cell title='当前状态' extra='生长中' radius={0} />
                  <Cell title='是否繁殖' extra='900KG' radius={0} />
                  <Cell title='是否绝育' extra='生长中' radius={0} />
                </CellGroup>
              </View>
            </Swiper.Item>

            {/* 健康信息内容 */}
            <Swiper.Item>
              {/* !!! 为内容包裹一个 View，并设置 ID 用于测量 !!! */}
              <View id={`content-${tabValues.healthInfo}`}>
                <Cell title='活跃度' radius={0} style={
                  {
                    '--nutui-cell-background-color': '#efefef',
                  }
                } />
                <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-evenly', padding: '40px 0' }}>
                  <div style={{ fontSize: '30px' }}>活跃</div>
                  <div style={{ fontSize: '30px' }}>123</div>
                </div>
                <Cell title='健康指标' radius={0} style={
                  {
                    '--nutui-cell-background-color': '#efefef',
                  }
                } />
                <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '40px 0' }}>
                  <CircleProgress percent={50} color="#1988fa">
                    50%
                  </CircleProgress>
                  <CircleProgress percent={100} color={gradientColor}>
                    100%
                  </CircleProgress>
                </div>
                <Cell title='运动量' radius={0} style={
                  {
                    '--nutui-cell-background-color': '#efefef',
                  }
                } />
                <> {/* 内层 Tab 保持不变 */}
                  <Tabs
                    value={movementTabIndex}
                    onChange={(value) => {
                      setMovementTabIndex(value)
                    }}
                    activeType='none'
                    style={{
                      '--nutui-tabs-titles-item-color': '#686868 !important',
                      '--nutui-tabs-titles-item-active-color': '#56c695 !important',
                    }}
                  >
                    <Tabs.TabPane title="一周内">
                      <EchartsZ />
                    </Tabs.TabPane>
                    <Tabs.TabPane title="一个月内"> <EchartsZ /></Tabs.TabPane>
                    <Tabs.TabPane title="一年内"><EchartsZ /> </Tabs.TabPane>
                  </Tabs>
                </>


                <Cell title='体温' radius={0} style={
                  {
                    '--nutui-cell-background-color': '#efefef',
                  }
                } />
                <> {/* 内层 Tab 保持不变 */}
                  <Tabs
                    activeType='none'
                    value={temperatureTabIndex} 
                    onChange={(value) => {
                      setTemperatureTabIndex(value) 
                    }}
                    style={{
                      '--nutui-tabs-titles-item-color': '#686868 !important',
                      '--nutui-tabs-titles-item-active-color': '#56c695 !important',
                    }}
                  >
                    <Tabs.TabPane title="一周内">
                      <EchartsZ />
                    </Tabs.TabPane>
                    <Tabs.TabPane title="一个月内"> {/* 内层 Tab 2 的内容 */} <EchartsZ /> </Tabs.TabPane>
                    <Tabs.TabPane title="一年内"> {/* 内层 Tab 3 的内容 */} <EchartsZ /> </Tabs.TabPane>
                  </Tabs>
                </>
              </View>
            </Swiper.Item>

            {/* 检疫信息内容 */}
            <Swiper.Item>
              {/* !!! 为内容包裹一个 View，并设置 ID 用于测量 !!! */}
              <View id={`content-${tabValues.quarantineInfo}`}>
                <Cell title='检疫信息' radius={0} style={
                  {
                    '--nutui-cell-background-color': '#f5f5f5',
                  }
                } />
                <div style={{
                  padding: '15px 30px',
                  '--nutui-steps-process-icon-before-bg-color': '#e2f9f2', // 进行中点状进度条点的外边颜色
                  '--nutui-steps-process-icon-bg-color': '#e2f9f2', // 进行中icon容器背景色
                  '--nutui-steps-process-icon-color': '#70ba77', // 进行中icon容器字体颜色
                  '--nutui-steps-finish-icon-bg-color': '#e2f9f2', // 完成状态icon 容器的背景色
                  '--nutui-steps-finish-icon-color': '#70ba77', // 完成状态icon 容器的字体颜色
                  '--nutui-steps-finish-line-background': '#a5a5a5', // 完成状态分割线的颜色
                  '--nutui-steps-base-description-color': '#666666', // 描述文案的字体颜色
                  '--nutui-steps-dot-icon-width': '8px', // 点状进度条点的宽度
                  '--nutui-steps-dot-icon-height': '8px', // 点状进度条点的高度
                  '--nutui-steps-dot-icon-border': 'none', // 点状进度条点的边框
                  '--nutui-steps-dot-head-margin': '8px 0 0 0', // 点状进度条点的外边距
                  '--nutui-steps-base-title-color': '#a5a5a5',
                }}>
                  <Steps direction='vertical' dot value={5}>
                    <Step
                      value={1}
                      title='2024-12-21'
                      description={
                        <View>
                          <p>检疫单位: 123122143</p>
                          <p>
                            检疫类型: 123542135`14`
                          </p>
                          <p>
                            检疫人员: 2`134`4234
                          </p>
                          <Image src={imge2} style={{
                            width: '250px',
                            height: '400px'
                          }}></Image>

                        </View>
                      }
                    />
                    <Step
                      value={2}
                      title='2024-4-12'
                      description={
                        <View>
                          <p>检疫单位: 123122143</p>
                          <p>
                            检疫类型: 123542135`14`
                          </p>
                          <p>
                            检疫人员: 2`134`4234
                          </p>
                          <Image src={imge2} style={{
                            width: '250px',
                            height: '400px'
                          }}></Image>

                        </View>
                      }
                    />
                  </Steps>
                </div>
              </View>
            </Swiper.Item>

            {/* 疫苗信息内容 */}
            <Swiper.Item>
              {/* !!! 为内容包裹一个 View，并设置 ID 用于测量 !!! */}
              <View id={`content-${tabValues.vaccineInfo}`}>
                <Cell title='证明材料' radius={0} style={
                  {
                    '--nutui-cell-background-color': '#f5f5f5',
                  }
                } />
                <Cell title='动物诊疗许可证' extra={<ArrowRight />} radius={0} />
                <Cell title='动物防疫合格证' extra={<ArrowRight />} radius={0} />
                <Cell title='疫苗生产批次和有效期证明' extra={<ArrowRight />} radius={0} />
                <Cell title='疫苗运输和储存温度记录' extra={<ArrowRight />} radius={0} />
                <Cell title='免疫接种记录' extra={<ArrowRight />} radius={0} />
                <Cell title='疫苗记录' radius={0} style={
                  {
                    '--nutui-cell-background-color': '#f5f5f5',
                  }
                } />
                <div style={{
                  padding: '15px 30px',
                  '--nutui-steps-process-icon-before-bg-color': '#e2f9f2', // 进行中点状进度条点的外边颜色
                  '--nutui-steps-process-icon-bg-color': '#e2f9f2', // 进行中icon容器背景色
                  '--nutui-steps-process-icon-color': '#70ba77', // 进行中icon容器字体颜色
                  '--nutui-steps-finish-icon-bg-color': '#e2f9f2', // 完成状态icon 容器的背景色
                  '--nutui-steps-finish-icon-color': '#70ba77', // 完成状态icon 容器的字体颜色
                  '--nutui-steps-finish-line-background': '#a5a5a5', // 完成状态分割线的颜色
                  '--nutui-steps-base-description-color': '#666666', // 描述文案的字体颜色
                  '--nutui-steps-dot-icon-width': '8px', // 点状进度条点的宽度
                  '--nutui-steps-dot-icon-height': '8px', // 点状进度条点的高度
                  '--nutui-steps-dot-icon-border': 'none', // 点状进度条点的边框
                  '--nutui-steps-dot-head-margin': '8px 0 0 0', // 点状进度条点的外边距
                  '--nutui-steps-base-title-color': '#a5a5a5',
                }}>
                  <Steps direction="vertical" dot value={2}>
                    <Step
                      value={1}
                      title="2024-01-15"
                      description={
                        <>
                          <p>疫苗批次号:x1231231231</p>
                          <p>疫苗名称:请问企鹅</p>
                          <p>操作人员:xxxx</p>
                        </>
                      }
                    />
                    <Step
                      value={2}
                      title="2024-01-15"
                      description={
                        <>
                          <p>疫苗批次号:x1231231231</p>
                          <p>疫苗名称:请问企鹅</p>
                          <p>操作人员:xxxx</p>
                        </>
                      }
                    />
                  </Steps>
                </div>
              </View>
            </Swiper.Item>

            {/* 繁殖信息内容 */}
            <Swiper.Item>
              {/* !!! 为内容包裹一个 View，并设置 ID 用于测量 !!! */}
              <View id={`content-${tabValues.breedingInfo}`}>
                <Cell title='繁殖记录' radius={0} style={
                  {
                    '--nutui-cell-background-color': '#f5f5f5',
                  }
                } />
                <div style={{
                  padding: '15px 30px',
                  '--nutui-steps-process-icon-before-bg-color': '#e2f9f2', // 进行中点状进度条点的外边颜色
                  '--nutui-steps-process-icon-bg-color': '#e2f9f2', // 进行中icon容器背景色
                  '--nutui-steps-process-icon-color': '#70ba77', // 进行中icon容器字体颜色
                  '--nutui-steps-finish-icon-bg-color': '#e2f9f2', // 完成状态icon 容器的背景色
                  '--nutui-steps-finish-icon-color': '#70ba77', // 完成状态icon 容器的字体颜色
                  '--nutui-steps-finish-line-background': '#a5a5a5', // 完成状态分割线的颜色
                  '--nutui-steps-base-description-color': '#666666', // 描述文案的字体颜色
                  '--nutui-steps-dot-icon-width': '8px', // 点状进度条点的宽度
                  '--nutui-steps-dot-icon-height': '8px', // 点状进度条点的高度
                  '--nutui-steps-dot-icon-border': 'none', // 点状进度条点的边框
                  '--nutui-steps-dot-head-margin': '8px 0 0 0', // 点状进度条点的外边距
                  '--nutui-steps-base-title-color': '#a5a5a5',
                }}>
                  <Steps direction='vertical' dot value={5}>
                    <Step
                      value={1}
                      title='出生'
                      description={
                        <View>
                          <p>出生时间: 2024-01-24</p>
                          <p>
                            公 畜: IMEI: <Text style={{ color: '#70ba77' }}>866452264124</Text>
                          </p>
                          <p>
                            母 畜: IMEI: <Text style={{ color: '#70ba77' }}>866452264122</Text>
                          </p>
                          <p>出生体重: 10KG</p>
                          <p>操作 员: xxxx</p>
                        </View>
                      }
                    />
                    <Step
                      value={2}
                      title='**'
                      description={
                        <View>
                          <p>预测交配时间: 2024-01-24</p>
                          <p>实际交配时间: 2024-01-24</p>
                          <p>操作 员: xxxx</p>
                        </View>
                      }
                    />
                    <Step
                      value={3}
                      title='配种'
                      description={
                        <View>
                          <p>配种时间: 2024-01-24</p>
                          <p>
                            配种牲畜: IMEI: <Text style={{ color: '#70ba77' }}>866452264122</Text>
                          </p>
                          <p>操作 员: xxxx</p>
                        </View>
                      }
                    />
                    <Step
                      value={4}
                      title='生育'
                      description={
                        <View>
                          <p>生育时间: 2024-01-24</p>
                          <p>
                            生育牲畜: IMEI: <Text style={{ color: '#70ba77' }}>866452264122</Text>
                          </p>
                          <p>操作 员: xxxx</p>
                        </View>
                      }
                    />
                    <Step
                      value={5}
                      title='节育'
                      description={
                        <View>
                          <p>节育时间: 2024-01-24</p>
                          <p>操作 员: xxxx</p>
                        </View>
                      }
                    />
                  </Steps>
                </div>
              </View>
            </Swiper.Item>
          </Swiper>
        </ConfigProvider>
      </View>
    </View>
  );
};

export default AnimalDetails;
