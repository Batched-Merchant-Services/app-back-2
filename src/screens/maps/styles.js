import { StyleSheet } from 'react-native';
import { scale,verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';
const styles = StyleSheet.create({
  containerQR: {
    width               : scale(314),
    height              : verticalScale(390),
    backgroundColor     : 'white',
    borderTopRightRadius: verticalScale(10),
    borderTopLeftRadius : verticalScale(10)
  },
  containerFooter: {
    backgroundColor        : Colors.textBlueDark,
    width                  : scale(314),
    height                 : verticalScale(110),
    borderBottomRightRadius: 10,
    borderBottomLeftRadius : 10
  },
  closeButton: {
    position       : 'absolute',
    top            : verticalScale(-20), 
    left           : scale(135), 
    right          : 0, 
    bottom         : 0, 
    width          : verticalScale(35), 
    height         : verticalScale(35), 
    borderRadius   : verticalScale(35), 
    backgroundColor: '#4355AF', 
    alignItems     : 'center', 
    justifyContent : 'center'
  }
});

export default styles;



               