import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-animatable';
import Styles from '@components/AnimateLabelInput/styles';
import Colors from '@styles/Colors';
const TextInputError = ({ error,theme }) => {
  return (
    <Text allowFontScaling={false} animation="fadeIn" style={[Styles.error,{color: theme.red??Colors.red}]}>
      {error}
    </Text>
  );
};

TextInputError.propTypes = {
  error: PropTypes.string
};

export default TextInputError;
