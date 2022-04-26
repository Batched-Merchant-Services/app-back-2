import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

export default StyleSheet.create({
  containerView: {
    flex           : 1,
    flexDirection  : 'column',
    borderRadius   : verticalScale(9)
  },
  imageBackground: {
    flex      : 1,
    resizeMode: 'cover',
    tintColor:'red'
  },
  imageStyles: {
    borderRadius: verticalScale(9)
  },

});
