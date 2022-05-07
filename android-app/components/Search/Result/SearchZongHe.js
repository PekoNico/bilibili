import React, { useState, useEffect } from 'react';
import { View, DeviceEventEmitter, StyleSheet } from 'react-native';
import SearchVideoList from '../../SearchVideoList/SearchVideoList';

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%'
  }
})

export default (props) => {
  const [searchVideoList, setSearchVideoList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let event = DeviceEventEmitter.addListener('setSearchVideoList', (arr) => {
      setSearchVideoList(arr)
      setIsLoading(false)
    })
    return () => {
      event.remove()
    };
  }, []);
  return (
    <View style={styles.wrapper}>
      <SearchVideoList list={searchVideoList} loading={isLoading}/>
    </View>
  )
}