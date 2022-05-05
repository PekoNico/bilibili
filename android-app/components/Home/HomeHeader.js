import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Avatar, Text, Input } from '@rneui/themed';
import SearchBar from '../Search/SearchBar'
import { getDefaultSearch } from '../../utils/api';

import { byteLength, sliceByByte } from '../../utils/toolFuncs';

const style = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fb7299',
    flexDirection: 'row',
    padding: 15,
    // justifyContent: 'space-between',
    alignItems: 'center'
  },
  avaWrapper: {
    flexDirection: 'row',
  },
  noAvatar: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const HomeHeader = (props) => {
  return (
    <View style={style.wrapper}>
      <View style={style.avaWrapper}>
        {
          props.Store.userData.name === '' ?
            <View style={style.noAvatar}>
              <TouchableOpacity onPress={() => {
                props.navigation.navigate('login')
              }}>
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#fb7299' }}>登录</Text>
              </TouchableOpacity>
            </View> :
            <TouchableWithoutFeedback onPress={() => {
              props.navigation.navigate('Mine')
            }}>
              <Avatar size={40}
                rounded
                source={{ uri: props.Store.userData.avaUrl }} />
            </TouchableWithoutFeedback>
        }
      </View>
      <View style={{ width: 240, backgroundColor: '#e2678a', borderRadius: 35, height: 40, marginLeft: 15 }}>
        <SearchBar {...props}/>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontFamily: 'iconfont', fontSize: 25, color: '#fff', marginLeft: 30 }}>&#xe672;</Text>
        <Text style={{ fontFamily: 'iconfont', fontSize: 25, color: '#fff', marginLeft: 10 }}>&#xe6b8;</Text>
      </View>
    </View>
  )
}
export default inject('Store')(observer(HomeHeader))