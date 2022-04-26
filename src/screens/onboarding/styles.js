import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  steps: {
    width       : scale(8),
    height      : verticalScale(8),
    borderRadius: verticalScale(4)
  },
  stepsWhite: {
    width       : scale(8),
    height      : verticalScale(8),
    borderRadius: verticalScale(4)
  },
  imageBackgnd: {
    width : '100%', 
    height: verticalScale(188)
  }
  
});
