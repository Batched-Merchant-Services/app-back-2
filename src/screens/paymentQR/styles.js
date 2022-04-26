import { StyleSheet } from 'react-native';
import { scale,verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';

const styles = StyleSheet.create({
  centerQR: {
    backgroundColor: 'white',
    borderRadius   : 8,
    width          : '85%',
  },
  bordersBottom: {
    backgroundColor        : Colors?.bgGray,
    height                 : verticalScale(70),
    borderBottomLeftRadius : 10,
    borderBottomRightRadius: 10
  },
  containerQR: {
    borderColor: 'red',
    borderWidth: 1
  },
  wrapper: {
    alignItems    : 'center',
    justifyContent: 'center'
  },
  manualCreditWrapper: {
    borderRadius   : 10
  },
  manualCreditImageWrapper: {
    borderRadius   : 10
  },
  manualCreditButton: { width: scale(144) },
  textGray          : {
    color: '#61666E'
  }

});

export default styles;
