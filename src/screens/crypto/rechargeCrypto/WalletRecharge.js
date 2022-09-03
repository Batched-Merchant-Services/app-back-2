import React,{useState,useEffect} from 'react';
import i18n from '@utils/i18n';
import { ScrollView,Clipboard,TouchableOpacity,KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { scale, verticalScale } from 'react-native-size-matters';
import { Bubbles } from 'react-native-loader';
import {
  Text,
  View,
  Link,
  QrCode,
  Loader,
  DivSpace,
  SnackBar,
  ImageComponent,
  NavigationBar,
  ModalVerifyStatus,
  ButtonRounded,
  AnimateLabelInput
} from '@components';
import { convertImage } from '@utils/formatters';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { useSelector} from 'react-redux';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { NavigationEvents } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import * as Animatable from 'react-native-animatable';
import Styles from './styles';
import transactionVoucher from '@assets/icons/TransactionVoucher.png';
import LocalStorage from '@utils/localStorage';
import { liquidCrypto,getAddress,verifyToken } from '@utils/api/switch';
import Colors from '@styles/Colors';


const WalletRecharge = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const [ showModal,setShowModal ] = useState(false);
  const [showNameCrypto]=useState(userData?userData.nameCrypto:'');
  const [shortNameCrypto]=useState(userData?userData.typeCrypto:'');
  const [currencyUser]=useState(userData?userData.currencyUser:'');
  const [iconCrypto]=useState(userData?userData.iconCrypto:'');
  const [showCurrencyId]=useState(userData?userData.currencyId:'');
  const [title, setTitle] = useState('');
  const [snakVisible, setSnakVisible] = useState(false);
  const [address,setAddress] = useState('');
  const [actionAnimated, setActionAnimated] = useState(false);
  const amount = useValidatedInput('amount', '');
  const idTransaction = useValidatedInput('idTransaction', '');
  const [buttonNext, setButtonNext] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [showPhotoBack, setshowPhotoBack ] = useState('');
  const [sendPhotoBack, setSendPhotoBack ] = useState('');
  const [aceptCardBack] = useState(false);
  const [warningBackCard] = useState(false);

  
  const options = {
    title               : 'Capture Photo',
    cancelButtonTitle   : 'Cancel',
    takePhotoButtonTitle: 'Capture Photo',
    storageOptions      : {
      skipBackup: true,
      path      : 'images',
    },
  };
 
  useEffect(() => {
    getUserInfo();
    getLisCrypto();
    
  }, []);

  async function getUserInfo() {
    const token = await LocalStorage.get('auth_token');
    const verifyResponse = await verifyToken(token);
    if (verifyResponse.code < 400) {
      const kycStatus = verifyResponse.data?verifyResponse.data.user.account.kyc.status:'';
      setShowModal(kycStatus === 5 || kycStatus === '5'? false: true);
    }else{
      setShowModal(true);
    } 
  }

  async function getLisCrypto() {
    const token = await LocalStorage.get('auth_token');
    const response = await getAddress(token,shortNameCrypto);
    if (response.code < 400) {
      setAddress(response.data? response.data.address: '');
    } else{
      setAddress(response.message);
    }
  }

  const handleCopy = () => {
    Clipboard.setString(address);
    setSnakVisible(true);
    setTitle(i18n.t('generics.NotificationCopiedText'));
  };
 
  const handleReturn = async() => {
    setIsLoadingModal(true);
    const token = await LocalStorage.get('auth_token');
    const response = await liquidCrypto(token,amount.value,idTransaction.value,sendPhotoBack,showCurrencyId,iconCrypto,showNameCrypto,shortNameCrypto,address);
    if (response.code < 400) {
      setTimeout(function () {
        navigation.navigate('RechargeConfirmation');
        setIsLoadingModal(false);
      }, 1000);
    } else{
      closeSnackNotice();
    }

    function closeSnackNotice() {
      setIsLoadingModal(true);
      setTimeout(function () {
        setSnakVisible(true);
        setButtonNext(true);
        setIsLoadingModal(false);
        setTitle(response.message);
      }, 1000);
    }
    
  };

  const isValid = isFormValid(amount,idTransaction);

  const handleChoosePhotoBack = () => {
    photoBack(setSendPhotoBack, setshowPhotoBack);
  };


  function photoBack(setSendPhotoBack, setshowPhotoBack) {
    ImagePicker.showImagePicker(options, async(response) => {
      const { error, uri,data } = response;
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (error) {
        console.log('ImagePicker Error: ', error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        const source = 'data:image/jpeg;base64,' + data;
        const resultBase = await convertImage(source);
        setSendPhotoBack(resultBase);
        setshowPhotoBack(uri);
      }
    });
  }
 
  const handlePressNext = () => {
    setShowModal(false);
    navigation.navigate('MyProfile');
  };

  const handleCloseNotif = () => {
    setSnakVisible(false);
    setButtonNext(false);
    setActionAnimated(true);
  };
  return (
    <SignUpWrapper forceInset={{top: 'always'}}>
     <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : ""}
        style={{ flex: 1 }}
      >
      <NavigationBar
        onBack={() => navigation.goBack()}
        body={i18n.t('CryptoBalance.component.rechargeCrypto.titleBitcoinRechargeToWallet')}
        onClose={null}
      />
      <DivSpace height-20 />
      <ScrollView>
        <SafeAreaView >
          <View marginH-20>
            <View flex-1 height-190 paddingH-10 centerH centerV textBlue01 style={{ borderRadius: 10}}>
              <ImageComponent source={{uri: iconCrypto}} width={35} height={35} />
              <DivSpace height-10 />
              <Text white h13 center>{i18n.t('CryptoBalance.component.rechargeCrypto.textTopUpYourWallet')}{' '}<Text semibold white>{showNameCrypto}</Text></Text>
              <DivSpace height-10 />
              <Text white h11 center>{i18n.t('CryptoBalance.component.rechargeCrypto.textFromYourWalletWith')} {' '}({shortNameCrypto}){' '}{i18n.t('CryptoBalance.component.rechargeCrypto.textTransfersTheFundsTo')}{' '}<Text semibold white>{i18n.t('CryptoBalance.component.rechargeCrypto.textAddress')}</Text>{' '}{i18n.t('CryptoBalance.component.rechargeCrypto.textOrScanTheQRCode')}</Text>
              <DivSpace height-10 />
              <Text bgGray h10 center>{i18n.t('CryptoBalance.component.rechargeCrypto.textYouCanGenerateANew')}</Text>
            </View>
            <DivSpace height-20 />
            {address ?
              <View flex-1 white paddingH-8 left height-110 bgBlue06 style={{ borderRadius: 8}}>
                <DivSpace height-10 />
                <Text textGray h11>{i18n.t('CryptoBalance.component.rechargeCrypto.textAddressAddress')}</Text>
                <DivSpace height-5 />
                <Text h14 white>{address}</Text>
                <DivSpace height-10 />
                <Link onPress={handleCopy} linkStyle = {{color: brandTheme?.bgGray??Colors.bgGray }}>{i18n.t('CryptoBalance.component.rechargeCrypto.textTapTheBoxToCopy')}</Link>
              </View>
              :
              <View height-30 centerH centerV >
                <Bubbles size={12} color={brandTheme?.bgOrange02??Colors?.bgOrange02}  />
              </View>
            }
           
            <DivSpace height-20 />
            <View  centerH centerV style={{borderRadius: 9,backgroundColor: 'white' }}>
              <QrCode id={address} name={address}  size={190}/>
            </View>
      
            <DivSpace height-20 />
            <AnimateLabelInput
              {...amount}
              label={i18n.t('CryptoBalance.component.rechargeCrypto.textTransactionAmountIn') +' '+currencyUser}
              keyboardType={'default'}
              returnKeyType={'done'}
              autoCapitalize={'none'}
            />
            <DivSpace height-10 />
            <AnimateLabelInput
              {...idTransaction}
              label={i18n.t('CryptoBalance.component.rechargeCrypto.textTransactionID')}
              keyboardType={'default'}
              returnKeyType={'done'}
              autoCapitalize={'none'}
            />
            <DivSpace height-10 />
            <Text bgGray h11>{i18n.t('CryptoBalance.component.rechargeCrypto.textUploadOne')}{' '}<Text semibold bgGray>{i18n.t('CryptoBalance.component.rechargeCrypto.textScreenShowingYour')}</Text>{' '}{i18n.t('CryptoBalance.component.rechargeCrypto.textFromYourPhoneOrComputer')}</Text>
            <DivSpace height-15 />

            { showPhotoBack === null || showPhotoBack === ''?
              <TouchableOpacity onPress={handleChoosePhotoBack}>
                <View flex-1 centerH bottom height-190 textBlue01 style={Styles.containerId}>
                  <Animatable.View animation="fadeIn" delay={100} style={{marginTop:30}}>
                    <ImageComponent
                      source={transactionVoucher}
                      width={scale(128)}
                      height={verticalScale(186)}
                    />
                  </Animatable.View>
                </View>
                <View  centerH centerV height-20 textBlueDark style={Styles.containerBottomId}>
                  <Text h10 white semibold>
                    {i18n.t('CryptoBalance.component.rechargeCrypto.textScreenshotOfTheTransaction')}
                  </Text>
                </View>
              </TouchableOpacity>
              :
              <View>
                <View style={warningBackCard ? [Styles.warningBorder,{borderColor: brandTheme?.orange??Colors.orange}] : aceptCardBack ? [Styles.aceptBorder,{borderColor: brandTheme?.green??Colors.green}]: null}>
                  <Animatable.View animation="fadeIn" delay={100} style={{  alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={handleChoosePhotoBack}>
                      <View centerH centerV height-190 textBlue01 style={Styles.containerValidateId}>
                        <Animatable.View animation="zoomIn" delay={200} style={{ alignItems: 'center', justifyContent: 'center' }}>
                          <ImageComponent
                            source={{uri: showPhotoBack}}
                            width={scale(310)}
                            height={verticalScale(146)}
                          />
                        </Animatable.View>
                      </View>
                      <View centerH centerV height-20 textBlueDark style={Styles.containerBottom}>
                        <Text h10 white semibold>
                          {i18n.t('CryptoBalance.component.rechargeCrypto.textScreenshotOfTheTransaction')} 
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </Animatable.View>
                </View>
              </View>
            }
            <DivSpace height-20 />
            <View flex-1 centerH>
              <ButtonRounded
                size= 'sm'
                disabled={!isValid && !buttonNext ? true: buttonNext}
                onPress={handleReturn}
              > 
                <Text h10 bold>
                  {i18n.t('CryptoBalance.component.rechargeCrypto.buttonVerifyTransaction')}
                </Text>
              </ButtonRounded>
            </View>
          </View>
          <DivSpace height-20 />
        </SafeAreaView>
      </ScrollView>
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
      {showModal &&(
        <ModalVerifyStatus isOpen={true} navigation={navigation} onClose={handlePressNext}/>)}
      <NavigationEvents
        onWillFocus={payload => {
          getUserInfo(payload);
          getLisCrypto(payload); 
        }}
      />
      </KeyboardAvoidingView>
    </SignUpWrapper>
  );
};

export default WalletRecharge;
