import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

export default StyleSheet.create({
  positionModal: {
    flex         : 1,
    flexDirection: 'column',
    alignItems   : 'center',
    paddingTop   : verticalScale(83),
    backgroundColor: 'rgba(9,18,8,0.2)'
  }
});
//  backgroundColor: 'rgba(9,18,8,0.6)'