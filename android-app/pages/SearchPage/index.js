import React from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import SearchBar from '../../components/Search/SearchBar'
import Relate from '../../components/Search/Relate'
import Result from '../../components/Search/Result';
import Storage from '../../utils/storageUtil';
import { inject, observer } from 'mobx-react';

// import StackView

//堆栈导航器
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

const Stack = createStackNavigator();
const style = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

const Index = (props) => {
  // 初始化搜索历史仓库
  Storage.getData('searchHistory').then(res => {
    props.Store.changeSearchHistory(JSON.parse(res))
  })
  return (
    <View>
      <View style={{ backgroundColor: '#fb7299', height: 60, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 320, backgroundColor: '#fff', borderRadius: 35, height: 40, marginHorizontal: 10 }}>
          <SearchBar {...props} style={{ fontColor: '#aaa', maxLength: 38 }} />
        </View>
        <View style={{ marginLeft: 16 }}>
          <TouchableOpacity onPress={() => {
            props.navigation.goBack()
          }}>
            <Text style={{ color: '#fff', fontSize: 16 }}>取消</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ height: 500 }}>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="search-relate" component={Relate} options={{ title: '主界面' }} />
          <Stack.Screen name="search-result" component={Result} options={{
            title: '发布界面',
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation}} />
        </Stack.Navigator>
      </View>
    </View>
  )
}

export default inject('Store')(observer(Index))