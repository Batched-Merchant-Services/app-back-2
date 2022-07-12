import React, { useState, useEffect } from 'react';
import i18n from '@utils/i18n';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';
import {
  Text,
  View,
  Loader,
  Select,
  DivSpace,
  ContainerCrypto,
  SnackBar,
  ImageComponent,
  NavigationBar,
  ButtonRounded
} from '@components';
import rowEquals from '@assets/icons/rowEquals.png';
import AmountCrypto from '@screens/crypto/components/AmountCrypto';
import AmountCryptoTwo from '@screens/crypto/components/AmountCryptoTwo';
import LocalStorage from '@utils/localStorage';
import { conversionCurrency, getCurrencySwap } from '@utils/api/switch';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';


const HomeSwap = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const [showNameCrypto] = useState(userData ? userData.nameCrypto : '');
  const [shortNameCrypto] = useState(userData ? userData.typeCrypto : '');
  const [iconCrypto] = useState(userData ? userData.iconCrypto : '');
  const [currencyUser] = useState(userData ? userData.currencyUser : '');
  const [balanceCrypto] = useState(userData ? userData.balanceCrypto : '');
  const [showCatalog, setShowCatalog] = useState([]);
  const [amountConvert, setAmountConvert] = useState('');
  const amount = useValidatedInput('amount', '');
  const [balanceConvert, setBalanceConvert] = useState('');
  //snack notifications
  const [title, setTitle] = useState('');
  const [buttonNext, setButtonNext] = useState(false);
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState('');
  const [currentConvert, setCurrentConvert] = useState('');
  const cryptoCurrency = useValidatedInput('dropdownSelect', { name: i18n.t('generics.selectOne') }, {
    changeHandlerSelect: 'onSelect'
  });
  const isValid = isFormValid(cryptoCurrency, amount);

  // useEffect(() => {
  //   getBalanceConvert();
  // },[]);

  useEffect(() => {
    getCurrencySwapEffect();
    getBalanceConvert();
  }, []);


  async function getCurrencySwapEffect() {
    setIsLoadingModal(true);
    const token = await LocalStorage.get('auth_token');
    const responseBTC = await getCurrencySwap(token);
    if (responseBTC.code < 400) {
      setIsLoadingModal(false);
      setShowCatalog(responseBTC?.data);
    }else{
      setIsLoadingModal(false);
      errorFunction(responseBTC);
    }
  }




  async function getBalanceConvert() {
    const token = await LocalStorage.get('auth_token');
    const responseBTC = await conversionCurrency(token, shortNameCrypto, 'USD', balanceCrypto);
    if (responseBTC.code < 400) {
      setBalanceConvert(responseBTC.data?.conversion?.toString());
    }
  }


  function handlePay() {
    // navigation.navigate('BiometricConfirmation', {
    //   data: {page: 'saleCrypto',infoData, amountConvert,showCurrency},
    //   next: 'ConfirmationCrypto'
    // });
    navigation.navigate('ListInformationSwap', { amount: amount?.value, currencyChange: cryptoCurrency?.value, amountConvert: currentConvert });
  }
  function getCode(code) {
    setCurrentConvert(code);
  }

  const handleCloseNotif = () => {
    setSnakVisible(false);
    setActionAnimated(true);
  };

  async function onCurrency(code) {
    setCurrentCurrency(code);
    setIsLoadingModal(true);
    const token = await LocalStorage.get('auth_token');
    const response = await conversionCurrency(token, code === 'USD' ? shortNameCrypto : 'USD', code === shortNameCrypto ? shortNameCrypto : 'USD', amountConvert);
    if (response.code < 400) {
      setIsLoadingModal(false);
      setAmountConvert(response.data?.conversion?.toString());
    } else {
      setAmountConvert(0);
      errorFunction(response);
    }
  };


  function errorFunction(response) {
    setIsLoadingModal(true);
    setTimeout(function () {
      setSnakVisible(true);
      setButtonNext(true);
      setIsLoadingModal(false);
      setTitle(response.message);
    }, 1000);
  }

  return (
    <SignUpWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        style={{ flex: 0.96, alignItems: 'center' }}
      >
        <NavigationBar
          onBack={() => navigation.goBack()}
          body={i18n.t('CryptoBalance.component.receiveCrypto.title')}
          onClose={null}
        />
        <DivSpace height-20 />
        <ScrollView>
          <SafeAreaView>
            <View marginH-20>
              <View flex-1 height-160 paddingH-15 centerH centerV textBlue01 style={{ borderRadius: 10 }}>
                <ImageComponent source={{ uri: iconCrypto }} width={35} height={35} />
                <DivSpace height-10 />
                <Text white h13 center>{i18n.t('CryptoBalance.component.receiveCrypto.textReceiveA')}{' '}{showNameCrypto}{' '}{i18n.t('CryptoBalance.component.receiveCrypto.textPayment')}</Text>
                <DivSpace height-10 />
                <Text white h10 center>{i18n.t('CryptoBalance.component.receiveCrypto.textYouCanGenerateAddress')}</Text>
              </View>
              <DivSpace height-15 />
              <ContainerCrypto onPress={null}>
                <View centerH centerV>
                  <DivSpace height-10 />
                  <Text h11 orange>{i18n.t('CryptoBalance.component.titleMyBalance')}:</Text>
                  <View row centerH centerV >
                    <Text h12 semibold white>{balanceCrypto}{' '}<Text bgGray>{shortNameCrypto}</Text></Text>
                    <DivSpace width-10 />
                    <ImageComponent
                      white
                      source={rowEquals}
                      width={scale(30)}
                      height={verticalScale(30)}
                    />
                    <DivSpace width-10 />
                    <Text h12 semibold white>{balanceConvert}{' '}<Text bgGray>{currencyUser}</Text></Text>
                  </View>
                </View>
              </ContainerCrypto>
            </View>
            <DivSpace height-20 />
            <View paddingV-30 paddingH-20 marginH-20 textBlue01 style={{ borderRadius: 10 }}>
              <Select
                {...cryptoCurrency}
                label={i18n.t('CryptoBalance.component.Swap.textCryptocurrencyTo')}
                options={showCatalog}
                size="sm"
              />
              <DivSpace height-5 />
              <Text center white h10>{i18n.t('CryptoBalance.component.saleCrypto.textEnterTheAmount')} {showNameCrypto} {i18n.t('CryptoBalance.component.saleCrypto.textTheEquivalentInYour')}</Text>
              <DivSpace height-20 />
              <AmountCryptoTwo {...amount} onFillConvert={(code) => getCode(code)} />
              <DivSpace height-15 />
              <View marginH-50 centerH>
                <ButtonRounded
                  onPress={handlePay}
                  disabled={!isValid}
                  size='lg'
                >
                  <Text h10 semibold>
                    {i18n.t('CryptoBalance.component.saleCrypto.buttonSale')}{' '}{showNameCrypto}
                  </Text>
                </ButtonRounded>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
      <SnackBar
        message={title}
        isVisible={snakVisible}
        onClose={handleCloseNotif}
        animationAction={actionAnimated}
      />
       {isLoadingModal &&(
        <Loader 
          isOpen={true} />)}
    </SignUpWrapper>
  );
};

export default HomeSwap;
