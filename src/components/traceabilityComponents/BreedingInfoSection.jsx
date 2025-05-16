// src/pages/animal-details/components/BreedingInfoSection.jsx
import React ,{useState, useEffect} from 'react';
import { View, Text } from '@tarojs/components';
import { Cell, Steps, Step } from '@nutui/nutui-react-taro';
import { getBreedingInfoData } from '@/api/traceability';

const BreedingInfoSection = ({ id }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const basid = id;
    console.log('挂载繁殖信息id是', basid);
    const fetchData = async () => {
      const res = await getBreedingInfoData(id);
      console.log('繁殖信息', res.data);
      setData(res.data);
    }
    fetchData();
  },[id])


  return (
    <> {/* 使用 Fragment 包裹 */}
      <Cell title='繁殖记录' radius={0} style={
        {
          '--nutui-cell-background-color': '#f5f5f5',
        }
      } />
      {data.length === 0 ? <View>暂无繁殖信息</View> :
      <View style={{
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
        <Steps direction='vertical' dot value={data.length}> {/* value 可能需要根据实际数据动态设置 */}
        {data.brithDate!='无出生信息'?
          <Step
            value={1}
            title='出生'
            description={
              <View>
                <p>出生时间: {data.brithDate.brithday}</p>
                <p>
                  公 畜:  <Text style={{ color: '#70ba77' }}>IMEI:{data.brithDate.father}</Text>
                </p>
                <p>
                  母 畜:  <Text style={{ color: '#70ba77' }}>IMEI:{data.brithDate.mother}</Text>
                </p>
                <p>出生体重: {data.brithDate.Bweigth}</p>
                <p>操作 员: {data.brithDate.man}</p>
              </View>
            }
          />
          :''
        }
        {data.growthList!='无发情信息'?
          <Step
            value={2}
            title='发情'
            description={
              <View>
                <p>预测交配时间: {data.growthList.F_EsTimateTime}</p>
                <p>实际交配时间: {data.growthList.F_SjTimateTime}</p>
                <p>操作 员: {data.growthList.F_Opert}</p>
              </View>
            }
          />
          :''
        }
        {data.descentList!='无配种信息'?
          <Step
            value={3}
            title='配种'
            description={
              <View>
                <p>配种时间: {data.descentList.F_ReproTime}</p>
                <p>
                  配种牲畜:  <Text style={{ color: '#70ba77' }}>IMEI:{data.descentList.F_UserName}</Text>
                </p>
                <p>操作 员: {data.descentList.F_P}</p>
              </View>
            }
          />
          :''
        }
        {data.birth!='无生育信息'?
          <Step
            value={4}
            title='生育'
            description={
              <View>
                <p>生育时间: {data.birth.F_Birthday}</p>
                <p>
                  生育牲畜: <Text style={{ color: '#70ba77' }}>IMEI: {data.birth.F_IMEI}</Text>
                </p>
                <p>操作 员: {data.birth.F_Man}</p>
              </View>
            }
          />
          :''
        }
        {data.jyList!='无节育信息'?
          <Step
            value={5}
            title='节育'
            description={
              <View>
                <p>节育时间: {data.jyList.F_SjTimateTime}</p>
                <p>操作 员: {data.jyList.F_Opert}</p>
              </View>
            }
          />
          :''
        }
        </Steps>
      </View>
      }
    </>
  );
};

export default BreedingInfoSection;
