import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import ZongHe from './Result/SearchZongHe';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getSearchAll } from '../../utils/api';

const Tab = createMaterialTopTabNavigator()

export default (prop) => {
  const [screenList, setScreenList] = useState([{
    name: 'zonghe',
    title: '综合',
    num: 0
  }, {
    name: 'media_bangumi',
    title: '番剧',
    num: 0
  }, {
    name: 'live',
    title: '直播',
    num: 0
  }, {
    name: 'bili_user',
    title: '用户',
    num: 0
  }, {
    name: 'media_ft',
    title: '影视',
    num: 0
  }, {
    name: 'article',
    title: '专栏',
    num: 0
  }]);
  useEffect(() => {
    getSearchAll({ keyword: prop.route.params.text }).then(res => {
      const arr = screenList.map(item => {
        let num = 0
        if (res.data.data.top_tlist[item.name] === undefined) {
          num = 0
        } else if (res.data.data.top_tlist[item.name] > 99) {
          num = '99+'
        } else {
          num = res.data.data.top_tlist[item.name]
        }
        return { ...item, num }
      })
      setScreenList(arr)
    })
  }, [prop.route.params]);
  return (
    <Tab.Navigator screenOptions={{
      tabBarScrollEnabled: true,
      tabBarInactiveTintColor: '#999',
      tabBarActiveTintColor: '#fb7299',
      tabBarStyle: {
        height: 30,
      },
      tabBarIndicatorContainerStyle: {
        color: '#fff'
      },
      tabBarLabelStyle: {
        fontSize: 14,
        height: 36,
        fontWeight: 'bold',
        borderBottomWidth: 0.5,
        borderBottomColor: '#fb7299'
        // backgroundColor: '#444'
      },
      tabBarItemStyle: {
        width: 80,
        height: 30,
        margin: 0,
        paddingHorizontal: 0,
        // padding: 0
      },
      tabBarIndicatorStyle: {
        backgroundColor: '#fb7299',
        width: 54,
        marginLeft: 14
      },
      tabBarPressColor: '#ddd',
      lazy: true
    }}>
      {screenList.map(item => {
        return <Tab.Screen
          name={item.name}
          component={ZongHe}
          options={{
            title: `${item.title}${item.num !== 0 ? '(' + item.num + ')' : ''}`
          }}
          key={item.name}
        />
      })}
    </Tab.Navigator>
  )
}