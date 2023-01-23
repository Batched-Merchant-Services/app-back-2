import React, { useState, useEffect, Fragment } from 'react';
import { verticalScale } from 'react-native-size-matters';
import { AsyncStorage, Platform, RefreshControl, ScrollView, StatusBar } from 'react-native';
import { withNavigationFocus, NavigationEvents } from 'react-navigation';
import { getListWalletCrypto, getListBuyCrypto } from '@utils/api/switch';
import { getDataUser } from '@store/actions/userGraph.actions';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { Bubbles } from 'react-native-loader';
import { saveInfoPayment, saveInfoCrypto } from '@store/ducks/user.ducks';
import ModalInstruction from '@screens/home/components/ModalInstructions';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from '@screens/home/components/swiper';
import InfoBoxCrypto from '@screens/crypto/components/InfoBoxCrypto';
import transferBank from '@assets/icons/disabled/bankTransfer.png';
import iconWalletDisabled from '@assets/icons/disabled/walletDisabled.png';
import Colors from '@styles/Colors';
import LocalStorage from '@utils/localStorage';
import i18n from '@utils/i18n';
import Styles from './styles';
import IconWallet from '@utils/iconSVG/IconWallet';
import IconPeople from '@utils/iconSVG/IconPeople';
import IconHistory from '@utils/iconSVG/IconHistory';
import IconTransfer from '@utils/iconSVG/IconTransfer';

import {
    View,
    Text,
    Link,
    NavigatorHeader,
    DivSpace,
    ButtonRounded,
    MenuContainer,
    ModalInternationalWire,
    ModalBalances,
    ButtonWallet,
    ModalDisabled,
    Loader,
    SnackBar
} from '@components';
import { getDataUserGraph, validateSesion } from '../../utils/api/graph';
import { getOrderCards } from '../../utils/api/graph_api/cards.service';




