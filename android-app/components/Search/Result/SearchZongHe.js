import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SearchVideoList from '../../SearchVideoList/SearchVideoList';

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%'
  }
})

export default (props) => {
  return (
    <View style={styles.wrapper}>
      <SearchVideoList navigation={props.navigation} />
    </View>
  )
}