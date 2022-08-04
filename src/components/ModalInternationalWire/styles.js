import { StyleSheet } from 'react-native';
import { scale,verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';
const styles = StyleSheet.create({
  containerModal: {
    backgroundColor: '#37458B', 
    width          : scale(325), 
    height         : verticalScale(575),
    borderRadius   : 8 
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
  containerRow: {
    backgroundColor: Colors.textBlueDark,
    borderRadius   : verticalScale(35) 
  },
  buttonClose: {
    borderRadius   : verticalScale(30),
    backgroundColor: '#232E65',
    width          : scale(30),
    height         : verticalScale(30),
    alignItems     : 'center',
    justifyContent : 'center'
  },
  containerClose:{
    alignItems: 'flex-end', 
    right     : 10, 
    top       : 10
  },
  manualCreditButton:{
    alignItems    : 'center',
    justifyContent: 'center'
  }
 
});

export default styles;