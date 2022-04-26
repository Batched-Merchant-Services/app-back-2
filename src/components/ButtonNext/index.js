import React from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import  {TouchableOpacity}  from 'react-native';
import  {ImageComponent}  from '@components';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from 'react-native-material-ripple';
import RowRight from '@assets/imagesOnboard/rowRight.png';
import rowBack from '@assets/icons/rowBack.png';
import Styles from './styles';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';

const ButtonNext = ({
  size = 'sm',
  disabled,
  back,
  containerStyle = {},
  gradientStyle = {},
  ...props
}) => {
  const btnSize = { width: getBtnSize(size) };

  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;


  const gradient = disabled
  ? [brandTheme.bgOrange02??Colors.bgOrange02, brandTheme.bgOrange02??Colors.bgOrange02]
  : [brandTheme.orange??Colors.orange, brandTheme.bgOrange02??Colors.bgOrange02];

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={gradient}
      style={[Styles.container,gradientStyle]}
    >
      <TouchableOpacity
        disabled={disabled}
        style={[Styles.container, btnSize, containerStyle]}
        {...props}
      >
        <Ripple disabled={disabled} {...props} style={Styles.container} rippleColor={ brandTheme.bgOrange01??Colors.bgOrange01} rippleOpacity={1} rippleDuration={1200} rippleContainerBorderRadius={30}>
          <ImageComponent  source={back ? rowBack : RowRight} width={scale(18)} height={verticalScale(18)} />
        </Ripple>
      </TouchableOpacity>
    </LinearGradient>
  );
};

function getBtnSize(size) {
  const sizes = { ll: 0, sm: 40, md: 40, lg: 40 };
  return sizes[size];
}

export default ButtonNext;
