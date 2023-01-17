import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    PinInput,
    BoxBlue,
    DivSpace,
    Loader,
    SnackBar,
    ButtonRounded,
    NavigationBar,
    ImageComponent
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { KeyboardAvoidingView, Platform, SafeAreaView, AsyncStorage } from 'react-native';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import i18n from '@utils/i18n';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';
import IconCode from '@assets/brand/iconCode.png';
import Modal2faConfirmation from './Modal2faConfirmation';
import { maskNumbers, maskEmail } from '../../utils/formatters';
import { getCodeEmail, getCodeSms, getDataUser, loginTwoFactor } from '../../utils/api/graph';
import LocalStorage from '@utils/localStorage';
import { getTheme } from '@utils/api/switch';
import { saveInfoUserGraph, saveTheme } from '../../store/ducks/user.ducks';
import { setForgotPasswordInside } from '../../utils/api/graph';
import {
    scanQrCode,
    cardCancel,
    reloadCard,
    validatePin,
    payToContacts,
    walletToAccount,
    TransferWalletToCard,
    createServicePayment,
    getBuyCrypto,
    getSellCrypto,
    sendCrypto,
    sendCryptoUsers
} from '@utils/api/switch';
import { createCardVirtual, createTRXSwap, updateCardVirtual } from '../../utils/api/switch';

async function transactionWallet(
    token,
    data,
    code,
    getCodeLeft,
    navigation,
    next,
    setIsLoadingModal,
    setTextWarning,
    setSnakVisible,
    setTitle,
    appData
) {
    setIsLoadingModal(true);
    const codeSecurity = appData?.type2fa !== 1 ? getCodeLeft + '-' + code : '2fa' + '-' + code;
    const response = await TransferWalletToCard(token, data.origin, data.amount, data.destiny, data.typeTrans, codeSecurity);
    if (response.code < 400) {
        setTimeout(function () {
            navigation.navigate(next, { data: data });
            setIsLoadingModal(false);
        }, 1000);
        setTextWarning(false);
    }
    else {
        errorFunction(setIsLoadingModal, setSnakVisible, setTitle, response);
    }
}

async function payContacts(
    token,
    data,
    code,
    getCodeLeft,
    navigation,
    next,
    setIsLoadingModal,
    setTextWarning,
    setSnakVisible,
    setTitle,
    appData
) {
    setIsLoadingModal(true);
    const codeSecurity = appData?.type2fa !== 1 ? getCodeLeft + '-' + code : '2fa' + '-' + code;

    const response = await reloadCard(token, data?.data?.id, codeSecurity, data?.amount, '', data?.data?.type);

    if (response.code < 400) {
        setTimeout(function () {
            navigation.navigate(next);
            setIsLoadingModal(false);
        }, 1000);
        setTextWarning(false);
    } else {
        console.log('error')
        errorFunction(setIsLoadingModal, setSnakVisible, setTitle, response);
    }
}

async function cardCancelFunction(
    token,
    data,
    code,
    getCodeLeft,
    navigation,
    next,
    setIsLoadingModal,
    setTextWarning,
    setSnakVisible,
    setTitle,
    appData
) {
    setIsLoadingModal(true);
    const codeSecurity = appData?.type2fa !== 1 ? getCodeLeft + '-' + code : '2fa' + '-' + code;
    const response = await cardCancel(token, data?.data?.id, codeSecurity);
    if (response.code < 400) {
        setTimeout(function () {
            navigation.navigate(next);
            setIsLoadingModal(false);
        }, 1000);
        setTextWarning(false);
    }
    else {
        errorFunction(setIsLoadingModal, setSnakVisible, setTitle, response);
    }
}


