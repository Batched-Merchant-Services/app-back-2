import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';

const Styles = StyleSheet.create({
  topBackground: {
    width     : '100%',
    height    : verticalScale(200),
    flex      : 1,
    position  : 'absolute',
    resizeMode: 'stretch'
  },
  wrapper: {
    flex: 1
  },
  levelText: {
    fontSize        : verticalScale(90),
    textShadowColor : Colors.bgOrange02,
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 5
  },
  carouselItem: {
    backgroundColor: '#EDEFF2',
    height         : verticalScale(380),
    borderRadius   : 5
  },
  dotStyle        : { backgroundColor: Colors.bgOrange02 },
  inactiveDotStyle: { backgroundColor: Colors?.bgBlue06 }
});

export default Styles;
