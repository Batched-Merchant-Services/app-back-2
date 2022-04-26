import { StyleSheet, Dimensions } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default StyleSheet.create({
  header: {
    width          : Dimensions.get('window').width,
    top            : 0,
    paddingTop     : getStatusBarHeight() + verticalScale(10),
    position       : 'absolute',
    zIndex         : 2,
    backgroundColor: 'rgba(44,44,44,0.2)'
  },
  headerButton: { flexDirection: 'row', width: scale(58) },
  camera      : {
    height: Dimensions.get('window').height
  },
  footer: {
    width          : Dimensions.get('window').width,
    bottom         : 0,
    paddingBottom  : verticalScale(42),
    position       : 'absolute',
    zIndex         : 2,
    backgroundColor: 'rgba(44,44,44,0.2)'
  },
  footerButton: { width: scale(150) }
});
