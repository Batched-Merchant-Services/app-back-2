import { StyleSheet } from 'react-native';
import { scale,verticalScale,moderateScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';

const styles = StyleSheet.create({
  containerImage: {
    backgroundColor: 'white', 
    width          : scale(30), 
    height         : verticalScale(30), 
    borderRadius   : verticalScale(30) 
  },
  animation: {
    //backgroundColor: '#37458B', 
    borderRadius   : 10, 
    width          : '100%',
  },
  containerButton: {
    flex          : 1, 
    alignItems    : 'center', 
    justifyContent: 'center',
  },
  containerBox: {
    width          : scale(30), 
    height         : verticalScale(30), 
    borderRadius   : verticalScale(30) 
  },
  boxPercent: {
    width          : scale(85),
    height         : verticalScale(25),
    borderRadius   : verticalScale(4), 
    alignItems     : 'center',
    justifyContent : 'center'
  },
  changeCurrency: {
    width          : moderateScale(50),
    height         : moderateScale(50),
    borderRadius   : moderateScale(10),
    justifyContent : 'center',
    alignItems     : 'center' 
  },
  container: {
    flex           : 1,
    marginVertical: scale(20),
  },
  chart: {
    flex           : 1,
    backgroundColor: 'white'
  },
  heightLinear: {
    height: verticalScale(108)
  },
  
});

export default styles;