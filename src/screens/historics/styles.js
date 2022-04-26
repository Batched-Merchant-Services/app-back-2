import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';

const styles = StyleSheet.create({
  scroll: {
    width : '90%',
    height: '100%',
  },
  header: {
    backgroundColor: Colors.textBlueDark,
    borderRadius   : verticalScale(5)
  },
  opened: {
    borderRadius: verticalScale(5),
    shadowColor : '#000',
    shadowOffset: {
      width : 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius : 4,
    elevation    : 2
  },
  closed: {
    borderRadius: verticalScale(5),
    shadowColor : '#000',
    shadowOffset: {
      width : 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius : 4,
    elevation    : 2
  },
  DivSpace        : { height: 1},
  viewBtnFloating: { width: '100%', position: 'absolute', bottom: 30 }
});

export default styles;
