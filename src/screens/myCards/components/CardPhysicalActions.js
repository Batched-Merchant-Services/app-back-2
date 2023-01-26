import React, { Fragment, useEffect, useState } from 'react';
import { scale } from 'react-native-size-matters';
import Ripple from 'react-native-material-ripple';
import { View, BoxGradient, Text, DivSpace, } from '@components';
import * as Animatable from 'react-native-animatable';
import { withNavigationFocus } from 'react-navigation';
import Styles from '../styles';
import i18n from '@utils/i18n';
import { useSelector } from 'react-redux';
import IconHistory from '@utils/iconSVG/IconHistory';
import IconRequestCash from '@utils/iconSVG/IconRequestCash';
import IconCancelCard from '@utils/iconSVG/IconCancelCard';
import IconChangeNip from '@utils/iconSVG/IconChangeNip';
import Colors from '@styles/Colors';
import ModalChangePin from './ModalChangePin';
import Modal2faConfirmation from '@screens/auth2fa/Modal2faConfirmation';
import LocalStorage from '@utils/localStorage';

const CardPhysicalActions = ({ navigation, dataPhysical, inactive }) => {
    const redux = useSelector(state => state);
    const appData = redux.user;
    const brandTheme = appData?.Theme?.colors;
    const [showModalChangePin, setShowModalChangePin] = useState(false);
    const [showModal2fa, setShowModal2fa] = useState(false);

    var userGraphInfo = null;
    var type2fa = null;

    useEffect(() => {

        getUserData();

    }, []);

    async function getUserData() {
        userGraphInfo = JSON.parse(await LocalStorage.get('user_info_graph'));
        type2fa = await LocalStorage.get('type2fa');
        type2fa = +type2fa;
        console.log('user data physical actions', +type2fa)
    }

    function handleRechargePress() {
        navigation.navigate('RechargeCard', { dataBackup: dataPhysical });
    }

    function handleCancelPress() {
        navigation.navigate('CancelCardCancel', { dataBackup: dataPhysical });
    }

    function handleHistoricTransaction() {
        navigation.navigate('Historics', { page: 'card', dataBackup: dataPhysical });
    }

    function handleChangePIN() {


        if (!type2fa) getUserPin();
        else {
            navigationChangePin();
        }

    }

    async function getUserPin() {
        type2fa = await LocalStorage.get('type2fa');
        type2fa = +type2fa;
        navigationChangePin();
    }

    function navigationChangePin() {
        var foobar = [3, 2, 1];
        const cardId = dataPhysical ? dataPhysical.id : '';
        console.log('navigation change pin', cardId)
        if (!foobar.includes(+type2fa)) {
            setShowModal2fa(true);
        } else {

            navigation.navigate('PinUpdateScreen', {
                cardId: dataPhysical.id
                // next: 'PinUpdateScreen',
            });
            // navigation.navigate('Pin2faConfirmation', {
            //     data: { page: 'UpdatePINCard', ProxyKey: ProxyKey },
            //     next: 'PinUpdateScreen',
            // });
            //navigation.navigate('Pin2faConfirmation',{ page: 'UpdatePINCard',ProxyKey: ProxyKey });   
        }
    }

    const handlePressNext = () => {
        setShowModalChangePin(false);
    };

    const handleClose = () => {
        setShowModal2fa(!showModal2fa);
    };

    return (
        <View style={{ width: '100%' }}>
            {navigation.isFocused() && <View textBlue01
                style={Styles.animation}
                marginT-17
                marginH-10
                height-106
                paddingV-16
                row
            >
                {!inactive && (
                    <Fragment>
                        <Animatable.View style={Styles.containerButton} animation="flipInX" >
                            <Ripple style={{ flex: 1 }} onPress={handleRechargePress}>
                                <View flex-1 centerH>
                                    <BoxGradient blue size={scale(41)}>
                                        <IconRequestCash width={30} height={30} fill={brandTheme?.orange ?? Colors?.orange} fillSecondary={brandTheme?.white ?? Colors?.white} />
                                    </BoxGradient>
                                    <DivSpace height-6 />
                                    <Text h10 medium center white>
                                        {i18n.t('myCards.component.rechargeAction')}
                                    </Text>
                                </View>
                            </Ripple>
                        </Animatable.View>
                        <Animatable.View style={Styles.containerButton} animation="flipInX" delay={150}>
                            <Ripple rippleDuration={800} style={{ flex: 1 }} onPress={handleHistoricTransaction}>
                                <View flex-1 centerH>
                                    <BoxGradient blue size={scale(41)}>
                                        <IconHistory width={26} height={26} fill={brandTheme?.orange ?? Colors?.orange} fillSecondary={brandTheme?.white ?? Colors?.white} />
                                    </BoxGradient>
                                    <DivSpace height-6 />
                                    <Text h10 medium center white>
                                        {i18n.t('myCards.component.movementsAction')}
                                    </Text>
                                </View>
                            </Ripple>
                        </Animatable.View>
                        <Animatable.View style={Styles.containerButton} animation="flipInX" delay={150}>
                            <Ripple rippleDuration={800} style={{ flex: 1 }} onPress={handleChangePIN}>
                                <View flex-1 centerH>
                                    <BoxGradient blue size={scale(41)}>
                                        <IconChangeNip width={26} height={26} fill={brandTheme?.orange ?? Colors?.orange} fillSecondary={brandTheme?.white ?? Colors?.white} />
                                    </BoxGradient>
                                    <DivSpace height-6 />
                                    <Text h10 medium center white>
                                        {i18n.t('myCards.component.buttonChangePINAction')}
                                    </Text>
                                </View>
                            </Ripple>
                        </Animatable.View>
                        {/* <Animatable.View style={Styles.containerButton} animation="flipInX" delay={300}>
                            <Ripple style={{ flex: 1 }} onPress={handleCancelPress}>
                                <View flex-1 centerH>
                                    <BoxGradient blue size={scale(41)}>
                                        <IconCancelCard width={26} height={26} fill={brandTheme?.orange ?? Colors?.orange} fillSecondary={brandTheme?.white ?? Colors?.white} />
                                    </BoxGradient>
                                    <DivSpace height-6 />
                                    <Text h10 medium center white>
                                        {i18n.t('myCards.component.cancelAction')}
                                    </Text>
                                </View>
                            </Ripple>
                        </Animatable.View> */}
                    </Fragment>
                )}
                {inactive && (
                    <Fragment>
                        <Animatable.View style={Styles.containerButton} animation="flipInX" delay={150}>
                            <Ripple rippleDuration={800} style={{ flex: 1 }} onPress={handleHistoricTransaction}>
                                <View flex-1 centerH>
                                    <BoxGradient blue size={scale(41)}>
                                        <IconHistory width={26} height={26} fill={brandTheme?.orange ?? Colors?.orange} fillSecondary={brandTheme?.white ?? Colors?.white} />
                                    </BoxGradient>
                                    <DivSpace height-6 />
                                    <Text h10 medium center white>
                                        {i18n.t('myCards.component.movementsAction')}
                                    </Text>
                                </View>
                            </Ripple>
                        </Animatable.View>
                        <Animatable.View style={Styles.containerButton} animation="flipInX" delay={300}>
                            <Ripple style={{ flex: 1 }} onPress={handleCancelPress}>
                                <View flex-1 centerH>
                                    <BoxGradient blue size={scale(41)}>
                                        <IconCancelCard width={26} height={26} fill={brandTheme?.orange ?? Colors?.orange} fillSecondary={brandTheme?.white ?? Colors?.white} />
                                    </BoxGradient>
                                    <DivSpace height-6 />
                                    <Text h10 medium center white>
                                        {i18n.t('myCards.component.cancelAction')}
                                    </Text>
                                </View>
                            </Ripple>
                        </Animatable.View>
                    </Fragment>
                )}
            </View>}
            {showModalChangePin && (
                <ModalChangePin isOpen={true} navigation={navigation} onClose={handlePressNext} />)}
            <Modal2faConfirmation
                visible={showModal2fa}
                onRequestClose={() => { setShowModal2fa(false) }}
                onPressOverlay={handleClose}
                navigation={navigation}
            />
        </View>
    );
};

export default withNavigationFocus(CardPhysicalActions);
