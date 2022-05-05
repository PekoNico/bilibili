import React, {useEffect} from 'react';
//堆栈导航器
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './pages/HomePage';
import Publish from './pages/PublishPage';
import Login from './pages/LoginPage/Login';
import LoginHeader from './components/Login/LoginHeader';
import VideoPage from './pages/VideoPage/VideoPage';
import Search from './pages/SearchPage'
import { inject, observer } from 'mobx-react';
import Storage from './utils/storageUtil';

const Stack = createStackNavigator()
// const Stack = createNativeStackNavigator();

function Bilibili(props) {
  useEffect(() => {
    Storage.getData('userData').then(res => {
      console.log(JSON.parse(res))
      props.Store.changeUserData(JSON.parse(res))
    })
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="index" component={HomePage} options={{ title: '主界面' }} />
        <Stack.Screen name="publish" component={Publish} options={{ title: '发布界面' }} />
        <Stack.Screen name="login" component={Login}
          options={{
            headerTitle: props => <LoginHeader {...props} />,
            headerShown: true,
            headerStyle: {
              backgroundColor: '#fb7299'
            },
            headerTintColor: '#fff',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
          }} />
        <Stack.Screen name='video' component={VideoPage} options={{ title: '视频详情页' }} />
        <Stack.Screen name='search' component={Search} options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default inject('Store')(observer(Bilibili))