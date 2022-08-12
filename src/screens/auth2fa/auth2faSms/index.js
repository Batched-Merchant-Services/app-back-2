import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Link,
  BoxBlue,
  DivSpace,
  ButtonRounded,
  NavigationBar,
  ImageComponent
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import i18n from '@utils/i18n';
import { scale, verticalScale } from 'react-native-size-matters';
import IconSms from '@assets/brand/iconSms.png';
import Colors from '@styles/Colors';

const auth2faSms = ({ navigation, navigation: { goBack } }) => {

  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.app;
  const brandTheme = appData?.Theme?.colors;
  const error = useSelector(state => state?.auth?.showError);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  function handleActivation() {
    navigation.navigate('TwoFactorActivation', { page: 'change' });
  }


  return (
    <SignUpWrapper >
      <SafeAreaView forceInset={{ top: 'always' }}>
        <NavigationBar
          onBack={() => navigation.goBack()}
          body={i18n.t('Auth2fa.textAuthenticationVia') + i18n.t('Auth2fa.textSMS')}
        />
        <DivSpace height-15 />
        <View centerH>
          <BoxBlue textBlue01 containerStyle={{ height: verticalScale(520) }}>
            <View flex-1 centerV centerH padding-30>
            <Text h13 regular textGray>{i18n.t('Auth2fa.textSMSAuthentication')}</Text>
            <DivSpace height-20 />
              <View centerH>
                <ImageComponent
                  source={IconSms}
                  width={scale(100)}
                  height={verticalScale(100)}
                />
                <DivSpace height-40 />
                <Text h10 white regular>{i18n.t('Auth2fa.textUseYourPhoneAsYourTwoFactor')}</Text>
              </View>
              <View flex-1 bottom centerH>
                <ButtonRounded
                onPress={() => navigation.push('ActivationSms')}
                >
                  <Text h11 semibold textBlue01 center>
                    Continuar
                  </Text>
                </ButtonRounded>
              </View>
            </View>
          </BoxBlue>
        </View>
      </SafeAreaView>
    </SignUpWrapper>
  );
}

export default auth2faSms;