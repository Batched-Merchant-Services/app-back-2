import React,{useState} from 'react';
import { TouchableOpacity, Share } from 'react-native';
import { addZeros,formatDateGMT } from '@utils/formatters';
import { scale, moderateScale,verticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import i18n from '@utils/i18n';
import {
  View,
  DivSpace,
  BoxBlue,
  ImageComponent,
  Text,
  ResizeImageAvatar,
  ButtonBackHome,
  BoxGradient,
  NavigationBar,
} from '@components';
import { moneyFormatter } from '@utils/formatters';
import imageConfirmation from '@assets/brand/imageConfirm.png';
import reloj from '@assets/icons/reloj.png';
import calendar from '@assets/icons/calendar.png';
import select from '@assets/icons/select.png';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import Styles from '@screens/nationalPayments/styles';
import CircleAvatar from '@screens/nationalPayments/components/CircleAvatar';
import Colors from '@styles/Colors';


const PayConfirmation = ({ navigation }) => {
  const page = navigation.getParam('page');
  const amount = navigation.getParam('amount');
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const brandThemeImages = userData?.Theme?.images;
  const date = new Date(); //Current Date
  const hours = new Date().getHours(); //Current Hours
  const min = new Date().getMinutes(); //Current Minutes
  const QRCode = page === 'QRCode' ||  page === 'QRCodeSearch' ? true : false;
  const [currencyUser]=useState(userData?userData.currencyUser:'');
  const fullNameContacts = userData.givenNameContact? userData.givenNameContact: ''+' '+userData.familyNameContact? userData.familyNameContact:'';
  const itemName = userData.givenNameContact ? userData.givenNameContact.charAt(0):'';
  const itemLastName  = userData.familyNameContact ? userData.familyNameContact.charAt(0):'';
  const itemQRName = userData.nameQRScan ? userData.nameQRScan.charAt(0):'';
  const itemQRLastName  = userData.lastNameQRScan ? userData.lastNameQRScan.charAt(0):'';


  const handlePressHome = () => {
    navigation.navigate('MyWallet');
  };
  return (
    <SignUpWrapper>
      <NavigationBar
        onBack={null}
        body={i18n.t('nationalPayments.component.titleConfirmation')}
        onClose={null}
      />
      <DivSpace height-12 />
      <View centerH >
        <BoxBlue>
          <View centerH flex-1>
            <DivSpace height-8 />
            <View right marginR-30 style={{ width: '100%' }}>
              <TouchableOpacity  style={[Styles.onShare,{ backgroundColor: brandTheme?.bgBlue01??Colors.bgBlue01 }]}>
                <ImageComponent white source={select} width={scale(16)} height={scale(16)}  />
              </TouchableOpacity>
            </View>
            <DivSpace height-8 />
            <Text white h16 semibold>{page === 'QRCode' ? i18n.t('sendQRPayments.component.titlePaymentsent') :i18n.t('nationalPayments.component.textSuccessfulP')}</Text>
            <DivSpace height-15 />
            <BoxGradient >
              <ImageComponent source={brandThemeImages?.imageConfirm?brandThemeImages?.imageConfirm:imageConfirmation} width={verticalScale(60)} height={verticalScale(60)} />
            </BoxGradient>
            <DivSpace height-15 />
            <Text h10 textGray>{i18n.t('nationalPayments.component.textAmount')}</Text>
            <Text medium h32 white>{moneyFormatter(amount)}</Text>
            <Text h10 textGray>{currencyUser}</Text>
            <DivSpace height-15 />
            <View row bgBlue07 style={{width: scale(201),height: moderateScale(35),borderRadius: 5}}>
              <View flex-1 centerH centerV row>
                <ImageComponent white source={reloj} width={scale(10)} height={moderateScale(10)}  />
                <DivSpace width-3 />
                <Text h12 white>{hours+ ':' +addZeros(min)} </Text>
              </View>
              <View centerV>
                <View width-2 textBlueDark style={{ height: moderateScale(30)}}></View>
              </View>
              
              <View flex-1 centerH centerV row>
                <ImageComponent bgBlue06 source={calendar} width={scale(10)} height={moderateScale(10)}  />
                <DivSpace width-3 />
                <Text h12 white>{formatDateGMT(date)}</Text>
              </View>
            </View>
            <DivSpace height-15 />
            {!QRCode &&(
              userData.imageProfileContact === '' ? (
                <CircleAvatar size ={'75'}>
                  <Text h20 bold>{itemName}{itemLastName}</Text>
                </CircleAvatar>
              ):(

                <ResizeImageAvatar
                  source={{ uri: userData.imageProfileContact }}
                  width={scale(75)} 
                  height={moderateScale(75)}
                />
              )
            )}
            {QRCode &&(
              userData.imageUserQRScan  === '' ? (
                <CircleAvatar size = '75'>
                  <Text h20 bold white>{itemQRName}{itemQRLastName}</Text>
                </CircleAvatar>
              ):(
                <ResizeImageAvatar
                  source={{uri: userData.imageUserQRScan }}
                  width={60} 
                  height={60}
                />
              )
            )}
            <DivSpace height-15 />
            <Text H16 white semibold>{page === 'QRCode' ? userData.fullNameUserQRScan:fullNameContacts}</Text>
            <DivSpace height-5 />
            {page === 'QRCode' ? null:<Text H16 regular textGray>{userData.phoneContact? userData.phoneContact : 'No tiene numero'}</Text>}
            <DivSpace height-5 />
          </View>
          <View centerH centerV bottom>
            <ButtonBackHome onPress={handlePressHome} />
          </View>
          <DivSpace height-20 />
        </BoxBlue>
      </View>
    </SignUpWrapper>
  );
};

export default PayConfirmation;
