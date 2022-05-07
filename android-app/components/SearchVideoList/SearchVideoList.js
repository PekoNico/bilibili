import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import EmptyComponent from '../common/EmptyPage';
import LoadingPage from '../common/LoadingPage'
import VideoItem from './SearchVideoItem';

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

export default (props) => {
  const renderItem = (item) => {
    return (
      <VideoItem data={item.item} />
      // <View style={{ height: 200 }}>
      //   <Text style={{ color: 'black' }}>{item.item.title}</Text>
      // </View>
    )
  }
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={props.list}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        getItemLayout={(data, index) => ({ length: Dimensions.get('window').width / 8 * 2 + 20, offset: (Dimensions.get('window').width / 8 * 2 + 20) * index, index })}
        ListEmptyComponent={props.loading ? LoadingPage : EmptyComponent}
      />
    </View>
  )
}