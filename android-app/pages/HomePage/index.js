import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home/Home'
import Moments from './Moments/Moments';
import Publish from './Publish/Publish'
import Shopping from './Shopping/Shopping';
import Mine from './Mine/Mine';
import { Icon, Text } from '@rneui/themed';

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        //该属性的值是一个函数返回一个React元素(组件)
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = <></>;
          let publishIcon = null
          switch (route.name) {
            case 'Home':
              iconName = focused ? <>&#xe662;</> : <>&#xe661;</>
              break;
            case 'Moments':
              iconName = focused ? <>&#xe665;</> : <>&#xe666;</>
              break;
            case 'Publish':
              publishIcon = () => <Text style={{
                fontFamily: "iconfont",
                color: '#fff',
                fontSize: 10,
                marginTop: 6,
                padding: 9,
                backgroundColor: '#fb7299',
                borderRadius: 9
              }}>&#xe67e;</Text>
              break;
            case 'Shopping':
              iconName = focused ? <>&#xe663;</> : <>&#xe664;</>
              break;
            case 'Mine':
              iconName = focused ? <>&#xe668;</> : <>&#xe667;</>
              break;
            default:
              break;
          }
          return (
            <>
              {route.name !== 'Publish' ?
                <Text style={{
                  fontFamily: "iconfont",
                  color: focused ? '#fb7299' : '#555',
                  fontSize: 18,
                  marginTop: 0,
                }}>{iconName}</Text> : publishIcon()
              }
            </>
          )
        },
        activeTintColor: '#fb7299',
        inactiveTintColor: '#555',
        tabBarActiveTintColor: '#fb7299',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: '首页' }} />
      <Tab.Screen name="Moments" component={Moments} options={{ title: '动态' }} />
      <Tab.Screen name="Publish" component={Publish} options={{
        title: '',
      }} />
      <Tab.Screen name="Shopping" component={Shopping} options={{ title: '会员购' }} />
      <Tab.Screen name="Mine" component={Mine} options={{ title: '我的' }} />
    </Tab.Navigator>
  )
}