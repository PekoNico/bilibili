import React, { useState, useEffect } from 'react';
import { Text, Input } from '@rneui/themed';
import { getDefaultSearch } from '../../utils/api';
import { sliceByBytes } from '../../utils/toolFuncs';
import { inject, observer } from 'mobx-react';
import { addSearchHistory } from '../../utils/setSearchHistory';
import { DeviceEventEmitter } from 'react-native';

const SearchBar = (props) => {
  let style = {}
  if (props.style) {
    style = props.style
  }
  const [text, setText] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const inputRef = React.createRef()
  useEffect(() => {
    let eve = DeviceEventEmitter.addListener('search', (text) => {
      setText(text)
      props.Store.changeSearchKeyword(text)
      // inputRef.current.blur()
    })
    if (props.focus) {
      inputRef.current.focus()
    }
    getDefaultSearch().then(res => {
      setPlaceholder(sliceByBytes(res.data.data.show_name, style.maxLength || 22))
    })
    return () => {
      eve.remove()
    }
  }, []);
  return (
    <Input
      ref={inputRef}
      placeholder={placeholder}
      inputContainerStyle={{
        borderBottomWidth: 0,
        height: 40,
      }}
      disabled={props.disabled === true}
      inputStyle={{
        fontSize: 14,
        color: style.fontColor || '#eee',
        // height: 40,
        // lineHeight: 40
      }}
      autoCapitalize='none'
      leftIconContainerStyle={{ height: 30 }}
      leftIcon={
        <Text style={{ fontFamily: 'iconfont', color: style.fontColor || '#eee' }}>&#xe679;</Text>
      }
      placeholderTextColor={style.fontColor || '#eee'}
      value={text}
      onChangeText={(text) => {
        DeviceEventEmitter.emit('getSuggest', text)
        setText(text)
      }}
      onSubmitEditing={() => {
        let t = text === '' ? placeholder : text
        addSearchHistory(props.Store, t)
        DeviceEventEmitter.emit('getSuggest', '')
        props.Store.changeSearchKeyword(t)
        inputRef.current.blur()
        props.navigation.navigate('search-result', { text: t })
      }}
    />
  )
}

export default inject('Store')(observer(SearchBar))
