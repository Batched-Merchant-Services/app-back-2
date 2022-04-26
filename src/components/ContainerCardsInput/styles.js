import { StyleSheet } from 'react-native';
import { scale, verticalScale,moderateScale } from 'react-native-size-matters';
import { Typography } from '@styles/Typography';
export default StyleSheet.create({
  container: {
    height        : verticalScale(30),
    justifyContent: 'center',
    flexDirection : 'row'
  },
  input: {
    textAlign : 'center',
    width     : scale(12),
    fontFamily: 'Montserrat-Medium',
    fontSize  : verticalScale(16),
    padding   : 0,
    margin    : 0
  },
  underLine: {
    height: verticalScale(1),
  },
  error: {
    ...Typography.weight.regular,
    ...Typography.sizes.h11,
    left: moderateScale(2, 0.2),
    top : moderateScale(5, 0.2),
  }
});
