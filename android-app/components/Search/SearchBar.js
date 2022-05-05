import React, {useState, useEffect} from 'react';
import { Text, Input } from '@rneui/themed';
import { getDefaultSearch } from '../../utils/api';
import { sliceByBytes } from '../../utils/toolFuncs';
import { inject, observer } from 'mobx-react';
import { addSearchHistory } from '../../utils/setSearchHistory';

const SearchBar = (props) => {
  let style = {}
  if(props.style) {
    style = props.style
  }
  const [text, setText] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  useEffect(() => {
    getDefaultSearch().then(res => {
      setPlaceholder(sliceByBytes(res.data.data.show_name, style.maxLength || 22))
    })
  }, []);
  return (
    <Input
      placeholder={placeholder}
      inputContainerStyle={{
        borderBottomWidth: 0,
        height: 40,
      }}
      inputStyle={{
        fontSize: 14,
        color: style.fontColor || '#eee',
        // height: 40,
        // lineHeight: 40
      }}
      leftIconContainerStyle={{ height: 30 }}
      leftIcon={
        <Text style={{ fontFamily: 'iconfont', color: style.fontColor || '#eee' }}>&#xe679;</Text>
      }
      placeholderTextColor= {style.fontColor || '#eee'}
      onFocus={() => {
        if(props.route.name === 'Home') {
          props.navigation.navigate('search')
        }
      }}
      value={text}
      onChangeText={(text) => {
        setText(text)
      }}
      onEndEditing={() => {
        if(props.route.name !== 'Home') {
          let t = text === '' ? placeholder : text
          addSearchHistory(props.Store, t)
          props.navigation.navigate('search-result', {text: t})
        }
      }}
    />
  )
}

export default inject('Store')(observer(SearchBar))