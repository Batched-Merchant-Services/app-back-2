import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

const Styles = StyleSheet.create({
  wrapper: {
    width         : scale(24),
    height        : verticalScale(24),
    borderRadius  : verticalScale(8),
    borderWidth   : verticalScale(1),
    justifyContent: 'center',
    alignItems    : 'center'
  },

 
});

export default Styles;
