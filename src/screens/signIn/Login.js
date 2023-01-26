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
import { saveUser } from '@store/ducks/user.ducks';
import { withNavigationFocus } from 'react-navigation';
import LocalStorage from '@utils/localStorage';
import TouchID from 'react-native-touch-id';
import Styles from '@screens/signIn/styles';
import WELCOME_BACK from '@assets/brand/savvy-white-logo.png';
import background from '@assets/brand/backgroundImage.png';
import Colors from '@styles/Colors';
import { KeyboardAvoidingView, Platform } from 'react-native';

//redux
import { saveTheme } from '@store/ducks/user.ducks';
import { useDispatch } from 'react-redux';
//Api
import { login, getTheme } from '@utils/api/switch';

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
    setIsLoadingModal,
    setStatusUser,
    setShowDeviceModal,
    navigation,
    setSnakVisible,
    setButtonNext,
    setTitle,
    dispatch) {
    setIsLoadingModal(true);


    // const response = await loginGraph(Phone, Password);
    // console.log('response',response,response?.getLoggin?.isTwoFactor)
    // if (response?.getLoggin) {
    //   if (!response?.getLoggin?.isTwoFactor) {
    //       setIsLoadingModal(false);
    //       await LocalStorage.set('auth_token', response?.getLoggin?.token);
    //       await LocalStorage.set('user', Phone);
    //       await LocalStorage.set('password', Password);
    //       await LocalStorage.set('left', response?.getLoggin?.left);
    //       dispatch(saveUser({ 
    //         isTwoFactor: response?.getLoggin?.isTwoFactor,
    //         type2fa: response?.getLoggin?.type2fa,
    //       }));
    //       navigation.navigate('Pin2faConfirmation',{page: 'Login' });
    //   } else {
    //     console.log('false')
    //   }
    // } else {
    //   errorSnackNotice(response);
    // }



    const response = await login(Phone, Password);
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



    // function errorSnackNotice() {
    //   setIsLoadingModal(true);
    //   setTimeout(function () {
    //     setSnakVisible(true);
    //     setButtonNext(true);
    //     setIsLoadingModal(false);
    //     setTitle(response.Message);
    //   }, 1000);
    // }



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
    const [companyOption, setCompanyOption] = useState([]);
    const [valueChek, setChekValue] = useState(loginWithFingerPrint);
    const [isLoadingModal, setIsLoadingModal] = useState(false);
    const password = useValidatedInput('loginPassword', '');
    const phone = useValidatedInput('phone', 'maria@batchedmerchantservices.com');
    const isValid = isFormValid(phone);
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
        navigation.navigate('SelectCompany', { phone: Phone });
        // await handleSignIn(Phone,
        //   Password,
        //   setIsLoadingModal,
        //   setStatusUser,
        //   setShowDeviceModal,
        //   navigation,
        //   setSnakVisible,
        //   setButtonNext,
        //   setTitle,
        //   dispatch);

    };

    useEffect(() => {
        handleBiometric();
    }, []);



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
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "position" : "height"}
                        style={{ flex: 0.8, width: '90%' }}
                    >
                        <View>
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
                            <DivSpace height-50 />
                            <View paddingH-20 paddingV-25 style={{ borderColor: brandTheme?.bgOrange02 ?? Colors?.bgOrange02, borderWidth: 1 }}>
                                <AnimateLabelInput
                                    {...phone}
                                    label={i18n.t('generics.emailOrPhone')}
                                    keyboardType={'default'}
                                    returnKeyType={'done'}
                                    autoCapitalize={'none'}
                                    style={{ color: brandTheme?.white ?? Colors.white }}
                                    containerStyle={{ backgroundColor: 'white' }}
                                />


                                {/*<DivSpace height-10 />
                <AnimateLabelInput
                  {...password}
                  label={i18n.t('generics.password')}
                  keyboardType={'default'}
                   returnKeyType={'done'}
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
                /> */}
                                <DivSpace height-10 />
                                <View centerH>
                                    <ButtonRounded
                                        size='lg'
                                        disabled={!isValid && !buttonNext ? true : buttonNext} onPress={() => LoginAccount('login')}
                                    >
                                        <Text h10 semibold>
                                            {i18n.t('login.component.buttonEnter')}
                                        </Text>
                                    </ButtonRounded>
                                    <DivSpace height-20 />
                                    {/* <Link onPress={handlePressForgotPass} linkStyle={{ color: brandTheme.bgOrange02 ?? Colors?.bgOrange02 }}>
                    {i18n.t('login.component.labelForgotPasswordLink')}
                  </Link> */}
                                </View>
                            </View>
                        </View>
                        {isLoadingModal && (
                            <Loader
                                isOpen={true}
                                navigation={navigation} />)}
                        <View flex-1 bottom>
                            <SnackBar
                                message={title}
                                isVisible={snakVisible}
                                onClose={closeSnack}
                                animationAction={actionAnimated}
                            />
                        </View>
                        <ModalDeviceError isOpen={showDeviceModal} navigation={navigation} page={statusUser} onClose={hideModal} />
                    </KeyboardAvoidingView>
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