const MyWallet = ({ navigation, screenProps }) => {
    const redux = useSelector(state => state);
    const appData = redux.user;
    const brandTheme = appData?.Theme?.colors;
    const brandThemeImages = appData?.Theme?.images;
    const [userGraph, setUserGraph] = React.useState(null);
    const [refreshing, setRefreshing] = React.useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalInst, setShowModalInst] = useState(false);
    const [showListCrypto, setShowListCrypto] = useState([]);
    const [showWalletCrypto, setShowWalletCrypto] = useState([]);
    const [balances, setBalances] = useState([]);
    const [showTypeCrypto, setShowTypeCrypto] = useState(false);
    const [clientId, setClientId] = useState('USD');
    const [showButtons] = useState(false);
    const [isRechargeQRModal, setIsRechargeQRModal] = useState(false);
    const [isModalWire, setIsModalWire] = useState(false);
    //loading
    const [title, setTitle] = useState('');
    const [snakVisible, setSnakVisible] = useState(false);
    const [actionAnimated, setActionAnimated] = useState(false);
    const [isLoadingModal, setIsLoadingModal] = useState(false);
    const dispatch = useDispatch();

    var userGraphInfo = null;

    useEffect(() => {



        getUserInfo();

        setShowModal(false);
        setShowModalInst(false);
    }, []);



    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        getBalance();
        getLisCrypto();
    }, [refreshing]);


    async function getLisCrypto() {
        setIsLoadingModal(true);
        const token = await LocalStorage.get('auth_token');
        const response = await getListWalletCrypto(token);
        const responseList = await getListBuyCrypto(token);
        if (response.code < 400) {
            setShowWalletCrypto(response.data);
            setIsLoadingModal(false);
        } else {
            closeSnackNotice(response);
            setShowWalletCrypto([]);
        }
        if (responseList.code < 400) {
            setIsLoadingModal(false);
            setShowListCrypto(responseList.data);
        } else {
            closeSnackNotice(responseList);
            setShowListCrypto([]);
        }

    }
    async function getBalance() {
        let balances = [];

        // const redux = useSelector((state) => state);
        const userGraph = userGraphInfo;

        // console.log('Seguinimento getBalance', userGraph);

        const BalanceWallet = userGraph?.clients?.account?.balance?.total;
        dispatch(saveInfoPayment({ balanceWallet: BalanceWallet }));

        balances.push({ balance: BalanceWallet, type: 1, name: 'WALLET', currency: 'USD' });


        const cards = await getOrderCards();

        // console.log('cards data in my wallet', cards);

        if (cards?.getOrderCards) {
            let cardsData = [...cards?.getOrderCards];
            cardsData.forEach(card => {
                // console.log('card', card);
                balances.push({ balance: card?.cardBalance, type: 2, name: card?.cardNumber, currency: 'USD' });
            });
            setBalances(balances);
            setRefreshing(false);
        } else {
            errorSnackNotice('Error to get cards');
        }


        // const response = await getBalances(token);
        // if (response.code < 400) {
        //     const BalanceWallet = response.data.map((n, index) => {
        //         if (
        //             n.type === 1
        //         ) {
        //             return n.balance;
        //         }
        //     });
        //     dispatch(saveInfoPayment({ balanceWallet: BalanceWallet[0] }));
        //     setBalances(response.data);
        //     setRefreshing(false);
        // } else {
        //     setBalances([]);
        // }
    }

    async function getUserInfo() {

        let userGraphAux = await getDataUserGraph().then(user => {
            // console.log('user graph', user);

            userGraphInfo = user;
            getVerifyToken();
        });



    }

    function errorSnackNotice(message) {
        setIsLoadingModal(true);

        setSnakVisible(true);
        setButtonNext(true);
        setIsLoadingModal(false);
        setTitle(message);

    }

    async function getVerifyToken() {
        const value = await AsyncStorage.getItem('nameLang');
        const token = await LocalStorage.get('auth_token');
        // const verifyResponse = await verifyToken(token);

        const userGraph = userGraphInfo;

        const verifyResponse = await validateSesion();

        console.log('Validate sesion response: ', userGraph, verifyResponse);

        const Id = userGraph?.usersProfile?.accounts?.clientId;
        // const Id = verifyResponse.data.user.account.clientId;
        setClientId(Id);
        const external = userGraph?.usersProfile?.accounts?.externalId;
        const kycStatus = userGraph?.usersProfile?.accounts?.kyc?.status; // verifyResponse.data ? verifyResponse.data.user.account.kyc ? verifyResponse.data.user.account.kyc.status : '' : '';
        const currencyUser = 'USD';
        const statusCrypto = true;
        const idUser = userGraph?.id;
        dispatch(saveInfoPayment({ kycStatus: kycStatus, currencyUser: currencyUser, externalId: external, infoUser: userGraph, currentLanguage: value, statusCrypto: statusCrypto, idUser: idUser }));
        getBalance();
    }

    const rechargueWallet = async () => {
        navigation.navigate('RechargeOptions');
    };

    const userPayment = async () => {
        navigation.navigate('PaymentUsers');
    };

    const bankTransfer = async () => {
        setShowModal(true);
    };

    const historic = async () => {
        navigation.navigate('Historics', { clientId: clientId });
    };

    const requesCash = async () => {
        setShowModal(true);
    };

    const transferButton = () => {
        setIsRechargeQRModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOncloseModal = () => {
        setIsRechargeQRModal(false);
        setShowModalInst(false);
    };

    const handleOncloseIsWire = () => {
        setIsModalWire(false);
    };

    const handleCloseModalIns = () => {
        setShowModalInst(false);
    };

    const handlePressListCrypto = (item, page) => {
        const id = item ? item.id : '';
        const typeCrypto = item ? item.short_name : '';
        const nameCrypto = item ? item.name : '';
        const iconCrypto = item ? item.icon : '';
        const balanceCrypto = item ? item.balance : '';
        const priceCrypto = item ? item.price : '';
        const feeCrypto = item ? item.fee : '';
        dispatch(saveInfoCrypto({
            iconCrypto: iconCrypto,
            id: id,
            typeCrypto: typeCrypto,
            nameCrypto: nameCrypto,
            balanceCrypto: balanceCrypto,
            priceCrypto: priceCrypto,
            feeCrypto: feeCrypto
        }));
        //navigation.navigate(page === 'crypto'?'SendOrTransferOptions':'MyCryptoBalance',{page: page});
        navigation.navigate('MyCryptoBalance', { page: page });
    };

    const handleChange = ({ index }) => {
        const typeCrypto = balances[index].type === 4 ? true : false;
        setShowTypeCrypto(typeCrypto);
        if (typeCrypto) {
            getLisCrypto();
        }
    };

    function closeSnackNotice(response) {
        setIsLoadingModal(true);
        setTimeout(function () {
            setSnakVisible(true);
            setIsLoadingModal(false);
            setTitle(response.message);
        }, 1000);
    }

    const handleCloseNotif = () => {
        setSnakVisible(false);
        setActionAnimated(true);
    };

    const InfoCryptoElement = showWalletCrypto.map((item, key) => (
        <Fragment key={key}>
            <InfoBoxCrypto onPress={() => handlePressListCrypto(item, 'crypto')} {...item} navigation={navigation} />
            <DivSpace height-12 />
        </Fragment>
    ));


    const BuyCryptoElement = showListCrypto.map((item, key) => (
        <Fragment key={key}>
            <InfoBoxCrypto buy onPress={() => handlePressListCrypto(item, 'buy')} {...item} navigation={navigation} />
            <DivSpace height-12 />
        </Fragment>
    ));

    return (

        <LinearGradient
            style={{ flex: 1, paddingTop: Platform.OS === 'android' ? verticalScale(8) : verticalScale(30) }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[brandTheme?.bgBlue01 ?? Colors.bgBlue01, brandTheme?.bgBlue01 ?? Colors.bgBlue01]}
        >
            <NavigatorHeader brandTheme={brandThemeImages} avatarProfile={() => console.log('')} navigation={navigation} />
            <View flex-1 centerH>
                <Text h14 title>{i18n.t('homeWallet.component.titleMyWallet')}</Text>
                <DivSpace height-5 />
                <ScrollView
                    style={Styles.scrollview}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor={brandTheme?.white ?? Colors.white}
                        />
                    }>
                    <View flex-1  >
                        <View height-230 >
                            {balances !== [] && (balances.length > 0 ?
                                <Animatable.View animation={'zoomInUp'} easing={'ease'} style={Styles.animateSwiper}>
                                    <Swiper balance={balances} onChangeIndex={(index) => handleChange(index)} />
                                </Animatable.View>
                                :
                                <View height-200 centerH centerV >
                                    <Bubbles size={12} color={brandTheme?.bgOrange02 ?? Colors?.bgOrange02} />
                                </View>)}
                        </View>
                        <View centerH style={{ marginTop: -verticalScale(55) }}>
                            <Link onPress={() => setShowModalInst(true)} linkStyle={{ color: brandTheme.bgOrange02 ?? Colors?.bgOrange02 }} >
                                <Text h10 medium bgOrange02>
                                    {i18n.t('homeWallet.component.textInformation')}
                                </Text>
                            </Link>
                            {!showTypeCrypto && (
                                <Fragment>
                                    <DivSpace height-20 />
                                    <ButtonRounded size='lg' onPress={() => setIsModalWire(true)}>
                                        <Text h10 semibold>
                                            {i18n.t('homeWallet.component.buttonTransfer')}
                                        </Text>
                                    </ButtonRounded>
                                </Fragment>
                            )}
                        </View>
                        <DivSpace height-12 />
                        <View flex-1 centerH>
                            {showTypeCrypto && (
                                <ScrollView style={Styles.containerCrypto}>
                                    {showWalletCrypto.length > 0 && (
                                        <Fragment>
                                            <Text h12 white>{i18n.t('CryptoBalance.component.textInMyWallet')}</Text>
                                            <DivSpace height-5 />
                                            {InfoCryptoElement}
                                        </Fragment>
                                    )}
                                    <DivSpace height-5 />
                                    {showListCrypto.length > 0 && (
                                        <Fragment>
                                            <Text h12 white>{i18n.t('CryptoBalance.component.textAvailableForPurchase')}</Text>
                                            <DivSpace height-5 />
                                            {BuyCryptoElement}
                                        </Fragment>
                                    )}
                                </ScrollView>
                            )}
                            <DivSpace height-15 />
                            {!showTypeCrypto && (
                                <View flex-1 centerV height-230 paddingT-45 >
                                    <Text white h12 center>{i18n.t('homeWallet.component.labelOptions')}</Text>
                                    <Text bgOrange02 h12 center semibold>{i18n.t('homeWallet.component.labelMyWallet')}</Text>
                                    <DivSpace height-15 />
                                    <View row flex-1 >
                                        <View>
                                            <ButtonWallet navigation={navigation} delay={100} IconButton={IconWallet} onPress={rechargueWallet} titleText={i18n.t('homeWallet.component.buttonRechargueWallet')} />
                                        </View>
                                        <DivSpace width-8 />
                                        <View>
                                            <ButtonWallet navigation={navigation} delay={200} IconButton={IconPeople} onPress={userPayment} titleText={i18n.t('homeWallet.component.buttonPayUsers')} />
                                        </View>
                                        <DivSpace width-8 />
                                        <View>
                                            <ButtonWallet navigation={navigation} delay={500} IconButton={IconTransfer} onPress={transferButton} titleText={i18n.t('homeWallet.component.buttonTransferWallCard')} />
                                        </View>
                                        <DivSpace width-8 />
                                        <View>
                                            <ButtonWallet navigation={navigation} delay={600} onPress={historic} IconButton={IconHistory} titleText={i18n.t('homeWallet.component.buttonHistoryOfTransactions')} />
                                        </View>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                    {showModal && (
                        <ModalDisabled isOpen={true} navigation={navigation} onClose={handleCloseModal} />)}
                    {showModalInst && (
                        <ModalInstruction isOpen={true} navigation={navigation} onClose={handleCloseModalIns} />)}
                    {isRechargeQRModal && (
                        <ModalBalances
                            isOpen={true}
                            onClose={handleOncloseModal}
                            navigation={navigation} />)}
                    {isModalWire && (
                        <ModalInternationalWire
                            isOpen={true}
                            onClose={handleOncloseIsWire}
                            navigation={navigation} />)}
                </ScrollView>
                {isLoadingModal && (
                    <Loader
                        isOpen={true}
                        navigation={navigation} />)}
                <SnackBar
                    message={title}
                    isVisible={snakVisible}
                    onClose={handleCloseNotif}
                    animationAction={actionAnimated}
                />
            </View>
            <NavigationEvents
                onWillFocus={payload => {
                    // getVerifyToken(payload);
                }}
            />
        </LinearGradient>

    );
};

export default withNavigationFocus(MyWallet);
