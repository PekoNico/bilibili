import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { getTimeToString, getNumToString, getDateToInfo } from '../../utils/toolFuncs';
import HTMLView from 'react-native-htmlview';

const styles = StyleSheet.create({
  wrapper: {
    height: Dimensions.get('window').width / 8 * 2 + 20,
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 1,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgWrapper: {
    width: Dimensions.get('window').width / 5 * 2.2,
    height: Dimensions.get('window').width / 8 * 2,
  },
  timeWrapper: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: 'rgba(0,0,0,.6)'
  },
  time: {
    color: '#eaeaea'
  },
  contentWrapper: {
    height: '100%',
    width: Dimensions.get('window').width / 5 * 2.4,
    marginHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between'
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messages: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default (props) => {
  const [videoObj, setVideoObj] = useState({});
  useEffect(() => {
    setVideoObj({
      ...props.data,
      title: '<p>' + props.data.title + '</p>',
    })
    return () => {

    };
  }, [props.data]);
  return (
    <TouchableOpacity activeOpacity={1} style={styles.wrapper}>
      <View style={{ ...styles.imgWrapper, borderRadius: 6, overflow: 'hidden' }}>
        <Image style={styles.imgWrapper} source={{ uri: 'http:' + videoObj.pic }} />
        <View style={styles.timeWrapper}>
          <Text style={styles.time}>{getTimeToString(videoObj.duration)}</Text>
        </View>
      </View>

      <View style={styles.contentWrapper}>
        <View>
          <HTMLView value={videoObj.title} renderNode={(node, index, siblings, parent, defaultRenderer) => {
            if (node.name === 'p') {
              return (
                <Text numberOfLines={2}>{defaultRenderer(node.children, parent)}</Text>
              )
            }
            if (node.name === "em") {
              return (
                <Text style={{ color: '#fb7299' }}>{defaultRenderer(node.children, parent)}</Text>
              )
            }
          }} />
        </View>
        <View>
          <View style={styles.author}>
            <Text style={{ fontFamily: 'iconfont', color: '#aaa' }}>&#xe66e;</Text>
            <Text style={{ color: '#aaa', marginLeft: 2 }}>{videoObj.author}</Text>
          </View>
          <View style={styles.messages}>
            <View style={styles.author}>
              <Text style={{ fontFamily: 'iconfont', color: '#aaa', fontSize: 12 }}>&#xe66d;</Text>
              <Text style={{ color: '#aaa', marginLeft: 2 }} numberOfLines={1}>{`${getNumToString(videoObj.play)} · ${getDateToInfo(videoObj.pubdate)}`}</Text>
            </View>
            <TouchableOpacity>
              <Text style={{ fontFamily: 'iconfont', color: '#aaa', fontSize: 20 }}>&#xe680;</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
