import React from 'react';
import { Text, View } from 'react-native';

export default (props) => {
  console.log(props)
  return (
    <View style={{height: 40}}>
      <Text>搜索结果：{props.route.params.text}</Text>
    </View>
  )
}