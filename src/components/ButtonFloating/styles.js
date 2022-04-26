import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
export default StyleSheet.create({
  container: {
    width         : verticalScale(40),
    height        : verticalScale(40),
    borderRadius  : verticalScale(20),
    justifyContent: 'center',
    alignItems    : 'center',
  }
});
