import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';

const styles = StyleSheet.create({
  scrollView: {
    width            : '100%',
    height           : '100%',
    paddingHorizontal: scale(13),
  },
  element: { backgroundColor: Colors.textBlueDark, borderRadius: 10 },
  header : { justifyContent: 'space-between' },
  avatar : {
    width       : scale(35),
    height      : scale(35),
    borderRadius: scale(35)
  },
  containerAmount: {
    flex  : 0.7, 
    height: verticalScale(48), 
  },
  body: {
    backgroundColor        : Colors.textBlueDark,
    borderBottomLeftRadius : 10,
    borderBottomRightRadius: 10,
    justifyContent         : 'space-between'
  },
  bodyWhite: {
    backgroundColor        : Colors.white,
    borderBottomLeftRadius : 10,
    borderBottomRightRadius: 10,
    justifyContent         : 'space-between'
  },
  deny: {
    width : scale(120),
    height: verticalScale(24)
  },
  cancel: {
    width : scale(113),
    height: verticalScale(24)
  },
  accept: {
    width : scale(120),
    height: verticalScale(24)
  },
  viewInfoCntc: {
    alignItems    : 'center',
    justifyContent: 'center'
  },
  viewBtnFloating: {
    width   : '100%',
    position: 'absolute',
    bottom  : 30
  },
});

export default styles;
