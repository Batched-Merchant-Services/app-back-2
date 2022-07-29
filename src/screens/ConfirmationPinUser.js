import React,{useState,useEffect} from 'react';
import { 
  View, 
  Text, 
  DivSpace,
  NavigationBar,
  ModalContainer,
  ImageComponent,
  ButtonRounded,
  SnackBar,
  Loader 
} from '@components';
import { 
  scale,
  verticalScale 
} from 'react-native-size-matters';
import { 
  scanQrCode,
  cardCancel,
  reloadCard ,
  validatePin,
  payToContacts,
  walletToAccount,
  TransferWalletToCard,
  createServicePayment,
  getBuyCrypto,
  getSellCrypto,
  sendCrypto,
  sendCryptoUsers,
  createCardVirtual,
  updateCardVirtual,
  createTRXSwap
} from '@utils/api/switch';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import LocalStorage from '@utils/localStorage';
import Ripple from 'react-native-material-ripple';
import PinView from 'react-native-pin-view';
import TouchID from 'react-native-touch-id';
import i18n from '@utils/i18n';
import Styles from './styles';
import BiometricCheck from '@assets/biometric/biometric-check.png';
import Colors from '@styles/Colors';

const optionalConfigObject = newOptions();


function newOptions() {
  return {
    title                 : i18n.t('fingerPrint.component.textConfirmFootPrint'),
    imageColor            : Colors?.textBlueDark,
    imageErrorColor       : '#ff0000',
    sensorDescription     : i18n.t('fingerPrint.component.textFingerSent'),
    sensorErrorDescription: 'Failed',
    cancelText            : i18n.t('fingerPrint.component.buttonCancel'),
    fallbackLabel         : 'Show Passcode',
    unifiedErrors         : false,
    passcodeFallback      : false
  };
}

async function payContacts(token,
  data,
  inputtedPin,
  navigation,
  next,
  setIsLoadingModal,
  setTextWarning,
  clear,
  setSnakVisible,
  setTitle
) {
  const response = await reloadCard(token, data?.data?.proxyKey, inputtedPin, data.amount, '',data?.data?.type);
  if (response.code < 400) {
    setTimeout(function () {
      navigation.navigate(next);
      setIsLoadingModal(false);
    }, 1000);
    setTextWarning(false);
  }
  else {
    closeSnackNotice(setIsLoadingModal, clear, setSnakVisible, setTitle, response);
  }
}

async function cardCancelFunction(
  token,
  data,
  inputtedPin,
  navigation,
  next,
  setIsLoadingModal,
  setTextWarning,
  clear,
  setSnakVisible,
  setTitle
) {
  const response = await cardCancel(token, data?.data?.id, inputtedPin);
  if (response.code < 400) {
    setTimeout(function () {
      navigation.navigate(next);
      setIsLoadingModal(false);
    }, 1000);
    setTextWarning(false);
  }
  else {
    closeSnackNotice(setIsLoadingModal, clear, setSnakVisible, setTitle, response);
  }
}


async function payQRCode(token,
  data,
  inputtedPin,
  navigation,
  next,
  setTextWarning,
  setIsLoadingModal,
  clear,
  setSnakVisible,
  setTitle
) {
  const response = await scanQrCode(token, data.externalId, data.amount, '', inputtedPin);
  if (response.code < 400) {
    setTimeout(function () {
      navigation.navigate(next, data, { amount: data.amount });
      setIsLoadingModal(false);
    }, 1000);
    setTextWarning(false);
  }
  else {
    closeSnackNotice(setIsLoadingModal, clear, setSnakVisible, setTitle, response);
  }
}

async function payContact(
  token,
  userData,
  data,
  inputtedPin,
  navigation,
  next,
  setIsLoadingModal,
  setTextWarning,
  clear,
  setSnakVisible,
  setTitle
) {
  const response = await payToContacts(token, userData.phoneContact, data.amount, inputtedPin, '');
  if (response.code < 400) {
    setTimeout(function () {
      navigation.navigate(next, data, { amount: data.amount });
      setIsLoadingModal(false);
    }, 1000);
    setTextWarning(false);
  }
  else {
    closeSnackNotice(setIsLoadingModal, clear, setSnakVisible, setTitle, response);
  }
}

