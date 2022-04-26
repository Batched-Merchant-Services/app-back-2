import { StyleSheet } from 'react-native';
import { scale,verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  containerBoxCardLevel: {
    borderRadius: 10, 
  },
  boxLinearGradient: {
    height        : verticalScale(20),
    width         : scale(91),
    alignItems    : 'center',
    justifyContent: 'center'
  },
  rowLeft: {
    position: 'absolute',
    right   : 0,
    bottom  : 20, 
    zIndex  : 1
  }
  
});

export default styles;