import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';


export default StyleSheet.create({
  container: {
    width         : 40,
    height        : 40,
    borderRadius  : verticalScale(3),
    justifyContent: 'center',
    alignItems    : 'center',
  }
});
