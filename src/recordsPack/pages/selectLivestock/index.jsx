import React, { useState, useEffect } from 'react';
import { SearchBar, Avatar, Checkbox } from '@nutui/nutui-react-taro';
import { View, Text } from '@tarojs/components';
import './index.less';
import TitleH5 from '@/components/TitleH5/index';
import { getAnimalListData } from '@/api/animal'; // 导入获取牲畜列表的 API 函数
import Taro, { useRouter } from '@tarojs/taro'; // 导入 Taro 和 useRouter 钩子

// 定义常量作为事件名称，避免写错，与各个新增页面中定义的一致
const MATING_LIVESTOCK_SELECTED_EVENT = 'matingLivestockSelected'; // 配种事件
const QUARANTINE_LIVESTOCK_SELECTED_EVENT = 'quarantineLivestockSelected'; // 检疫事件
const BIRTH_CONTROL_LIVESTOCK_SELECTED_EVENT = 'birthControlLivestockSelected'; // 新增节育事件

const SelectLivestockPage = () => {
  const [searchValue, setSearchValue] = useState(''); // 搜索框的值
  const [livestockList, setLivestockList] = useState([]); // 牲畜列表数据
  const [loading, setLoading] = useState(true); // 加载状态
  const [error, setError] = useState(null); // 错误状态

  // 使用 useRouter 钩子获取路由信息
  const router = useRouter();
  // 获取传递过来的参数
  const selectionType = router.params.type; // 'bull' 或 'cow' (用于配种 - 较旧的逻辑，但保留兼容)
  const selectionPurpose = router.params.purpose; // 'quarantine', 'breeding', 'birth-control' (新的用途区分)

  // 判断是否是单选模式 (只要 type 或 purpose 存在，就是单选)
  const isSingleSelection = selectionType || selectionPurpose;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // 开始加载
        const res = await getAnimalListData();
        console.log('Fetched animal data:', res.data);

        // 检查返回的数据是否是数组，并进行转换
        if (res.data && Array.isArray(res.data)) {
          const transformedData = res.data.map(apiItem => ({
            id: apiItem.F_Id,
            imei: apiItem.F_IMEI,
            number: apiItem.F_IMEI, // 假设牲畜编号就是 IMEI
            gender: apiItem.F_Gender, // 保留性别信息
            checked: false // 添加 checked 属性，默认未选中 (主要用于多选模式)
          }));

          // ** 不再根据 selectionType 进行性别过滤，展示所有牲畜 **

          setLivestockList(transformedData); // 将转换后的数据设置到 livestockList 状态
          setError(null); // 清除错误
        } else {
          // 处理 API 返回数据不是数组的情况
          setLivestockList([]);
          console.warn("API did not return an array in res.data:", res);
          setError("Invalid data format from API.");
        }
      } catch (err) {
        console.error('Error fetching animal data:', err);
        setError('Failed to load animal data.'); // 设置错误信息
        setLivestockList([]); // 加载失败时清空列表
      } finally {
        setLoading(false); // 结束加载
      }
    };
    fetchData();
  }, []); // 空依赖数组表示只在组件初次挂载时运行一次，不依赖任何参数，获取所有数据

  // 处理列表项点击事件 (根据模式不同)
  const handleItemClick = (item) => {
    if (isSingleSelection) { // 如果是任何一种单选模式
      console.log(`在单选模式下选中牲畜: ${item.imei}, 用途: ${selectionPurpose}, 类型: ${selectionType}`);

      if (selectionPurpose === 'quarantine') {
         // 触发检疫事件
         Taro.eventCenter.trigger(QUARANTINE_LIVESTOCK_SELECTED_EVENT, {
          purpose: selectionPurpose, // 传递 purpose
          livestock: item // 传递完整的牲畜对象
         });
      } else if (selectionPurpose === 'breeding' || selectionType) {
         // 触发配种事件 (兼容旧的 type 参数)
         Taro.eventCenter.trigger(MATING_LIVESTOCK_SELECTED_EVENT, {
          type: selectionType, // 传递 type (如果存在)
          purpose: selectionPurpose, // 传递 purpose (如果存在)
          livestock: item // 传递完整的牲畜对象
         });
      } else if (selectionPurpose === 'birth-control') {
         // 触发节育事件
         Taro.eventCenter.trigger(BIRTH_CONTROL_LIVESTOCK_SELECTED_EVENT, {
          purpose: selectionPurpose, // 传递 purpose
          livestock: item // 传递完整的牲畜对象
         });
      }
      // 返回上一页
      Taro.navigateBack();

    } else { // 如果是多选模式 (原有的逻辑，例如从疫苗记录页面过来)
      // 调用原有的复选框处理函数，模拟点击整行选中/取消选中复选框
      handleCheckboxChange(item.id, !item.checked);
    }
  };


  // 原有的处理 Checkbox 变化的函数 (只在多选模式下使用)
  const handleCheckboxChange = (id, isChecked) => {
     if (!isSingleSelection) { // 确保只在多选模式下执行
        console.log(`Checkbox ${id} changed to: ${isChecked}`);
        const newLivestockList = livestockList.map(item => {
          if (item.id === id) {
            return { ...item, checked: isChecked };
          }
          return item;
        });
        setLivestockList(newLivestockList);
        console.log('Updated livestockList:', newLivestockList);
     }
  };

  // 原有的 handleSubmit 函数 (只在多选模式下使用)
  const handleSubmit = () => {
    if (!isSingleSelection) { // 确保只在多选模式下执行
      console.log('确定提交 clicked!');
      // 过滤出所有被选中的牲畜项，操作的是 livestockList 状态
      const selectedLivestock = livestockList.filter(item => item.checked);

      if (selectedLivestock.length > 0) {
         // 提取选中牲畜的 ID 数组
         const selectedLivestockIds = selectedLivestock.map(item => item.id);
         console.log('当前选中的牲畜 ID 数组:', selectedLivestockIds);

         // 1. 将 ID 数组转换为 JSON 字符串
         const arrayString = JSON.stringify(selectedLivestockIds);

         // 2. 对 JSON 字符串进行 URL 编码
         const encodedArrayString = encodeURIComponent(arrayString);

         // 3. 构建目标 URL，将编码后的字符串作为查询参数
         // 假设多选用于疫苗记录页面
         const url = `/recordsPack/pages/vaccineRecords/index?selectedIds=${encodedArrayString}`;

         console.log('准备跳转到:', url);

         // 4. 使用 Taro 的导航方法进行跳转
         Taro.navigateTo({ url: url });

      } else {
        // 如果没有选中任何牲畜，给出提示
        Taro.showToast({ title: '请至少选择一头牲畜', icon: 'none' });
      }
    }
  };

  // 根据参数确定页面标题
  const getPageTitle = () => {
    if (selectionPurpose === 'quarantine') return '选择检疫牲畜';
    if (selectionPurpose === 'breeding') return '选择繁殖牲畜'; // 或更具体，如“选择配种母牛”
    if (selectionPurpose === 'birth-control') return '选择节育牲畜';
    // 兼容旧的 type 参数，如果 purpose 不存在
    if (selectionType === 'bull') return '选择公牛';
    if (selectionType === 'cow') return '选择母牛';
    return '选中牲畜'; // 多选模式下的默认标题
  };


  return (
    <View className='animal'> {/* 保持类名，或者根据需要修改 */}
      <View>
      {/* 根据 selectionType 或 selectionPurpose 显示不同的标题 */}
      {process.env.TARO_ENV === 'h5' &&
         <TitleH5 title={getPageTitle()} />
      }
      </View>
      {/* SearchBar */}
      <SearchBar onChange={(val) => setSearchValue(val)} maxLength={10} />

      <View className='category'>
        {/* 根据加载状态、错误状态和列表长度来显示不同的内容 */}
        {loading && <View style={{ textAlign: 'center', padding: '20px' }}>加载中...</View>}
        {error && <View style={{ textAlign: 'center', padding: '20px', color: 'red' }}>{error}</View>}
        {!loading && !error && livestockList.length === 0 ? (
          <View style={{ textAlign: 'center', padding: '20px' }}>暂无牲畜数据</View>
        ) : (
          // 动态生成 category-item，遍历 livestockList 状态
          livestockList.map((item) => (
            // 列表项的点击事件调用 handleItemClick，处理单选/多选逻辑
            <View key={item.id} className='category-item' onClick={() => handleItemClick(item)}>
              {/* 左侧：头像和文本 */}
              <View className='item-left'>
                <Avatar icon={<Text className='iconfont icon-yaoqingniuren'></Text>} size="normal" color="#fff"
                  background="#0bcb77" className='normal' />
                <View className='item-text'>
                  {/* 显示牲畜编号和 IMEI */}
                  <Text className='item-title'>{item.number}</Text>
                  <Text className='item-imei'>IMEI: {item.imei}</Text>
                   {/* 可以显示性别信息 */}
                  {item.gender && <Text className='item-gender'>性别: {item.gender}</Text>}
                </View>
              </View>

              {/* 右侧：根据模式显示复选框或空 */}
              <View className='item-right'>
                {!isSingleSelection && ( // 只在多选模式下显示复选框
                   <Checkbox
                     className="test"
                     checked={item.checked} // 绑定到当前项的 checked 状态
                     // 复选框的 onChange 事件只在多选模式下有效
                     onChange={(isChecked) => handleCheckboxChange(item.id, isChecked)}
                     // 阻止事件冒泡，避免点击复选框时触发列表项的 handleItemClick
                     onClick={(e) => e.stopPropagation()}
                   />
                )}
                 {/* 单选模式下如果需要显示选中标记，可以在这里添加 */}
                 {/* {isSingleSelection && selectedItem && selectedItem.id === item.id && <Text>✓</Text>} */}
              </View>
            </View>
          ))
        )}
      </View>

      {/* 底部固定按钮 - 只在多选模式下显示 */}
      {!isSingleSelection && (
         <View className='submit-button-container'>
           <View className='submit-button' onClick={handleSubmit}>
             <Text className='submit-button-text'>确定提交</Text>
           </View>
         </View>
      )}
      {/* 单选模式下不需要单独的确定按钮，点击列表项即选中并返回 */}
    </View>
  );
};

export default SelectLivestockPage;
