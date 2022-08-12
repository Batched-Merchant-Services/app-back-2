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
import IconClock from '@assets/brand/iconClock.png';
import Colors from '@styles/Colors';

const TwoFactorInstructions = ({ navigation, route, navigation: { goBack } }) => {
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
          body={i18n.t('Auth2fa.titleSecurity')}
        />
        <DivSpace height-15 />
        <View centerH>
          <BoxBlue textBlue01 containerStyle={{ height: verticalScale(520) }}>
            <View flex-1 centerH centerV >
              <Text h16 regular white center>{i18n.t('Auth2fa.textTwoFactorAuthentication')}</Text>
              <DivSpace height-10 />
              <ImageComponent
                source={IconClock}
                width={scale(100)}
                height={verticalScale(100)}
              />
              <DivSpace height-30 />
             
              <Text h10 white regular center>{i18n.t('Auth2fa.textUseAnAuthenticatorApp')}</Text>
              <DivSpace height-20 />
              <Text h14 regular white center>{i18n.t('Auth2fa.textBeforeActivating')}</Text>
              <DivSpace height-10 />
              <Text h12 white regular center>{i18n.t('Auth2fa.textInstallATwoFactor')}</Text>
              <DivSpace height-20 />
              <View row centerV>
                <Text orange h5>{'\u2B24'}</Text>
                <DivSpace width-5 />
                <Link>
                  <Text h14 white>{i18n.t('Auth2fa.textGoogleAuthenticator')}</Text>
                </Link>
              </View>
              <DivSpace height-10 />
              <View row centerV>
                <Text orange h5>{'\u2B24'}</Text>
                <DivSpace width-5 />
                <Link>
                  <Text h14 white>{i18n.t('Auth2fa.textMicrosoftAuthenticator')}</Text>
                </Link>
              </View>
              <DivSpace height-10 />
              <View row centerV>
                <Text orange h5>{'\u2B24'}</Text>
                <DivSpace width-5 />
                <Link>
                  <Text h14 white>{i18n.t('Auth2fa.textLastPassAuthenticator')}</Text>
                </Link>
              </View>
              <DivSpace height-40 />
                <ButtonRounded
                  onPress={() => navigation.navigate('TwoFactorActivation')}
                >
                  <Text h12 semibold textBlue01 center>
                    {i18n.t('Auth2fa.linkContinue')}
                  </Text>
                </ButtonRounded>
            </View>

          </BoxBlue>
        </View>
      </SafeAreaView>
    </SignUpWrapper>
  );
}


export default TwoFactorInstructions;