import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';

const styles = StyleSheet.create({
  containerBottomId: {
    width                  : '100%',
    //backgroundColor        : Colors.textBlueDark,
    borderBottomLeftRadius : verticalScale(6),
    borderBottomRightRadius: verticalScale(6)
  },

});

export default styles;
