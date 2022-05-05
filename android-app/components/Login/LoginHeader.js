import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, DeviceEventEmitter } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    width: 320,
    // marginRight: 100,
    // backgroundColor: '#eee',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  }
})

export default (props) => {
  const [type, setType] = useState('tel');
  const changeType = (t) => {
    setType(t)
    DeviceEventEmitter.emit('setLoginType', t)
  }
  return (
    <View style={styles.wrapper}>
      {
        type === 'tel' ?
          <>
            <Text style={styles.text}>手机号登录注册</Text>
            <TouchableOpacity onPress={() => changeType('pwd')}>
              <Text style={styles.text}>密码登录</Text>
            </TouchableOpacity>
          </> :
          <>
            <Text style={styles.text}>密码登录</Text>
            <TouchableOpacity onPress={() => changeType('tel')}>
              <Text style={styles.text}>短信登录</Text>
            </TouchableOpacity>
          </>
      }
    </View>
  )
}