import { StyleSheet } from 'react-native';
import Colors from '@styles/Colors';

const styles = StyleSheet.create({

  buttonChange: {
    backgroundColor: Colors?.textBlueDark,
    width          : 50,
    height         : 50,
    borderRadius   : 10,
    justifyContent : 'center',
    alignItems     : 'center' 
  },
  containerAmount: {
    borderRadius: 10,
  },
  boxTextBuy: {
    borderRadius   : 10
  }

});

export default styles;