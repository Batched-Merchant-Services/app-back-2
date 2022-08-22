import React, { Fragment, useState,useEffect } from 'react';
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
  Select,
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
import { getCompaniesQuery } from '../../utils/api/switch';
import { setConfirmPassword } from '../../utils/api/graph';

const CreatePassword = ({ navigation }) => {
  const page = navigation.getParam('page');
  const Pin = navigation.getParam('pin');
  const CodeLeft = navigation.getParam('CodeLeft');
  const Code = navigation.getParam('Code');
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandThemeImages = userData?.Theme?.images;
  const brandTheme = userData?.Theme?.colors;
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [title, setTitle] = useState('');
  const [buttonNext, setButtonNext] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [companyOption, setCompanyOption] = useState([]);
  const newPass = page === 'secretAnswer' ? true : false;
  const dispatch = useDispatch();
  const password = useValidatedInput('password', '');
  const confirmPassword = useValidatedInput('confirmPassword', '', {
    validationParams: [password.value]
  });
  const company = useValidatedInput('dropdownSelect', { name: i18n.t('generics.selectOne') }, {
    changeHandlerSelect: 'onSelect'
  });
  const isValid = isFormValid(password, confirmPassword,company);
  const isValidConfig = isFormValid(password, confirmPassword);

  useEffect(() => {
      getCompanies();
  }, []);

  async function getCompanies() {
    setIsLoadingModal(true);
    const response = await getCompaniesQuery(userData?.email||userData?.infoUser?.email);
    if (response.code < 400) {
      setCompanyOption(response?.data);
      setIsLoadingModal(false);
    } else {
      setCompanyOption([]);
      setIsLoadingModal(false);
    }
  }

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
    const companyValue = company?.value
    if (newPass) {
      const response = await forgotYourPassword(Password, ConfirmPassword, userData.email, Pin ? Pin : '',companyValue);
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
      const Password =password.value;
      const ConfirmPassword =confirmPassword.value;
      const response = await setConfirmPassword(userData?.type2fa,Password,ConfirmPassword,Pin,CodeLeft,Code);
      console.log('response',response)
      if (response?.setResetPwd) {
        setTimeout(function(){
          navigation.navigate('PasswordConfirmation'); 
          setIsLoadingModal(false);
        }, 1000);
        
      } else {
        setIsLoadingModal(true);
        setTimeout(function(){
          setIsLoadingModal(false);
          setSnakVisible(true);
          setButtonNext(true);
          setTitle(response.Message);
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


  function errorSnackNotice(response) {
    setIsLoadingModal(true);
    setTimeout(function () {
      setSnakVisible(true);
      setButtonNext(true);
      setIsLoadingModal(false);
      setTitle(response.message);
    }, 1000);
  }

  

  const handleCloseNotif = () => {
    setSnakVisible(false);
    setButtonNext(false);
    setActionAnimated(true);
  };

  return (
    <>
    <SignUpWrapper forceInset={{ top: 0 }}>

      {page === 'secretAnswer' && (
        <ResizeImageBackground source={background}>
          <DivSpace height-20 />
          <NavigationBar body={page !== 'secretAnswer' ? '' : i18n.t('forgotPassword.component.navigatorRecoverMyPassword')} onBack={page === 'config' ? handlePressConfig : handlePressBack} />
          <DivSpace height-10 />
          <View flex-1 centerH >
            <View >
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "position" : "height"}
                style={{ flex: 0.96, alignItems: 'center' }}
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
                <View centerH paddingH-25 paddingV-20 style={{ borderColor: brandTheme?.bgOrange02 ?? Colors?.bgOrange02, borderWidth: 1, width: '90%' }}>
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
                    <Select
                      {...company}
                      label={i18n.t('signUp.component.selectEntryCode')}
                      options={companyOption}
                      size="sm"
                      dropLabelStyle={{ color: brandTheme?.textBlue01 ?? Colors.textBlue01 }}
                      dropStyle={{ backgroundColor: brandTheme?.textBlue01 ?? Colors.textBlue01, borderColor: brandTheme?.bgOrange02 ?? Colors.bgOrange02 }}
                    />
                    <DivSpace height-10 />

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
      {page !== 'secretAnswer' && (
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
              <DivSpace height-30 />
              <View  centerH>
              {page === 'config' && (
                <ButtonRounded disabled={!isValidConfig && !buttonNext ? true : buttonNext} onPress={handlePressNext} size={'lg'}>
                  <Text h10 semibold>
                    {i18n.t('AppNewPin.component.AppConfirmationPin.buttonToUpdate')}
                  </Text>
                </ButtonRounded>

              )}
              {page !== 'config' && (
                <ButtonNext disabled={!isValid && !buttonNext ? true : buttonNext} onPress={handlePressNext} />
              )}
              <DivSpace height-30 />
            </View>
            </View>
          </KeyboardAvoidingView>

        </>
      )}
    </SignUpWrapper>
    <View >
      <SnackBar
        message={title}
        isVisible={snakVisible}
        onClose={handleCloseNotif}
        animationAction={actionAnimated}
      />
      </View>
      
      {isLoadingModal && (
        <Loader
          isOpen={true}
          navigation={navigation} />)}
    </>
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
