import React, { useState, useEffect } from 'react';
import i18n from '@utils/i18n';
import { useSelector } from 'react-redux';
import { ScrollView,KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { NavigationEvents } from 'react-navigation';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { getCryptoFess, conversionCurrency } from '@utils/api/switch';
import { scale, verticalScale } from 'react-native-size-matters';
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
import AmountCrypto from '@screens/crypto/components/AmountCrypto';
import AmountCryptoTwo from '@screens/crypto/components/AmountCryptoTwo';
import CircleAvatar from '@screens/nationalPayments/components/CircleAvatar';
import Modal2faConfirmation from '@screens/auth2fa/Modal2faConfirmation';


const CryptoTransferUsers = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const codeQR = navigation.getParam('data');
  const infoUser = navigation.getParam('info');
  const [amountConvert, setAmountConvert] = useState('');
  const [currentCurrency, setCurrentCurrency] = useState('');
  const [balanceConvert, setBalanceConvert] = useState('');
  const [showNameCrypto] = useState(userData ? userData.nameCrypto : '');
  const [imageUser] = useState('');
  const [idAddress, setIDAddress] = useState('');
  const [fees, setFees] = useState('');
  const [showInputQRCode, setShowInputQRCode] = useState(codeQR ? true : false);
  const [shortNameCrypto] = useState(userData ? userData.typeCrypto : '');
  const [currencyUser] = useState(userData ? userData.currencyUser : '');
  const [iconCrypto] = useState(userData ? userData.iconCrypto : '');
  const [balanceCrypto] = useState(userData ? userData.balanceCrypto : '');
  const [showModal2fa, setShowModal2fa] = useState(false);
  const [nameCurrency, setNameCurrency] = useState('');
  const [currentConvert, setCurrentConvert] = useState('');
  const [showCurrency, setShowCurrency] = useState('');
  //snack notice
  const [title, setTitle] = useState('');
  const [buttonNext, setButtonNext] = useState(false);
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  //validate Input
  const transferReference = useValidatedInput('reference', '');
  const amount = useValidatedInput('amount', '');
  const userToTransfer = useValidatedInput('userToTransfer', '', {
    changeHandlerSelect: 'onSelect'
  });

  const validation = amountConvert === '' ? true : false;
  const isValid = isFormValid(transferReference);

  useEffect(() => {
    getBalanceConvert();
  }, []);


  async function getBalanceConvert() {
    setIsLoadingModal(true);
    const token = await LocalStorage.get('auth_token');
    const responseBTC = await conversionCurrency(token, shortNameCrypto, 'USD', balanceCrypto);
    const responseFees = await getCryptoFess(token);
    if (responseBTC.code || responseFees.code < 400) {
      setIsLoadingModal(false);
      setFees(responseFees?.data?.fee_total);
      setBalanceConvert(responseBTC?.data?.conversion?.toString());
    } else {
      closeSnackNotice(responseBTC.code || responseFees.code);
    }
  }

  function getAddress() {
    setShowInputQRCode(codeQR ? true : false);

  }


  async function handlePay() {
    console.log('handle play')
    const addressCrypto = codeQR ? codeQR : infoUser?.id;
    const amountCurrency = nameCurrency === 'USD' ? currentConvert : amount?.value;
    console.log('amountCurrency',amountCurrency)
    const token = await LocalStorage.get('auth_token');
    const foobar = [3, 2, 1];
    if (currentCurrency === 'USD') {
      setIsLoadingModal(true);
      const responseBTC = await conversionCurrency(token, 'USD', shortNameCrypto, amountConvert);
      if (responseBTC.code < 400) {
        const conversionAmount = responseBTC.data?.conversion?.toString();
      if (!foobar.includes(userData?.type2fa)) {
          setShowModal2fa(true);
        } else {
          setTimeout(function () {
            navigation.navigate('Pin2faConfirmation', {
              data: { page: 'sendCryptoUsers', shortNameCrypto, conversionAmount, addressCrypto, transferReference },
              next: 'ConfirmationCrypto'
            });
            //navigation.navigate('Pin2faConfirmation',{page: 'sendCryptoUsers',showNameCrypto,conversionAmount,addressCrypto,transferReference});   
            setIsLoadingModal(false);
          }, 1000);
        }
      } else {
        closeSnackNotice(responseBTC);
      }
    } else {
      if (!foobar.includes(userData?.type2fa)) {
        setShowModal2fa(true);
      } else {
        navigation.navigate('Pin2faConfirmation', {
          data: { page: 'sendCryptoUsers', shortNameCrypto, amountCurrency, addressCrypto, transferReference },
          next: 'ConfirmationCrypto'
        });
        //navigation.navigate('Pin2faConfirmation',{page: 'sendCryptoUsers',showNameCrypto,amountConvert,addressCrypto,transferReference});   
      }
    }

  }

  function getCode(code) {
    setCurrentConvert(code);
  }

  function getDateConvert(value) {
    setNameCurrency(value);
  }


  function getSnackUsd(data) {
    console.log('getSnackUsd', data)
    // if (data < 20) {
    //   setSnakVisible(true);
    //   setButtonNext(true);
    //   setIsLoadingModal(false);
    //   setTitle(i18n.t('CryptoBalance.component.Swap.snackNotice'));
    // } else {
    //   setButtonNext(false);
    // }
  }

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

  const handleClose = () => {
    setShowModal2fa(!showModal2fa);
  };



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
                <CircleAvatar size={verticalScale(70)}>
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
                    <Text h10 white center>{balanceCrypto}{' '}<Text bgGray>{shortNameCrypto}</Text>{' '}</Text>
                  </View>
                  <View width-21 height-2 white></View>
                  <View flex-1>
                    <Text h10 white center>{' '}{balanceConvert}{' '}<Text bgGray>USD</Text></Text>
                  </View>
                  
                </View>
              </View>
            </ContainerCrypto>
            <DivSpace height-30 />
            <View padding-15 textBlue01 style={{borderRadius: 10}}>
              <DivSpace height-15 />
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
              <AmountCryptoTwo {...amount} onFillConvert={(data) => getSnackUsd(data)} numberConvert={(code) => getCode(code)} convertData={(value) => getDateConvert(value)}/>
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
                returnKeyType={'done'}
                autoCapitalize={'none'}
              />
              <DivSpace height-15 />
              <View flex-1 centerH>
                <ButtonRounded
                  onPress={handlePay}
                  disabled={!isValid}
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
      <Modal2faConfirmation
        visible={showModal2fa}
        onRequestClose={() => { setShowModal2fa(false) }}
        onPressOverlay={handleClose}
        navigation={navigation}
      />
    </SignUpWrapper>
  );
};

export default CryptoTransferUsers;
