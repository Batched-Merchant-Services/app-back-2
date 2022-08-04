import { Platform, StyleSheet } from 'react-native';
import { scale,verticalScale,moderateScale } from 'react-native-size-matters';
import { Typography } from '@styles/Typography';

const Styles = StyleSheet.create({
  wrapper: {
    borderRadius     : moderateScale(8, 0.2),
    borderWidth      : moderateScale(1, 0.2),
    height           : moderateScale(50, 0.2),
    paddingTop       : moderateScale(18, 0.2),
    paddingHorizontal: moderateScale(10, 0.2)
  },
  label: {
    left    : moderateScale(10, 0.2),
    position: 'absolute',
  },
  input: {
    ...Typography.weight.regular,
    ...Typography.sizes.h18,
    flex        : 1,
    padding     : 0,
    margin      : 0,
    borderWidth : 0,
    marginBottom: moderateScale(3, 0.2),
    height      : '100%'
  },
  inputSecure: {
    //color        : 'transparent',
    fontSize     : moderateScale(Platform.OS === 'ios' ? 16 : 20, 0.2),
    letterSpacing: 3
  },
  secureTextWrapper: {
    width   : '100%',
    position: 'absolute',
    left    : moderateScale(10, 0.2),
    bottom  : moderateScale(5, 0.2),
    color   : 'transparent'
  },
  secureText: {
    letterSpacing: moderateScale(3, 0.2),
    ...Typography.weight.regular,
    ...Typography.sizes.h16
  },
  error: {
    ...Typography.weight.regular,
    ...Typography.sizes.h11,
    left: moderateScale(2, 0.2),
    top : moderateScale(5, 0.2),
  },
  imagePass: {
    width : verticalScale(24),
    height: verticalScale(24),

  },
  containerImagePass:{
    position: 'absolute', 
    top     : verticalScale(80), 
    bottom  : verticalScale(0), 
    right   : verticalScale(30),
    width   : scale(24),
    height  : verticalScale(24),
  },
  containerShow:{
    width   : verticalScale(25),
    height  : verticalScale(25),
    backgroundColor:'white',
    borderRadius:verticalScale(30), 
    alignItems:'center',
    justifyContent:'center'

  }
});

export default Styles;
