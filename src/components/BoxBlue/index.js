import React from 'react';
import { View } from '@components';
import styles from './styles';

const BoxBlue = ({ children, containerStyle = {}, ...props }) => {

  return (
    <View textBlueDark style={[styles.backgroundBlue, containerStyle]} {...props}>
      {children}
    </View>
  );
};
export default BoxBlue;

