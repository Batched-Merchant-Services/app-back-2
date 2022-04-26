import React from 'react';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { verticalScale } from 'react-native-size-matters';
import Styles from '@components/BoxGradient/styles';
import Colors from '@styles/Colors';
import { useSelector } from 'react-redux';

const CircleAvatar = ({
  children,
  size = 32,
  orange,
  style = {}
}) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  const BLUE = {
    colors: [brandTheme?.bgBlue06??Colors.bgBlue06, brandTheme?.bgBlue07??Colors.bgBlue07],
    start : {x: 0.0, y: 0.25},
    end   : {x: 0.5, y: 1.0}
  };
  const ORANGE = {
    colors: [brandTheme?.orange??Colors?.orange, brandTheme?.bgOrange02??Colors?.bgOrange02],
    start : { x: 0, y: 0 },
    end   : { x: 0, y: 1 }
  };

  
  let color;
  switch (true) {
  case orange:
    color = ORANGE;
    break;
  default:
    color = BLUE;
  }

  return (
    <LinearGradient
      style={[
        {
          width       : verticalScale(size),
          height      : verticalScale(size),
          borderRadius: verticalScale(size)
        },
        Styles.circle,
        style
      ]}
      {...color}
    >
      {children}
    </LinearGradient>
  );
};

CircleAvatar.propTypes = {
  orange  : PropTypes.bool,
  size    : PropTypes.number,
  children: PropTypes.any
};

export default CircleAvatar;
