import React from 'react';
import { Text } from '@rneui/base';
import { Button } from '@rneui/themed';
import Storage from '../../../utils/storageUtil';
import { inject, observer } from 'mobx-react';

const Mine = (props) => {
  return (
    // <VideoList rid={1}/>
    <>
      <Button title='退出登录' buttonStyle={{backgroundColor: "#fb7299"}} onPress={() => {
        props.Store.clearUserData()
        props.navigation.navigate('Home')
        Storage.setData('userData', JSON.stringify({})).then(() => {
        })
        console.log(props)
      }}/>
    </>
  )
}

export default inject('Store')(observer(Mine))