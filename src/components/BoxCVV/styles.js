import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

export default StyleSheet.create({
  container: {
    height        : verticalScale(30),
    justifyContent: 'center',
    flexDirection : 'row'
  },
  input: {
    textAlign : 'center',
    width     : scale(11),
    fontFamily: 'Montserrat-Medium',
    fontSize  : verticalScale(16),
    padding   : 0,
    margin    : 0
  },
  underLine: {
    height: verticalScale(1),
  },
});
