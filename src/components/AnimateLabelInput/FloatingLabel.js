import React from 'react';
import PropTypes from 'prop-types';
import { moderateScale } from 'react-native-size-matters';
import Text from '@components/Text';
import Colors from '@styles/Colors';
import Styles from '@components/AnimateLabelInput/styles';
import { useSelector } from 'react-redux';

const FloatingLabel = ({ label, scale }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  const style = {
    top: scale.interpolate({
      inputRange : [0, 1],
      outputRange: [moderateScale(14, 0.3), moderateScale(3, 0.3)]
    }),
    fontSize: scale.interpolate({
      inputRange : [0, 1],
      outputRange: [moderateScale(14, 0.3), moderateScale(11, 0.3)]
    }),
    color: scale.interpolate({
      inputRange : [0, 1],
      outputRange: [brandTheme.textGray??Colors.textGray, brandTheme.white??Colors.white]
    })
  };

  return (
    <Text animated regular white style={[Styles.label, style]}>
      {label}
    </Text>
  );
};

FloatingLabel.propTypes = {
  label: PropTypes.string
};

export default FloatingLabel;
