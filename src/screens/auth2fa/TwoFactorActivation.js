import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Link,
  BoxBlue,
  DivSpace,
  Loader,
  SnackBar,
  ButtonRounded,
  NavigationBar,
  ImageComponent
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView,Clipboard } from 'react-native';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import i18n from '@utils/i18n';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';
import { getAuth2faQr } from '@utils/api/graph';
import { saveUser } from '../../store/ducks/user.ducks';

const TwoFactorActivation = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const params = navigation.getParam('page');
  const [clabe, setClabe] = useState('');
  const [qrCode, setQRCode] = useState('');
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [title, setTitle] = useState('');
  const [isLoadingModal, setIsLoadingModal] = useState(false);


  function handleCodeActivation() {
    navigation.navigate('TwoFactorCodeActivation', { page: 'activation' });
  }

  const copyToClipboard = () => {
    Clipboard.setString(clabe);
    setSnakVisible(true);
    setTitle(i18n.t('generics.NotificationCopiedText'));
  }

  useEffect(() => {
    getQrAuth();
  }, []);

  async function getQrAuth() {
    setIsLoadingModal(true);
    const response = await getAuth2faQr();
    if (response?.getImageTwoFactor) {
      setClabe(response?.getImageTwoFactor?.secretCode)
      setQRCode(response?.getImageTwoFactor?.qrCodeUrl)
      dispatch(saveUser({ 
        clabeQr: response?.getImageTwoFactor?.secretCode
      }));
       setIsLoadingModal(false);
    } else {
      setIsLoadingModal(false);
      errorSnackNotice(response);
    }

  }

  function errorSnackNotice(response) {
    setIsLoadingModal(true);
    setTimeout(function () {
      setSnakVisible(true);
      setIsLoadingModal(false);
      setTitle(response.Message);
    }, 1000);
  }

  const closeSnack = () => {
    setSnakVisible(false);
    setActionAnimated(true);
  };


  return (
    <SignUpWrapper >
      <SafeAreaView forceInset={{ top: 0 }}>
        <NavigationBar
          onBack={() => navigation.goBack()}
          body={i18n.t('Auth2fa.titleSecurity')}
        />
        <DivSpace height-20 />
        <View centerH>
          <BoxBlue textBlue01 containerStyle={{ height: verticalScale(210) }}>
            <View centerH>
              {params !== 'change' && (
                <Text h13 regular white>{i18n.t('Auth2fa.textActivateTwoFactorAuthentication')}</Text>
              )}
              {params === 'change' && (
                <Text h13 regular white>{i18n.t('Auth2fa.textChangeTwoFactorAuthentication')}</Text>
              )}
              <DivSpace height-10 />
              {params !== 'change' && (
                <Text h11 white regular center>{i18n.t('Auth2fa.textScanTheQRCodeOrEnter')}</Text>
              )}
              {params === 'change' && (
                <Text h11 white regular center>{i18n.t('Auth2fa.textScanTheQRCodeNewDevice')}</Text>
              )}
              <DivSpace height-20 />
              <View bgBlue01 padding-10 style={{ borderRadius: 8, width: '90%' }}>
                <Text h11 textGray regular>{i18n.t('Auth2fa.textSecurityKey')}:</Text>
                <DivSpace height-5 />
                <Text white h16 regular>{clabe}</Text>
                <DivSpace height-5 />
                <Link onPress={copyToClipboard}>
                  <Text h12 orange left>{i18n.t('CryptoBalance.component.rechargeCrypto.textTapTheBoxToCopy')}</Text>
                </Link>
              </View>
            </View>
          </BoxBlue>
        </View>
        <DivSpace height-25 />
        <View centerH>
          <BoxBlue textBlue01 containerStyle={{ height: verticalScale(250) }}>
            <View centerH marginH-20 style={{ borderColor: Colors.bgBlue01, borderWidth: 1 }}>
              <ImageComponent
                source={{ uri: qrCode }}
                height={verticalScale(220)}
                width={scale(250)}
                style={{ flex: 1 }}
              />
            </View>
          </BoxBlue>
        </View>
        <DivSpace height-20 />
        {/* <View row paddingH-10 centerV warning height-55>
          <DivSpace width-10 />
          <View flex-1>
            <Text h12 semibold white>{i18n.t('Auth2fa.textKeepYourKeyWhere')},{' '}<Text regular white>{i18n.t('Auth2fa.textItWillBeRequired')}</Text></Text>
          </View>
        </View>
        <DivSpace height-15 />
        <Text h12 regular white>{i18n.t('Auth2fa.textNeverShareYour')}</Text>
        <DivSpace height-20 />
        <View centerH>
          <ImageComponent
            source={{ uri: authData?.dataQrCode?.qrCodeUrl }}
            height={verticalScale(220)}
            width={scale(250)}
            style={{ flex: 1 }}
          />
        </View> */}

        {/* <View centerH>
        <QRCode
          value={clabe}
          size={scale(260)}
          quietZone={scale(30)}
        />
      </View> */}
        <View centerH>
          <ButtonRounded
            onPress={handleCodeActivation}
          >
            <Text h11 semibold textBlue01 center>
              {i18n.t('Auth2fa.linkContinue')}
            </Text>
          </ButtonRounded>
        </View>
        {isLoadingModal && (
          <Loader
            isOpen={true}
            navigation={navigation} />)}

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


export default TwoFactorActivation;