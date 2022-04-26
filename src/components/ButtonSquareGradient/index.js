import React from 'react';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { verticalScale } from 'react-native-size-matters';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';
import Styles from '@components/BoxGradient/styles';


const ButtonSquareGradient = ({
  children,
  size = 100,
  orange,
  darkblue,
  white,
  disabled,
  style = {}
}) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;


  const BLUE = {
    colors: [ brandTheme.bgBlue06??Colors?.bgBlue06,  brandTheme.bgBlue07??Colors?.bgBlue07],
    start : { x: 0, y: 0 },
    end   : { x: 0, y: 1 }
  };

  const DARKBLUE = {
    colors: [brandTheme.textBlue01??Colors?.textBlue01 ,brandTheme.textBlue01??Colors?.textBlue01],
    start : { x: 0, y: 0 },
    end   : { x: 0, y: 1 }
  };

  const ORANGE = {
    colors: [brandTheme.orange??Colors?.orange,brandTheme.bgOrange02??Colors?.bgOrange02],
    start : { x: 0, y: 0 },
    end   : { x: 0, y: 1 }
  };

  const WHITE = {
    colors: [brandTheme.white??Colors?.white,brandTheme.white??Colors?.white],
    start : { x: 0, y: 0 },
    end   : { x: 0, y: 1 }
  };
  const DISABLED = {
    colors: [brandTheme.textGray??Colors?.textGray,brandTheme.disabled??Colors?.disabled],
    start : { x: 0, y: 0 },
    end   : { x: 0, y: 1 }
  };


  let color;
  switch (true) {
  case orange:
    color = ORANGE;
    break;
  case darkblue:
    color = DARKBLUE;
    break;
  case white:
    color = WHITE;
    break;
  case disabled:
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
          borderRadius: verticalScale(8)
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

ButtonSquareGradient.propTypes = {
  orange  : PropTypes.bool,
  size    : PropTypes.number,
  children: PropTypes.any
};

export default ButtonSquareGradient;
