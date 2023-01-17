import React from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, View } from 'react-native';

import styles from './styles';

const ResizeImageBackground = ({
  source,
  height,
  width,
  style = {},
  children,
  ...rest
}) => {
  return (
    <View flex-1 style={{ height: height || '100%', width: width || '100%' }}>
      <ImageBackground source={source} style={[styles.imageContainer, style]} {...rest}>
        {children}
      </ImageBackground>
    </View>
  );
};

// ResizeImageBackground.propTypes = {
//   height: PropTypes.number.isRequired,
//   width : PropTypes.number.isRequired
// };

export default ResizeImageBackground;
