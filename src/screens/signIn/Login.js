import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import i18n from '@utils/i18n';
import { connect, useSelector } from 'react-redux';
import ModalDeviceError from '@screens/ModalDeviceError';
import {
  Text,
  View,
  Link,
  Loader,
  Select,
  DivSpace,
  SnackBar,
  ImageComponent,
  ButtonRounded,
  AnimateLabelInput,
  ResizeImageBackground
} from '@components';
import * as Animatable from 'react-native-animatable';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import { withNavigationFocus } from 'react-navigation';
import LocalStorage from '@utils/localStorage';
import TouchID from 'react-native-touch-id';
import Styles from '@screens/signIn/styles';
import WELCOME_BACK from '@assets/brand/savvy-white-logo.png';
import background from '@assets/brand/backgroundImage.png';
import Colors from '@styles/Colors';

//redux
import { saveTheme } from '@store/ducks/user.ducks';
import { useDispatch } from 'react-redux';
//Api
import { login, getTheme,getCompaniesQuery } from '@utils/api/switch';

const optionalConfigObject = {
  title: i18n.t('fingerPrint.component.textConfirmFootPrint'),
  imageColor: Colors?.textBlueDark,
  imageErrorColor: '#ff0000',
  sensorDescription: i18n.t('fingerPrint.component.textFingerSent'),
  sensorErrorDescription: 'Failed',
  cancelText: i18n.t('fingerPrint.component.buttonCancel'),
  fallbackLabel: 'Show Passcode',
  unifiedErrors: false,
  passcodeFallback: false
};


async function handleSignIn(
  Phone,
  Password,
  Company,
  setIsLoadingModal,
  setStatusUser,
  setShowDeviceModal,
  navigation,
  setSnakVisible,
  setButtonNext,
  setTitle,
  dispatch) {
  setIsLoadingModal(true);

  const response = await login(Phone, Password,Company);
  if (response.code < 400) {
    await LocalStorage.set('auth_token', response.data.token);
    await LocalStorage.set('user', Phone);
    await LocalStorage.set('password', Password);
    await LocalStorage.set('status', 'true');
    if (response.data.status !== 0) {
      setTimeout(function () {
        getThemeBrand(response.data.token);
        navigation.navigate('MyWallet');
        setIsLoadingModal(false);
      }, 1000);
    }
    else {
      setTimeout(function () {
        navigation.navigate('initRegisterProfile');
        setIsLoadingModal(false);
      }, 1000);
    }
  }
  else {
    errorSnackNotice();
  }


  function errorSnackNotice() {
    const Status = response.status === 1.1 || response.status === 1.2;
    setIsLoadingModal(true);
    setTimeout(function () {
      setSnakVisible(true);
      setButtonNext(true);
      setIsLoadingModal(false);
      setTitle(response.message);
      setStatusUser(response.status);
      setShowDeviceModal(Status ? true : false);
    }, 1000);
  }

  async function getThemeBrand(token) {
    const response = await getTheme(token);
    if (response.code < 400) {
      // dispatch(saveTheme({colors: {}, images: {}}));
      // const values = {colors: {}, images: {}};
      const values = response.data ? response.data : { colors: Colors, images: {} };
      dispatch(saveTheme({ colors: values?.colors, images: values?.images }));
      const jsonValue = JSON.stringify(values);
      AsyncStorage.setItem('brandTheme', jsonValue);
    }
    else {
      errorSnackNotice();
      dispatch(saveTheme({ colors: {}, images: {} }));
    }
  }

}


