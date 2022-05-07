import React, { useState,useEffect } from 'react';
import { SafeAreaView } from 'react-navigation';
import { TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import { View,
  DivSpace,
  NavigationBar,
  BoxBlue,
  ImageComponent,
  ResizeImageAvatar,
  Text,
  ButtonRounded,
  SnackBar,
  AnimateLabelAmount,
} from '@components';
import { moneyFormatter } from '@utils/formatters';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addContact,deleteContacts } from '@store/ducks/user.ducks';
import Styles from '@screens/nationalPayments/styles';
import startActive from '@assets/icons/startActive.png';
import startDisable from '@assets/icons/startDisable.png';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import CircleAvatar from '@screens/nationalPayments/components/CircleAvatar';
import Colors from '@styles/Colors';


const ContactInformation = ({ navigation }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const page = navigation.getParam('page');
  const [title, setTitle] = useState('');
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const data = navigation.getParam('data');
  const phone = navigation.getParam('phone');
  const imageSearch = navigation.getParam('imageSearch');
  const nameSearch = navigation.getParam('nameSearch');
  const lastName = navigation.getParam('lastName');
  const external = navigation.getParam('codeExternal');
  const [image] = useState(imageSearch? imageSearch: '');
  const [name] = useState(nameSearch? nameSearch: '');
  const [lastname] = useState(lastName? lastName: '');
  const [selectFavs,setSelectFavs] = useState(false);
  const [currencyUser]=useState(userData?userData.currencyUser:'');
  const amount = useValidatedInput('amount', '');
  const isValid = isFormValid(amount);
  const QRCode = page === 'QRCode' ||  page === 'QRCodeSearch' ? true : false;
  const fullNameSearch = nameSearch +' '+lastName;
  const fullNameContacts = userData.givenNameContact? userData.givenNameContact: ''+' '+userData.familyNameContact? userData.familyNameContact:'';
  const itemName = userData.givenNameContact ? userData.givenNameContact.charAt(0):'';
  const itemLastName  = userData.familyNameContact ? userData.familyNameContact.charAt(0):'';
  const itemNameSearch = name ? name.charAt(0):'';
  const itemLastNameSearch  = lastname ? lastname.charAt(0):'';


  useEffect (() => {
    if (!QRCode) {
      if (data.phone) {
        setSelectFavs(true);
      } 
    } 
    
  },[]);


  async function handlePressNext() {
    navigation.navigate('ConfirmationPinUser',{
      data: {page: QRCode ? 'QRCode' : 'contacts',  amount: amount.value, externalId: external },
      next: 'PayConfirmation'
    });
  }
  const handleTouchStart =()=>{
    setSelectFavs(!selectFavs);
    
    if (selectFavs) {
      dispatch(deleteContacts({ phone}));
      setSnakVisible(true);
      setTitle(i18n.t('generics.RemovedFromFavorites'));
    } else {
      dispatch(addContact({ ...data, phone: phone }));
      setSnakVisible(true);
      setTitle(i18n.t('generics.AddedToFavorites'));
    }
  };

  const handleCloseNotif = () => {
    setSnakVisible(false);
    setActionAnimated(true);
  };

  
  return (
    <>
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView style={Styles.viewInfoCntc} forceInset={{top: 'always'}}>
        <NavigationBar
          disableExtraTop
          onBack={() => navigation.goBack()}
          body={QRCode ? i18n.t('sendQRPayments.component.title'):i18n.t('nationalPayments.component.textPaymentToContact')}
          onClose={null}
        />
        <DivSpace height-15 />
        <BoxBlue containerStyle={{ height: verticalScale(540)}}>
          <View right marginT-15 marginR-15>
            {QRCode  ? <DivSpace height-20/> : 
              <TouchableOpacity onPress={handleTouchStart}>
                <ImageComponent tintColor={selectFavs  ? brandTheme?.orange??Colors.orange : brandTheme?.bgBlue01??Colors.bgBlue01} source={selectFavs  ? startActive : startDisable} width={scale(32)} height={verticalScale(30)}/>
              </TouchableOpacity>}
          </View>
          <View centerH>
            {!QRCode &&(
              userData.imageProfileContact === '' ? (
                <CircleAvatar size = '75'>
                  <Text h20 bold>{itemName}{itemLastName}</Text>
                </CircleAvatar>
              ):(

                <ResizeImageAvatar
                  source={{ uri: userData.imageProfileContact }}
                  width={moderateScale(75)} 
                  height={moderateScale(75)}
                />
              )
            )}
            {QRCode &&(
              image === '' ? (
                <CircleAvatar size = '75'>
                  <Text h20 bold>{itemNameSearch}{itemLastNameSearch}</Text>
                </CircleAvatar>
              ):(
                <ResizeImageAvatar
                  source={{ uri: image }}
                  width={moderateScale(75)} 
                  height={moderateScale(75)}
                />
              )
            )}

          </View>
          <View centerH>
            <DivSpace height-15 />
            <Text H16 white semibold> { QRCode ? fullNameSearch : fullNameContacts }</Text>
            <DivSpace height-5 />
            {QRCode ? null:<Text H16 regular bgGray >{userData.phoneContact? userData.phoneContact : 'No tiene numero'}</Text>}
            <DivSpace height-35 />
            <Text H10 regular bgGray>{i18n.t('nationalPayments.component.textAvailablePurse')}</Text>
            <DivSpace height-5 />
            <Text H10 semibold bgGray>{moneyFormatter(userData.balanceWallet ? userData.balanceWallet: 0 )}{' '}{currencyUser}</Text>
          </View>
          <DivSpace height-40 />
          <View flex-1 marginH-65 >
            <AnimateLabelAmount
              {...amount}
              label={i18n.t('sendQRPayments.component.labelAmountPay')+':'}
              keyboardType={'numeric'}
              autoCapitalize={'none'}
            />
          </View>
          <View centerH centerV bottom>
            <ButtonRounded onPress={handlePressNext} disabled={ !isValid}>
              <Text h10 semibold>
                {i18n.t('nationalPayments.component.buttonPay')}
              </Text>
            </ButtonRounded>
          </View>
          <DivSpace height-60 />
          <Text h10 regular bgGray center>{i18n.t('sendQRPayments.component.textTransactionDoesNot')}</Text>
          <DivSpace height-15 />
        </BoxBlue>
      </SafeAreaView>
      <SnackBar
        message={title}
        isVisible={snakVisible}
        onClose={handleCloseNotif}
        animationAction={actionAnimated}
      />
    </SignUpWrapper>
    </>
  );
};

export default ContactInformation;
