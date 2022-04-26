import { StyleSheet } from 'react-native';

import {scale, verticalScale} from 'react-native-size-matters';

export default StyleSheet.create({
  modalCenter: {
    flex          : 1,
    justifyContent: 'center',
    alignItems    : 'center',
    width         : '100%',
    height        : verticalScale(80)
  },
  sizeLoader: {
    width : scale(60), 
    height: verticalScale(60)
  }
});
