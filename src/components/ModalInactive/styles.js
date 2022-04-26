import { StyleSheet } from 'react-native';
import { verticalScale, scale } from 'react-native-size-matters';

const Styles = StyleSheet.create({
  containerRechargeUser: {
    width       : scale(314),
    height      : verticalScale(490),
    borderRadius: verticalScale(10)
  },
});

export default Styles;
