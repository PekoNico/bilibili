import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  emptyWrapper: {
    height: 600,
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    paddingTop: 120
    // justifyContent: 'center'
  },
  img: {
    width: 140,
    height: 140
  },
  text: {
    marginTop: 10,
    fontSize: 14,
    color: '#444'
  }
})

const emptyComponent = () => {
  return (
    <View style={styles.emptyWrapper}>
      <Image style={styles.img} source={require('../../assets/imgs/empty.jpeg')}/>
      <Text style={styles.text}>什么都没找到啊T T</Text>
    </View>
  )
}

export default emptyComponent