import React from 'react';
import PropTypes from 'prop-types';
import { Text as RNText, Animated } from 'react-native';
import { useSelector} from 'react-redux';
import StyleHelper from '@utils/styleHelper';

const Text = ({ animated, numberOfLines, ellipsizeMode, ...props }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;


  const baseStyle = {
    ...StyleHelper.extractTypographyValue(props),
    ...StyleHelper.extractVarationValue(props),
    ...StyleHelper.extractColorValue(props,brandTheme),
    ...StyleHelper.extractTextAlign(props)
  };

  const Element = animated ? Animated.Text : RNText;

  return (
    <Element
      allowFontScaling={false}
      style={[baseStyle, props.style]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {props.children}
    </Element>
  );
};

Text.propTypes = {
  animated     : PropTypes.bool,
  numberOfLines: PropTypes.number,
  ellipsizeMode: PropTypes.string,
};

export default Text;
