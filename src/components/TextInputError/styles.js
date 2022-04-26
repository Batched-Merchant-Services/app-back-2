import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Typography } from '@styles/Typography';
export default StyleSheet.create({
  error: {
    ...Typography.weight.regular,
    ...Typography.sizes.h11,
    left: moderateScale(2, 0.2),
    top : moderateScale(5, 0.2)
  }
});
