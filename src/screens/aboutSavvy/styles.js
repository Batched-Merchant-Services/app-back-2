import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
// import Colors from '@styles/Colors';

const styles = StyleSheet.create({
  circleLevel: {
    width         : verticalScale(100),
    height        : verticalScale(100),
    alignItems    : 'center',
    justifyContent: 'center'
  },
  viewInfoCntc: {
    flex      : 1,
    alignItems: 'center',
  },
  containerView: {
    height: verticalScale(475)
  }
});

export default styles;