async function payQRCode(
    token,
    data,
    code,
    getCodeLeft,
    navigation,
    next,
    setTextWarning,
    setIsLoadingModal,
    setSnakVisible,
    setTitle,
    appData
) {
    setIsLoadingModal(true);
    const codeSecurity = appData?.type2fa !== 1 ? getCodeLeft + '-' + code : '2fa' + '-' + code;
    const response = await scanQrCode(token, data.externalId, data.amount, '', codeSecurity);
    if (response.code < 400) {
        setTimeout(function () {
            navigation.navigate(next, data, { amount: data.amount });
            setIsLoadingModal(false);
        }, 1000);
        setTextWarning(false);
    }
    else {
        errorFunction(setIsLoadingModal, setSnakVisible, setTitle, response);
    }
}

async function payContact(
    token,
    data,
    code,
    getCodeLeft,
    navigation,
    next,
    setIsLoadingModal,
    setTextWarning,
    setSnakVisible,
    setTitle,
    appData
) {
    setIsLoadingModal(true);
    const codeSecurity = appData?.type2fa !== 1 ? getCodeLeft + '-' + code : '2fa' + '-' + code;
    const response = await payToContacts(token, appData.phoneContact, data.amount, codeSecurity, '');
    if (response.code < 400) {
        setTimeout(function () {
            navigation.navigate(next, data, { amount: data.amount });
            setIsLoadingModal(false);
        }, 1000);
        setTextWarning(false);
    }
    else {
        errorFunction(setIsLoadingModal, setSnakVisible, setTitle, response);
    }
}

async function transferWallet(
    token,
    data,
    code,
    getCodeLeft,
    navigation,
    next,
    setIsLoadingModal,
    setTextWarning,
    setSnakVisible,
    setTitle,
    appData
) {
    setIsLoadingModal(true);
    const codeSecurity = appData?.type2fa !== 1 ? getCodeLeft + '-' + code : '2fa' + '-' + code;
    const response = await walletToAccount(token, data.amount, codeSecurity);
    if (response.code < 400) {
        setTimeout(function () {
            navigation.navigate(next, { data: response.data, clabe: data.clabe, bank: data.bank });
            setIsLoadingModal(false);
        }, 1000);
        setTextWarning(false);
    }
    else {
        errorFunction(setIsLoadingModal, setSnakVisible, setTitle, response);
    }
}

async function changePINCard(
    token,
    data,
    code,
    getCodeLeft,
    navigation,
    next,
    setIsLoadingModal,
    setTextWarning,
    setSnakVisible,
    setTitle,
    appData
) {
    setIsLoadingModal(true);
    const codeSecurity = appData?.type2fa !== 1 ? getCodeLeft + '-' + code : '2fa' + '-' + code;
    const response = await validatePin(token, codeSecurity);
    if (response.code < 400) {
        setTimeout(function () {
            navigation.navigate(next, { Proxy: data ? data.ProxyKey : '' });
            setIsLoadingModal(false);
        }, 1000);
        setTextWarning(false);
    }
    else {
        errorFunction(setIsLoadingModal, setSnakVisible, setTitle, response);
    }
}


async function changePassword(
    data,
    code,
    setGetCodeLeft,
    navigation,
    next,
    setIsLoadingModal,
    setSnakVisible,
    setTitle,
    appData
) {

    setIsLoadingModal(true);
    const phone = '+' + appData?.infoUser?.lada + appData?.infoUser?.phoneNumber;
    const type = appData?.type2fa === 2 ? 1 : appData?.type2fa === 3 ? 2 : 3;
    const response = await setForgotPasswordInside(appData?.companyValue, appData?.infoUser?.email, phone, type);
    if (response?.setRecoveryPwd) {
        setGetCodeLeft(response?.setRecoveryPwd);
        // navigation.navigate(next, { pin: codeSecurity,CodeLeft: response?.setRecoveryPwd,Code: code, page: data.page });
        setIsLoadingModal(false);

    }
    else {
        errorFunction(setIsLoadingModal, setSnakVisible, setTitle, response);
    }
}


