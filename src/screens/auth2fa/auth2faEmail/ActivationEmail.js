import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Loader,
  SnackBar,
  BoxBlue,
  DivSpace,
  PinInput,
  ButtonRounded,
  NavigationBar,
  ImageComponent
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import i18n from '@utils/i18n';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';
import IconSms from '@assets/brand/iconSms.png';
import { maskEmail } from '../../../utils/formatters';
import { getCodeEmail, setActivationEmail } from '../../../utils/api/graph';
import LocalStorage from '@utils/localStorage';
import { saveUser } from '../../../store/ducks/user.ducks';

const ActivationEmail = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.user;
  const params = route?.params;
  const brandTheme = appData?.Theme?.colors;
  const codeActivation = useValidatedInput('number', '');
  const [isEnabled, setIsEnabled] = useState(false);
  const [codeSmsEmail, setCodeSmsEmail] = useState('');
  const [phoneUser, setPhoneUser] = useState('');
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [title, setTitle] = useState('');
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [buttonNext, setButtonNext] = useState(false);
  const isValid = isFormValid(codeActivation);

  useEffect(() => { getEmailCode() }, []);

  async function getEmailCode() {
    const phone = await LocalStorage.get('user');
    setPhoneUser(phone)
    const responseCode = await getCodeEmail();
    if (responseCode?.getSecurityCodeDirectSES) {
      setCodeSmsEmail(responseCode?.getSecurityCodeDirectSES)
    }
  }


  async function getInfo() {
    setIsLoadingModal(true);
    const codeComposition = codeActivation?.value;
    const code = codeSmsEmail + '-' + codeComposition;
    const response = await setActivationEmail(code)
    if (response?.setEnabled2faEmail) {
      navigation.push('ConfirmationAuth', { page: 'Email' })
      dispatch(saveUser({
        type2fa: 3
      }));
      setIsLoadingModal(false);
    } else {
      errorSnackNotice(response);
      setIsLoadingModal(false);
    }
  }


  function errorSnackNotice(response) {
    setIsLoadingModal(true);
    setTimeout(function () {
      setSnakVisible(true);
      setIsLoadingModal(false);
      setButtonNext(true);
      setTitle(response.Message);
    }, 1000);
  }

  const closeSnack = () => {
    setSnakVisible(false);
    setButtonNext(false);
    setActionAnimated(true);
  };

  return (
    <SignUpWrapper >
      <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always' }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : "height"}
          style={{ flex: 0.8 }}
        >
          <NavigationBar
            onBack={() => navigation.goBack()}
            body={i18n.t('Auth2fa.textAuthenticationVia') + i18n.t('Auth2fa.textEmail')}
          />
          <DivSpace height-15 />
          <View centerH>
            <BoxBlue textBlue01 containerStyle={{ height: verticalScale(280), padding: 20 }}>
              <View centerH>
                <DivSpace height-10 />
                <Text h13 regular textGray>{i18n.t('Auth2fa.textActivateEmailAuthentication')}</Text>
                <DivSpace height-15 />
                <ImageComponent
                  source={IconSms}
                  width={scale(115)}
                  height={verticalScale(115)}
                />
                <DivSpace height-15 />
                <Text h10 white regular center>{i18n.t('Auth2fa.textToEnableEmailAuthentication')}{' '}<Text white semibold>{appData?.pageNavigation2fa === 'Login' ? '' : maskEmail(appData?.dataUserGraph?.email)}</Text></Text>
                <DivSpace height-20 />
                <Text h10 white regular center>{i18n.t('Auth2fa.textPleaseEnterTheSecurity')}</Text>
              </View>
            </BoxBlue>
          </View>
          <DivSpace height-25 />
          <View centerH>
            <Text h12 textGray>{i18n.t('Auth2fa.textConfirmationCode')}</Text>
            <PinInput {...codeActivation} />
          </View>
          <DivSpace height-50 />
          {isLoadingModal && (
            <Loader
              isOpen={true}
              navigation={navigation} />)}
        </KeyboardAvoidingView>
        <View centerH>
          <ButtonRounded
            onPress={getInfo}
            disabled={!isValid && !buttonNext ? true : buttonNext}
          >
            <Text h11 semibold textBlue01 center>
              {i18n.t('Auth2fa.linkContinue')}
            </Text>
          </ButtonRounded>
        </View>
      </SafeAreaView>
      <SnackBar
        message={title}
        isVisible={snakVisible}
        onClose={closeSnack}
        animationAction={actionAnimated}
      />
    </SignUpWrapper>
  );
}


export default ActivationEmail;