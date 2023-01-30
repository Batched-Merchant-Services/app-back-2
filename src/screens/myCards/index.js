import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Switch } from 'react-native-switch';
import { Bubbles } from 'react-native-loader';
import { saveUser } from '@store/ducks/user.ducks';
import { moneyFormatter } from '@utils/formatters';
import { NavigationEvents } from 'react-navigation';
import { changueStatus } from '@utils/api/switch';
import { scale, verticalScale } from 'react-native-size-matters';
import { SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import Carousel, { Pagination, getInputRangeFromIndexes } from 'react-native-snap-carousel';
import LocalStorage from '@utils/localStorage';
import Cards from '@screens/myCards/components/Cards';
import CardEmpty from '@screens/myCards/components/CardEmpty';
import ModalSwift from '@screens/myCards/components/ModalSwift';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import CardRequestCard from '@screens/myCards/components/CardRequestCard';
import CardDisabledFooter from '@screens/myCards/components/CardDisabledFooter';
import CardVirtualActions from '@screens/myCards/components/CardVirtualActions';
import CardPhysicalActions from '@screens/myCards/components/CardPhysicalActions';
import Close from '@assets/icons/close.png';
import swift from '@assets/brand/cardVirtual.png';
import switchBlocked from '@assets/icons/blocked.png';
import switchUnblocked from '@assets/icons/switch.png';
import shoppingOnline from '@assets/brand/shoppingOnline.png';
import Styles from './styles';
import i18n from '@utils/i18n';
import Colors from '@styles/Colors';
import {
    View,
    Text,
    Loader,
    DivSpace,
    ModalContainer,
    ImageComponent,
    SnackBar,
    ButtonRounded,
    BoxGradient,
    NavigatorHeader
} from '@components';
import { changeStatusCard, getOrderCards } from '../../utils/api/graph_api/cards.service';


const MyCards = ({ navigation }) => {
    const AnimationRef = useRef(null);
    const dispatch = useDispatch();
    const redux = useSelector(state => state);
    const userData = redux.user;
    const brandTheme = userData?.Theme?.colors;
    const brandThemeImages = userData?.Theme?.images;
    const [activeSlide, setActiveSlide] = useState(0);
    const [Open, setIsOpen] = useState(false);
    const [idCard, setIdCard] = useState('');
    const [balance, setBalance] = useState(0);
    const [available, setAvailable] = useState(false);
    const [activationStatus, setActivationStatus] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [CAROUSEL_ITEMS, setCAROUSEL_ITEMS] = useState([]);
    const [statusRequestCard, setStatusRequestCard] = useState(false);
    const [cardVirtualSwfit, setCardVirtualSwfit] = useState('');
    const [isCardModal, setIsCardModal] = useState(false);
    const [snakVisible, setSnakVisible] = useState(false);
    const [actionAnimated, setActionAnimated] = useState(false);
    const [isLoadingModal, setIsLoadingModal] = useState(false);
    const [title, setTitle] = useState('');
    const [currencyUser] = useState(userData ? userData?.currencyUser : '');
    const setChangueIndex = async (index) => {
        setActiveSlide(index);
        setBalance(CAROUSEL_ITEMS[index]?.balance);
        setStatusRequestCard(CAROUSEL_ITEMS[index]?.statusRequestCard);
        setActivationStatus(CAROUSEL_ITEMS[index]?.statusActivation);
        setAvailable(CAROUSEL_ITEMS[index]?.disabled);
        setIdCard(CAROUSEL_ITEMS[index]?.id);
    };

    function renderItem({ item, index }) {
        const itemValues = { ...item };
        const cardVirtual = itemValues?.type;
        setCardVirtualSwfit(cardVirtual);
        return cardVirtual === 'EMPTY' ? <CardEmpty {...itemValues} available={true} ref={AnimationRef} /> : <Cards {...itemValues} available={available} width={'100%'} height={'100%'} />;
    }

    useEffect(() => {

        console.log('use effect getCard')
        getCard();
    }, []);


    async function getCard() {
        try {
            setIsLoadingModal(false);

            let cards = [];
            const response = await getOrderCards();









            let cardsData = [];

            if (response?.getOrderCards) {


                cardsData = [...response?.getOrderCards]


                if (cardsData.length === 0) {
                    cards.push({ proxyKey: "000000000", statusCancelCard: false, statusRequestCard: false, statusActivation: false, balance: 0, name: "0000 0000 0000 0000", cardNumber: "0000 0000 0000 0000", disabled: false, dueDate: "00/00", cvv: "000", type: 'EMPTY' });

                }

                console.log('getOrderCards', cardsData);

                cardsData.forEach(card => {
                    cards.push({ id: card?.id, proxyKey: "000000000", img_card: card?.frontCard, statusCancelCard: card?.cardStatus !== 'active', statusRequestCard: card?.orderType !== 2, statusActivation: card?.cardIsActive, balance: card?.cardBalance, name: card?.cardNumber, cardNumber: card?.cardNumber, disabled: card?.cardIsBlocked, dueDate: "00/00", cvv: "000", type: card?.cardIsVirtual ? 'VIRTUAL' : 'PHYSICAL' });
                });

                cards.push({ redemption_link: "000000000000000000000000000000000000000000000", status: "Valid", expdate: "00/00/0000", transaction_id: "000000000", type: "VIRTUAL" });
                console.log('card', cards);

                setCAROUSEL_ITEMS(cards);
                setShowInfo(true);
                setAvailable(cards[activeSlide]?.disabled);
                console.log('seguimiento');
                setIdCard(cards[activeSlide]?.id);

                if (cards[activeSlide]?.type === 'PHYSICAL') {
                    setActivationStatus(cards[activeSlide]?.statusActivation);
                }

            } else {
                // errorSnackNotice('Error to get cards');
            }

            setBalance(CAROUSEL_ITEMS[activeSlide]?.balance);
        } catch (e) {
            setBalance(0);
        }
    }


    const setChangueSwitch = async (val) => {
        setIsLoadingModal(true);
        // const active = val ? 'ACTIVATE' : 'DEACTIVATE';

        setAvailable(val);
        try {
            // const token = await LocalStorage.get('auth_token');
            // const response = await changueStatus(token, active, idCard);

            console.log('status change ', val)
            const response = await changeStatusCard(val, idCard);

            console.log('Change status card', response);


            if (val ? response?.setOrderActiveStatusCard?.toLowerCase() === 'true' : response?.setOrderSuspendStatusCard?.toLowerCase() === 'true') {

                setAvailable(val);
                setIsLoadingModal(false);
                getCard();
            }

        } catch (e) {
        }
    };

    const handleCloseNotif = () => {
        setSnakVisible(false);
        setActionAnimated(true);
    };

    const handlePress = async () => {
        setIsOpen(false);
    };

    const handlesShowModal = async () => {
        setIsOpen(true);
    };

    const handleNext = async () => {
        navigation.navigate('ViewCard', { info: CAROUSEL_ITEMS[activeSlide] });
        setIsOpen(false);
    };
    const openModalSwift = () => {
        dispatch(saveUser({ openModalNewCard: true }));
        if (userData.openModalNewCard) {
            navigation.navigate('NewVirtualCards');
        } else {
            setIsCardModal(true);
        }
    };
    const handleOncloseModal = () => {
        setIsCardModal(false);
    };

    const isPhysical = showInfo ? CAROUSEL_ITEMS[activeSlide]?.type === 'PHYSICAL' : null;
    const isVirtual = showInfo ? CAROUSEL_ITEMS[activeSlide]?.type === 'VIRTUAL' : null;
    const isEmpty = showInfo ? CAROUSEL_ITEMS[activeSlide]?.type === 'EMPTY' : null;

    return (
        <SignUpWrapper forceInset={{ top: 0 }}>
            <SafeAreaView style={{ flex: 1, top: verticalScale(-6) }} forceInset={{ top: 'always' }}>
                <NavigatorHeader brandTheme={brandThemeImages} avatarProfile={() => console.log('')} navigation={navigation} />
                {/* <DivSpace height-40 /> */}
                <View flex-1 centerH>
                    {!showInfo ? <View flex-1 centerV><Bubbles size={12} color={brandTheme?.bgOrange02 ?? Colors?.bgOrange02} /></View> :
                        <View flex-1 centerH>
                            <Text medium h14 title>
                                {i18n.t('myCards.component.title')}
                            </Text>
                            <DivSpace height-5 />
                            <View centerH style={{ width: '100%' }}>
                                <View style={Styles.containerSwitch}>
                                    {!isVirtual && (<Switch
                                        value={available ? false : true}
                                        onValueChange={(val) => setChangueSwitch(val)}
                                        circleSize={25}
                                        backgroundActive={Colors.green}
                                        backgroundInactive={Colors.textGray}
                                        switchWidthMultiplier={1.73}
                                        circleBorderWidth={0}
                                        circleActiveColor={Colors.white}
                                        circleInActiveColor={Colors.white}
                                        renderInsideCircle={() => (
                                            <View centerH>
                                                <ImageComponent
                                                    source={available ? switchBlocked : switchUnblocked}
                                                    width={12}
                                                    height={12}
                                                />
                                            </View>
                                        )}
                                    />)}
                                </View>
                            </View>
                            <DivSpace height-40 />
                            <View style={{ height: scale(180) }}>
                                <Carousel
                                    loop={false}
                                    data={CAROUSEL_ITEMS}
                                    renderItem={renderItem}
                                    sliderWidth={Dimensions.get('window').width}
                                    itemWidth={scale(284)}
                                    inactiveSlideOpacity={1}
                                    onSnapToItem={index => setChangueIndex(index)}
                                    firstItem={activeSlide}
                                //scrollInterpolator={_scrollInterpolator}
                                //slideInterpolatedStyle={_animatedStyles}
                                />
                            </View>
                            <View flex-1 centerH style={{ width: '100%' }}>
                                <Pagination
                                    containerStyle={{
                                        paddingHorizontal: 0,
                                        paddingVertical: verticalScale(10)
                                    }}
                                    dotsLength={CAROUSEL_ITEMS.length}
                                    activeDotIndex={activeSlide}
                                    dotStyle={[{ backgroundColor: brandTheme?.bgBlue06 ?? Colors?.bgBlue06 }]}
                                    inactiveDotStyle={[{ backgroundColor: brandTheme?.bgOrange02 ?? Colors.bgOrange02 }]}
                                    inactiveDotOpacity={1}
                                    inactiveDotScale={1}
                                />
                                {/* {showInfo
                  ? isEmpty &&( 
                    
                    <View  centerH centerV >
                      <Animatable.View
                        animation="pulse"
                        delay={100}
                      >
                        <Text h14 white center bold>{i18n.t('myCards.component.requesCard.textPhysicalPrepaidCard')}</Text>
                        <DivSpace height-10 />
                        <Text bgGray h10 center>{i18n.t('myCards.component.requesCard.textYouCanUseInAny')}</Text>
                        <DivSpace height-20 />
                        <CardRequestCard navigation={navigation} dataAssociate={CAROUSEL_ITEMS[activeSlide]}/>
                      </Animatable.View>
                    </View>)
                  :null} */}

                                {showInfo
                                    ? isVirtual && (
                                        <View centerH >
                                            {!CAROUSEL_ITEMS[activeSlide]?.statusRequestCard && !CAROUSEL_ITEMS[activeSlide]?.statusActivation && (
                                                <Fragment>
                                                    <View marginH-40 centerH>
                                                        <DivSpace height-10 />
                                                        <Text h12 white>{i18n.t('myCards.component.textGenerateVirtualCard')}</Text>
                                                        <DivSpace height-10 />
                                                        {/* <DivSpace height-10 />
                            <Text h10 white center>{i18n.t('myCards.component.textTheNumbersAre')}<Text white bold>{' '}{i18n.t('myCards.component.textRememberToCreate')}</Text></Text> */}
                                                    </View>
                                                    <DivSpace height-20 />
                                                    <ButtonRounded
                                                        onPress={openModalSwift}
                                                        size='lg'
                                                    >
                                                        <Text h10 semibold>
                                                            {i18n.t('myCards.component.CardSwift.textGoToCardPanel')}
                                                        </Text>
                                                    </ButtonRounded>
                                                    <DivSpace height-15 />
                                                    <CardVirtualActions navigation={navigation} dataVirtual={CAROUSEL_ITEMS[activeSlide]} />
                                                </Fragment>
                                            )}
                                            {CAROUSEL_ITEMS[activeSlide].statusRequestCard && CAROUSEL_ITEMS[activeSlide]?.statusActivation && (
                                                <View>
                                                    <DivSpace height-20 />
                                                    <Text medium h12 white center>
                                                        {i18n.t('myCards.component.textBalance')}
                                                    </Text>
                                                    <Text medium h32 white center>
                                                        {moneyFormatter(CAROUSEL_ITEMS[activeSlide]?.balance)}
                                                    </Text>
                                                    <Text medium h14 orange center>
                                                        {currencyUser}
                                                    </Text>
                                                    <CardVirtualActions navigation={navigation} dataVirtual={CAROUSEL_ITEMS[activeSlide]} />
                                                </View>

                                            )}
                                        </View>)
                                    : null}

                                {showInfo
                                    ? isPhysical && !CAROUSEL_ITEMS[activeSlide]?.statusRequestCard && !CAROUSEL_ITEMS[activeSlide]?.statusActivation && (
                                        <View flex-1 centerH centerV >
                                            <Text h14 white center bold>{i18n.t('myCards.component.requesCard.textPhysicalPrepaidCard')}</Text>
                                            <DivSpace height-10 />
                                            <Text textGray h10 center>{i18n.t('myCards.component.requesCard.textYouCanUseInAny')}</Text>
                                            <DivSpace height-20 />
                                            <CardRequestCard navigation={navigation} dataAssociate={CAROUSEL_ITEMS[activeSlide]} />
                                        </View>)
                                    : null}

                                {showInfo
                                    ? isPhysical && CAROUSEL_ITEMS[activeSlide].statusRequestCard && CAROUSEL_ITEMS[activeSlide].statusActivation && !CAROUSEL_ITEMS[activeSlide].disabled && (
                                        <View>
                                            <DivSpace height-20 />
                                            <Text medium h12 white center>
                                                {i18n.t('myCards.component.textBalance')}
                                            </Text>
                                            <Text medium h32 white center>
                                                {moneyFormatter(CAROUSEL_ITEMS[activeSlide]?.balance)}
                                            </Text>
                                            <Text medium h14 orange center>
                                                {currencyUser}
                                            </Text>
                                            <CardPhysicalActions navigation={navigation} dataPhysical={CAROUSEL_ITEMS[activeSlide]} />
                                        </View>)
                                    : null}

                                {showInfo
                                    ? isPhysical && !CAROUSEL_ITEMS[activeSlide].statusActivation && CAROUSEL_ITEMS[activeSlide].statusRequestCard && (
                                        <CardDisabledFooter navigation={navigation} data={CAROUSEL_ITEMS[activeSlide]} />)
                                    : null}

                                {showInfo
                                    ? isPhysical && CAROUSEL_ITEMS[activeSlide].statusActivation && CAROUSEL_ITEMS[activeSlide].statusRequestCard && CAROUSEL_ITEMS[activeSlide].disabled && (
                                        <View centerH>
                                            <DivSpace height-20 />
                                            <View style={{ width: '80%' }}>
                                                <Text medium h14 center white>
                                                    Tarjeta inactiva
                                                </Text>
                                                <DivSpace height-20 />
                                                <Text center h12 medium white>
                                                    Si deseas realizar pagos con ella presiona el icono del candado en la parte superior de la tarjeta.
                                                </Text>
                                            </View>
                                            <CardPhysicalActions navigation={navigation} dataPhysical={CAROUSEL_ITEMS[activeSlide]} inactive />
                                        </View>
                                    )
                                    : null}
                            </View>
                        </View>}
                </View>
                <View centerH centerV>
                    <ModalContainer showModal={Open}>
                        <View
                            width-310
                            height-457
                            textBlue01
                            style={Styles.modalCards}
                        >
                            <View right paddingT-20 paddingR-20>
                                <View centerH centerV bgBlue01 style={Styles.buttonClose}>
                                    <TouchableOpacity
                                        onPress={handlePress}
                                        style={Styles.touchableButton}
                                    >
                                        <ImageComponent
                                            source={Close}
                                            width={scale(10)}
                                            height={verticalScale(10)}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <DivSpace height-60 />
                            <View centerH centerV>
                                <BoxGradient size={118}>
                                    <ImageComponent
                                        source={brandThemeImages?.shoppingOnline ? brandThemeImages?.shoppingOnline : shoppingOnline}
                                        width={scale(75)}
                                        height={verticalScale(80)}
                                    />
                                </BoxGradient>
                            </View>
                            <DivSpace height-30 />
                            <View marginH-80>
                                <Text h12 white center>
                                    {i18n.t('myCards.component.modalOnlineShopping')} {'\n'}
                                    <Text semibold white>
                                        {i18n.t('myCards.component.modalShopping')}
                                    </Text>
                                </Text>
                            </View>
                            <DivSpace height-30 />
                            <Text h12 white center>
                                {i18n.t('myCards.component.modalTextClickOnAny')}
                            </Text>
                            <View flex-1 centerH bottom>
                                <ButtonRounded onPress={handleNext}>
                                    <Text h10 semibold>
                                        {i18n.t('myCards.component.buttonStart')}
                                    </Text>
                                </ButtonRounded>
                            </View>
                            <DivSpace height-60 />
                        </View>
                    </ModalContainer>
                </View>
                <SnackBar
                    message={title}
                    isVisible={snakVisible}
                    onClose={handleCloseNotif}
                    animationAction={actionAnimated}
                />
                {isCardModal && (
                    <ModalSwift
                        isOpen={true}
                        onClose={handleOncloseModal}
                        navigation={navigation} />)}
                {isLoadingModal && (
                    <Loader
                        isOpen={true}
                        navigation={navigation} />)}
            </SafeAreaView>
            <NavigationEvents
                onWillFocus={payload => {
                    getCard();
                }}
            />
        </SignUpWrapper>
    );
};

export default MyCards;
