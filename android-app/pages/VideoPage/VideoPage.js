import React, { useState } from 'react';
import { Text } from '@rneui/themed';
import { View } from 'react-native';
export default (props) => {
  // const [videoData, setVideoData] = useState({...props.route.params});
  console.log(props)
  return (
    <View>
      {/* 视频 */}
      <View>
        <Text>视频占位</Text>
      </View>
      {/* 简介，评论，弹幕 */}
      <View>
        <View></View>
        <View></View>
        <View></View>
      </View>
      {/* 详情 */}
      <View>
        {/* 头像 */}
        <View></View>
        {/* 标题，视频信息，简介 */}
        <View>
          <View></View>
          <View></View>
          <View></View>
        </View>
        {/* 三连状态 */}
        <View></View>
      </View>

      {/* 推荐视频 */}
    </View>
  )
}