import { StyleSheet } from 'react-native';

import { verticalScale} from 'react-native-size-matters';

export default StyleSheet.create({
  containerLevel: {
    width         : verticalScale(54),
    height        : verticalScale(24),
    borderRadius  : verticalScale(30),
    alignContent  : 'center',
    justifyContent: 'center'
  },
  containerLevelSmall: {
    width         : verticalScale(39),
    height        : verticalScale(18),
    borderRadius  : verticalScale(18),
    alignContent  : 'center',
    justifyContent: 'center'
  }
});