async function transferWallet(
  token,
  data,
  inputtedPin,
  navigation,
  next,
  setIsLoadingModal,
  setTextWarning,
  clear,
  setSnakVisible,
  setTitle
) {
  const response = await walletToAccount(token, data.amount, inputtedPin);
  if (response.code < 400) {
    setTimeout(function () {
      navigation.navigate(next,{data: response.data,clabe: data.clabe,bank: data.bank });
      setIsLoadingModal(false);
    }, 1000);
    setTextWarning(false);
  }
  else {
    closeSnackNotice(setIsLoadingModal, clear, setSnakVisible, setTitle, response);
  }
}

async function changePINCard(
  token,
  data,
  inputtedPin,
  navigation,
  next,
  setIsLoadingModal,
  setTextWarning,
  clear,
  setSnakVisible,
  setTitle
) {
  const response = await validatePin(token,inputtedPin);
  if (response.code < 400) {
    setTimeout(function () {
      navigation.navigate(next,{Proxy: data? data.ProxyKey : ''});
      setIsLoadingModal(false);
    }, 1000);
    setTextWarning(false);
  }
  else {
    closeSnackNotice(setIsLoadingModal, clear, setSnakVisible, setTitle, response);
  }
}


async function changePassword(
  token,
  data,
  inputtedPin,
  navigation,
  next,
  setIsLoadingModal,
  setTextWarning,
  clear,
  setSnakVisible,
  setTitle
) {
  const response = await validatePin(token,inputtedPin);
  if (response.code < 400) {
    setTimeout(function () {
      navigation.navigate(next,{page: 'config'});
      setIsLoadingModal(false);
    }, 1000);
    setTextWarning(false);
  }
  else {
    closeSnackNotice(setIsLoadingModal, clear, setSnakVisible, setTitle, response);
  }
}

async function transactionWallet(
  token,
  data,
  inputtedPin,
  navigation,
  next,
  setIsLoadingModal,
  setTextWarning,
  clear,
  setSnakVisible,
  setTitle
) {

  const response = await TransferWalletToCard(token,data.origin,data.amount,data.destiny,data.typeTrans,inputtedPin);
  if (response.code < 400) {
    setTimeout(function () {
      navigation.navigate(next,{data: data });
      setIsLoadingModal(false);
    }, 1000);
    setTextWarning(false);
  }
  else {
    closeSnackNotice(setIsLoadingModal, clear, setSnakVisible, setTitle, response);
  }
}

async function createPaymentServices(
  token,
  data,
  inputtedPin,
  navigation,
  next,
  setIsLoadingModal,
  setTextWarning,
  clear,
  setSnakVisible,
  setTitle
) {
  const amountData = data.amountParam ? parseInt(data.amountParam):data.amountParam;
  const response = await createServicePayment(token,amountData,data.data.sku_lists[0].sku,data.data.biller_id,data.data.sku_lists[0].type_sku,data.phone,data.reference,inputtedPin);
  if (response.code < 400) {
    setTimeout(function () {
      navigation.navigate(next,{ data, date: response.data.created_at });
      setIsLoadingModal(false);
    }, 1000);
    setTextWarning(false);
  }
  else {
    closeSnackNotice(setIsLoadingModal, clear, setSnakVisible, setTitle, response);
  }
}

async function createVirtualCards(
  token,
  data,
  inputtedPin,
  navigation,
  next,
  setIsLoadingModal,
  setTextWarning,
  clear,
  setSnakVisible,
  setTitle
) {
  const amount = 0;
  const response = await createCardVirtual(token,amount,inputtedPin);
  if (response.code < 400) {
    setTimeout(function () {
      navigation.navigate(next,{ data, date: response?.data });
      setIsLoadingModal(false);
    }, 1000);
    setTextWarning(false);
  }
  else {
    closeSnackNotice(setIsLoadingModal, clear, setSnakVisible, setTitle, response);
  }
}

async function updateVirtualCard(
  token,
  data,
  inputtedPin,
  navigation,
  next,
  setIsLoadingModal,
  setTextWarning,
  clear,
  setSnakVisible,
  setTitle
) {
  const cvv = data?.CVV ;
  const cardNumber = data?.cardNumber;
  const idCard = data?.id;
  const response = await updateCardVirtual(token,cvv,cardNumber,idCard);
  if (response.code < 400) {
    setTimeout(function () {
      navigation.navigate(next,{ data, date: response?.data });
      setIsLoadingModal(false);
    }, 1000);
    setTextWarning(false);
  }
  else {
    closeSnackNotice(setIsLoadingModal, clear, setSnakVisible, setTitle, response);
  }
}

