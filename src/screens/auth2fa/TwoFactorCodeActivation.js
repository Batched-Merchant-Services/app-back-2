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
import IconCode from '@assets/brand/iconCode.png';
import { setActivationThirdParty } from '../../utils/api/graph';
import { saveUser } from '../../store/ducks/user.ducks';

const TwoFactorCodeActivation = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.user;
  const params = navigation.getParam('page');
  const error = useSelector(state => state?.auth?.showError);
  const codeActivation = useValidatedInput('number', '');
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [title, setTitle] = useState('');
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [buttonNext, setButtonNext] = useState(false);
  const isValid = isFormValid(codeActivation);

  async function getInfo() {
    setIsLoadingModal(true);
    const codeComposition = codeActivation?.value;
    const code = '2fa' + '-' + codeComposition;
    const response = await setActivationThirdParty(code)
    if (response?.setEnabled2faThirdParty) {
      navigation.push('TwoFactorConfirmationActivation', { page: 'App' })
      dispatch(saveUser({
        type2fa: 1
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
    setActionAnimated(true);
  };


  return (
    <SignUpWrapper >
      <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always' }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : "height"}
          style={{ flex: 0.75}}
        >
          <NavigationBar
            onBack={() => navigation.goBack()}
            body={i18n.t('Auth2fa.titleSecurity')}
          />
          <DivSpace height-20 />
          <View centerH>
            <BoxBlue textBlue01 containerStyle={{ height: verticalScale(210) }}>
              <View centerH>
                <DivSpace height-10 />
                {params !== 'change' && (
                  <Text h13 regular textGray>{i18n.t('Auth2fa.textActivateTwoFactorAuthentication')}</Text>
                )}
                {params === 'change' && (
                  <Text h13 regular textGray>{i18n.t('Auth2fa.textChangeTwoFactorAuthentication')}</Text>
                )}
                <ImageComponent
                  source={IconCode}
                  width={scale(115)}
                  height={verticalScale(115)}
                />
                <DivSpace height-20 />
                {params !== 'change' && (
                  <Text h10 textGray semibold>{i18n.t('Auth2fa.textEnterTheCodeYou')}{' '}<Text white regular>{i18n.t('Auth2fa.textIfTimeRunsOut')}</Text></Text>
                )}
                {params === 'change' && (
                  <Text h10 textGray semibold>{i18n.t('Auth2fa.textEnterTheCodeYouGot')}<Text white regular>{i18n.t('Auth2fa.textIfTimeRunsOut')}</Text></Text>
                )}
              </View>
            </BoxBlue>
          </View>
          <DivSpace height-40 />
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


export default TwoFactorCodeActivation;