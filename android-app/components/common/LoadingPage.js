import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  loadingWrapper: {
    height: 600,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 120
    // justifyContent: 'center'
  },
  img: {
    width: 300,
    height: 140
  },
  text: {
    marginTop: 10,
    fontSize: 14,
    color: '#444'
  }
})

const LoadingComponent = () => {
  return (
    <View style={styles.loadingWrapper}>
      <Image style={styles.img} source={{uri: 'https://i0.hdslb.com/bfs/article/3a311f6fb9258c0ec7433bf28c5c63460fc5cdc0.jpg@656w_348h_progressive.webp'}}/>
      <Text style={styles.text}>正在玩命加载数据..</Text>
    </View>
  )
}

export default LoadingComponent