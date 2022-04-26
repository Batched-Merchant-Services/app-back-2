import { StyleSheet } from 'react-native';
import { moderateScale,verticalScale } from 'react-native-size-matters';

export default StyleSheet.create({
  dropDown: {
    width                  : '100%',
    height                 : verticalScale(45),
    borderWidth            : verticalScale(1),
    alignItems             : 'flex-start',
    justifyContent         : 'center',
    borderTopRightRadius   : verticalScale(6),
    borderTopLeftRadius    : verticalScale(6),
    borderBottomRightRadius: verticalScale(6),
    borderBottomLeftRadius : verticalScale(6)
  },
  dropdownOpen: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius : 0,
    borderBottomWidth      : 0
  },
  dropdownContainer: {
    borderWidth            : moderateScale(1, 0.3),
    borderBottomRightRadius: moderateScale(6, 0.3),
    borderBottomLeftRadius : moderateScale(6, 0.3)
  },

  option: {
    flex       : 1,
    borderWidth: 0
  },

  container: {
    flex           : 1,
    backgroundColor: '#0A1F3F'
  },

  arrow: { position: 'absolute', bottom: moderateScale(12, 0.3), right: moderateScale(10, 0.3) },
});
