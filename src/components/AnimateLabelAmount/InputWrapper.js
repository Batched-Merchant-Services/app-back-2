import React from 'react';
import PropTypes from 'prop-types';

import View from '@components/View';
import LinearGradient from 'react-native-linear-gradient';
import Styles from '@components/AnimateLabelAmount/styles';
import Colors from '@styles/Colors';
import { useSelector } from 'react-redux';
const InputWrapper = ({ children, isFocused, hasError }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;



  return (
    <View>
      <View
        row
        bottom
        style={[
          Styles.wrapper,
          ...(isFocused ? [Styles.wrapperFocused,{borderColor: brandTheme.bgBlue06??Colors.bgBlue06}] : []),
          ...(hasError ? [{ borderColor: brandTheme.red??Colors.red}] : [])
        ]}
      >
        {children}
      </View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[ isFocused ? brandTheme.orange??Colors?.orange : brandTheme.title??Colors?.title , isFocused ? brandTheme.bgOrange02??Colors?.bgOrange02 : brandTheme.title??Colors?.title]}
        style={{ height: 2 }}/>
    </View>
  );
};

InputWrapper.propTypes = {
  children : PropTypes.any,
  hasError : PropTypes.bool,
  isFocused: PropTypes.bool,
};

export default InputWrapper;
