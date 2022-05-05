import React, { useEffect, useState } from 'react';
import { Image, Text, View, TextInput, DeviceEventEmitter, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Button, CheckBox, Dialog, Icon } from '@rneui/themed';
import { inject, observer } from 'mobx-react';
import Storage from '../../utils/storageUtil';

import { countryOrArea, JSON_countryOrArea } from '../../utils/toolData';

const styles = StyleSheet.create({
  common: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  area: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    height: 48
  },
  tel: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    height: 52
  }
})

function Login(props) {
  const [isShow, setIsShow] = useState(false);
  const [loginType, setLoginType] = useState('tel');
  const [loginSheet, setLoginSheet] = useState({
    area: '中国大陆',
    areaTel: '+86',
    tel: '',
    userName: '',
    pwd: '',
    checked: false
  });
  useEffect(() => {
    DeviceEventEmitter.addListener('setLoginType', t => {
      setLoginType(t)
    })
  }, []);
  const login = () => {
    setTimeout(() => {
      let data = {
        name: 'zard1991',
        avaUrl: 'https://tva2.sinaimg.cn/crop.0.0.100.100.180/005OLdNdjw8elv5kodfjzj302s02sglg.jpg?KID=imgbed,tva&Expires=1651135860&ssig=4ZdoMftqz1',
        sex: 'male',
        uid: 231742110
      }
      props.Store.changeUserData(data)
      Storage.setData('userData', JSON.stringify(data))
      props.navigation.navigate('index')
    }, 1000)
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {
        loginType === 'tel' ?
          <>
            <Image style={{ width: '100%', height: 120 }} source={{ uri: 'https://img2.baidu.com/it/u=534549554,636023778&fm=253&fmt=auto&app=138&f=JPEG?w=450&h=203' }} />
            <View>
              <TouchableOpacity style={{ ...styles.common, ...styles.area }} onPress={() => setIsShow(true)}>
                <Text style={{ fontSize: 16 }}>{loginSheet.area}</Text>
                <Text style={{ fontFamily: 'iconfont', fontSize: 16 }}>&#xe693;</Text>
              </TouchableOpacity>
              <View style={{ ...styles.common, ...styles.tel }}>
                <Text style={{ width: 80 }}>{loginSheet.areaTel}</Text>
                <View style={{ width: 200 }}>
                  <TextInput maxLength={11} placeholder='请输入手机号码' value={loginSheet.tel} onChangeText={(e) => setLoginSheet({ ...loginSheet, tel: e })} />
                </View>
                <View style={{ borderLeftWidth: 1, borderLeftColor: '#ccc', height: 26 }}></View>
                <Text style={{ marginLeft: 20 }}>获取验证码</Text>
              </View>
              <View style={{ ...styles.common, ...styles.tel }}>
                <Text style={{ width: 80 }}>验证码</Text>
                <View style={{ width: 200, flex: 1 }}>
                  <TextInput maxLength={6} placeholder='请输入验证码' value={loginSheet.pwd} onChangeText={(e) => setLoginSheet({ ...loginSheet, pwd: e })} />
                </View>
              </View>
              <View style={{ marginTop: 30, justifyContent: 'center' }}>
                <Button
                  title='验证登录'
                  buttonStyle={{
                    backgroundColor: '#fb7299',
                    borderRadius: 18,
                    marginHorizontal: 34
                  }}
                  disabled={loginSheet.tel === '' || loginSheet.pwd === ''}
                  onPress={() => login()}
                />
              </View>
              <View>
                {/* <CheckBox
                  title='请阅读并勾选'
                  checked={loginSheet.checked}
                  onPress={(e) => setLoginSheet({...loginSheet, checked: e})}
                /> */}
              </View>
            </View>
          </> :
          <>
            <Image style={{ width: '100%', height: 120 }} source={{ uri: 'https://img2.baidu.com/it/u=534549554,636023778&fm=253&fmt=auto&app=138&f=JPEG?w=450&h=203' }} />
          </>
      }
      <Dialog
        isVisible={isShow}
        onBackdropPress={() => setIsShow(!isShow)}
      >
        <Dialog.Title title="选择国家或地区" />
        <ScrollView style={{height: 400}}>
          {countryOrArea.map((l, i) => (
            <CheckBox
              key={i}
              title={l}
              containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={l === loginSheet.area}
              onPress={() => {
                setLoginSheet({...loginSheet, area: l, areaTel: JSON_countryOrArea[l]})
                setIsShow(false)
              }}
            />
          ))}
        </ScrollView>

        <Dialog.Actions>
          <Dialog.Button title="取消" onPress={() => setIsShow(!isShow)} />
        </Dialog.Actions>
      </Dialog>
    </View>
  )
}

export default inject('Store')(observer(Login))