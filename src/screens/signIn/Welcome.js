import React from 'react';
import i18n from '@utils/i18n';
import { connect, useSelector } from 'react-redux';
import {
  Text,
  View,
  DivSpace,
  ImageComponent,
  ButtonRounded,
  ResizeImageBackground
} from '@components';
import * as Animatable from 'react-native-animatable';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { scale, verticalScale } from 'react-native-size-matters';
import { withNavigationFocus } from 'react-navigation';
import Styles from '@screens/signIn/styles';
import WELCOME_BACK from '@assets/brand/savvy-white-logo.png';
import background from '@assets/brand/backgroundImage.png';
import Colors from '@styles/Colors';

//redux
import { saveTheme } from '@store/ducks/user.ducks';


const Welcome = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandThemeImages = userData?.Theme?.images;
  const brandTheme = userData?.Theme?.colors;

  return (
    <>
      <SignUpWrapper forceInset={{ top: 0 }}>
        <ResizeImageBackground source={background}>
          <View flex-1 >
            <DivSpace height-20 />
            <Animatable.View style={{ alignItems: 'center' }}>
              <View centerH style={Styles.image}>
                <ImageComponent
                  source={brandThemeImages?.welcomeLogo ? brandThemeImages?.welcomeLogo : WELCOME_BACK}
                  width={scale(300)}
                  height={verticalScale(300)}
                />
              </View>
            </Animatable.View>
            <DivSpace height-30 />
            <View bottom>
            <View  paddingH-40 paddingV-40 style={{ borderColor: brandTheme?.bgOrange02??Colors?.bgOrange02, borderWidth: 1 }}>
              <Text h16 center regular disabled>
                {i18n.t('generics.welcome_back')}
              </Text>
              <DivSpace height-20 />
              <ButtonRounded
                size = 'lg'
                onPress={() => navigation.navigate('Login')}
              >
                <Text h10 semibold>
                  {i18n.t('login.component.buttonEnter')}
                </Text>
              </ButtonRounded>
            </View>
            </View>
          </View>
        </ResizeImageBackground>
      </SignUpWrapper>
    </>
  );
};
const mapStateToProps = state => ({
  loginWithFingerPrint: state.user.loginWithFingerPrint,
  Theme: state.user.Theme
});


const mapDispatchToProps = { saveTheme };



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigationFocus(Welcome));


