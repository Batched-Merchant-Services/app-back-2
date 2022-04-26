import { StyleSheet } from 'react-native';
import { verticalScale, scale } from 'react-native-size-matters';
import Colors from '@styles/Colors';

export default StyleSheet.create({
  carouselItem: {
    height         : verticalScale(570),
    borderRadius   : 5
  },
  dotStyle         : { backgroundColor: Colors?.orange },
  inactiveDotStyle : { backgroundColor: Colors.white },


});