async function createPaymentServices(
    token,
    data,
    code,
    getCodeLeft,
    navigation,
    next,
    setIsLoadingModal,
    setTextWarning,
    setSnakVisible,
    setTitle,
    appData
) {
    setIsLoadingModal(true);
    const codeSecurity = appData?.type2fa !== 1 ? getCodeLeft + '-' + code : '2fa' + '-' + code;
    const amountData = data.amountParam ? parseInt(data.amountParam) : data.amountParam;
    const response = await createServicePayment(token, amountData, data.data.sku_lists[0].sku, data.data.biller_id, data.data.sku_lists[0].type_sku, data.phone, data.reference, codeSecurity);
    if (response.code < 400) {
        setTimeout(function () {
            navigation.navigate(next, { data, date: response.data.created_at });
            setIsLoadingModal(false);
        }, 1000);
        setTextWarning(false);
    }
    else {
        errorFunction(setIsLoadingModal, setSnakVisible, setTitle, response);
    }
}

async function createVirtualCards(
    token,
    data,
    code,
    getCodeLeft,
    navigation,
    next,
    setIsLoadingModal,
    setTextWarning,
    setSnakVisible,
    setTitle,
    appData
) {
    setIsLoadingModal(true);
    const amount = 0;
    const codeSecurity = appData?.type2fa !== 1 ? getCodeLeft + '-' + code : '2fa' + '-' + code;
    const response = await createCardVirtual(token, amount, codeSecurity);
    if (response.code < 400) {
        setTimeout(function () {
            navigation.navigate(next, { data, date: response?.data });
            setIsLoadingModal(false);
        }, 1000);
        setTextWarning(false);
    }
    else {
        errorFunction(setIsLoadingModal, setSnakVisible, setTitle, response);
    }
}

async function updateVirtualCard(
    token,
    data,
    code,
    getCodeLeft,
    navigation,
    next,
    setIsLoadingModal,
    setTextWarning,
    setSnakVisible,
    setTitle,
    appData
) {
    setIsLoadingModal(true);
    const cvv = data?.CVV;
    const cardNumber = data?.cardNumber;
    const idCard = data?.id;
    const response = await updateCardVirtual(token, cvv, cardNumber, idCard);
    if (response.code < 400) {
        setTimeout(function () {
            navigation.navigate(next, { data, date: response?.data });
            setIsLoadingModal(false);
        }, 1000);
        setTextWarning(false);
    }
    else {
        errorFunction(setIsLoadingModal, setSnakVisible, setTitle, response);
    }
}

async function createSwap(
    token,
    data,
    code,
    getCodeLeft,
    navigation,
    next,
    setIsLoadingModal,
    setTextWarning,
    setSnakVisible,
    setTitle,
    appData
) {
    setIsLoadingModal(true);
    const shortNameCrypto = data?.shortNameCrypto;
    const totalSwap = data?.balanceConvert;
    const toCurrency = data?.currencyChange?.short_name;
    const codeSecurity = appData?.type2fa !== 1 ? getCodeLeft + '-' + code : '2fa' + '-' + code;
    const response = await createTRXSwap(token, shortNameCrypto, toCurrency, totalSwap, codeSecurity);
    if (response.code < 400) {
        setTimeout(function () {
            navigation.navigate(next, { data: response?.data, convert: totalSwap, amount: data?.amount });
            setIsLoadingModal(false);
        }, 1000);
        setTextWarning(false);
    }
    else {
        errorFunction(setIsLoadingModal, setSnakVisible, setTitle, response);
    }
}


async function buyCrypto(
    token,
    data,
    code,
    getCodeLeft,
    navigation,
    next,
    setIsLoadingModal,
    setTextWarning,
    setSnakVisible,
    setTitle,
    appData
) {
    setIsLoadingModal(true);
    const codeSecurity = appData?.type2fa !== 1 ? getCodeLeft + '-' + code : '2fa' + '-' + code;
    const response = await getBuyCrypto(token, data?.amountEnv, data?.amountConv, data?.shortNameCrypto, codeSecurity);
    if (response.code < 400) {
        setTimeout(function () {
            navigation.navigate(next, { data: data, dataInfo: response.data });
            setIsLoadingModal(false);
        }, 1000);
        setTextWarning(false);
    }
    else {
        errorFunction(setIsLoadingModal, setSnakVisible, setTitle, response);
    }
}

