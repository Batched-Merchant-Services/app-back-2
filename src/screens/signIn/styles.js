import { StyleSheet, Platform } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

const Styles = StyleSheet.create({
  imageBGContainer: {
    width     : '100%',
    height    : verticalScale(250),
    flex      : 1,
    position  : 'absolute',
    resizeMode: 'stretch'
  },
  image: { paddingTop: verticalScale(Platform.OS === 'android' ? 50 : 70) },
  container: {
    flex: 1,borderColor:'red',borderWidth:1
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
});

export default Styles;