async function createSwap(
  token,
  data,
  inputtedPin,
  navigation,
  next,
  setIsLoadingModal,
  setTextWarning,
  clear,
  setSnakVisible,
  setTitle
) {
  const shortNameCrypto = data?.shortNameCrypto ;
  const totalSwap = data?.balanceConvert;
  const toCurrency = data?.currencyChange?.short_name;
  const FeeAndAmount = data?.totalSwap;
  const response = await createTRXSwap(token,shortNameCrypto,toCurrency,totalSwap,inputtedPin);
  if (response.code < 400) {
    setTimeout(function () {
      navigation.navigate(next,{data: response?.data,convert: totalSwap,amount: data?.amount,total:FeeAndAmount });
      setIsLoadingModal(false);
    }, 1000);
    setTextWarning(false);
  }
  else {
    closeSnackNotice(setIsLoadingModal, clear, setSnakVisible, setTitle, response);
  }
}

async function buyCrypto(
  token,
  data,
  inputtedPin,
  navigation,
  next,
  setIsLoadingModal,
  setTextWarning,
  clear,
  setSnakVisible,
  setTitle
) {

  const response = await getBuyCrypto(token,data?.amount?.value,data?.amountConvert,data?.shortNameCrypto,inputtedPin)
  if (response.code < 400) {
    setTimeout(function () {
      navigation.navigate(next,{data: data,dataInfo: response.data });
      setIsLoadingModal(false);
    }, 1000);
    setTextWarning(false);
  }
  else {
    closeSnackNotice(setIsLoadingModal, clear, setSnakVisible, setTitle, response);
  }
}

async function sendCryptoInfo(
  token,
  data,
  inputtedPin,
  navigation,
  next,
  setIsLoadingModal,
  setTextWarning,
  clear,
  setSnakVisible,
  setTitle
) {

  const response =  data.page === 'sendCryptoUsers'? await sendCryptoUsers(token,data.showNameCrypto,data.amountConvert || data.conversionAmount,data.addressCrypto,data.transferReference.value,inputtedPin) : await sendCrypto(token,data.showNameCrypto,data.amountConvert || data.conversionAmount,data.addressCrypto,data.transferReference.value,inputtedPin);
  if (response.code < 400) {
    setTimeout(function () {
      navigation.navigate(next, { data: response.data, dataInfo: data });
      setSnakVisible(false);
      setIsLoadingModal(false);
    }, 1000);
    setTextWarning(false);
  }
  else {
    closeSnackNotice(setIsLoadingModal, clear, setSnakVisible, setTitle, response);
  }
}


async function saleCrypto(
  token,
  data,
  inputtedPin,
  navigation,
  next,
  setIsLoadingModal,
  setTextWarning,
  clear,
  setSnakVisible,
  setTitle
) {

  const response = await getSellCrypto(token,data.infoData.id,data.amountConvert,data.infoData.typeCrypto,data.showCurrency,data.infoData.currencyUser,inputtedPin);
  if (response.code < 400) {
    setTimeout(function () {
      navigation.navigate(next,{data: data });
      setIsLoadingModal(false);
    }, 1000);
    setTextWarning(false);
  }
  else {
    closeSnackNotice(setIsLoadingModal, clear, setSnakVisible, setTitle, response);
  }
}


function closeSnackNotice(setIsLoadingModal, clear, setSnakVisible, setTitle, response) {
  setIsLoadingModal(true);
  setTimeout(function () {
    clear();
    setSnakVisible(true);
    setIsLoadingModal(false);
    setTitle(response.message);
  }, 1000);

}

