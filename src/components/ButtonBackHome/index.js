import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ripple from 'react-native-material-ripple';

import HomeButton from '@assets/icons/home.png';
import { scale, verticalScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import { ImageComponent } from '@components';
import Styles from './styles';
import { View } from 'react-native-animatable';
import { Pulse } from 'react-native-loader';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';

const ButtonBackHome = ({
  size = 'sm',
  disabled,
  back,
  containerStyle = {},
  ...props
}) => {
  const btnSize = { width: getBtnSize(size) };
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;


  return (
    <View>
      <Ripple style={Styles.container} {...props} rippleColor={brandTheme.orange??Colors.orange} rippleOpacity={1} rippleDuration={1200} rippleContainerBorderRadius={30}>
        <TouchableOpacity
          disabled={disabled}
          style={[Styles.container, btnSize, containerStyle]}
          {...props}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[brandTheme.orange??Colors.orange,brandTheme.orange??Colors.orange]}
            style={Styles.container}
          >
            <ImageComponent source={HomeButton} width={scale(25)} height={verticalScale(25)} />
          </LinearGradient>
        </TouchableOpacity>
      </Ripple>
      <View style={{position:'absolute',top: verticalScale(-32),left: verticalScale(-32)}}>
        <Pulse size={verticalScale(55)} color={brandTheme?.orange??Colors.orange}/>
      </View>  
    </View>
  );
};

function getBtnSize(size) {
  const sizes = { ll: 40, sm: 40, md: 40, lg: 40 };
  return sizes[size];
}

export default ButtonBackHome;
