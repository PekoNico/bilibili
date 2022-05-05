/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'mobx-react';
import Store from './android-app/mobx/index'
import Bilibili from './android-app/Bilibili';
import 'react-native-gesture-handler';

const App = () => {
  return (
    <Provider Store={Store}>
      <StatusBar backgroundColor='#fb7299' />
      <Bilibili />
    </Provider>
  )
};

export default App;
