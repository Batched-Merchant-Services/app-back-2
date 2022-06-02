import React, { useState, useEffect,useRef,Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Switch } from 'react-native-switch';
import { Bubbles } from 'react-native-loader';
import { saveUser} from '@store/ducks/user.ducks';
import { moneyFormatter } from '@utils/formatters';
import { NavigationEvents } from 'react-navigation';
import { getCards,changueStatus } from '@utils/api/switch';
import { scale, verticalScale } from 'react-native-size-matters';
import { SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import Carousel, { Pagination,getInputRangeFromIndexes } from 'react-native-snap-carousel';
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
  DivSpace,
  ModalContainer,
  ImageComponent,
  SnackBar,
  ButtonRounded,
  BoxGradient,
  NavigatorHeader
} from '@components';


const MyCards = ({ navigation }) => {
  const AnimationRef = useRef(null);
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const brandThemeImages = userData?.Theme?.images;
  const [activeSlide, setActiveSlide] = useState(0);
  const [Open, setIsOpen] = useState(false);
  const [proxyKey, setProxyKey]= useState('');
  const [balance, setBalance] = useState(0);
  const [available, setAvailable] = useState(false);
  const [activationStatus, setActivationStatus] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [CAROUSEL_ITEMS, setCAROUSEL_ITEMS] = useState([]);
  const [statusRequestCard, setStatusRequestCard]=useState(false);
  const [cardVirtualSwfit, setCardVirtualSwfit] = useState('');
  const [isCardModal, setIsCardModal] = useState(false);
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [title, setTitle] = useState('');
  const [currencyUser]=useState(userData?userData.currencyUser:'');
  const setChangueIndex = async (index) => { 
    setActiveSlide(index);
    setBalance(CAROUSEL_ITEMS[index]?.balance);
    setStatusRequestCard(CAROUSEL_ITEMS[index]?.statusRequestCard);
    setActivationStatus(CAROUSEL_ITEMS[index]?.statusActivation);
    setAvailable(CAROUSEL_ITEMS[index]?.disabled);
    setProxyKey(CAROUSEL_ITEMS[index]?.proxyKey);
  };

  function renderItem({ item, index }) {
    const itemValues = { ...item };
    console.log('itemValues',itemValues?.card_img)
    const cardVirtual = itemValues?.type; 
    setCardVirtualSwfit(cardVirtual);
    itemValues.disabled = item?.disabled || !available;
    return cardVirtual === 'EMPTY' ? <CardEmpty {...itemValues} available={true} ref={AnimationRef} /> : <Cards {...itemValues} available={available} width={'100%'} height={'100%'}/> ;
  }

  useEffect(() => {
    getCard();
  }, []);


  async function getCard(){
    try {
      const token = await LocalStorage.get('auth_token');
      const response = await getCards(token);
      if (response?.code < 400) {
        setCAROUSEL_ITEMS(response?.data);
        setShowInfo(true);
        setAvailable(response?.data[activeSlide]?.disabled);
        setProxyKey(response?.data[activeSlide]?.proxyKey);
      } 
      setBalance(CAROUSEL_ITEMS[activeSlide]?.balance);
      setActivationStatus(CAROUSEL_ITEMS[activeSlide]?.statusActivation);
    } catch (e) {
      setBalance(0);
    }
  }

  const setChangueSwitch = async (val) => {
    const active = val ? 'ACTIVATE' : 'DEACTIVATE';
    setAvailable(val);
    try {
      const token = await LocalStorage.get('auth_token');
      const response = await changueStatus(token,active,proxyKey);
      if (response.code < 400) {
        const  availableCard = response?.data?.Status === 'DEACTIVATE' ? false: true;
        setAvailable(availableCard);
        getCard();
      } else{
        setSnakVisible(true);
        setTitle(response?.message);
        setAvailable(false);
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
  const openModalSwift =() => {
    dispatch(saveUser({ openModalNewCard: true  }));
    if (userData.openModalNewCard) {
      navigation.navigate('NewVirtualCards'); 
    } else {
      setIsCardModal(true); 
    }
  };
  const handleOncloseModal =() => {
    setIsCardModal(false);  
  };

  const _scrollInterpolator = (index, carouselProps) =>{
    const range = [1, 2, 1, 0, -1];
    const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
    const outputRange = range;

    return { inputRange, outputRange };
  };

  const _animatedStyles =(index, animatedValue, carouselProps) => {
 

    return {
   
      transform: [{
        rotate: animatedValue.interpolate({
          inputRange : [-1, 0, 1, 2, 3],
          outputRange: ['-30deg', '0deg', '0deg', '2deg', '0deg'],
          extrapolate: 'clamp'
        })
      }]
    };
  };

 
  const isPhysical = showInfo?  CAROUSEL_ITEMS[activeSlide]?.type === 'PHYSICAL' : null; 
  const isVirtual = showInfo?  CAROUSEL_ITEMS[activeSlide]?.type === 'VIRTUAL' : null;
  const isEmpty = showInfo?  CAROUSEL_ITEMS[activeSlide]?.type === 'EMPTY' : null;

  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView style={{ flex: 1,top: verticalScale(-6) }} forceInset={{top: 'always'}}>
        <NavigatorHeader brandTheme={brandThemeImages} avatarProfile={() => console.log('')} navigation={navigation} />
        <View flex-1 centerH>
          {!showInfo ?  <View flex-1 centerV><Bubbles size={12} color={brandTheme?.bgOrange02??Colors?.bgOrange02} /></View>: 
            <View flex-1 centerH>
              <Text medium h14 title>
                {i18n.t('myCards.component.title')}
              </Text>
              <DivSpace height-5 />
              <View centerH style={{ width: '100%' }}>
                <View style={Styles.containerSwitch}>
                  {!isVirtual && activationStatus &&(<Switch
                    value={available}  
                    onValueChange={(val) => setChangueSwitch(val)}
                    circleSize={25}
                    backgroundActive={!available ?Colors.textGray : Colors.green}
                    backgroundInactive={!available ? Colors.textGray : Colors.green }
                    switchWidthMultiplier={1.73}
                    circleBorderWidth={0}
                    circleActiveColor={'white'}
                    circleInActiveColor={'white'}
                    renderInsideCircle={() => (
                      <View centerH>
                        <ImageComponent
                          textGray
                          source={!available ? switchBlocked : switchUnblocked }
                          width={12}
                          height={12}
                        />
                      </View>
                    )}
                  />)}
                </View>
              </View>
              <DivSpace height-40 />
              <View style={{height: scale(180)}}>
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
              <View flex-1 centerH style={{width: '100%'}}>
                <Pagination
                  containerStyle={{
                    paddingHorizontal: 0,
                    paddingVertical  : verticalScale(10)
                  }}
                  dotsLength={CAROUSEL_ITEMS.length}
                  activeDotIndex={activeSlide}
                  dotStyle={[{backgroundColor: brandTheme?.bgOrange02??Colors.bgOrange02}]}
                  inactiveDotStyle={[{backgroundColor: brandTheme?.bgBlue06??Colors?.bgBlue06}]}
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
                      {!CAROUSEL_ITEMS[activeSlide]?.statusRequestCard && (
                        <Fragment>
                          <View marginH-40 centerH>
                            <Text h12 white>{i18n.t('myCards.component.textGenerateVirtualCard')}</Text>
                            <DivSpace height-10 />
                            <Text h10 white center>{i18n.t('myCards.component.textTheNumbersAre')}<Text white bold>{' '}{i18n.t('myCards.component.textRememberToCreate')}</Text></Text>
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
                      {CAROUSEL_ITEMS[activeSlide]?.statusRequestCard && (
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
                  ? isPhysical && !CAROUSEL_ITEMS[activeSlide]?.statusRequestCard && !CAROUSEL_ITEMS[activeSlide]?.statusActivation &&( 
                    <View  flex-1 centerH centerV >
                      <Text h14 white center bold>{i18n.t('myCards.component.requesCard.textPhysicalPrepaidCard')}</Text>
                      <DivSpace height-10 />
                      <Text textGray h10 center>{i18n.t('myCards.component.requesCard.textYouCanUseInAny')}</Text>
                      <DivSpace height-20 />
                      <CardRequestCard navigation={navigation} dataAssociate={CAROUSEL_ITEMS[activeSlide]}/>
                    </View>)
                  :null}

                {showInfo
                  ? isPhysical && CAROUSEL_ITEMS[activeSlide]?.statusRequestCard && CAROUSEL_ITEMS[activeSlide]?.statusActivation &&( 
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
                      <CardPhysicalActions navigation={navigation} dataPhysical={CAROUSEL_ITEMS[activeSlide]}/>
                    </View>)
                  :null}

                {showInfo
                  ? isPhysical && !CAROUSEL_ITEMS[activeSlide]?.statusActivation && CAROUSEL_ITEMS[activeSlide]?.statusRequestCard &&( 
                    <CardDisabledFooter navigation={navigation} data={CAROUSEL_ITEMS[activeSlide]}/>)
                  :null}
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
                    source={brandThemeImages?.shoppingOnline?brandThemeImages?.shoppingOnline:shoppingOnline}
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
        {isCardModal &&(
          <ModalSwift 
            isOpen={true}
            onClose={handleOncloseModal}
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
