import { StyleSheet } from 'react-native';
import { verticalScale, scale } from 'react-native-size-matters';
import Colors from '@styles/Colors';

const styles = StyleSheet.create({
  scroll: {
    width            : '100%',
    height           : '100%',
    paddingHorizontal: scale(13)
  },
  header: {
    backgroundColor: Colors.textBlueDark,
    borderRadius   : verticalScale(5)
  },
  opened: {
    borderRadius   : verticalScale(5),
    shadowColor    : '#000',
    shadowOffset   : {
      width : 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius : 4,
    elevation    : 2,
  },
  closed: {
    borderRadius   : verticalScale(5),
    shadowColor    : '#000',
    shadowOffset   : {
      width : 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius : 4,
    elevation    : 2,
  },
  DivSpace: { 
    height         : 1,
  },
  viewBtnFloating: { 
    width   : '100%', 
    position: 'absolute', 
    bottom  : 30 
  },
  boxTextBuy: {
    borderRadius: 10
  },

  background: {
    borderRadius: 10
  },
  textChart:{
    color: '#61666E'
  }
});

export default styles;
