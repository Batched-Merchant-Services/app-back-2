import { Platform, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Typography } from '@styles/Typography';

const Styles = StyleSheet.create({
  wrapper: {
    height           : moderateScale(55, 0.2),
    paddingTop       : moderateScale(18, 0.2),
    paddingHorizontal: moderateScale(10, 0.2)
  },
  wrapperFocused: {
    backgroundColor: 'transparent',
  },

  label: {
    position      : 'absolute', 
    top           : 0, 
    left          : 0,
    right         : 0, 
    bottom        : 0, 
    justifyContent: 'center', 
    alignItems    : 'center'
  },
  input: {
    ...Typography.weight.regular,
    ...Typography.sizes.h15,
    flex        : 1,
    padding     : 0,
    margin      : 0,
    borderWidth : 0,
    marginBottom: moderateScale(3, 0.2),
    textAlign   : 'center'
  },
  inputSecure: {
    color        : 'transparent',
    fontSize     : moderateScale(Platform.OS === 'ios' ? 16 : 21, 0.2),
    letterSpacing: 3
  },
  secureTextWrapper: {
    width   : '100%',
    position: 'absolute',
    left    : moderateScale(10, 0.2),
    bottom  : moderateScale(5, 0.2),
    color   : 'transparent'
  },
  multiline: {
    borderColor: 'red',
    borderWidth: 1,
    height     : moderateScale(50),
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
  }
});

export default Styles;
