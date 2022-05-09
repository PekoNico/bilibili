import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, TouchableWithoutFeedback, FlatList } from 'react-native';
import { Text } from '@rneui/base';
import Abbreviation from './Abbreviation';
import { getDynamic, getRanking } from '../utils/api';
import { getTimeToString } from '../utils/toolFuncs';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginBottom: 100,
  },
  abbWrapper: {
    width: 180,
    height: 180,
    backgroundColor: '#fff',
    marginTop: 12,
    overflow: 'hidden',
    borderRadius: 16
  }
})

export default (props) => {
  let rid
  try {
    rid = props.route.params.rid || props.rid || 1
  } catch (error) {
    rid = 1
  }
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [videoArr, setVideoArr] = useState([]);
  const getData = () => {
    getDynamic({
      ps: 16,
      rid: rid
    }).then(res => {
      if(res.data.code === 0) {
        setVideoArr([...res.data.data.archives])
        setIsRefreshing(false)
      } else {
        setIsRefreshing(false)
      }
    }).catch(e => console.log(e))

    // getRanking().then(res => {
    //   setVideoArr([...res.data.data])
    //   setIsRefreshing(false)
    // }).catch(e => console.log(e))
  }
  const onRefresh = () => {
    setIsRefreshing(true)
    getData()
  }
  useEffect(() => {
    // 控制第一次渲染是否获取数据
    setIsRefreshing(false)
    getData()
  }, [])
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          title={'下拉刷新'}
          refreshing={isRefreshing}
          colors={['rgb(251, 114, 153)', "#fb7299"]}
          onRefresh={() => {
            onRefresh();
          }}
        />
      }
    >
      <View style={styles.wrapper}>
        {/* {videoArr.map(item => {
            return (
              <View style={styles.abbWrapper}>
                <Abbreviation {...item} />
              </View>
            )
          })} */}
        {videoArr.map(item => {
          return (
            <TouchableWithoutFeedback onPress={() => {
              props.navigation.navigate('video', {...item})
            }} key={item.aid}>
              <View style={styles.abbWrapper}>
                <Abbreviation
                  pic={item.pic}
                  title={item.title}
                  duration={getTimeToString(item.duration)}
                  author={item.owner.name}
                  play={item.stat.view}
                  pts={item.stat.danmaku}
                />
              </View>
            </TouchableWithoutFeedback>
          )
        })}
      </View>
    </ScrollView>
  )
}