async function sendCryptoInfo(
    token,
    data,
    code,
    getCodeLeft,
    navigation,
    next,
    setIsLoadingModal,
    setTextWarning,
    setSnakVisible,
    setTitle,
    appData
) {
    setIsLoadingModal(true);
    const codeSecurity = appData?.type2fa !== 1 ? getCodeLeft + '-' + code : '2fa' + '-' + code;
    const response = data.page === 'sendCryptoUsers' ? await sendCryptoUsers(token, data.shortNameCrypto, data?.amountCurrency, data?.addressCrypto, data?.transferReference?.value, codeSecurity) : await sendCrypto(token, data.shortNameCrypto, data?.amountCurrency, data?.sendAddress, data?.transferReference?.value, codeSecurity);
    if (response.code < 400) {
        setTimeout(function () {
            navigation.navigate(next, { data: response?.data, dataInfo: data });
            setSnakVisible(false);
            setIsLoadingModal(false);
        }, 1000);
        setTextWarning(false);
    }
    else {
        errorFunction(setIsLoadingModal, setSnakVisible, setTitle, response);
    }
}


async function saleCrypto(
    token,
    data,
    code,
    getCodeLeft,
    navigation,
    next,
    setIsLoadingModal,
    setTextWarning,
    setSnakVisible,
    setTitle,
    appData
) {
    setIsLoadingModal(true);
    const codeSecurity = appData?.type2fa !== 1 ? getCodeLeft + '-' + code : '2fa' + '-' + code;
    const response = await getSellCrypto(token, data.infoData.id, data.amountConvert, data.infoData.typeCrypto, data.showCurrency, data.infoData.currencyUser, codeSecurity);
    if (response.code < 400) {
        setTimeout(function () {
            navigation.navigate(next, { data: data });
            setIsLoadingModal(false);
        }, 1000);
        setTextWarning(false);
    }
    else {
        errorFunction(setIsLoadingModal, setSnakVisible, setTitle, response);
    }
}

