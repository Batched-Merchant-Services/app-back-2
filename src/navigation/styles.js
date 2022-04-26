import { StyleSheet, Dimensions, Platform } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

export default StyleSheet.create({
  container: {
    flex: 1,
    width       : Dimensions.get('window').width,
    //height      : Platform.OS === 'ios' ? Dimensions.get('window').height + verticalScale(90) : Dimensions.get('window').height + verticalScale(0),
    shadowColor : '#000000',
    shadowOffset: {
      width : -300,
      height: 300
    },
    shadowRadius: 40,
    elevation   : 40,
  }
});
