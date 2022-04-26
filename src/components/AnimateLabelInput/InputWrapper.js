import React from 'react';
import PropTypes from 'prop-types';
import View from '@components/View';
import Colors from '@styles/Colors';
import Styles from '@components/AnimateLabelInput/styles';
import { useSelector } from 'react-redux';

const InputWrapper = ({ multiInput, numberOfLines, children, isFocused, hasError,borderLight,multiline, containerStyle={},...props }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  return (
    <View
      {...props}
      row
      bottom
      style={[
        Styles.wrapper,containerStyle,{borderColor: brandTheme.bgBlue06??Colors.bgBlue06},
        ...(borderLight ?[{ borderColor: brandTheme.bgBlue06??Colors?.bgBlue06 }]:[]),
        ...(multiInput ? [{height: 50 * (numberOfLines || 2)}] : []),
        ...(multiline ? [{height: 80 }] : []),
        ...(isFocused ? [{ backgroundColor: brandTheme.textBlueDark??Colors.textBlueDark,borderColor: brandTheme.bgBlue06?? Colors.bgBlue06}] : []),
        ...(hasError ? [{borderColor: brandTheme.red??Colors.red}] : []),
        ]}
    >
      {children}
    </View>
  );
};

InputWrapper.propTypes = {
  children : PropTypes.any,
  hasError : PropTypes.bool,
  isFocused: PropTypes.bool,
};

export default InputWrapper;
