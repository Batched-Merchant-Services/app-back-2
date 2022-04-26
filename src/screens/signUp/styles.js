import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

export default StyleSheet.create({
  colorButtonRadiusL: {
    backgroundColor       : 'rgba(70,86,169,.50)',
    borderTopLeftRadius   : verticalScale(30),
    borderBottomLeftRadius: verticalScale(30)
  },
  colorButtonRadiusR: {
    borderTopRightRadius   : verticalScale(30),
    borderBottomRightRadius: verticalScale(30)
  },
  information: {
    alignItems     : 'center',
    justifyContent : 'center',
    backgroundColor: '#485490',
    width          : 22,
    height         : 22,
    borderRadius   : 11
  },
  viewInform: {
    flex       : 0.5,
    marginRight: scale(18)
  },
  containerInitProfile: {
    flex           : 1,
    backgroundColor: '#232E65'
  },
  containerView: {
    height: verticalScale(475)
  }
});
