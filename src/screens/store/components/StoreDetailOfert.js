import React , {useState} from 'react';
import { Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import i18n from '@utils/i18n';
import { verticalScale } from 'react-native-size-matters';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import { useValidatedInput } from '@hooks/validation-hooks';
import Styles from '../styles';
import { Text,
  DivSpace,
  View,
  BoxImageCredit,
  ButtonRounded,
  ImageComponent,
  Link,
  Checkbox,
  BoxLevelBadge
} from '@components';
import { moneyFormatter } from '@utils/formatters';
import rowRight from '@assets/icons/angle-right.png';
import rowLeft from '@assets/icons/rowBack.png';
import slide from '@assets/store/slide.png';
import Colors from '@styles/Colors';
import { useSelector } from 'react-redux';
import Modal2faConfirmation from '@screens/auth2fa/Modal2faConfirmation';

const EntertainmentItems = [
  {
    descount: '25%'
  },
  {
    descount: '15%'
  }
];

const StoreDetailOfert = ({ ofert ,page, navigation}) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const [showModal2fa, setShowModal2fa] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCredit] = useState(true);
  const setChangueIndex = async (index) => { 
    setActiveSlide(index);
  };
  const setPrev = async () => { 
    this.carousel._snapToItem(activeSlide-1);
  };
  const setNext = async () => { 
    this.carousel._snapToItem(activeSlide+1);
  };

  const handelBuy = async () => { 
    var foobar = [3, 2, 1];
    if (!foobar.includes(userData?.type2fa)) {
      setShowModal2fa(true);
    } else {
      navigation.navigate('Pin2faConfirmation', {
        data: {},
        next: 'ConfirmationBuyStore'
      });
      //navigation.navigate('Pin2faConfirmation');  
    } 
  };

  const handleClose = () => {
    setShowModal2fa(!showModal2fa);
  };

  const agreeCheck = useValidatedInput('agree', true, {
    changeHandlerName: 'onChange'
  });
  
  function renderItem({ item }) {
    return (
      <ImageBackground source={slide} style={Styles.imageSlideOferts}/>
    );  
  }
  return (
    <View  style={{ height:'100%'}}>
      <View flex-1>
        <Carousel
          ref={ref => this.carousel = ref}
          loop={false}
          data={EntertainmentItems}
          renderItem={renderItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          inactiveSlideOpacity={1}
          onSnapToItem={index => setChangueIndex(index)}
        />
        <View bgGray style={Styles.containerDiscount}>
          <View width-140 height-18 style={{marginTop:-8}} >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[brandTheme?.bgOrange02??Colors.bgOrange02,brandTheme?.bgOrange02??Colors.bgOrange02 ]}
              style={[Styles.percentDiscount,{borderColor: brandTheme?.red??Colors.red}]}
            >
              <Text semibold h10 white center>25% de descuento</Text>
            </LinearGradient>
          </View>
          <Pagination
            containerStyle={{ paddingVertical: verticalScale(8)}}
            dotsLength={EntertainmentItems.length}
            activeDotIndex={activeSlide}
            dotStyle={[{ backgroundColor: brandTheme?.bgOrange02??Colors.bgOrange02}]}
            inactiveDotStyle={[{ backgroundColor: brandTheme?.bgBlue06??Colors.bgBlue06}]}
            inactiveDotOpacity={1}
            inactiveDotScale={1}
          />
        </View>
        <View flex-1 row marginH-10 centerV style={Styles.positionButtons}>
          <View flex-1>
            <TouchableOpacity
              onPress={setPrev}
              style={[Styles.controlSlide,{backgroundColor: brandTheme?.bgOrange02??Colors.bgOrange02}]}
            >
              <ImageComponent white source={rowLeft} width={15} height={15} />
            </TouchableOpacity>
          </View>
          <View flex-1 right>
            <TouchableOpacity
              onPress={setNext}
              style={[Styles.controlSlide,{backgroundColor: brandTheme?.bgOrange02??Colors.bgOrange02}]}
            >
              <ImageComponent white source={rowRight} width={15} height={15} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View flex-1>
        <View paddingH-15 bgGray style={Styles.containerDiscount}>
          <DivSpace height-15 />
          <BoxImageCredit/>
          <DivSpace height-15 />
          <Text bgBlue02 h16>
            {i18n.t('store.component.textOfferProv')}
          </Text>
          <DivSpace height-5/>
          <View row centerV>
            <View centerV height-18>
              <Text h12 textGray>{i18n.t('store.component.textExpirationDate')}{' '}<Text h12 textGray semibold>{ofert.expires}</Text></Text>
              <DivSpace height-10/>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[brandTheme?.bgBlue06??Colors.bgBlue06,brandTheme?.bgBlue07??Colors.bgBlue07]}
                style={Styles.linearOfert}
              >
                <Text semibold h10 white center>{ofert.typeOfer}</Text>
              </LinearGradient>
            </View>
            <View centerV marginT-27 style={{marginLeft:-35}}>
              {isCredit?<BoxLevelBadge level={'03'} sm />:null}
            </View>
            <DivSpace width-20/>
            <View flex-1 right>
              <Text h12 textGray>{!isCredit?i18n.t('store.component.textCashPayment'):i18n.t('store.component.buyCredit.textThreeBiweeklyPayments')}</Text>
              <DivSpace height-5/>
              <Text bgBlue02 h22>{moneyFormatter(ofert.balance)}</Text>
            </View>
          </View>
          <DivSpace height-15/>
          <Text bgBlue02 medium h10>
            {ofert.description}
          </Text>
          <DivSpace height-10/>
          {!isCredit && (
            <View  centerH>
              <Text h10 textGray center>{i18n.t('store.component.textAvailableInWallet')}</Text>
              <Text textGray h10 semibold center>{moneyFormatter(ofert.balance)}</Text>
              <DivSpace height-20 />
              <ButtonRounded size='lg' onPress={handelBuy}>
                <Text h10 semibold>
                  {i18n.t('store.component.buttonBuy')}
                </Text>
              </ButtonRounded>
            </View>
          )}
          <DivSpace height-30 />
        </View>  
        {isCredit && (
          <View paddingH-40 textBlueDark height-405 style={Styles.containerIscredit}>
            <DivSpace height-30 />
            <Text h10 white center>{i18n.t('store.component.buyCredit.titleBuy')}</Text>
            <DivSpace height-20 />
            <View row centerH centerV>
              <Checkbox {...agreeCheck} checkedValue={true} />
              <DivSpace width-10 />
              <Text h12 white>
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
        )}
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

export default StoreDetailOfert;