const ConfirmationPinUser = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;

  const next = navigation.getParam('next');
  const data = navigation.getParam('data') || {};
  const [title, setTitle] = useState('');
  const [textWarning, setTextWarning] = useState(false);
  const [snakVisible, setSnakVisible] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [biometricDevice, setBiometricDevice] = useState('TouchID');
  const [biometricModalOpened, setBiometricModalOpened] = useState(false);
  


  useEffect(() => {
    (async () => {
      try {
        // setBiometricDevice(TouchID.isSupported(optionalConfigObject));
        // setBiometricModalOpened(true);
      } catch (e) {
        // Currently not supported
        setBiometricDevice(null);
        setBiometricModalOpened(false);
      }
    })();
  }, []);


  async function handlePressBiometricAuthorizePress() {
    try {
      await TouchID.authenticate('', optionalConfigObject);
      setBiometricModalOpened(false);
      navigation.navigate(next, data);
    } catch (e) {
      console.log('error',e);
    }
  }
  

  const onComplete=async (inputtedPin, clear) =>{
    const token = await LocalStorage.get('auth_token');
    setSnakVisible(false);
    setIsLoadingModal(true);

    if (data.page === 'contacts') {

      await payContact(token,
        userData,
        data,
        inputtedPin,
        navigation,
        next,
        setIsLoadingModal,
        setTextWarning,
        clear,
        setSnakVisible, 
        setTitle
      );

    }else if (data.page === 'QRCode') {
 
      await payQRCode(
        token,
        data,
        inputtedPin,
        navigation,
        next,
        setTextWarning,
        setIsLoadingModal,
        clear,
        setSnakVisible,
        setTitle
      );

    } else if (data.page === 'cardCancel') {

      await cardCancelFunction(
        token,
        data,
        inputtedPin,
        navigation,
        next,
        setIsLoadingModal,
        setTextWarning,
        clear,
        setSnakVisible,
        setTitle
      );

    }else if (data.page === 'topUp') {

      await payContacts(
        token,
        data, 
        inputtedPin, 
        navigation, 
        next, 
        setIsLoadingModal, 
        setTextWarning, 
        clear, 
        setSnakVisible, 
        setTitle
      );

    }else if (data.page === 'transferWallet') {

      await transferWallet(
        token,
        data, 
        inputtedPin, 
        navigation, 
        next, 
        setIsLoadingModal, 
        setTextWarning, 
        clear, 
        setSnakVisible, 
        setTitle
      ); 
    }else if (data.page === 'config') {

      await changePassword(
        token,
        data, 
        inputtedPin, 
        navigation, 
        next, 
        setIsLoadingModal, 
        setTextWarning, 
        clear, 
        setSnakVisible, 
        setTitle
      ); 
    }else if (data.page === 'UpdatePINCard') {

      await changePINCard(
        token,
        data, 
        inputtedPin, 
        navigation, 
        next, 
        setIsLoadingModal, 
        setTextWarning, 
        clear, 
        setSnakVisible, 
        setTitle
      ); 
    }else if (data.page === 'transferBalance') {

      await transactionWallet(
        token,
        data, 
        inputtedPin, 
        navigation, 
        next, 
        setIsLoadingModal, 
        setTextWarning, 
        clear, 
        setSnakVisible, 
        setTitle
      ); 
      
    }else if (data.page === 'buyCrypto') {

      await buyCrypto(
        token,
        data, 
        inputtedPin, 
        navigation, 
        next, 
        setIsLoadingModal, 
        setTextWarning, 
        clear, 
        setSnakVisible, 
        setTitle
      ); 

    }else if (data.page === 'saleCrypto') {

      await saleCrypto(
        token,
        data, 
        inputtedPin, 
        navigation, 
        next, 
        setIsLoadingModal, 
        setTextWarning, 
        clear, 
        setSnakVisible, 
        setTitle
      ); 
      
    }else if (data.page === 'sendOrTransferCrypto') {

      await sendCryptoInfo(
        token,
        data, 
        inputtedPin, 
        navigation, 
        next, 
        setIsLoadingModal, 
        setTextWarning, 
        clear, 
        setSnakVisible, 
        setTitle
      );


    }else if (data.page === 'sendCryptoUsers') {

      await sendCryptoInfo(
        token,
        data, 
        inputtedPin, 
        navigation, 
        next, 
        setIsLoadingModal, 
        setTextWarning, 
        clear, 
        setSnakVisible, 
        setTitle
      );


    }else if (data.page === 'payServices') {
      await createPaymentServices(
        token,
        data, 
        inputtedPin, 
        navigation, 
        next, 
        setIsLoadingModal, 
        setTextWarning, 
        clear, 
        setSnakVisible, 
        setTitle
      );

    }else if (data.page === 'createVirtualCard') {
      await createVirtualCards(
        token,
        data, 
        inputtedPin, 
        navigation, 
        next, 
        setIsLoadingModal, 
        setTextWarning, 
        clear, 
        setSnakVisible, 
        setTitle
      );
      
    }else if (data.page === 'updateVirtualCard') {
      await updateVirtualCard(
        token,
        data, 
        inputtedPin, 
        navigation, 
        next, 
        setIsLoadingModal, 
        setTextWarning, 
        clear, 
        setSnakVisible, 
        setTitle
      );
    }else if (data.page === 'Swap') {
      await createSwap(
        token,
        data, 
        inputtedPin, 
        navigation, 
        next, 
        setIsLoadingModal, 
        setTextWarning, 
        clear, 
        setSnakVisible, 
        setTitle
      );
    }else{
      setSnakVisible(false);
      setIsLoadingModal(false);
      navigation.navigate(next,data);
    }
  };

  function handleUsePatternPress() {
    setBiometricModalOpened(false);
  }

  const handleCloseNotif = () => {
    setSnakVisible(false);
    setActionAnimated(true);
  };

  return (
    <View flex-1 textBlueDark>
    
      <ModalContainer
        animationType="slide"
        transparent={true}
        showModal={biometricModalOpened}
      >
        <View flex-1 centerV centerH>
          <View width-314 paddingV-39 white style={Styles.biometricModalContainer}>
            <View centerH>
              <DivSpace height-6 />
              <Ripple onPress={handlePressBiometricAuthorizePress}>
                <View centerH column>
                  <Text h16 regular textBlueDark>
                    {i18n.t(
                      biometricDevice === 'FaceID'
                        ? `biometric.component.confirmWithFaceID`
                        : `biometric.component.confirmWithTouchID`
                    )}
                  </Text>
                  <DivSpace height-36 />
                  <ImageComponent
                    bgBlue07
                    source={BiometricCheck}
                    width={scale(131)}
                    height={scale(126)}
                  />
                </View>
              </Ripple>
              <DivSpace height-55 />
              <ButtonRounded darkBlue onPress={handleUsePatternPress}>
                <Text h10 semibold>
                  {i18n.t(`biometric.component.usePattern`)}
                </Text>
              </ButtonRounded>
            </View>
          </View>
        </View>
      </ModalContainer>
      <View flex-1 textBlueDark>
        <DivSpace height-30 />
        <NavigationBar
          body={data.page ==='config' ?i18n.t('AppNewPin.component.AppConfirmationPin.titleAccessWithYourPIN'): i18n.t('AppNewPin.component.AppConfirmationPin.title')}
          onBack={() => navigation.goBack()}
          Style={[Styles.buttonBack,{  backgroundColor: brandTheme.textBlue01??Colors?.textBlue01 }]}
          textStyle={[Styles.textTitle,{color: brandTheme.white??Colors?.white}]}
        />
        <View paddingH-55>
          <DivSpace height-20 />
          <Text h12 textGray regular center>{data.page ==='config' ?i18n.t('AppNewPin.component.AppConfirmationPin.textForSecurityWeRequest'):i18n.t('AppNewPin.component.textYouWillUseIt')}</Text>
          <DivSpace height-10 />
          <Text h12 white regular center>{i18n.t('AppNewPin.component.textSixDigits')}:</Text>
        </View>
        <DivSpace height-15 />
        { textWarning?<Text h10 red bold center>{i18n.t('AppNewPin.component.AppConfirmationPin.textWrongPin')}</Text>: null }
        { textWarning?<DivSpace height-15 />: null }
        <PinView
          pinLength={6}
          buttonTextColor={brandTheme.textBlue01??Colors?.textBlue01}
          buttonBgColor={brandTheme.bgOrange02??Colors?.bgOrange02}
          inputBgColor={brandTheme.white??Colors?.white}
          inputBgOpacity={0.5}
          inputActiveBgColor={brandTheme.textBlue01??Colors?.textBlue01}
          onComplete={onComplete}
          inputViewStyle={{width: verticalScale(25), height: verticalScale(25)}}
        />
      </View>
      <SnackBar
        message={title}
        isVisible={snakVisible}
        onClose={handleCloseNotif}
        animationAction={actionAnimated}
      />
      {isLoadingModal &&(
        <Loader 
          isOpen={true}
          navigation={navigation} />)}
    </View>
  );
  
};

export default withNavigationFocus(ConfirmationPinUser);







