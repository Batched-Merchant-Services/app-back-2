import React,{useState,useEffect} from 'react';
import i18n from '@utils/i18n';
import { useSelector} from 'react-redux';
import { ScrollView,KeyboardAvoidingView, Platform  } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { NavigationEvents } from 'react-navigation';
import { useValidatedInput,isFormValid } from '@hooks/validation-hooks';
import { getCryptoFess,conversionCurrency } from '@utils/api/switch';
import { scale } from 'react-native-size-matters';
import Styles from '@screens/crypto/styles';

import LocalStorage from '@utils/localStorage';
import {
  Text,
  View,
  Loader,
  DivSpace,
  ContainerCrypto,
  SnackBar,
  ResizeImageAvatar,
  NavigationBar,
  ButtonRounded,
  AnimateLabelInput
} from '@components';

import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import  AmountCrypto  from '@screens/crypto/components/AmountCrypto';
import CircleAvatar from '@screens/nationalPayments/components/CircleAvatar';



const CryptoTransferUsers = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const codeQR = navigation.getParam('data');
  const infoUser = navigation.getParam('info');
  const [amountConvert,setAmountConvert] = useState('');
  const [currentCurrency,setCurrentCurrency] = useState('');
  const [balanceConvert,setBalanceConvert]=useState('');
  const [showNameCrypto]=useState(userData?userData.nameCrypto:'');
  const [imageUser]=useState('');
  const [idAddress, setIDAddress] = useState('');
  const [fees,setFees ] = useState('');
  const [showInputQRCode,setShowInputQRCode]=useState(codeQR?true:false);
  const [shortNameCrypto]=useState(userData?userData.typeCrypto:'');
  const [currencyUser]=useState(userData?userData.currencyUser:'');
  const [iconCrypto]=useState(userData?userData.iconCrypto:'');
  const [balanceCrypto]=useState(userData?userData.balanceCrypto:'');
  const [showCurrency,setShowCurrency] = useState('');
  //snack notice
  const [title, setTitle] = useState('');
  const [buttonNext, setButtonNext] = useState(false);
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  //validate Input
  const amountToTransfer = useValidatedInput('amountToTransfer', '');
  const transferReference = useValidatedInput('reference', '');
  const equivalentAmount = useValidatedInput('equivalentAmount', '');
  const address = useValidatedInput('address', codeQR);
  const userToTransfer = useValidatedInput('userToTransfer', '', {
    changeHandlerSelect: 'onSelect'
  });

  const validation = amountConvert === ''? true: false;
  const isValid = isFormValid(transferReference);

  useEffect(() => {
    getBalanceConvert();
  },[]);

  
  async function getBalanceConvert() {
    setIsLoadingModal(true);
    const token = await LocalStorage.get('auth_token');
    const responseBTC = await conversionCurrency(token,shortNameCrypto,'USD',balanceCrypto);
    const responseFees = await getCryptoFess(token);
    if (responseBTC.code || responseFees.code < 400) {
      setIsLoadingModal(false);
      setFees(responseFees?.data?.fee_total);
      setBalanceConvert(responseBTC?.data?.conversion?.toString());
    }else{
      closeSnackNotice(responseBTC.code || responseFees.code);
    }
  }

  function getAddress() {
    setShowInputQRCode(codeQR?true:false);

  }
  function handleAddNewAddress() {
    navigation.navigate('AddNewAddressCrypto');
  }
  
  function handleScanQRAddress() {
    navigation.navigate('ScanQRAddress');
  }
		
  async function handlePay() {
    const addressCrypto = codeQR?codeQR:infoUser?.id;
    const token = await LocalStorage.get('auth_token');
    if (currentCurrency === 'USD') {
      setIsLoadingModal(true);
      const responseBTC = await conversionCurrency(token,'USD',shortNameCrypto,amountConvert);
      if (responseBTC.code < 400) {
        const conversionAmount = responseBTC.data?.conversion?.toString();
        setTimeout(function () {
          navigation.navigate('ConfirmationPinUser', {
            data: {page: 'sendCryptoUsers',showNameCrypto,conversionAmount,addressCrypto,transferReference},
            next: 'ConfirmationCrypto'
          });
          setIsLoadingModal(false);
        }, 1000);
      }else{
        closeSnackNotice(responseBTC);
      }
    }else{
      navigation.navigate('ConfirmationPinUser', {
        data: {page: 'sendCryptoUsers',showNameCrypto,amountConvert,addressCrypto,transferReference},
        next: 'ConfirmationCrypto'
      });
    }
    
  }


  function onFill(code) {
    setIDAddress(code.id);
  }
  function onFillAmount(code) {
    setAmountConvert(code);
  }


  async function onCurrency(code){
    setIsLoadingModal(true);
    setCurrentCurrency(code);
    const token = await LocalStorage.get('auth_token');
    const response = await conversionCurrency(token,code === 'USD'?shortNameCrypto:'USD',code === shortNameCrypto?shortNameCrypto:'USD',amountConvert);
    if (response.code < 400) {
      setIsLoadingModal(false);
      setAmountConvert(response.data?.conversion?.toString());
    }else{
      setAmountConvert(0);
      closeSnackNotice(response);
    }
  };

  const handleCloseNotif = () => {
    setSnakVisible(false);
    setActionAnimated(true);
  };


  function closeSnackNotice(response) {
    setIsLoadingModal(true);
    setTimeout(function () {
      setSnakVisible(true);
      setButtonNext(true);
      setIsLoadingModal(false);
      setTitle(response.message);
    }, 1000);
  }

  return (
    <SignUpWrapper forceInset={{top: 'always'}}>
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : ""}
        style={{ flex: 1 }}
      >
      <NavigationBar
        onBack={() => navigation.goBack()}
        body={i18n.t('CryptoBalance.component.CryptoSendBetweenUser.textCryptoTransfer')}
        onClose={null}
      />
      <DivSpace height-20 />
      <ScrollView >
        <SafeAreaView >
          <View marginH-20>
            <View flex-1 padding-15 centerH centerV textBlue01 style={{ borderRadius: 10}}>
            
              {infoUser.avatarImage === '' ? (
                <CircleAvatar size={70}>
                  <Text h20 bold white>{infoUser.alias}</Text>
                </CircleAvatar>
              ):(
                <ResizeImageAvatar
                  source={{ uri: infoUser.avatarImage }}
                  width={scale(75)} 
                  height={scale(75)}
                />
              )}
              
              <DivSpace height-10 />
              <Text white h16 semibold>{infoUser.firstName}{' '}{infoUser.lastName}</Text>
              <DivSpace height-10 />
              <Text white h10>{infoUser.phoneNUmber}</Text>
              <DivSpace height-10 />
              <Text white h11>{i18n.t('CryptoBalance.component.CryptoSendBetweenUser.textWalletBitcoin')}:</Text>
              <DivSpace height-10 />
              <Text white h11>{infoUser.id}</Text>
            </View>
            <DivSpace height-15 />
            <ContainerCrypto >
              <View centerH centerV padding-10>
                <Text h11 orange>{i18n.t('CryptoBalance.component.titleMyBalance')}:</Text>
                <View flex-1 row centerH centerV >
                  <View flex-1>
                    <Text h13 white center>{balanceCrypto}{' '}<Text bgGray>{shortNameCrypto}</Text>{' '}</Text>
                  </View>
                  <View width-21 height-2 white></View>
                  <View flex-1>
                    <Text h13 white center>{' '}{balanceConvert}{' '}<Text bgGray>USD</Text></Text>
                  </View>
                  
                </View>
              </View>
            </ContainerCrypto>
            <DivSpace height-15 />
            <View padding-15 textBlue01 style={{borderRadius: 10}}>
              {/* <Text  center white h11>{i18n.t('CryptoBalance.component.CryptoSendBetweenUser.textEnterTheAmountYou')}</Text>
              <DivSpace height-15 />
              <View>
                <AnimateLabelInput
                  {...amountToTransfer}
                  label={i18n.t('CryptoBalance.component.sendCrypto.textAmountToTransfer')}
                  keyboardType={'default'}
                  autoCapitalize={'none'}
                  onChangeText={handleConvert}
                />
                <Text style={{position: 'absolute',right: 5,top: 20}} orange h16 semibold>USD</Text>
              </View>
              <DivSpace height-10/>
              <View>
                <AnimateLabelInput
                  {...equivalentAmount}
                  label={i18n.t('CryptoBalance.component.sendCrypto.textEquivalentAmount')}
                  keyboardType={'default'}
                  autoCapitalize={'none'}
                />
                <Text style={{position: 'absolute',right: 5,top: 20}} orange h16 semibold>BTC</Text>
              </View>
              
              <DivSpace height-10 />
              <Text h11 textGray center semibold>{i18n.t('CryptoBalance.component.sendCrypto.textACommissionIsDeducted')}</Text>  
              <DivSpace height-10 />
              <Text h10 bgGray center>{i18n.t('CryptoBalance.component.sendCrypto.textCommissionForTransaction')}</Text>  
              <DivSpace height-5 />
              <Text h10 bgGray semibold center>0.5% {i18n.t('CryptoBalance.component.sendCrypto.textTransaction')}</Text>  
              <DivSpace height-10/>
              <AnimateLabelInput
                {...transferReference}
                label={i18n.t('CryptoBalance.component.sendCrypto.inputTransferReference')}
                keyboardType={'default'}
                autoCapitalize={'none'}
              />
              <DivSpace height-15 />
              <View flex-1 centerH>
                <ButtonRounded
                  onPress={handlePay}
                  //disabled={amountConvert?false:true}
                  size='sm'
                >
                  <Text white h10 semibold>
                    {i18n.t('CryptoBalance.component.sendCrypto.buttonTransfer')}
                  </Text>
                </ButtonRounded>
              </View> */}
              <AmountCrypto addAmount={amountConvert}  onChange={(code) => onFillAmount(code)} onCurrency={(code) => onCurrency(code)}/>
              <DivSpace height-10 />
              <Text h11 textGray center semibold>{i18n.t('CryptoBalance.component.sendCrypto.textACommissionIsDeducted')}</Text>  
              <DivSpace height-10 />
              <Text h10 bgGray center>{i18n.t('CryptoBalance.component.sendCrypto.textCommissionForTransaction')}</Text>  
              <DivSpace height-5 />
              <Text h10 bgGray semibold center>{fees}% {i18n.t('CryptoBalance.component.sendCrypto.textTransaction')}</Text>  
              <DivSpace height-10/>
              <AnimateLabelInput
                {...transferReference}
                label={i18n.t('CryptoBalance.component.sendCrypto.inputTransferReference')}
                keyboardType={'default'}
                autoCapitalize={'none'}
              />
              <DivSpace height-15 />
              <View flex-1 centerH>
                <ButtonRounded
                  onPress={handlePay}
                  disabled={!isValid || (validation)}
                  size='sm'
                >
                  <Text h10 semibold>
                    {i18n.t('CryptoBalance.component.sendCrypto.buttonTransfer')}
                  </Text>
                </ButtonRounded>
              </View>
              <DivSpace height-15/>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
      {isLoadingModal &&(
        <Loader 
          isOpen={true}
          navigation={navigation} />)}
      <SnackBar
        message={title}
        isVisible={snakVisible}
        onClose={handleCloseNotif}
        animationAction={actionAnimated}
      />
      <NavigationEvents
        onWillFocus={payload => {
          getAddress(payload);
          getBalanceConvert(payload);
        }}
      />
      </KeyboardAvoidingView>
    </SignUpWrapper>
  );
};

export default CryptoTransferUsers;
