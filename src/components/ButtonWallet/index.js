import React from 'react';
import { BoxGradient, ImageComponent, DivSpace, Text,View } from '@components';
import { scale, verticalScale } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { withNavigationFocus } from 'react-navigation';
import Ripple from 'react-native-material-ripple';
import Colors from '@styles/Colors';
import Styles from './styles';
import { useSelector} from 'react-redux';

const ButtonWallet = ({ titleText, IconButton,srcImage, buttonStyle = {}, delay, navigation,disabled,onPress, invalid, ...props }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  return (
    
    <TouchableOpacity style={[Styles.containerButton, buttonStyle]} onPress={invalid? null :onPress} {...props}>
      {navigation.isFocused() && <Animatable.View style={{alignItems:'center'}} animation="flipInX" delay={delay}>
        <View width-75 height-126 centerH centerV style={{backgroundColor:'white'}}>
          {srcImage ?
              <ImageComponent  source={srcImage} width={scale(24)} height={verticalScale(24)}/>
              :
              <IconButton width={scale(30)} height={verticalScale(30)}  fill={brandTheme?.orange??Colors?.orange} fillSecondary={brandTheme?.textGray??Colors?.textGray}/>
            }
          
          <DivSpace height-20 /> 
          <Text h10 center white style={[Styles.marginText]}>{titleText}</Text>
        </View>
          
      </Animatable.View>}
    </TouchableOpacity>
  
  );
};

export default withNavigationFocus(ButtonWallet);
