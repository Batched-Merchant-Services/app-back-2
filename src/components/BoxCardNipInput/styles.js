import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';

export default StyleSheet.create({
  container: {
    height        : verticalScale(30),
    justifyContent: 'center',
    flexDirection : 'row'
  },
  input: {
    textAlign : 'center',
    width     : scale(11),
    color     : '#fff',
    fontFamily: 'Montserrat-Medium',
    fontSize  : verticalScale(16),
    padding   : 0,
    margin    : 0
  },
  underLine: {
    height         : verticalScale(1),
    backgroundColor: Colors?.bgBlue06
  },

});
