import { StyleSheet } from 'react-native';
import {  verticalScale } from 'react-native-size-matters';
 
export default StyleSheet.create({
  colorButtonRadius: {
    flex          : 1,
    width         : '100%',
    height        : verticalScale(45),
    alignItems    : 'center',
    justifyContent: 'center',
  },
  textChangueColor: {
    fontWeight: '600'
  },
  colorButtonRadiusL: {
    flex                  : 1,
    width                 : '100%',
    height                : verticalScale(45),
    alignItems            : 'center',
    justifyContent        : 'center',
    borderWidth           : 0,
    borderTopLeftRadius   : verticalScale(30),
    borderBottomLeftRadius: verticalScale(30)
  },
  colorButtonRadiusR: {
    flex                   : 1,
    width                  : '100%',
    height                 : verticalScale(45),
    alignItems             : 'center',
    justifyContent         : 'center',
    borderWidth            : 0,
    borderTopRightRadius   : verticalScale(30),
    borderBottomRightRadius: verticalScale(30)
  },
  circleGreen: {
    position    : 'absolute',
    top         : -9,
    borderRadius: 15,
    zIndex      : 1
  }
});
