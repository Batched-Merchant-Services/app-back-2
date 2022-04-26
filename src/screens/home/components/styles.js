import { StyleSheet } from 'react-native';
import { scale,verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';

const styles = StyleSheet.create({
  containerModal: {
    backgroundColor: Colors.textBlueDark, 
    width          : verticalScale(325), 
    height         : verticalScale(440), 
    borderRadius   : verticalScale(8) 
  },
  slide1: {
    flex          : 1,
    justifyContent: 'center',
    alignItems    : 'center',
  },
  containerRow:{
    borderRadius : verticalScale(3) 
  },
  buttonClose:{
    borderRadius: verticalScale(30),
    width: scale(30),
    height: verticalScale(30),
    alignItems:'center',
    justifyContent: 'center'
  },
  containerClose:{
    alignItems: 'flex-end', 
    right: 10, 
    top: 10
  },
  textTitle: {
    color   : 'white', 
    fontSize: 16, 
    top     : 5
  },
  containerModalIns: {
    width          : scale(325), 
    height         : verticalScale(600), 
    borderRadius   : 8 
  },
  paginationStyle: {
    flex      : 1,
    alignItems: 'flex-end',
  },
  activeDot: {
    width       : 8,
    height      : 8,
    borderRadius: 4,
    marginLeft  : 3,
    marginRight : 3,
    bottom      : 10,
    marginBottom: 3
  },
  inactiveDot: {
    width       : 8,
    height      : 8,
    borderRadius: 4,
    marginLeft  : 3,
    marginRight : 3,
    bottom      : 10,
    marginBottom: 3,
  }
});

export default styles;