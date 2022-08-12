import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Link,
  BoxBlue,
  SnackBar,
  DivSpace,
  ButtonRounded,
  NavigationBar,
  ImageComponent
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, Clipboard } from 'react-native';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import i18n from '@utils/i18n';
import { scale, verticalScale } from 'react-native-size-matters';
import IconClock from '@assets/brand/iconClock.png';
import Colors from '@styles/Colors';
import securityLock from '@assets/brand/securityLock.png';
import IconWarning from '../../utils/iconSVG/IconWarning';
import ModalAuth2fa from './ModalAuth2fa';

const TwoFactorConfirmationActivation = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const error = useSelector(state => state?.auth?.showError);
  const [clabe, setClabe] = useState(appData?.clabeQr);
  const [isEnabled, setIsEnabled] = useState(false);
  const [showModalDates, setShowModalDates] = useState(true);
  const [showDisabled, setShowDisabled] = useState(true);
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [title, setTitle] = useState('');
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const copyToClipboard = () => {
    Clipboard.setString(clabe); 
    setSnakVisible(true);
    setTitle(i18n.t('generics.NotificationCopiedText'));
  }

  function handleGoToAuth() {
    if (appData?.pageNavigation2fa ==='config') {
      navigation.navigate('MyWallet')
    }if (appData?.pageNavigation2fa ==='Login') {
      navigation.navigate('Login')
    } else {
      navigation.navigate('MyWallet')
    }
  }

  const handleClose = () => {
    setShowModalDates(false);

    setTimeout(() => {
      setShowDisabled(false);
    }, 3000); 
  };

  const closeSnack = () => {
    setSnakVisible(false);
    setActionAnimated(true);
  };

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
            <View flex-1 centerH centerV paddingH-15>
              <Text h13 regular white>{i18n.t('Auth2fa.textTwoFactorAuthenticationActivated')}</Text>
              <DivSpace height-20 />
              <ImageComponent
                source={securityLock}
                width={scale(100)}
                height={verticalScale(100)}
              />
              <DivSpace height-10 />
              <Text h10 textGray semibold>{i18n.t('Auth2fa.textRememberToEnter')}</Text>
              <DivSpace height-20 />
              <View bgBlue01 padding-10 style={{ borderRadius: 8, width: '100%' }}>
                <Text h11 textGray regular>{i18n.t('Auth2fa.textSecurityKey')}:</Text>
                <DivSpace height-5 />
                <Text white h16 regular>{clabe}</Text>
                <DivSpace height-5 />
                <Link onPress={copyToClipboard}>
                  <Text h12 orange left>{i18n.t('CryptoBalance.component.rechargeCrypto.textTapTheBoxToCopy')}</Text>
                </Link>
              </View>
              <DivSpace height-20 />
              <View row paddingH-10 centerV style={{backgroundColor:'#ED931E'}} height-55>
                <IconWarning width={scale(20)} height={verticalScale(20)} fill={brandTheme?.bgOrange01 ?? Colors?.bgOrange01} fillSecondary={brandTheme?.bgBlue01 ?? Colors?.bgBlue01} />
                <DivSpace width-10 />
                <View flex-1>
                  <Text h11 semibold textBlue01>{i18n.t('Auth2fa.textKeepYourKeyWhere')},{' '}<Text regular textBlue01>{i18n.t('Auth2fa.textItWillBeRequired')}</Text></Text>
                </View>
              </View>
              <DivSpace height-20 />
              <Text h12 regular textGray>{i18n.t('Auth2fa.textNeverShareYour')}</Text>
              <DivSpace height-20 />
              <ButtonRounded
                onPress={handleGoToAuth}
              >
                <Text h11 semibold textBlue01 center>
                  {i18n.t('Auth2fa.buttonBackToSecurity')}
                </Text>
              </ButtonRounded>
            </View>
          </BoxBlue>
        </View>
        {showModalDates&&(
          <ModalAuth2fa visible={showModalDates}
          onRequestClose={() => { setShowModalDates(false)}}
          onPressOverlay={handleClose}
          />
        )}
      </SafeAreaView>
      <View flex-1 bottom>
        <SnackBar
          message={title}
          isVisible={snakVisible}
          onClose={closeSnack}
          animationAction={actionAnimated}
        />
      </View>
    </SignUpWrapper>
  );
}


export default TwoFactorConfirmationActivation;