import React, { useState, useEffect } from 'react';
import i18n from '@utils/i18n';
import { ScrollView } from 'react-native';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import {
  Text,
  View,
  Select,
  Loader,
  DivSpace,
  ContainerCrypto,
  SnackBar,
  ImageComponent,
  NavigationBar,
  ButtonRounded,
  AnimateLabelInput
} from '@components';

import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import AmountCryptoTwo from '@screens/crypto/components/AmountCryptoTwo';
import Styles from '../styles';
import { useSelector } from 'react-redux';
import { getListExchangeWallet, conversionCurrency, getFeeSendExternal } from '@utils/api/switch';
import LocalStorage from '@utils/localStorage';
import Modal2faConfirmation from '@screens/auth2fa/Modal2faConfirmation';


const SendCrypto = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const codeQR = navigation.getParam('data');
  const [amountConvert, setAmountConvert] = useState('');
  const [currentCurrency, setCurrentCurrency] = useState('');
  const [showNameCrypto] = useState(userData ? userData.nameCrypto : '');
  const [balanceConvert, setBalanceConvert] = useState('');
  const [listExchanges, setListExchanges] = useState([]);
  const [idAddress, setIDAddress] = useState('');
  const [fees, setFees] = useState('');
  const [showInputQRCode, setShowInputQRCode] = useState(codeQR ? true : false);
  const [shortNameCrypto] = useState(userData ? userData.typeCrypto : '');
  const [iconCrypto] = useState(userData ? userData.iconCrypto : '');
  const [balanceCrypto] = useState(userData ? userData.balanceCrypto : '');
  const [nameCurrency, setNameCurrency] = useState('');
  const [title, setTitle] = useState('');
  const [buttonNext, setButtonNext] = useState(false);
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [currentConvert, setCurrentConvert] = useState('');
  const [showModal2fa, setShowModal2fa] = useState(false);
  const transferReference = useValidatedInput('reference', '');
  const userToTransfer = useValidatedInput('dropdownSelect', { name: i18n.t('generics.selectOne') }, {
    changeHandlerSelect: 'onSelect'
  });
  const amount = useValidatedInput('amount', '');
  const validation = amountConvert === '' ? true : false;
  const isValid = isFormValid(amount, transferReference, userToTransfer);


  useEffect(() => {
    getListExternalWallet();
    getFee();

  }, []);

  async function getListExternalWallet() {
    setIsLoadingModal(true);
    const token = await LocalStorage.get('auth_token');
    const response = await getListExchangeWallet(token, shortNameCrypto);
    const responseBTC = await conversionCurrency(token, shortNameCrypto, 'USD', balanceCrypto);
    setBalanceConvert(responseBTC.data?.conversion?.toString());
    if (response.code < 400) {
      setListExchanges(response.data);
      setIsLoadingModal(false);
    } else {
      setListExchanges([]);
      setIsLoadingModal(false);
    }
  }

  async function getFee() {

    const token = await LocalStorage.get('auth_token');
    const response = await getFeeSendExternal(token);
    if (response.code < 400) {
      setFees(response?.data?.fee_total);
    } else {
      setFees('');
    }
  }


  function getAddress() {
    setShowInputQRCode(codeQR ? true : false);
  }

  function handleAddNewAddress() {
    navigation.navigate('AddNewAddressCrypto');
  }

  async function handlePay() {
    const addressCrypto = codeQR ? codeQR : idAddress;
    const amountCurrency = nameCurrency === 'USD' ? currentConvert : amount?.value;
    console.log('amountCurrency',amountCurrency)
    const dropDownAddress = userToTransfer?.value?.id;
    const sendAddress = addressCrypto || dropDownAddress;
    const token = await LocalStorage.get('auth_token');
    const foobar = [3, 2, 1];
    if (currentCurrency === 'USD') {
      setIsLoadingModal(true);
      const responseBTC = await conversionCurrency(token, shortNameCrypto, 'USD', amountCurrency);
      if (responseBTC.code < 400) {
        const conversionAmount = responseBTC.data?.conversion?.toString();
        if (!foobar.includes(userData?.type2fa)) {
          setShowModal2fa(true);
        } else {
          setTimeout(function () {
            navigation.navigate('Pin2faConfirmation', {
              data: { page: 'sendOrTransferCrypto', shortNameCrypto, conversionAmount, sendAddress, transferReference },
              next: 'ConfirmationCrypto'
            });

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
          data: { page: 'sendOrTransferCrypto', shortNameCrypto, amountCurrency, sendAddress, transferReference },
          next: 'ConfirmationCrypto'
        });
      }
    }
  }
  

  function onFill(code) {
    setIDAddress(code.id);
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
      <NavigationBar
        onBack={() => navigation.goBack()}
        body={i18n.t('CryptoBalance.component.sendCrypto.title')+' '+ shortNameCrypto}
        onClose={null}
      />
      <DivSpace height-20 />
      <ScrollView >
        <SafeAreaView >
          <View marginH-20>
            <View flex-1 height-130 paddingH-15 centerH centerV textBlue01 style={Styles.background}>
              <ImageComponent source={{uri: iconCrypto}} width={35} height={35} />
              <DivSpace height-10 />
              <Text white h13 center>{i18n.t('CryptoBalance.component.sendCrypto.textSend') +' '+showNameCrypto}{' '}{i18n.t('CryptoBalance.component.sendCrypto.textFromYourWallet')}</Text>
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
            <DivSpace height-15 />
            <View paddingT-10 paddingH-11 textBlue01 style={Styles.background}>
              <DivSpace height-10 />
              <Text center white h11>{i18n.t('CryptoBalance.component.sendCrypto.textShippingInformation')}</Text>
              <DivSpace height-15 />
              <Select
                {...userToTransfer}
                onFill={(code) => onFill(code)}
                label={i18n.t('CryptoBalance.component.sendCrypto.dropDownAddress')}
                options={listExchanges}
                size="sm"
              />
              <DivSpace height-5 />
              <View flex-1 centerH>
                <ButtonRounded
                  onPress={handleAddNewAddress}
                  size='lg'
                  blue
                >
                  <Text h10 semibold>
                    {i18n.t('CryptoBalance.component.sendCrypto.textNewUserAddress')}
                  </Text>
                </ButtonRounded>
              </View>
              <DivSpace height-10 />
              <Text h11 white center>{i18n.t('CryptoBalance.component.sendCrypto.textEnterTheAmount')}</Text>
              <DivSpace height-30 />
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
          getListExternalWallet(payload);
        }}
      />
      <Modal2faConfirmation
        visible={showModal2fa}
        onRequestClose={() => { setShowModal2fa(false) }}
        onPressOverlay={handleClose}
        navigation={navigation}
      />
    </SignUpWrapper>
  );
};

export default SendCrypto;
