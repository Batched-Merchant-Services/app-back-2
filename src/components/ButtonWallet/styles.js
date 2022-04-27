import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

const Styles = StyleSheet.create({
  containerButton: {
    flex          : 1,
    // alignItems    : 'center',
    // justifyContent: 'center'
  },
  marginText: {
    marginHorizontal: 10
  },
  containerRound:{
    alignItems    : 'center',
    justifyContent: 'center',
    width : verticalScale(40),
    height: verticalScale(40),
    borderRadius: verticalScale(30),
  },
  containerWallet:{
    width : scale(75),
    height: verticalScale(126),
  }
});

export default Styles;
