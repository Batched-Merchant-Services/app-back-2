import { StyleSheet } from 'react-native';
import { scale,verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';

const styles = StyleSheet.create({
  containerModal: {
    backgroundColor: 'white',
    width       : scale(315), 
    height      : verticalScale(515), 
    borderRadius: 8 
  },
  touchableButton: {
    width         : '100%',
    height        : '100%', 
    alignItems    : 'center', 
    justifyContent: 'center'
  },
  textBgblue: {
    color: '#61666E'
  }
 
});

export default styles;