function errorFunction(setIsLoadingModal, setSnakVisible, setTitle, response) {
    setIsLoadingModal(true);
    setTimeout(function () {
        setSnakVisible(true);
        setIsLoadingModal(false);
        setTitle(response.message);
    }, 1000);

}
const Pin2faConfirmation = ({ navigation, route, navigation: { goBack } }) => {
    const dispatch = useDispatch();
    const redux = useSelector(state => state);
    const appData = redux.user;
    const params = navigation.getParam('page');
    const codeActivation = useValidatedInput('number', '');
    const next = navigation.getParam('next');
    const data = navigation.getParam('data') || {};
    const [snakVisible, setSnakVisible] = useState(false);
    const [actionAnimated, setActionAnimated] = useState(false);
    const [title, setTitle] = useState('');
    const [buttonNext, setButtonNext] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [showModalDates, setShowModalDates] = useState(true);
    const [showDisabled, setShowDisabled] = useState(true);
    const [codeSmsEmail, setCodeSmsEmail] = useState(appData?.dataCode);
    const [isLoadingModal, setIsLoadingModal] = useState(false);
    const [textWarning, setTextWarning] = useState(false);
    const [getCodeLeft, setGetCodeLeft] = useState('');
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const isValid = isFormValid(codeActivation);


    async function getInfo() {
        const code = codeActivation?.value;
        const token = await LocalStorage.get('auth_token');

        if (params === 'Login') {
            handleGetLoginTwoFactor(code);
        } else if (params === 'ChangePass' || params === 'LoginChange') {
            navigation.push('CreatePassword', { code: code, page: params });
        } else {
            if (data.page === 'contacts') {
                await payContact(token,
                    data,
                    code,
                    getCodeLeft,
                    navigation,
                    next,
                    setIsLoadingModal,
                    setTextWarning,
                    setSnakVisible,
                    setTitle,
                    appData
                );

            } else if (data.page === 'QRCode') {

                await payQRCode(
                    token,
                    data,
                    code,
                    getCodeLeft,
                    navigation,
                    next,
                    setTextWarning,
                    setIsLoadingModal,
                    setSnakVisible,
                    setTitle,
                    appData
                );

            } else if (data.page === 'cardCancel') {

                await cardCancelFunction(
                    token,
                    data,
                    code,
                    getCodeLeft,
                    navigation,
                    next,
                    setIsLoadingModal,
                    setTextWarning,
                    setSnakVisible,
                    setTitle,
                    appData
                );

            } else if (data.page === 'topUp') {

                await payContacts(
                    token,
                    data,
                    code,
                    getCodeLeft,
                    navigation,
                    next,
                    setIsLoadingModal,
                    setTextWarning,
                    setSnakVisible,
                    setTitle,
                    appData
                );

            } else if (data.page === 'transferWallet') {

                await transferWallet(
                    token,
                    data,
                    code,
                    getCodeLeft,
                    navigation,
                    next,
                    setIsLoadingModal,
                    setTextWarning,
                    setSnakVisible,
                    setTitle,
                    appData
                );
            } else if (data.page === 'config') {
                const codeSecurity = appData?.type2fa !== 1 ? getCodeLeft + '-' + code : '2fa' + '-' + code;
                setTimeout(function () {
                    navigation.navigate(next, { pin: codeSecurity, CodeLeft: getCodeLeft, Code: code, page: data.page });
                    setIsLoadingModal(false);
                }, 1000);
            } else if (data.page === 'UpdatePINCard') {

                await changePINCard(
                    token,
                    data,
                    code,
                    getCodeLeft,
                    navigation,
                    next,
                    setIsLoadingModal,
                    setTextWarning,
                    setSnakVisible,
                    setTitle,
                    appData
                );
            } else if (data.page === 'transferBalance') {

                await transactionWallet(
                    token,
                    data,
                    code,
                    getCodeLeft,
                    navigation,
                    next,
                    setIsLoadingModal,
                    setTextWarning,
                    setSnakVisible,
                    setTitle,
                    appData
                );

            } else if (data.page === 'buyCrypto') {

                await buyCrypto(
                    token,
                    data,
                    code,
                    getCodeLeft,
                    navigation,
                    next,
                    setIsLoadingModal,
                    setTextWarning,
                    setSnakVisible,
                    setTitle,
                    appData
                );

            } else if (data.page === 'saleCrypto') {

                await saleCrypto(
                    token,
                    data,
                    code,
                    getCodeLeft,
                    navigation,
                    next,
                    setIsLoadingModal,
                    setTextWarning,
                    setSnakVisible,
                    setTitle,
                    appData
                );

            } else if (data.page === 'sendOrTransferCrypto') {

                await sendCryptoInfo(
                    token,
                    data,
                    code,
                    getCodeLeft,
                    navigation,
                    next,
                    setIsLoadingModal,
                    setTextWarning,
                    setSnakVisible,
                    setTitle,
                    appData
                );


            } else if (data.page === 'sendCryptoUsers') {

                await sendCryptoInfo(
                    token,
                    data,
                    code,
                    getCodeLeft,
                    navigation,
                    next,
                    setIsLoadingModal,
                    setTextWarning,
                    setSnakVisible,
                    setTitle,
                    appData
                );


            } else if (data.page === 'payServices') {
                await createPaymentServices(
                    token,
                    data,
                    code,
                    getCodeLeft,
                    navigation,
                    next,
                    setIsLoadingModal,
                    setTextWarning,
                    setSnakVisible,
                    setTitle,
                    appData
                );

            } else if (data.page === 'createVirtualCard') {
                await createVirtualCards(
                    token,
                    data,
                    code,
                    getCodeLeft,
                    navigation,
                    next,
                    setIsLoadingModal,
                    setTextWarning,
                    setSnakVisible,
                    setTitle,
                    appData
                );

            } else if (data.page === 'updateVirtualCard') {
                await updateVirtualCard(
                    token,
                    data,
                    code,
                    getCodeLeft,
                    navigation,
                    next,
                    setIsLoadingModal,
                    setTextWarning,
                    setSnakVisible,
                    setTitle,
                    appData
                );
            } else if (data.page === 'Swap') {
                await createSwap(
                    token,
                    data,
                    code,
                    getCodeLeft,
                    navigation,
                    next,
                    setIsLoadingModal,
                    setTextWarning,
                    setSnakVisible,
                    setTitle,
                    appData
                );
            } else {
                setSnakVisible(false);
                setIsLoadingModal(false);
                navigation.navigate(next, data);
            }

        }
    }


    const handleGetLoginTwoFactor = async (code) => {
        setIsLoadingModal(true);
        const codeLeft = await LocalStorage.get('left');
        const type2fa = await LocalStorage.get('type2fa')
        const codeSecurity = +type2fa !== 1 ? codeLeft + '-' + code : '2fa' + '-' + code;
        const response = await loginTwoFactor(codeSecurity);
        if (response?.getLogginTwoFactor) {
            await LocalStorage.set('auth_token', response?.getLogginTwoFactor?.token);
            await LocalStorage.set('uuid', response?.getLogginTwoFactor?.uuid);
            // getUserInfo();
            getThemeBrand(response?.getLogginTwoFactor?.token);
            navigation.navigate('MyWallet');
            setIsLoadingModal(false);
            // setTimeout(function () {

            // }, 1000);
        } else {
            setIsLoadingModal(false);
            errorSnackNotice(response);
        }
    }


    async function getThemeBrand(token) {
        // const response = await getTheme(token);
        // dispatch(saveTheme({colors: {}, images: {}}));
        // const values = {colors: {}, images: {}};
        // const values = response.data ? response.data : { colors: Colors, images: {} };
        dispatch(saveTheme({ colors: Colors, images: {} }));
        const jsonValue = JSON.stringify(values);
        AsyncStorage.setItem('brandTheme', jsonValue);
    }

    async function getUserInfo() {

        const response = await getDataUser();
        if (response?.getUsersByField) {
            const data = response?.getUsersByField.length > 0 ? {
                ...response?.getUsersByField[0],
                clients: {
                    ...response?.getUsersByField[0].clients[0]
                },
                usersProfile: {
                    ...response?.getUsersByField[0].usersProfile[0],

                    accounts: {
                        ...response?.getUsersByField[0].usersProfile[0].accounts,
                        // address: {
                        //     ...response?.getUsersByField[0].usersProfile[0].accounts.address[0]
                        // },
                        kyc: {
                            ...response?.getUsersByField[0].usersProfile[0].accounts.kyc[0]
                        }
                    }
                }
            } : []
            dispatch(saveInfoUserGraph(data));
        } else {
            errorSnackNotice();
        }
    }


    function errorSnackNotice(response) {
        setIsLoadingModal(true);
        setTimeout(function () {
            setSnakVisible(true);
            setButtonNext(true);
            setIsLoadingModal(false);
            setTitle(response.Message);
        }, 1000);
    }

    useEffect(() => {
        if (data?.page === 'config') {
            const code = codeActivation?.value;
            changePassword(
                data,
                code,
                setGetCodeLeft,
                navigation,
                next,
                setIsLoadingModal,
                setSnakVisible,
                setTitle,
                appData
            );
        }
    }, []);

    useEffect(() => {
        if (params !== 'Login') {
            if (data?.page !== 'config') {
                switch (appData?.type2fa) {
                    case 1:
                        setCodeSmsEmail('2fa');
                        break;
                    case 2:
                        getSMS();
                        break;
                    case 3:
                        getEmail();
                        break;
                    default:
                        setCodeSmsEmail('2fa');
                        break;
                }
            }
        }
    }, [dispatch]);


    async function getSMS() {
        const token = await LocalStorage.get('auth_token');
        const response = await getCodeSms(token);
        console.log('code', response)
        if (response?.getSecurityCodeDirect) {
            setGetCodeLeft(response?.getSecurityCodeDirect);
            setSnakVisible(true);
            setTitle('codigo Enviado');
        }
    }

    async function getEmail() {
        const token = await LocalStorage.get('auth_token');
        const responseEmail = await getCodeEmail(token);
        if (responseEmail?.getSecurityCodeDirectSES) {
            setGetCodeLeft(responseEmail?.getSecurityCodeDirectSES);
            setSnakVisible(true);
            setTitle('codigo Enviado');
        }
    }
    //73448-594864

    useEffect(() => {
        if (appData?.isTwoFactor) {
            setShowModalDates(false);
        } else {
            setShowModalDates(true);
        }
    }, []);


    const handleClose = () => {
        setShowModalDates(false);

        setTimeout(() => {
            setShowDisabled(false);
        }, 3000);
    };

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
                    style={{ flex: 0.89 }}
                >
                    <NavigationBar
                        onBack={() => navigation.goBack()}
                        body={i18n.t('Auth2fa.titleSecurity')}
                    />
                    <DivSpace height-15 />
                    <View centerH>
                        <BoxBlue textBlue01 containerStyle={{ height: verticalScale(300) }}>
                            <View centerH centerV marginH-20>
                                <DivSpace height-10 />
                                <Text h13 regular textGray>{i18n.t('Auth2fa.textSecurityOfYourAccount')}</Text>
                                <DivSpace height-5 />
                                <Text h11 regular textGray center>{i18n.t('Auth2fa.textForUsYourSafetyIs')}</Text>
                                <DivSpace height-10 />
                                <ImageComponent
                                    source={IconCode}
                                    width={scale(115)}
                                    height={verticalScale(115)}
                                />
                                <DivSpace height-10 />
                                <Text h16 textGray>{i18n.t('Auth2fa.textAuthentication')}</Text>
                                <DivSpace height-10 />
                                {appData?.type2fa === 2 && (
                                    <Text h11 regular textGray center>{i18n.t('Auth2fa.textWeHaveSentYou')}{' '}<Text h12 textGray semibold>{maskNumbers(appData?.dataUserGraph?.phoneNumber || params?.phone)}</Text></Text>
                                )}
                                {appData?.type2fa === 3 && (
                                    <Text h11 regular textGray center>{i18n.t('Auth2fa.textWeHaveSentEmail')}{' '}<Text h12 textGray semibold>{maskEmail(appData?.dataUserGraph?.email || params?.email)}</Text></Text>
                                )}
                                {appData?.type2fa === 1 && (
                                    <Text h11 regular textGray center>{i18n.t('Auth2fa.textWeHaveSentApp')}{' '}<Text textGray semibold>{i18n.t('Auth2fa.textAuthenticatorApp')}</Text></Text>
                                )}
                            </View>
                        </BoxBlue>
                    </View>
                    <DivSpace height-30 />
                    <View centerH>
                        <Text h12 textGray>{i18n.t('Auth2fa.textConfirmationCode')}</Text>
                        <PinInput {...codeActivation} />
                    </View>
                    <DivSpace height-50 />
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
            {isLoadingModal && (
                <Loader
                    isOpen={true}
                    navigation={navigation} />)}
            <SnackBar
                message={title}
                isVisible={snakVisible}
                onClose={closeSnack}
                animationAction={actionAnimated}
            />
        </SignUpWrapper>
    );
}


export default Pin2faConfirmation;