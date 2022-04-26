import { StyleSheet } from 'react-native';
import { scale,verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  containerModal: {
    width       : scale(315), 
    height      : verticalScale(515), 
    borderRadius: 8 
  },
  buttonClose: {
    position       : 'absolute',
    top            : 25, 
    right          : 20, 
    width          : verticalScale(30), 
    height         : verticalScale(30), 
    borderRadius   : verticalScale(15), 
    backgroundColor: '#232E65'
  },
  touchableButton: {
    width         : '100%',
    height        : '100%', 
    alignItems    : 'center', 
    justifyContent: 'center'
  },
  stepGray: {
    backgroundColor: '#CFD7E2',
    width          : 6,
    height         : 6,
    borderRadius   : 3
  },
  containerLevel: {
    width         : verticalScale(54), 
    height        : verticalScale(24), 
    borderRadius  : verticalScale(30),
    alignContent  : 'center',
    justifyContent: 'center'
  },
  textBgblue: {
    color: '#61666E'
  }
});

export default styles;