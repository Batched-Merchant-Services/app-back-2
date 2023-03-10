import React, { useState } from 'react';
import { scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import {
    DivSpace,
    NavigationBar,
    View,
    Text,
    ButtonRounded,
    ImageComponent,
    SnackBar,
    Loader,
    Link,
    BoxBlue,
    AnimateLabelInput
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import LocalStorage from '@utils/localStorage';
import i18n from '@utils/i18n';
import IconChangeNip from '../../utils/iconSVG/IconChangeNip';
import updatePinVirtual from '@assets/cards/updatePinVirtual.png';
import { setPinPhysicalCard } from '../../utils/api/switch';
import { Linking } from 'react-native';
import Colors from '@styles/Colors';



const PinUpdateScreen = ({ navigation }) => {
    const redux = useSelector(state => state);
    const userData = redux.user;
    const brandTheme = userData?.Theme?.colors;
    const CardId = navigation.getParam('cardId');
    const [snakVisible, setSnakVisible] = useState(false);
    const [actionAnimated, setActionAnimated] = useState(false);
    const [title, setTitle] = useState('');
    const [buttonNext, setButtonNext] = useState(false);
    const [isLoadingModal, setIsLoadingModal] = useState(false);
    const cardNip = useValidatedInput('cardNip', '');

    // console.log('validation card id', CardId);

    const cardNipConfirmation = useValidatedInput('cardNipConfirmation', '', {
        validationParams: [cardNip.value]
    });
    const isValid = isFormValid(cardNip, cardNipConfirmation);

    async function handleActivatePress() {
        try {
            setIsLoadingModal(true);
            const token = await LocalStorage.get('auth_token');
            const response = await CardActivation(token, CardId, cardNipConfirmation.value);
            if (response.code < 400) {
                setTimeout(function () {
                    navigation.navigate('PinUpdateConfirmation');
                    setIsLoadingModal(false);
                }, 1000);

            } else {
                setIsLoadingModal(true);
                setTimeout(function () {
                    setSnakVisible(true);
                    setButtonNext(true);
                    setIsLoadingModal(false);
                    setTitle(response.message);
                }, 1000);
            }
        } catch (e) {
        }

    }

    async function handleUpdatePin() {
        try {
            // setIsLoadingModal(true); 
            const token = await LocalStorage.get('auth_token');
            console.log('info on change pin', CardId, cardNip.value, cardNipConfirmation.value)

            navigation.navigate('Pin2faConfirmation', {
                data: { page: 'UpdatePINCard', cardId: CardId, nip: cardNipConfirmation.value },
                next: 'PinUpdateConfirmation',
            });


            // const response = await setPinPhysicalCard(token, Proxy);
            // if (response.code < 400) {
            //     setTimeout(function () {
            //         Linking.openURL(response?.data?.url);
            //         setIsLoadingModal(false);
            //     }, 1000);

            // } else {
            //     setIsLoadingModal(true);
            //     setTimeout(function () {
            //         setSnakVisible(true);
            //         setButtonNext(true);
            //         setIsLoadingModal(false);
            //         setTitle(response.message);
            //     }, 1000);
            // }
        } catch (e) {
        }

    }


    const handleCloseNotif = () => {
        setSnakVisible(false);
        setButtonNext(false);
        setActionAnimated(true);
    };


    function handleBackPress() {
        navigation.goBack();
    }

    function handlePressMyCards() {
        navigation.navigate('MyCards');
    }

    return (
        <>
            <SignUpWrapper>
                <NavigationBar
                    onBack={handleBackPress}
                    body={i18n.t('myCards.component.pinUpdate.title')}
                />
                <DivSpace height-10 />
                <View centerH >
                    <BoxBlue containerStyle={{ height: '90%' }}>
                        <DivSpace height-10 />
                        <View centerH paddingH-25>
                            <IconChangeNip width={scale(23)} height={scale(23)} fill={brandTheme?.orange ?? Colors?.orange} fillSecondary={brandTheme?.white ?? Colors?.white} />
                            <DivSpace height-26 />
                            <Text center h14 medium white>
                                {i18n.t('myCards.component.pinUpdate.textDefinePhysicalCardPIN')}
                            </Text>
                            <DivSpace height-30 />
                            <AnimateLabelInput
                                {...cardNip}
                                label={i18n.t('myCards.component.pinUpdate.textPin')}
                                keyboardType={'default'}
                                returnKeyType={'done'}
                                autoCapitalize={'none'}
                                secureTextEntry
                                style={{ color: brandTheme?.white ?? Colors.white }}
                                containerStyle={{ backgroundColor: 'white' }}
                            />
                            <DivSpace height-30 />
                            <AnimateLabelInput
                                {...cardNipConfirmation}
                                label={i18n.t('myCards.component.pinUpdate.textConfirmationPin')}
                                keyboardType={'default'}
                                returnKeyType={'done'}
                                autoCapitalize={'none'}
                                secureTextEntry
                                style={{ color: brandTheme?.white ?? Colors.white }}
                                containerStyle={{ backgroundColor: 'white' }}
                            />

                            <DivSpace height-30 />

                            <ButtonRounded
                                style={{ width: scale(144), height: scale(30) }}
                                onPress={handleUpdatePin}
                                size='lg'
                            >
                                <Text h10 semibold>
                                    {i18n.t('myCards.component.pinUpdate.buttonUpdatePIN')}
                                </Text>
                            </ButtonRounded>
                            <DivSpace height-10 />
                            <Link onPress={handlePressMyCards}>
                                <Text h11 medium white>
                                    {i18n.t('myCards.component.pinUpdate.linkBackToPhysicalCard')}
                                </Text>
                            </Link>
                        </View>
                    </BoxBlue>
                </View>
                <DivSpace height-16 />
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
        </>
    );
};

export default PinUpdateScreen;
