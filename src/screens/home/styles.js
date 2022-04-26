import { StyleSheet,StatusBar } from 'react-native';
import { scale,verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  viewButton: {
    width          : verticalScale(20), 
    height         : verticalScale(20), 
    borderRadius   : verticalScale(10),
    position       : 'absolute',
    left           : scale(53),
    top            : scale(-6),
  },
  numberNotification: {
    justifyContent: 'center',
    alignItems    : 'center',
    width         : verticalScale(20), 
    height        : verticalScale(20), 
    borderRadius  : verticalScale(10),
    position      : 'absolute',
    left          : scale(150),
    top           : scale(-5),
  },
  slide1: {
    flex          : 0.9,
    justifyContent: 'center',
    alignItems    : 'center',
  },
  containerClose: {
    alignItems: 'flex-end', 
    right     : 10, 
    top       : 10
  },
  animateSwiper: {
    flex: 1,
    top : verticalScale(-25),
  },
  containerCrypto: {
    flex             : 1, 
    width            : '100%', 
    paddingHorizontal: verticalScale(10),
  },
  scrollview: {
    flex           : 1,
    backgroundColor: 'transparent'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor:'red',
    borderWidth:1
  },
  containerSafeArea:{
    flex: 1,
    marginTop:StatusBar.currentHeight
  }
});

export default styles;