import React, { Fragment, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';
import i18n from '@utils/i18n';
import passwordImage from '@assets/brand/password.png';
import LocalStorage from '@utils/localStorage';
import {
  ButtonNext,
  DivSpace,
  AnimateLabelInput,
  ButtonRounded,
  ImageComponent,
  NavigationBar,
  Text,
  View,
  SnackBar,
  Loader,
  ResizeImageBackground
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { toggleLoginWithFingerprint, saveUser } from '@store/ducks/user.ducks';
import { forgotYourPassword, changePassword } from '@utils/api/switch';
import { useSelector } from 'react-redux';
import background from '@assets/brand/backgroundImage.png';

const CreatePassword = ({ navigation }) => {
  const page = navigation.getParam('page');
  const Pin = navigation.getParam('pin');
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandThemeImages = userData?.Theme?.images;
  const brandTheme = userData?.Theme?.colors;
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [title, setTitle] = useState('');
  const [buttonNext, setButtonNext] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const newPass = page === 'secretAnswer' ? true : false;
  const dispatch = useDispatch();
  const password = useValidatedInput('password', '');
  const confirmPassword = useValidatedInput('confirmPassword', '', {
    validationParams: [password.value]
  });
  const isValid = isFormValid(password, confirmPassword);

  function handlePressBack() {
    navigation.goBack();
  }

  function handlePressConfig() {
    navigation.navigate('Configuration');
  }

  async function handlePressNext() {

    setIsLoadingModal(true);
    dispatch(saveUser({ userPass: password.value }));
    const Password = password.value;
    const ConfirmPassword = confirmPassword.value;
    if (newPass) {
      const response = await forgotYourPassword(Password, ConfirmPassword, userData.email, Pin ? Pin : '');
      if (response.code < 400) {
        setTimeout(function () {
          navigation.navigate('Login');
          setIsLoadingModal(false);
        }, 1000);

      } else {
        setIsLoadingModal(true);
        setTimeout(function () {
          setIsLoadingModal(false);
          setSnakVisible(true);
          setButtonNext(true);
          setTitle(response.message);
        }, 1000);
      }

    } else if (page === 'config') {
      const token = await LocalStorage.get('auth_token');
      const response = await changePassword(token, Password, ConfirmPassword);
      if (response.code < 400) {
        setTimeout(function () {
          navigation.navigate('PasswordConfirmation', { page: page });
          setIsLoadingModal(false);
        }, 1000);

      } else {
        setIsLoadingModal(true);
        setTimeout(function () {
          setIsLoadingModal(false);
          setSnakVisible(true);
          setButtonNext(true);
          setTitle(response.message);
        }, 1000);
      }
    } else {
      setIsLoadingModal(true);
      setTimeout(function () {
        navigation.navigate('AppNewPin', {
          data: {},
          next: 'initRegisterProfile'
        });
        setIsLoadingModal(false);
      }, 1000);
    }
  }

  const handleCloseNotif = () => {
    setSnakVisible(false);
    setButtonNext(false);
    setActionAnimated(true);
  };

  console.log('secretAnswer', page)
  return (
    <SignUpWrapper forceInset={{ top: 0 }}>

      {page !== 'secretAnswer' && (
        <ResizeImageBackground source={background}>
          <DivSpace height-20 />
          <NavigationBar body={newPass ? '' : i18n.t('forgotPassword.component.navigatorRecoverMyPassword')} onBack={page === 'config' ? handlePressConfig : handlePressBack} />
          <DivSpace height-10 />
          <View flex-1 centerH >
            <View >
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "position" : "height"}
                style={{ flex: 0.9, alignItems: 'center' }}
              >
                <View>
                  <Animatable.View animation={'fadeIn'} delay={300} style={{ alignItems: 'center' }}>
                    <View centerH>
                      <ImageComponent
                        source={brandThemeImages?.password ? brandThemeImages?.password : passwordImage}
                        width={scale(220)}
                        height={verticalScale(149)}
                      />
                    </View>
                  </Animatable.View>
                </View>
                <DivSpace height-30 />
                <View centerH paddingH-25 paddingV-20 style={{ borderColor: brandTheme?.bgOrange02 ?? Colors?.bgOrange02, borderWidth: 1, width: '88%' }}>
                  <Text h16 center medium>
                    {newPass ? i18n.t('signUp.component.labelCreateNewPass') : ''}
                  </Text>
                  <DivSpace height-14 />
                  <View width-250>
                    <Text h12 center>
                      {i18n.t('signUp.component.descriptionCreatePassword')}
                    </Text>
                  </View>
                  <DivSpace height-20 />

                  <Animatable.View animation={'zoomInUp'} >
                    <AnimateLabelInput
                      {...password}
                      label={i18n.t('generics.password')}
                      keyboardType={'default'}
                      autoCapitalize={'none'}
                      secureTextEntry
                      style={{ color: brandTheme?.white ?? Colors.white }}
                      containerStyle={{ backgroundColor: 'white' }}
                    />
                  </Animatable.View>
                  <DivSpace height-8 />
                  <Animatable.View animation={'zoomInUp'}>
                    <AnimateLabelInput
                      {...confirmPassword}
                      label={i18n.t('generics.confirmPassword')}
                      keyboardType={'default'}
                      autoCapitalize={'none'}
                      secureTextEntry
                      style={{ color: brandTheme?.white ?? Colors.white }}
                      containerStyle={{ backgroundColor: 'white' }}
                    />
                  </Animatable.View>

                  <DivSpace height-20 />
                  {page === 'config' && (
                    <ButtonRounded disabled={!isValid && !buttonNext ? true : buttonNext} onPress={handlePressNext} size={'lg'}>
                      <Text h10 semibold>
                        {i18n.t('AppNewPin.component.AppConfirmationPin.buttonToUpdate')}
                      </Text>
                    </ButtonRounded>
                  )}
                  {page !== 'config' && (
                    <ButtonNext
                      disabled={!isValid && !buttonNext ? true : buttonNext}
                      onPress={handlePressNext} />
                  )}
                </View>
              </KeyboardAvoidingView>
            </View>

          </View>

        </ResizeImageBackground>
      )}
      {page === 'secretAnswer' && (
        <>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "position" : ""}
            style={{ flex: 0.75 }}
          >
            <View style={{ height: '100%' }}>
              <DivSpace height-20 />
              <NavigationBar body={newPass ? '' : i18n.t('forgotPassword.component.navigatorRecoverMyPassword')} onBack={page === 'config' ? handlePressConfig : handlePressBack} />
              <DivSpace height-10 />
              <View>
                <Animatable.View animation={'fadeIn'} delay={300} style={{ alignItems: 'center' }}>
                  <View centerH>
                    <ImageComponent
                      source={brandThemeImages?.password ? brandThemeImages?.password : passwordImage}
                      width={scale(220)}
                      height={verticalScale(149)}
                    />
                  </View>
                </Animatable.View>
                <DivSpace height-20 />
                <Animatable.View animation={'zoomInUp'} >
                  <View centerH>
                    <Text h16 white center medium>
                      {newPass ? i18n.t('signUp.component.labelCreateNewPass') : ''}
                    </Text>
                    <DivSpace height-14 />
                    <View width-250>
                      <Text h12 center textGray>
                        {i18n.t('signUp.component.descriptionCreatePassword')}
                      </Text>
                    </View>
                  </View>
                </Animatable.View>
              </View>
              <DivSpace height-20 />
              <View paddingH-20>
                <Animatable.View animation={'zoomInUp'} >
                  <AnimateLabelInput
                    {...password}
                    label={i18n.t('generics.password')}
                    keyboardType={'default'}
                    autoCapitalize={'none'}
                    secureTextEntry
                  />
                </Animatable.View>
                <DivSpace height-12 />
                <Animatable.View animation={'zoomInUp'}>
                  <AnimateLabelInput
                    {...confirmPassword}
                    label={i18n.t('generics.confirmPassword')}
                    keyboardType={'default'}
                    autoCapitalize={'none'}
                    secureTextEntry
                  />
                </Animatable.View>
                <DivSpace height-20 />
              </View>
            </View>
            <View centerH centerV >
              <DivSpace height-20 />
              {page === 'config' && (
                <ButtonRounded disabled={!isValid && !buttonNext ? true : buttonNext} onPress={handlePressNext} size={'lg'}>
                  <Text h10 semibold>
                    {i18n.t('AppNewPin.component.AppConfirmationPin.buttonToUpdate')}
                  </Text>
                </ButtonRounded>
              )}
              {page !== 'config' && (
                <ButtonNext
                  disabled={!isValid && !buttonNext ? true : buttonNext}
                  onPress={handlePressNext} />
              )}
            </View>
          </KeyboardAvoidingView>

        </>
      )}
      <SnackBar
        message={title}
        isVisible={snakVisible}
        onClose={handleCloseNotif}
        animationAction={actionAnimated}
      />
      {isLoadingModal && (
        <Loader
          isOpen={true}
          navigation={navigation} />)}

    </SignUpWrapper>
  );
};

const mapStateToProps = state => ({
  loginWithFingerPrint: state.user.loginWithFingerPrint,
});

const mapDispatchToProps = { toggleLoginWithFingerprint };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePassword);
