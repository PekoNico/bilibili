import React from 'react';
import { View } from 'react-native';
import { Text } from '@rneui/base';

import HomeHeader from '../../../components/Home/HomeHeader';
import HomeContent from '../../../components/Home/HomeContent';
import VideoList from '../../../components/VideoList';

export default (props) => {
  return (
    <View style={{ height: 610 }}>
      <HomeHeader {...props} />
      <HomeContent />
      {/* <VideoList rid={1}/> */}
    </View>
  )
}