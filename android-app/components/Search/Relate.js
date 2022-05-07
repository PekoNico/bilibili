import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import { Dialog, Button } from '@rneui/themed';

import { getHotSearch } from '../../utils/api';
import { sliceByBytes } from '../../utils/toolFuncs';
import { addSearchHistory, deleteSingle, clearHistory } from '../../utils/setSearchHistory';
import { inject, observer } from 'mobx-react';

const style = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  hisWrapper: {
    flexWrap: 'wrap',
    marginHorizontal: 20
  },
  hisItem: {
    backgroundColor: '#eaeaea',
    marginHorizontal: 5,
    marginBottom: 10,
    paddingHorizontal: 16,
    height: 30,
    borderRadius: 6,
  },
  icon: {
    justifyContent: 'center',
    padding: 2,
    fontFamily: 'iconfont',
    color: '#fff',
    fontSize: 8,
    width: 12,
    height: 12,
    backgroundColor: '#b5b5b5',
    borderRadius: 6,
    fontFamily: 'iconfont',
  }
})
const Relate = (props) => {
  const [hotList, setHotList] = useState([]);
  const [cancelIndex, setCancelIndex] = useState(-1);
  const [dialogVisible, setDialogVisible] = useState(false);
  useEffect(() => {
    // 获取热搜
    getHotSearch().then(res => {
      setHotList(res.data.list)
    })
    // Storage.setData('searchHistory', JSON.stringify(['达达利亚','原','rak','啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦','asddddddddddddddddddddddd','ame x 阿梓','阿梓从小就很可爱']))
  }, [])
  return (
    <View style={{ backgroundColor: '#fff' }}>
      <View>
        <View style={{ ...style.flexRow, marginVertical: 6, marginRight: 20, marginLeft: 8, justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#494949' }}>B站热搜</Text>
          <TouchableOpacity style={{ ...style.flexRow }}>
            <Text>完整榜单</Text>
            <Text style={{ fontFamily: 'iconfont' }}>&#xe693;</Text>
          </TouchableOpacity>
        </View>
        <View style={{ ...style.flexRow, flexWrap: 'wrap', marginHorizontal: 10, justifyContent: 'space-between' }}>
          {hotList.map((item, index) => {
            return (
              <View style={{ width: '44%', height: 30 }} key={item.hot_id}>
                <TouchableOpacity style={{ ...style.flexRow, width: '100%', height: 30 }} onPress={() => {
                  addSearchHistory(props.Store, item.keyword)
                  DeviceEventEmitter.emit('search', item.keyword)
                  props.navigation.navigate('search-result', { text: item.keyword })
                }}>
                  <Text style={{ color: '#4f4f4f' }}>{sliceByBytes(item.show_name, item.icon === '' ? 22 : 18)}</Text>
                  {item.icon === '' ? null : <Image source={{ uri: item.icon }} style={{ width: item.word_type === 8 ? 16 : 50, height: 16, marginLeft: 8 }} />}
                </TouchableOpacity>
              </View>
            )
          })}
        </View>
      </View>
      <View>
        {
          props.Store.searchHistory.length !== 0 ?
            <>
              <View style={{ ...style.flexRow, marginVertical: 6, marginRight: 28, marginLeft: 8, justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#494949' }}>搜索历史</Text>
                <TouchableOpacity style={{ ...style.flexRow }}>
                  <Text>展开</Text>
                </TouchableOpacity>
              </View>
              <View style={{ ...style.flexRow, ...style.hisWrapper }}>
                {props.Store.searchHistory.map((item, index) => {
                  return (
                    <TouchableOpacity key={item} style={{ ...style.flexRow, ...style.hisItem }} onPress={() => {
                      addSearchHistory(props.Store, item)
                      DeviceEventEmitter.emit('search', item)
                      props.navigation.navigate('search-result', { text: item })
                    }} onLongPress={() => {
                      setCancelIndex(index)
                    }}>
                      <Text>{sliceByBytes(item, 16)}</Text>
                      <TouchableOpacity style={{ position: 'absolute', right: 0, top: 0 }} onPress={() => {
                        // 删除单个搜索历史
                        deleteSingle(props.Store, item)
                        setCancelIndex(-1)
                      }}>
                        <Text style={{ ...style.icon, display: cancelIndex == index ? 'flex' : 'none' }}>&#xe682;</Text>
                      </TouchableOpacity>
                    </TouchableOpacity>
                  )
                })}
              </View>
              <TouchableOpacity style={{ ...style.flexRow, justifyContent: 'center', marginTop: 20 }} onPress={() => {
                setDialogVisible(true)
              }}>
                <Text style={{ fontFamily: 'iconfont', fontSize: 18, color: '#666' }}>&#xe691;&nbsp;</Text>
                <Text>清空搜索历史</Text>
              </TouchableOpacity>
            </> : null
        }
      </View>
      <View>
        <View style={{ ...style.flexRow, marginVertical: 6, marginRight: 28, marginLeft: 8, justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#494949' }}>搜索发现</Text>
          <TouchableOpacity style={{ ...style.flexRow }}>
            <Text>隐藏</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Dialog
        isVisible={dialogVisible}
        onBackdropPress={() => {
          setDialogVisible(false)
        }}
      >
        <Text style={{ color: '#222', fontSize: 15 }}>确认清除全部历史记录吗？</Text>
        <View style={{ ...style.flexRow, justifyContent: 'flex-end', marginTop: 10 }}>
          <Button type='clear' title="取消" titleStyle={{ color: '#fb7299', fontSize: 14 }} onPress={() => setDialogVisible(false)} />
          <Button type='clear' title="确定" titleStyle={{ color: '#fb7299', fontSize: 14 }} onPress={() => {
            clearHistory(props.Store)
            setDialogVisible(false)
          }} />
        </View>
      </Dialog>
    </View>
  )
}

export default inject('Store')(observer(Relate))