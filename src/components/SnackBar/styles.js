import { StyleSheet } from 'react-native';
import {  Platform } from 'react-native';

export default StyleSheet.create({

  offlineContainer: {
    width: '95%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 15: 10,
    borderRadius:5

  },
});