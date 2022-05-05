import React from 'react';
import { Text, Image } from '@rneui/base';
import { StyleSheet, ImageBackground, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { getNumToString, getTimeToString } from '../utils/toolFuncs';

const styles = StyleSheet.create({
  container: {
    // position: 'relative',
    // flex: 1,
    flexDirection: "column",
    width: 180,
    height: 108,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: 180,
    height: 108,
    elevation: 2
  },
  playData: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: 'space-between',
    marginTop: 85
  },
  titleWrapper: {
    marginHorizontal: 8,
    marginTop: 5
    // padding: 10
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    height: 40
  }
})

export default (prop) => {
  const [videoData, setVideoData] = React.useState({
    pic: prop.pic,  // 封面图
    author: prop.author,  // up主
    duration: prop.duration,  // 时长
    title: prop.title,  // 标题
    play: prop.play,  // 播放数
    pts: prop.pts,  // 弹幕数
  });
  return (
    <View style={{ flexDirection: 'column' }}>
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: videoData.pic }}
          style={styles.image}
        >
          <LinearGradient style={styles.playData} colors={['rgba(255,255,255,0)', 'rgba(0,0,0,.8)']}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'iconfont', color: '#fff', fontSize: 12 }}>&#xe66d;</Text>
                <Text style={{ color: '#fff', marginLeft: 2, fontSize: 12 }}>{getNumToString(videoData.play)}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                <Text style={{ fontFamily: 'iconfont', color: '#fff', fontSize: 12 }}>&#xe66a;</Text>
                <Text style={{ color: '#fff', marginLeft: 2, fontSize: 12 }}>{getNumToString(videoData.pts)}</Text>
              </View>
            </View>
            <View style={{}}>
              <Text style={{ color: '#fff', fontSize: 12 }}>{videoData.duration}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
      <View style={styles.titleWrapper}>
        <Text numberOfLines={2} style={styles.title}>{videoData.title}</Text>
      </View>
      <View style={{ marginHorizontal: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'iconfont', color: '#aaa' }}>&#xe66e;</Text>
          <Text style={{ color: '#aaa', marginLeft: 2 }}>{videoData.author}</Text>
        </View>
        <Text style={{ fontFamily: 'iconfont', color: '#aaa', fontSize: 20 }}>&#xe680;</Text>
      </View>
    </View>
  )
}