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

const ConfirmationAuth = ({ navigation, route, navigation: { goBack } }) => {

  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const params = navigation.getParam('page')
  const error = useSelector(state => state?.auth?.showError);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handlePressBack = () => {
    if (appData?.pageNavigation2fa ==='config') {
      navigation.navigate('MyWallet')
    } else {
      navigation.navigate('MyWallet')
    }
   
  }

  return (
    <SignUpWrapper >
      <SafeAreaView forceInset={{ top: 'always' }}>
        <NavigationBar
          onBack={() => navigation.goBack()}
          body={i18n.t('generics.textConfirmation')}
        />
        <DivSpace height-15 />
        <View centerH>
          <BoxBlue textBlue01 containerStyle={{ height: verticalScale(520) }}>
            <View flex-1 centerV centerH padding-30>
                {params === 'SMS' && (
                  <Text h12 regular textGray>{i18n.t('Auth2fa.textSMSAuthenticationActivated')}</Text>
                )}
                {params === 'Email' && (
                  <Text h12 regular textGray>{i18n.t('Auth2fa.textEmailAuthenticationActivated')}</Text>
                )}
                {params === 'App' && (
                  <Text h12 regular textGray>{i18n.t('Auth2fa.textTwoFactorAuthenticationActivated')}</Text>
                )}
              <DivSpace height-20 />
              <View centerH>
                <ImageComponent
                  source={IconSms}
                  width={scale(100)}
                  height={verticalScale(100)}
                />
              </View>
              <DivSpace height-20 />
              <View blue01 width-36 height-1 />
              <DivSpace height-20 />
              <Text h12 textGray regular>{i18n.t('Auth2fa.textRememberToEnterSixDigits')}
                {params === 'SMS' && (
                  <Text textGray semibold h12>{' '}{i18n.t('Auth2fa.textYouWillReceivePhone')}{' '}</Text>
                )}
                {params === 'Email' && (
                  <Text textGray h12>{' '}{i18n.t('Auth2fa.textYouWillReceiveEmail')}{' '}</Text>
                )}
                {params === 'App' && (
                  <Text textGray h12>{' '}{i18n.t('Auth2fa.textYouWillReceiveApp')}{' '}</Text>
                )}
                {i18n.t('Auth2fa.textEveryTimeYouLog')}</Text>
              <DivSpace height-20 />

              <View flex-1 bottom centerH>
                <ButtonRounded
                  onPress={handlePressBack}
                >
                  <Text h11 semibold textBlue01 center>
                    {i18n.t('Auth2fa.buttonBackToSecurity')}
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

export default ConfirmationAuth;