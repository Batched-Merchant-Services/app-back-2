import { StyleSheet } from 'react-native';
import { verticalScale, scale } from 'react-native-size-matters';
import Colors from '@styles/Colors';

const styles = StyleSheet.create({
  scroll: {
    width            : '100%',
    height           : '100%',
    paddingHorizontal: scale(13)
  },
  borderInfo: {
    borderWidth : 1,
    borderRadius: 11
  }
});

export default styles;
