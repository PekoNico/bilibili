import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, DeviceEventEmitter, TouchableWithoutFeedback } from 'react-native';
import HTMLView from 'react-native-htmlview';
import SearchBar from '../../components/Search/SearchBar'
import Relate from '../../components/Search/Relate'
import Result from '../../components/Search/Result';
import Storage from '../../utils/storageUtil';
import { inject, observer } from 'mobx-react';
import { getSearchSuggest } from '../../utils/api';

// import StackView

//堆栈导航器
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

const Stack = createStackNavigator();
const style = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  suggestWrapper: {
    width: '100%',
    maxHeight: 500,
    // height: 400,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  suggestItem: {
    width: '94%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'center'
  }
})

const Index = (props) => {
  let timer = null
  const [isShowSuggest, setIsShowSuggest] = useState(false);
  const [suggestList, setSuggestList] = useState([]);
  // 初始化搜索历史仓库
  Storage.getData('searchHistory').then(res => {
    props.Store.changeSearchHistory(JSON.parse(res))
  })
  useEffect(() => {
    let event = DeviceEventEmitter.addListener('getSuggest', (text) => {
      setIsShowSuggest(text !== '')
      clearTimeout(timer)
      timer = null
      // 输入框文本不为空时
      if (text !== '') {
        // 防抖
        timer = setTimeout(() => {
          // 获取搜索建议
          getSearchSuggest({ term: text }).then(res => {
            // 获取成功时
            if (res.status === 200) {
              let arr = []
              // 对数据进行处理
              for (let i = 0; i < 10; i++) {
                // 没有此条数据时，停止处理
                if (res.data[i] === undefined) {
                  break;
                }
                arr.push(res.data[i])
                arr[i].name = arr[i].name.replace(/<em class="suggest_high_light">/, '<hl>')
                arr[i].name = arr[i].name.replace(/<\/em>/, '<\/hl>')
                arr[i].name = '<p>' + arr[i].name + '</p>'
              }
              setSuggestList(arr)
            }
            console.log(res)
          })
        }, 200)
      } else {
        setSuggestList([])
      }
    })
    return () => {
      event.remove()
    }
  }, []);
  return (
    <View>
      <View style={{ backgroundColor: '#fb7299', height: 60, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 320, backgroundColor: '#fff', borderRadius: 35, height: 40, marginHorizontal: 10 }}>
          <SearchBar {...props} style={{ fontColor: '#aaa', maxLength: 38 }} focus={true} />
        </View>
        <View style={{ marginLeft: 16 }}>
          <TouchableOpacity onPress={() => {
            props.navigation.goBack()
          }}>
            <Text style={{ color: '#fff', fontSize: 16 }}>取消</Text>
          </TouchableOpacity>
        </View>
      </View>
      {
        isShowSuggest ?
          <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,.5)', position: 'absolute', zIndex: 1, marginTop: 60 }}>
            <TouchableWithoutFeedback onPress={() => {
              setIsShowSuggest(false)
            }}>
              <View style={{ width: '100%', height: '100%' }}>
                <View style={style.suggestWrapper}>
                  {suggestList.map((item, index) => {
                    return (
                      <View style={{ ...style.suggestItem, borderBottomWidth: index + 1 === suggestList.length ? 0 : 1 }} key={item.value}>
                        <TouchableWithoutFeedback onPress={() => {
                          setIsShowSuggest(false)
                          DeviceEventEmitter.emit('search', item.value)
                          props.navigation.navigate('search-result', { text: item.value })
                        }}>
                          {/* <Text style={{ color: '#000' }}>{item.name}</Text> */}
                          <Text>
                            <HTMLView value={item.name} renderNode={(node, index, siblings, parent, defaultRenderer) => {
                              if (node.name === "hl") {
                                return (
                                  <Text style={{ color: '#fb7299' }}>{defaultRenderer(node.children, parent)}</Text>
                                )
                              }
                            }} />
                          </Text>
                        </TouchableWithoutFeedback>
                      </View>
                    )
                  })}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          : null
      }
      <View style={{ height: '100%' }}>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="search-relate" component={Relate} options={{ title: '主界面' }} />
          <Stack.Screen name="search-result" component={Result} options={{
            title: '搜索结果',
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation
          }} />
        </Stack.Navigator>
      </View>
    </View>
  )
}

export default inject('Store')(observer(Index))
