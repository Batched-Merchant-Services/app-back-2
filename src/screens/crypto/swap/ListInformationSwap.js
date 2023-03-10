import React, { useState,useEffect } from 'react';
import i18n from '@utils/i18n';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';
import {
  Text,
  View,
  Loader,
  DivSpace,
  ContainerCrypto,
  SnackBar,
  NavigationBar,
  ButtonRounded
} from '@components';

import { useValidatedInput } from '@hooks/validation-hooks';
import LocalStorage from '@utils/localStorage';
import Styles from './styles';
import { conversionCurrency, getFeesSwap } from '../../../utils/api/switch';
import Modal2faConfirmation from '@screens/auth2fa/Modal2faConfirmation';

const ListInformationSwap = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const infoData =  userData ? userData :'';
  const [showNameCrypto] = useState(userData ? userData.nameCrypto : '');
  const [shortNameCrypto] = useState(userData ? userData.typeCrypto : '');
  const [currencyUser] = useState(userData ? userData.currencyUser : '');
  const [currencySwap,setCurrencySwap] = useState('');
  const [title, setTitle] = useState('');
  const [snakVisible, setSnakVisible] = useState(false);
  const [showFees, setShowFees] = useState('');
  const [actionAnimated, setActionAnimated] = useState(false);
  const [balanceConvert,setBalanceConvert]=useState(0);
  const [totalSwap,setTotalSwap]=useState(0);
  const [totalSwapUSD,setTotalSwapUSD]=useState(0);
  const [convertFee,setConvertFee]=useState(0);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [showModal2fa, setShowModal2fa] = useState(false);
  const [balanceReceiveUSD, setBalanceReceiveUSD] = useState('');
  const answer = useValidatedInput('', {name: i18n.t('generics.selectOne')}, {
    changeHandlerSelect: 'onSelect'
  });
  const amount = navigation.getParam('amount');
  const amountConvert = navigation.getParam('amountConvert');
  const nameConvert = navigation.getParam('nameConvert');
  const currencyChange = navigation.getParam('currencyChange');

  function handlePay() {
    var foobar = [3, 2, 1];
    if (!foobar.includes(userData?.type2fa)) {
      setShowModal2fa(true);
    } else {
      navigation.navigate('Pin2faConfirmation', {
        data: {page: 'Swap',shortNameCrypto,balanceConvert,currencyChange,amountConvert,totalSwap},
        next: 'ConfirmationSwap'
      });
    }
  }

  useEffect(() => {
    getCurrencyFeeSwap();
    convertChangeCurrency();
    
  },[]);

  async function getCurrencyFeeSwap() {
    setIsLoadingModal(true);
    const token = await LocalStorage.get('auth_token');
    const response = await getFeesSwap(token,shortNameCrypto);
    if (response.code < 400) {
      setIsLoadingModal(false);
      setShowFees(response?.data?.amount);
      setCurrencySwap(response?.data?.currency);
      setTotalSwapUSD(parseFloat(response?.data?.amount??0)+parseFloat(amountConvert??0));
      convertAmountSend(parseFloat(response?.data?.amount??0)+parseFloat(amountConvert??0),response?.data?.amount);
    }else{
      errorFunction(response);
    }
  }

  async function convertChangeCurrency() {

    const token = await LocalStorage.get('auth_token');
    const responseBTC = await conversionCurrency(token,nameConvert,currencyChange?.short_name,amount);
    console.log('conversion',responseBTC)
    if (responseBTC.code < 400) {
      setBalanceConvert(responseBTC.data?.conversion?.toString());
      const responseUSD = await conversionCurrency(token,currencyChange?.short_name,'USD',responseBTC.data?.conversion?.toString());
      if (responseUSD.code < 400) {
        setBalanceReceiveUSD(responseUSD.data?.conversion?.toString());
      }
    }else{
      errorFunction(responseBTC);
    }
    
  }

  async function convertAmountSend(total,fee) {
    setIsLoadingModal(true);
    const token = await LocalStorage.get('auth_token');
    const responseBTC = await conversionCurrency(token,'USD',shortNameCrypto,total);
    const responseFee = await conversionCurrency(token,'USD',shortNameCrypto,fee);
    console.log('conversion2 ',responseFee,responseBTC)
    if (responseBTC.code < 400) {
      setIsLoadingModal(false);
      setTotalSwap(parseFloat(responseBTC.data?.conversion?.toString()));
      //setTotalSwapUSD(responseBTC.data?.conversion?.toString());
    }else{
      setIsLoadingModal(false);
    }
    if (responseFee.code < 400) {
      setConvertFee(responseFee.data?.conversion?.toString());
      setIsLoadingModal(false);
    }else{
      setIsLoadingModal(false);
    }
  }

  function errorFunction(response) {
    setIsLoadingModal(true);
    setTimeout(function () {
      setSnakVisible(true);
      setIsLoadingModal(false);
      setTitle(response.message);
    }, 1000);
  }


  const handleCloseNotif = () => {
    setSnakVisible(false);
    setActionAnimated(true);
  };

  const handleClose = () => {
    setShowModal2fa(!showModal2fa);
  };

  return (
    <SignUpWrapper>
      <NavigationBar
        onBack={() => navigation.goBack()}
        body={i18n.t('CryptoBalance.component.receiveCrypto.title')}
        onClose={null}
      />
      <DivSpace height-20 />
      <ScrollView>
        <SafeAreaView>
          <View marginH-20>
            <ContainerCrypto onPress={null}>
              <View centerH centerV padding-15>
                <Text h16 orange>{i18n.t('CryptoBalance.component.Swap.buttonSwap')}</Text>
                {/* <View row centerH centerV>
                  <Text h16 white>{balanceCrypto}{' '}<Text bgGray>{shortNameCrypto}</Text></Text>
                  <DivSpace width-10 />
                  <ImageResize
                    white
                    source={rowEquals}
                    width={scale(30)}
                    height={verticalScale(30)}
                  />
                  <DivSpace width-10 />
                  <Text h16 white>{balanceConvert}{' '}<Text bgGray>{currencyUser}</Text></Text>
                </View> */}
              </View>
            </ContainerCrypto>
          </View>
          <DivSpace height-20 />
          <View paddingV-15 paddingH-10 marginH-20 textBlue01 style={{ borderRadius: 10 }}>
            <Text h10 white center>{i18n.t('CryptoBalance.component.Swap.textResume')}</Text>
            <DivSpace height-10 />
            <View padding-10 style={[Styles.borderInfo,{borderColor: Colors?.textBlueDark}]}>
              <View row  centerV>
                <Text h12 white>{i18n.t('CryptoBalance.component.Swap.textYouPay')}</Text>
                <View flex-1 right>
                  <Text h12 white>{totalSwap}{' '}{currencySwap}</Text>
                </View>
              </View>
              <View row centerH centerV>
                <View textBlueDark  height-1 flex-1/>
                <DivSpace width-20 />
                <View flex-1 right>
                  <Text h10 orange>{totalSwapUSD} USD</Text>
                </View>
              </View>
              <DivSpace height-10 />
              <View row  centerV>
                <Text h12 white>{i18n.t('CryptoBalance.component.Swap.textYouWillReceive')}</Text>
                <View flex-1 right>
                  <Text h12 white>{balanceConvert}{' '}{currencyChange?.short_name}</Text>
                </View>
              </View>
              <View row centerH centerV>
                <View textBlueDark  height-1 flex-1/>
                <DivSpace width-20 />
                <View flex-1 right>
                  <Text h10 orange>{balanceReceiveUSD} USD</Text>
                </View>
              </View>
              <DivSpace height-10 />
              <View row  centerV>
                <Text h12 white>{i18n.t('CryptoBalance.component.Swap.textNetworkFees')}</Text>
                <View flex-1 right>
                  <Text h12 white>{convertFee} {' '}{currencySwap}</Text>
                </View>
              </View>
              <View row centerH centerV>
                <View textBlueDark  height-1 flex-1/>
                <DivSpace width-20 />
                <View flex-1 right>
                  <Text h10 orange>{showFees} USD</Text>
                </View>
              </View>
            </View>
          </View>
          <DivSpace height-20 />
          <View marginH-50 centerH>
            <ButtonRounded
              onPress={handlePay}
              disabled={totalSwap !== 0 ? false : true}
              size='lg'
            >
              <Text h10 semibold>
                {i18n.t('CryptoBalance.component.Swap.buttonSwap')}
              </Text>
            </ButtonRounded>
          </View>
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
          isOpen={true} />)}
       <Modal2faConfirmation
        visible={showModal2fa}
        onRequestClose={() => { setShowModal2fa(false) }}
        onPressOverlay={handleClose}
        navigation={navigation}
      />
    </SignUpWrapper>
  );
};

export default ListInformationSwap;
