import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  containerImage: {
    width          : verticalScale(30), 
    height         : verticalScale(30), 
    borderRadius   : verticalScale(30) 
  }
});

export default styles;