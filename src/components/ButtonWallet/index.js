import React from 'react';
import { BoxGradient, ImageComponent, DivSpace, Text, View } from '@components';
import { scale, verticalScale } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { withNavigationFocus } from 'react-navigation';
import Ripple from 'react-native-material-ripple';
import Colors from '@styles/Colors';
import Styles from './styles';
import { useSelector } from 'react-redux';

const ButtonWallet = ({ titleText, IconButton, srcImage, buttonStyle = {}, containButtonStyle = {}, delay, navigation, disabled, onPress, invalid, ...props }) => {
    const redux = useSelector(state => state);
    const appData = redux.user;
    const brandTheme = appData?.Theme?.colors;

    return (

        <TouchableOpacity style={[Styles.containerButton, containButtonStyle]} onPress={invalid ? null : onPress} {...props}>
            {navigation.isFocused() && <Animatable.View style={{ alignItems: 'center' }} animation="flipInX" delay={delay}>
                <View centerH centerV style={[Object.keys(buttonStyle).length > 0 ? [] : Styles.containerWallet, { backgroundColor: 'white' }]}>
                    <View style={[Object.keys(buttonStyle).length > 0 ? Styles.containerRound : [], Object.keys(buttonStyle).length > 0 ? buttonStyle : { backgroundColor: 'white' }]}>
                        {srcImage ?
                            <ImageComponent source={srcImage} width={scale(24)} height={verticalScale(24)} />
                            :
                            <IconButton width={scale(25)} height={verticalScale(25)} fill={brandTheme?.orange ?? Colors?.orange} fillSecondary={brandTheme?.textGray ?? Colors?.textGray} />
                        }
                    </View>
                    {Object.keys(buttonStyle).length > 0 && (
                        <DivSpace height-5 />
                    )}

                    {Object.keys(buttonStyle).length <= 0 && (
                        <DivSpace height-20 />
                    )}

                    <Text h10 center white style={[Styles.marginText]}>{titleText}</Text>
                </View>
            </Animatable.View>}
        </TouchableOpacity>

    );
};

export default withNavigationFocus(ButtonWallet);
