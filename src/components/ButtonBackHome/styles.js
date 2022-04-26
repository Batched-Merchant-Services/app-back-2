import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
export default StyleSheet.create({
  container: {
    width         : verticalScale(45),
    height        : verticalScale(45),
    borderRadius  : verticalScale(45),
    justifyContent: 'center',
    alignItems    : 'center',
    zIndex        : 10
  },


});
