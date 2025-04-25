import React from 'react'
import { Tabbar } from '@nutui/nutui-react-taro'
import { Location, Order, Home ,Setting} from '@nutui/icons-react-taro'

const Demo8 = () => (
  <Tabbar inactiveColor="#7d7e80" activeColor="#33bb8a" fixed>
    <Tabbar.Item title="首页" icon={<Home />} />
    <Tabbar.Item title="地图" icon={<Location />} />
    <Tabbar.Item title="牲畜" icon={<Order />} />
    <Tabbar.Item title="管理" icon={<Setting />} />
  </Tabbar>
)

export default Demo8
