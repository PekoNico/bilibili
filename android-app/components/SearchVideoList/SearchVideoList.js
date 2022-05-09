import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, StyleSheet, Dimensions, DeviceEventEmitter } from 'react-native';
import EmptyComponent from '../common/EmptyPage';
import LoadingPage from '../common/LoadingPage'
import VideoItem from './SearchVideoItem';
import { getSearchType } from '../../utils/api';
import { inject, observer } from 'mobx-react';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  listWrappper: {},
  emptyWrapper: {
    justifyContent: 'center'
  },
  img: {
    width: 100,
    height: 100
  }
})

const SearchVideoList = (props) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState('totalrank');
  const [page, setPage] = useState(1);
  const firstUpdate = useRef(true)
  const ListRef = useRef()
  const getData = (pageNum) => {
    getSearchType({
      search_type: 'video',
      keyword: props.Store.searchKeyword,
      order: order,
      page: page
    }).then(res => {
      if (pageNum === 1) {
        setList(res.data.data.result)
        setPage(1)
      } else {
        setList(list.concat(res.data.data.result))
      }
      setPage(page + 1)
      setIsLoading(false)
    })
  }
  useEffect(() => {
    getData(1)
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    } else {
      ListRef.current.scrollToIndex({ viewPosition: 0, index: 0 })
      setIsLoading(true)
    }
  }, [props.Store.searchKeyword]);
  const renderItem = (item) => {
    return (
      <VideoItem navigation={props.navigation} data={item.item} />
    )
  }
  return (
    <View style={styles.wrapper}>
      <FlatList
        ref={ListRef}
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        getItemLayout={(data, index) => ({ length: Dimensions.get('window').width / 8 * 2 + 20, offset: (Dimensions.get('window').width / 8 * 2 + 20) * index, index })}
        ListEmptyComponent={isLoading ? LoadingPage : EmptyComponent}
        onEndReachedThreshold={0.4}
        onEndReached={getData}
      />
    </View>
  )
}

export default inject('Store')(observer(SearchVideoList))