const Login = ({ navigation, loginWithFingerPrint, toggleLoginWithFingerprint, screenProps }) => {
  const [snakVisible, setSnakVisible] = useState(false);
  const [statusGet, setStatusGet] = useState('');
  const [statusUser, setStatusUser] = useState('');
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [title, setTitle] = useState('');
  const [buttonNext, setButtonNext] = useState(false);
  const [companyOption,setCompanyOption ] = useState([]);
  const [valueChek, setChekValue] = useState(loginWithFingerPrint);
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const password = useValidatedInput('loginPassword', '');
  const phone = useValidatedInput('phone', '');
  const company = useValidatedInput('dropdownSelect', {name: i18n.t('generics.selectOne')}, {
    changeHandlerSelect: 'onSelect'
  });
  
  const isValid = isFormValid(phone, password,company);
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandThemeImages = userData?.Theme?.images;
  const brandTheme = userData?.Theme?.colors;

  const LoginAccount = async (value) => {

    const user = value === 'login' ? '' : await LocalStorage.get('user');
    const pass = value === 'login' ? '' : await LocalStorage.get('password');
    const text = value === 'login' ? true : false;
    const Phone = !text ? user : phone?.value;
    const Password = !text ? pass : password?.value;
    const Company =  company?.value?company?.value?.value.toString():'';
    
    await handleSignIn(Phone,
      Password,
      Company,
      setIsLoadingModal,
      setStatusUser,
      setShowDeviceModal,
      navigation,
      setSnakVisible,
      setButtonNext,
      setTitle,
      dispatch);
  };

  useEffect(() => {
    handleBiometric();
  }, []);


  useEffect(() => {
    getCompanies();
  }, []);

  async function  getCompanies (){
    const response = await getCompaniesQuery();
    if (response.code < 400) {
      setCompanyOption(response.data);
    }else{
      setCompanyOption([]);
    }
  }



  async function handleBiometric() {
    const statusRegister = await LocalStorage.get('status');
    setStatusGet(statusRegister);
    if (statusRegister === 'true') {
      if (valueChek) {
        handlePressBiometricAuthorizePress();
      }
    } else {
      toggleLoginWithFingerprint(false);
    }

  }

  function handlePressForgotPass() {
    navigation.navigate('forgotSecretAnswer');
  }

  const hideModal = () => {
    setShowDeviceModal(false);
  };

  const closeSnack = () => {
    setSnakVisible(false);
    setButtonNext(false);
    setActionAnimated(true);
  };

  async function handlePressBiometricAuthorizePress() {
    try {
      await TouchID.authenticate('', optionalConfigObject)
        .then(success => {
          LoginAccount('touch');
        })
        .catch(error => {
          if (error.name === 'LAErrorTouchIDNotAvailable') {
            setStatusGet('');
          }
        });
    } catch (e) {
    }
  }

  return (
    <>
      <SignUpWrapper forceInset={{ top: 0 }}>
        <ResizeImageBackground source={background}>
          <View flex-1>
            <DivSpace height-20 />
            <Animatable.View style={{ alignItems: 'center' }}>
              <View centerH style={Styles.image}>
                <ImageComponent
                  source={brandThemeImages?.welcomeLogo ? brandThemeImages?.welcomeLogo : WELCOME_BACK}
                  width={scale(239)}
                  height={verticalScale(150)}
                />
              </View>
            </Animatable.View>
            <DivSpace height-20 />
            <View centerH>
              <Text h16 center regular disabled>
                {i18n.t('generics.welcome_back')}
              </Text>
            </View>
            <DivSpace height-30 />
            <View centerH paddingH-25 paddingV-25 style={{ borderColor: brandTheme?.bgOrange02??Colors?.bgOrange02, borderWidth: 1, width: '88%' }}>
              <View>
                <AnimateLabelInput
                  {...phone}
                  label={i18n.t('generics.emailOrPhone')}
                  keyboardType={'default'}
                  autoCapitalize={'none'}
                  style={{ color: brandTheme?.white??Colors.white }}
                  containerStyle={{ backgroundColor: 'white' }}
                />
                <DivSpace height-10 />
                <AnimateLabelInput
                  {...password}
                  label={i18n.t('generics.password')}
                  keyboardType={'default'}
                  autoCapitalize={'none'}
                  secureTextEntry
                  style={{ color: brandTheme?.white??Colors.white }}
                  containerStyle={{ backgroundColor: 'white' }}
                />
                <Select
                  {...company}
                  label= {i18n.t('signUp.component.selectEntryCode')}
                  options={companyOption}
                  size="sm"
                  dropLabelStyle={{color: brandTheme?.textBlue01??Colors.textBlue01}}
                  dropStyle={{backgroundColor:brandTheme?.textBlue01??Colors.textBlue01,borderColor: brandTheme?.bgOrange02??Colors.bgOrange02 }}
                />
              </View>
              <DivSpace height-10 />
              <ButtonRounded
                size = 'lg'
                disabled={!isValid && !buttonNext ? true : buttonNext} onPress={() => LoginAccount('login')}
              >
                <Text h10 semibold>
                  {i18n.t('login.component.buttonEnter')}
                </Text>
              </ButtonRounded>
              <DivSpace height-20 />
              <Link onPress={handlePressForgotPass} linkStyle={{color: brandTheme.bgOrange02??Colors?.bgOrange02}}>
                {i18n.t('login.component.labelForgotPasswordLink')}
              </Link>
            </View>
            <SnackBar
              message={title}
              isVisible={snakVisible}
              onClose={closeSnack}
              animationAction={actionAnimated}
            />
          </View>
          {isLoadingModal && (
            <Loader
              isOpen={true}
              navigation={navigation} />)}

          <ModalDeviceError isOpen={showDeviceModal} navigation={navigation} page={statusUser} onClose={hideModal} />
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
)(withNavigationFocus(Login));


