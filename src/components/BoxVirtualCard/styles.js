import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

export default StyleSheet.create({
  bordersCard: {
    width: verticalScale(279),
    height : verticalScale(399),
    justifyContent: 'center',
    alignItems : 'center'
  },
  containerCard: {
    width : verticalScale(211),
    height : verticalScale(332),
    justifyContent: 'center',
    alignItems : 'center'
  },
  containerText: {
    width: verticalScale(270),
    height: verticalScale(160),
    transform: [{ rotate: '-90deg' }]
  }
});
