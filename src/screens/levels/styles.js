import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';

const styles = StyleSheet.create({
  containerImage: {
    width         : verticalScale(183),
    height        : verticalScale(182),
    alignItems    : 'center',
    justifyContent: 'center'
  },
  showNumberLevel: {
    fontSize: verticalScale(40)
  },
  textShowStep: {
    backgroundColor: Colors.textBlueDark,
    borderRadius   : verticalScale(30),
    width          : verticalScale(24),
    height         : verticalScale(24)
  },
  showNextStep: {
    backgroundColor: Colors.textBlueDark,
    borderRadius   : verticalScale(30),
    width          : verticalScale(24),
    height         : verticalScale(24)
  },
  containerTouchable: {
    backgroundColor: Colors.textBlueDark,
    borderRadius   : 10,
    height         : verticalScale(80)
  },
  obtainPoints: {
    backgroundColor: '#D8D8D8'
  },

  BoxGradientR: {
    flex          : 1,
    alignItems    : 'center',
    justifyContent: 'center',
    right         : 20
  },
  BoxGradientL: {
    flex          : 1,
    alignItems    : 'center',
    justifyContent: 'center',
    left          : 20
  },
  containerUuPoints: {
    backgroundColor: Colors.textBlueDark,
    borderRadius   : 7,
    height         : verticalScale(510)
  },
  circleLevel: {
    width         : verticalScale(100),
    height        : verticalScale(100),
    alignItems    : 'center',
    justifyContent: 'center'
  },
  viewInfoCntc: {
    flex: 1
  },
  viewLineL: {
    width          : scale(35),
    height         : 1,
    backgroundColor: Colors?.orange,
    position       : 'absolute',
    top            : verticalScale(3)
  },
  viewLineR: {
    width          : scale(31),
    height         : 1,
    backgroundColor: '#5B6ADB',
    position       : 'absolute',
    right          : 0,
    top            : 3
  },
  carouselCard: {
    backgroundColor: '#5867DB',
    borderRadius   : 10,
    shadowColor    : '#000',
    shadowOffset   : {
      width : 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius : 4,
    elevation    : 2
  },
  dot        : { borderRadius: 20 },
  activeDot  : { backgroundColor: Colors.orange },
  inactiveDot: { backgroundColor: Colors.bgBlue06 },
  dotLine    : {
    width    : 1,
    alignSelf: 'center'
  },
  activeDotLine: {
    backgroundColor: Colors.orange
  },
  inactiveDotLine: {
    backgroundColor: Colors.bgBlue06
  },
  dotContainer: {
    flex   : 1,
    padding: 0
  },
  paginationContainer: {
    height    : '100%',
    paddingTop: verticalScale(19)
  },
  paginationWrapper: { height: '100%' }
});

export default styles;
