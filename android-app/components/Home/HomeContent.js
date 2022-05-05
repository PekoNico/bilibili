import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import VideoList from '../VideoList';

const Tab = createMaterialTopTabNavigator()

const ScreenList = [{
  name: 'douga',
  title: '动画',
  rid: '1'
},{
  name: 'anime',
  title: '番剧',
  rid: '13'
},{
  name: 'music',
  title: '音乐',
  rid: '3'
},{
  name: 'dance',
  title: '舞蹈',
  rid: '129'
},{
  name: 'game',
  title: '游戏',
  rid: '4'
},{
  name: 'tech',
  title: '科技',
  rid: '188'
},{
  name: 'sports',
  title: '运动',
  rid: '234'
},{
  name: 'guochuang',
  title: '国创',
  rid: '167'
},{
  name: 'car',
  title: '汽车',
  rid: '223'
},{
  name: 'life',
  title: '生活',
  rid: '160'
},{
  name: 'food',
  title: '美食',
  rid: '211'
},{
  name: 'animal',
  title: '动物圈',
  rid: '217'
},{
  name: 'kichiku',
  title: '鬼畜',
  rid: '119'
},{
  name: 'fashion',
  title: '时尚',
  rid: '155'
},{
  name: 'information',
  title: '资讯',
  rid: '202'
},{
  name: 'ent',
  title: '娱乐',
  rid: '5'
},{
  name: 'cinephile',
  title: '影视',
  rid: '181'
},{
  name: 'documentary',
  title: '纪录片',
  rid: '177'
},{
  name: 'movie',
  title: '电影',
  rid: '23'
},{
  name: 'tv',
  title: '电视剧',
  rid: '11'
},]

export default (prop) => {
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
        width: 60,
        height: 30,
        margin: 0,
        paddingHorizontal: 0,
        // padding: 0
      },
      tabBarIndicatorStyle: {
        backgroundColor: '#fb7299',
        width: 34,
        marginLeft: 14
      },
      tabBarPressColor: '#ddd',
      lazy: true
    }}>
      {ScreenList.map(item => {
        return <Tab.Screen name={item.name} component={VideoList} options={{title: item.title}} initialParams={{rid: item.rid}} key={item.rid}/>
      })}
    </Tab.Navigator>
  )
}