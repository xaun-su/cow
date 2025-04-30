import React from 'react';
import Taro from '@tarojs/taro';
import CustomNavBar from '@/components/CustomNavBar/CustomNavBar';
import './index.less';
import { View, Text, Navigator } from '@tarojs/components'; // 导入 Image 组件
import { Add, ArrowRight } from '@nutui/icons-react-taro'
import { Avatar } from '@nutui/nutui-react-taro'

const systemInfo = Taro.getSystemInfoSync();
const statusBarHeight = systemInfo.statusBarHeight; // 状态栏高度
const customNavHeight = 44; // 自定义导航栏的高度
const totalNavHeight = statusBarHeight + customNavHeight; // 导航栏总高度


const Index = () => {
  return (
    <View className='index-container'> {/* 容器 */}

      {/* 背景图片元素 */}
      <View className='index-background'></View>
      {/* 导航栏组件，确保它在背景元素的上方 */}
      <CustomNavBar title='管理' className='index-nav-bar' />


      {/* 内容区域 */}
      <View
        className='index-content'
        style={{
          marginTop: `10vh`,
        }}
      >
        <View className='category'>
          <View className='category-item'> {/* 将 className 和 key 放在同一层 View */}
            {/* 左侧：头像和文本 */}
            <View className='item-left'> {/* 包裹头像和文本的容器，水平 flex */}
              {/* 确保导入了 User 图标 */}
              <Avatar icon={<Text className='iconfont icon-yaoqingniuren' style={{fontSize:'40px'}}></Text>} size="50" color="#fff"
                background="#0bcb77" className='normal' style={{
                  border: '2px solid #fff', // 白色边框
                }} /> {/* 头像 */}
              <View className='item-text'> {/* 包裹文本的容器，垂直 flex */}
                <Text className='item-title'>牲畜编号</Text> {/* 标题文本 */}
                <Text className='item-imei'>IMEI: 1234567890</Text> {/* IMEI 文本 */}
              </View>
            </View>
              
            {/* 右侧：箭头 */}
            <Navigator className='item-right' url='/managePack/pages/basicInformation/index'> {/* 包裹箭头的容器 */}
              <ArrowRight /> {/* 箭头图标 */}
            </Navigator>
          </View>
        </View>
        {/* 牲畜报道 */}
        <View className='reports'>

          <View className='report-list'>
            <View className='report-item'>
              <View className='num'>62</View>
              <View className='text'>社畜数量</View>
            </View>
            <View className='report-item'>
              <View className='num'>61</View>
              <View className='text'>健康数量</View>
            </View>
            <View className='report-item'>
              <View className='prompt'>1</View>
              <View className='text'>异常数量</View>
            </View>
          </View>
        </View>


        {/* 图标区域 */}
        <View className='icon-container'>
          {/* {Array.from({ length: 8 }, (_, i) => ( */}
          <View className='icon-item'>
            <Avatar icon={<Text className='iconfont icon-yaoqingniuren'></Text>}  background="#39a8ff" shape="round" size="50" />
            <Text className='text'>牲畜信息</Text>
          </View>
          <Navigator className='icon-item' url='/managePack/pages/vaccineManagement/index'>
            <Avatar icon={<Text className='iconfont icon-zhijiandan-2'></Text>} background="#ff6969" shape="round" size="50" />
            <Text className='text'>检疫管理</Text>
          </Navigator>
          <Navigator className='icon-item' url='/managePack/pages/quarantineManagement/index'>
            <Avatar icon={<Text className='iconfont icon-zhenguan'></Text>} background="#fecc4e" shape="round" size="50" />
            <Text className='text'>疫苗管理</Text>
          </Navigator>
          <Navigator className='icon-item' url='/managePack/pages/breedingManage/index'>
            <Avatar icon={<Text className='iconfont icon-xingbie'></Text>}  background="#15d5d1" shape="round" size="50" />
            <Text className='text'>配种管理</Text>
          </Navigator>
          <Navigator className='icon-item' url='/managePack/pages/reproductionManagement/index'>
            <Avatar icon={<Text className='iconfont icon-jilu'></Text>}  background="#26d392" shape="round" size="50" />
            <Text className='text'>繁殖管理</Text>

          </Navigator>
          <View className='icon-item'>
            <Avatar icon={<Text className='iconfont icon-weibiaoti--copy'></Text>}  background="#fd7425" shape="round" size="50" />
            <Text className='text'>牧场信息</Text>

          </View>
          <Navigator className='icon-item' url='/managePack/pages/videoSurveillance/index'>
            <Avatar icon={<Text className='iconfont icon-jiankongshexiangtou-xianxing'></Text>}  background="#0eafeb" shape="round" size="50" />
            <Text className='text'>视频监控</Text>

          </Navigator>
          <Navigator className='icon-item'  url='/homePack/pages/message/index'>
            <Avatar icon={<Text className='iconfont icon-00-baojingjilu-05-05'></Text>} background="#fbc145" shape="round" size="50" />
            <Text className='text'>报警记录</Text>

          </Navigator>
          {/* ))} */}
        </View>
      </View>
    </View>
  );
};

export default Index;
