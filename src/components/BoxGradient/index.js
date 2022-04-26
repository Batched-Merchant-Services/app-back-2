import React from 'react';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { verticalScale } from 'react-native-size-matters';
import Styles from '@components/BoxGradient/styles';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';


const BoxGradient = ({
  children,
  size = 80,
  orange,
  invalid,
  darkblue,
  white,
  disable,
  style = {}
}) => {

  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  const BLUE = {
    colors: [brandTheme.textBlueDark??Colors.textBlueDark,brandTheme.textBlueDark??Colors.textBlueDark],
    start : { x: 0, y: 0 },
    end   : { x: 0, y: 1 }
  };
  const DARKBLUE = {
    colors: [brandTheme.bgBlue02??Colors.bgBlue02, brandTheme.bgBlue02??Colors.bgBlue02],
    start : { x: 0, y: 0 },
    end   : { x: 0, y: 1 }
  };
  const DISABLED = {
    colors: [brandTheme.bgBlue06??Colors.bgBlue06, brandTheme.bgBlue07??Colors.bgBlue07],
    start : { x: 0, y: 0 },
    end   : { x: 0, y: 1 }
  };
  const INVALID = {
    colors: [brandTheme.disabled??Colors.disabled, brandTheme.disabled??Colors.disabled],
    start : { x: 0, y: 0 },
    end   : { x: 0, y: 1 }
  };
  
  const ORANGE = {
    colors: [brandTheme.bgBlue01??Colors.bgBlue01, brandTheme.bgBlue02??Colors.bgBlue02],
    start : { x: 0, y: 0 },
    end   : { x: 0, y: 1 }
  };
  
  const WHITE = {
    colors: [brandTheme.white??Colors.white, brandTheme.white??Colors.white],
    start : { x: 0, y: 0 },
    end   : { x: 0, y: 1 }
  };

  



  let color;
  switch (true) {
  case orange:
    color = ORANGE;
    break;
  case invalid:
    color = INVALID;
    break;
  case darkblue:
    color = DARKBLUE;
    break;
  case white:
    color = WHITE;
    break;
  case disable:
    color = DISABLED;
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

BoxGradient.propTypes = {
  orange  : PropTypes.bool,
  size    : PropTypes.number,
  children: PropTypes.any
};

export default BoxGradient;
