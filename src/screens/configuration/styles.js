import {StyleSheet} from 'react-native';
import { Dimensions } from 'react-native';
import { scale,verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';
export default StyleSheet.create({
  topBG: {
    width   : Dimensions.get('window').width,
    height  : Dimensions.get('window').width / 1.8,
    position: 'absolute',
    top     : 0,
    left    : 0
  },
  card: {
    borderRadius   : 10,
    width          : '100%',
    padding        : verticalScale(10)
  },
  button: { width: scale(170), height: scale(30) },
  text  : {
    color             : Colors?.bgBlue06,
    textDecorationLine: 'underline'
  }
});