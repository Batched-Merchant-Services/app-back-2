import React from 'react';
import PropTypes from 'prop-types';
import {ImageBackground, TouchableOpacity} from 'react-native';
import gradientBlue from '@assets/icons/gradientBlue.png';
import styles from './styles';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';


const ContainerCrypto = ({ children, containerStyle = {}, onPress,...props}) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.containerView,containerStyle, {backgroundColor: brandTheme.textBlueDark??Colors.textBlueDark}]}>
      {children}
    </TouchableOpacity>
  );
};

ContainerCrypto.propTypes = {
  onPress: PropTypes.func,
};

export default ContainerCrypto;
