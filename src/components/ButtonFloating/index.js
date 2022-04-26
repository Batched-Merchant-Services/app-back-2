import React from 'react';
import { TouchableOpacity } from 'react-native';
import buttonFloating from '@assets/icons/buttonFloating.png';
import { scale, verticalScale } from 'react-native-size-matters';
import { ImageComponent,BoxGradient } from '@components';
import Styles from './styles';

const ButtonFloating = ({
  containerStyle = {},
  ...props
}) => {

  return (
    <TouchableOpacity style={[Styles.container, containerStyle]} {...props}>
      <BoxGradient size={35} disable>
        <ImageComponent source={buttonFloating} width={scale(15)} height={verticalScale(15)} />
      </BoxGradient>
     
    </TouchableOpacity>
  );
};


export default ButtonFloating;
