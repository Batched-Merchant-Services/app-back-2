import React, {useState,useRef} from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import i18n from '@utils/i18n';
import { ScrollView, TouchableOpacity } from 'react-native';
import { moneyFormatter } from '@utils/formatters';
import uber from '@assets/giftCards/uber.png';
import { useValidatedInput } from '@hooks/validation-hooks';
import * as Animatable from 'react-native-animatable';
import Styles from './styles';
import {
  View,
  NavigationBar,
  DivSpace,
  Text,
  ImageComponent,
  ButtonFloating,
  BoxLevelBadge,
  Checkbox,
  ButtonRounded,
  Link
} from '@components';
import arrowDown from '@assets/icons/arrowDown.png';
import Modal2faConfirmation from '@screens/auth2fa/Modal2faConfirmation';
import Colors from '@styles/Colors';
import { useSelector } from 'react-redux';

const GiftCardDetails = ({ navigation }) => {
  const scrollView = useRef(null);
  const redux = useSelector(state => state);
  const userData = redux.user;
  const gift = navigation.getParam('gift');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTwo, setIsOpenTwo] = useState(false);
  const [isOpenThree, setIsOpenThree] = useState(false);
  const [showModal2fa, setShowModal2fa] = useState(false);
  const [isCredit] = useState(true);
  
  function handlePress(state) {
    setIsOpen(!isOpen);

  }
  function handlePressTwo(state) {
    setIsOpenTwo(!isOpenTwo);

  }
  function handlePressThree(state) {
    setIsOpenThree(!isOpenThree);

  }
  const agreeCheck = useValidatedInput('agree', true, {
    changeHandlerName: 'onChange'
  });

  const handelBuy = async () => { 
    var foobar = [3, 2, 1];
    if (!foobar.includes(userData?.type2fa)) {
      setShowModal2fa(true);
    } else {
      navigation.navigate('Pin2faConfirmation', {
        data: {},
        next: 'GiftCardConfirmation'
      });
      //navigation.navigate('Pin2faConfirmation');  
    } 
  };

  const handleGoUpPress = () =>
    scrollView.current.scrollTo({ x: 0, y: 0, animated: true });

  const handleClose = () => {
    setShowModal2fa(!showModal2fa);
  };

  return (
    <View bgBlue01 style={{ height: '100%'}}>
      <View white flex-1 height-350 >
        <ScrollView ref={scrollView}>
          <DivSpace height-25 />
          <NavigationBar
            onBack={() => navigation.goBack()}
            body={i18n.t('store.component.titleOfferCashPption')}
          /> 
          <DivSpace height-30 />
          <View centerH>
            <Animatable.View animation="zoomIn" delay={300} >
              <View width-229 height-135 centerV centerH style={Styles.containerImageProv}>
                <ImageComponent
                  source={uber}
                  width={scale(160)}
                  height={verticalScale(58)}
                />
              </View>
            </Animatable.View>
          </View>
          
          <DivSpace height-20 />
          <View width-160 height-18>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#F7AE51',Colors?.bgOrange02]}
              style={Styles.benefits}
            >
              <Text semibold h10 white center>{gift.creditGifts}</Text>
            </LinearGradient>
          </View>
          <DivSpace height-20 />
          <View marginH-15 row>
            <View flex-1>
              <Text medium h16 bgBlue02>{gift.provider}</Text>
              <DivSpace height-5 />
              <Text medium h12 textGray>Tarjeta de regalo</Text>
              <View height-35 flex-1 row centerV>
                <View centerV width-106 height-18>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#6990FC','#775EFF']}
                    style={Styles.linearOfert}
                  >
                    <Text semibold h10 white center>{gift.typeGiftCard}</Text>
                  </LinearGradient>
                </View>
                <View style={{marginLeft:-25}}>
                  {isCredit?<BoxLevelBadge level={'03'} sm />:null}
                </View>
              </View>
            </View>
            <View flex-1 right>
              <Text medium h10 textGray>Tres pagos Quincenales</Text>
              <DivSpace height-5 />
              <Text medium h24 bgBlue02>{moneyFormatter(gift.available)}</Text>
            </View>
          </View>
          <DivSpace height-15 />
          {!isCredit && (
            <View  centerH>
              <View  centerV height-95 paddingH-10 >
                <DivSpace height-5 />
                <Text h12 bgBlue02 >
                  <Text semibold>
                    {gift.creditGifts}{' '}
                  </Text>
                  {gift.providerDetail}
                </Text>
              </View>
              <Text h10 textGray center>{i18n.t('store.component.textAvailableInWallet')}</Text>
              <Text textGray h10 semibold center>{moneyFormatter(gift.amount)}</Text>
              <DivSpace height-20 />
              <ButtonRounded size='lg' onPress={handelBuy}>
                <Text h10 semibold>
                  {i18n.t('store.component.buttonBuy')}
                </Text>
              </ButtonRounded>
              <DivSpace height-25 />
            </View>
          )}
          {isCredit && (
            <View>
              <View bgGray centerV height-95 paddingH-10>
                <DivSpace height-5 />
                <Text h12 bgBlue02 >
                  <Text semibold>
                    {gift.creditGifts}{' '}
                  </Text>
                  {gift.providerDetail}
                </Text>
              </View>
              <View paddingH-40 height-405 style={Styles.containerIscredit}>
                <DivSpace height-30 />
                <Text h10 white center>{i18n.t('store.component.buyCredit.titleBuy')}</Text>
                <DivSpace height-20 />
                <View row centerH centerV>
                  <Checkbox {...agreeCheck} checkedValue={true} />
                  <DivSpace width-10 />
                  <Text h12>
                    {i18n.t('store.component.buyCredit.chekBoxIAgree')}
                  </Text>
                </View>
                <DivSpace height-20 />
                <View centerH>
                  <ButtonRounded size='lg' onPress={handelBuy}>
                    <Text h10 semibold>
                      {i18n.t('store.component.buyCredit.buttonHireCredit')}
                    </Text>
                  </ButtonRounded>
                </View>
                <DivSpace height-30 />
                <Text h12 white medium>{i18n.t('store.component.buyCredit.textCreditDetails')}</Text>
                <DivSpace height-5 />
                <View row  centerH>
                  <View flex-1>
                    <Text h10 textGray>{i18n.t('store.component.buyCredit.textCapital')}</Text>
                    <DivSpace height-10 />
                    <Text h10 textGray>{i18n.t('store.component.buyCredit.textInterestAmount')}</Text>
                    <DivSpace height-10 />
                    <Text h10 textGray>{i18n.t('store.component.buyCredit.textIVA')}</Text>
                    <DivSpace height-10 />
                    <Text h10 textGray>{i18n.t('store.component.buyCredit.textTotalToPay')}</Text>
                  </View>
                  <View style={{ flex: 0.5 }}  right>
                    <Text h12 white medium>{moneyFormatter(3500)}</Text>
                    <DivSpace height-10 />
                    <Text h12 white medium>{moneyFormatter(175)}</Text>
                    <DivSpace height-10 />
                    <Text h12 white medium>{moneyFormatter(26)}</Text>
                    <DivSpace height-10 />
                    <Text h12 white medium>{moneyFormatter(3701.25)}</Text>
                  </View>
                </View>
                <DivSpace height-10 />
                <View height-1 textBlue01/>
                <DivSpace height-10 />
                <View row>
                  <View flex-1>
                    <Text h10 textGray>{i18n.t('store.component.buyCredit.textTermInBiweeklyPayments')}</Text>
                    <DivSpace height-10 />
                    <Text h10 textGray>{i18n.t('store.component.buyCredit.textAmountOfEachPayment')}</Text>
                  </View>
                  <View style={{ flex: 0.5 }} right>
                    <Text h12 white medium>{moneyFormatter(3)}</Text>
                    <DivSpace height-10 />
                    <Text h12 white medium>{moneyFormatter(1233.75)}</Text>
                  </View>
                </View>
                <DivSpace height-10 />
                <Link onPress={() => {}}>
                  <Text h10 medium title>
                    {i18n.t('store.component.buyCredit.textDownloadContract')}
                  </Text>
                </Link>
              </View>
            </View>
          )}
          <View bgGray flex-1 paddingH-15 >
            <DivSpace height-30 />
            <Text medium bgBlue02 h12>
              {i18n.t('store.component.textHighlights')}
            </Text>
            <DivSpace height-10 />
            <Text h9 disabled>
              Phasellus facilisis neque sit amet enim convallis venenatis
              Curabitur commodo augue in eros molestie rhoncus
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              Praesent eu facilisis lorem
              Nulla sed elit quis leo aliquet ornare
            </Text>
            <DivSpace height-10 />
            <Text medium bgBlue02 h12>
              {i18n.t('store.component.textRedeemInstructions')}
            </Text>
            <DivSpace height-10 />
            <Text h9 disabled>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget metus sem. Phasellus aliquam urna in nunc molestie, congue fringilla mi bibendum. Curabitur in sapien molestie eros dapibus maximus. Aenean quis nisl eget mi dapibus gravida. Nam placerat, velit non consectetur lobortis, nibh ex dictum ipsum, eu accumsan tellus eros ac mauris. Quisque at facilisis massa. Nulla vestibulum justo id bibendum ullamcorper. Curabitur fringilla tristique dui in tempus. 
            </Text>
            <DivSpace height-10 />
            <TouchableOpacity onPress={handlePress}>
              <View row marginV-15 >
                <View flex-1 >
                  <Text h12 medium bgBlue02>{i18n.t('store.component.textTermsAndConditions')}</Text>
                </View>
                <ImageComponent bgBlue02 source={arrowDown} width={15} height={15} />
              </View>
              {isOpen && (
                <View>
                  <Text h9 disabled>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget metus sem.</Text>
                  <DivSpace height-8 />
                </View>
              )}
            </TouchableOpacity>
            <View bgGray height-1 />
            <TouchableOpacity  onPress={handlePressTwo} >
              <View row marginV-15>
                <View flex-1 >
                  <Text h12 medium bgBlue02>{i18n.t('store.component.textAboutTheProvider')}</Text>
                </View>
                <ImageComponent bgBlue02 source={arrowDown} width={15} height={15} />
              </View>
              {isOpenTwo && (
                <View>
                  <Text h9 disabled>Lorem two ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget metus sem.</Text>
                  <DivSpace height-8 />
                </View>
              )}
            </TouchableOpacity>
            <View bgGray height-1 />
            <TouchableOpacity onPress={handlePressThree}>
              <View row marginV-15>
                <View flex-1 >
                  <Text h12 medium bgBlue02>{i18n.t('store.component.textAboutRomeCorner')}</Text>
                </View>
                <ImageComponent bgBlue02 source={arrowDown} width={15} height={15} />
              </View>
              {isOpenThree && (
                <View>
                  <Text h9 disabled>Madison Square Garden is located at 4 Pennsylvania Plaza in New York City and opened on February 11, 1968. MSG is one of the oldest sporting venues in New York and one of the last NBA and NHL arenas named after a corporate sponsor.</Text>
                  <DivSpace height-8 />
                </View>
              )}
            </TouchableOpacity>
            <DivSpace height-30 />
            <View centerH style={Styles.viewBtnFloating}>
              <ButtonFloating onPress={handleGoUpPress} />
            </View>
            <DivSpace height-15 />
          </View>
        </ScrollView> 
      </View>
      <Modal2faConfirmation
        visible={showModal2fa}
        onRequestClose={() => { setShowModal2fa(false) }}
        onPressOverlay={handleClose}
        navigation={navigation}
      />
    </View>
  );
};

export default GiftCardDetails;
