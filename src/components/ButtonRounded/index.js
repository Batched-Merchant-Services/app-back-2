import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from 'react-native-material-ripple';
import { Bubbles } from 'react-native-loader';
import { scale } from 'react-native-size-matters';
import Colors from '@styles/Colors';
import View from '@components/View';
import { useSelector} from 'react-redux';
import Styles from '@components/ButtonRounded/styles';

const ButtonRounded = ({
  size = 'sm',
  blue,
  inactive,
  darkBlue,
  disabled,
  children,
  containerStyle = {},
  style = {},
  isLoading,
  white,
  ...props
}) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  

  const btnSize = { width: getBtnSize(size) };

  const blueColor = disabled
    ? [brandTheme.bgBlue06??Colors.bgBlue06, brandTheme.textBlueDark??Colors.textBlueDark]
    : [brandTheme.bgBlue06??Colors.bgBlue06, brandTheme.bgBlue06??Colors.bgBlue06];

  const inactiveColor = disabled
    ? [brandTheme.bgBlue06??Colors.bgBlue06, brandTheme.textBlueDark??Colors.textBlueDark]
    : [brandTheme.disabled??Colors.disabled , brandTheme.disabled??Colors.disabled ];

  const darkBlueColor = disabled
    ? [brandTheme.bgBlue02??Colors.bgBlue02, brandTheme.textBlueDark??Colors.textBlueDark]
    : [brandTheme.bgBlue02??Colors.bgBlue02, brandTheme.bgBlue02??Colors.bgBlue02];

  const orangeColor = disabled
    ? [brandTheme.bgOrange02??Colors.bgOrange02, brandTheme.bgOrange02??Colors.bgOrange02]
    : [brandTheme.orange??Colors.orange, brandTheme.bgOrange02??Colors.bgOrange02];
 
  const whiteColor = disabled
    ? [brandTheme.white??Colors.white, brandTheme.white??Colors.white]
    : [brandTheme.white??Colors.white, brandTheme.white??Colors.white];




  let color;
  switch (true) {
  case inactive:
    color = inactiveColor;
    break;
  case blue:
    color = blueColor;
    break;
  case darkBlue:
    color = darkBlueColor;
    break;
  case white:
    color = whiteColor;
    break;
  default:
    color = orangeColor;
  }

  return (
    <Ripple disabled={disabled} {...props}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={color}
        style={[Styles.wrapper, style,btnSize]}
      >
        <View style={[Styles.wrapper, btnSize, containerStyle]} {...props}>
          {isLoading ? <Bubbles size={5} color={brandTheme.white??Colors.white} /> : children}
        </View>
      </LinearGradient>
    </Ripple>
  );
};

function getBtnSize(size) {
  const sizes = {
    lg : scale(200),
    sm : scale(145),
    md : scale(200),
    sml: scale(140),
    msm: scale(70)
  };
  return sizes[size];
}

export default ButtonRounded;
