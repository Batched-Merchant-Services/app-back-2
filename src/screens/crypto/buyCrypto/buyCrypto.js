import React, { useState, useEffect } from 'react';
import i18n from '@utils/i18n';
import { ScrollView,KeyboardAvoidingView, Platform  } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {
  Text,
  View,
  DivSpace,
  ImageComponent,
  NavigationBar,
  ButtonRounded,
} from '@components';
import Chart from '@screens/crypto/components/Chart';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import LocalStorage from '@utils/localStorage';
import AmountCrypto from '@screens/crypto/components/AmountCrypto';
import AmountCryptoTwo from '@screens/crypto/components/AmountCryptoTwo';
import { useSelector } from 'react-redux';
import { moneyFormatter } from '@utils/formatters';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { conversionCurrency } from '@utils/api/switch';
import styles from './styles';
import Modal2faConfirmation from '@screens/auth2fa/Modal2faConfirmation';

const BuyCrypto = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const infoData = userData ? userData : '';
  const [balanceInwallet] = useState(userData ? userData.balanceWallet : '');
  const [balanceCrypto] = useState(userData ? userData.priceCrypto : '');
  const [showNameCrypto] = useState(userData ? userData.nameCrypto : '');
  const [shortNameCrypto] = useState(userData ? userData.typeCrypto : '');
  const [nameCurrency, setNameCurrency] = useState('');
  const [iconCrypto] = useState(userData ? userData.iconCrypto : '');
  const [currencyUser] = useState(userData ? userData.currencyUser : '');
  const [amountConvert, setAmountConvert] = useState('');
  const [showCurrency, setShowCurrency] = useState('');
  const [showModal2fa, setShowModal2fa] = useState(false);
  const amount = useValidatedInput('amount', '');
  const [balanceConvert, setBalanceConvert] = useState('');

  function handlePay() {
    const amountEnv = nameCurrency === 'USD' ? amount?.value:amountConvert;
    const amountConv = nameCurrency === 'USD' ? amountConvert: amount?.value;
    var foobar = [3, 2, 1];
    if (!foobar.includes(userData?.type2fa)) {
      setShowModal2fa(true);
    } else {
      navigation.navigate('Pin2faConfirmation', {
        data: { page: 'buyCrypto', infoData, amountEnv ,amountConv, shortNameCrypto },
        next: 'ConfirmationCrypto'
      });
      //navigation.navigate('Pin2faConfirmation',{page: 'buyCrypto',infoData, amountConvert,showCurrency });
    }
  }

 
  function getDateConvert(value) {
    setNameCurrency(value);
  }

  function getCode(code) {
    setAmountConvert(code);
  }

  const handleClose = () => {
    setShowModal2fa(!showModal2fa);
  };

  return (
    <SignUpWrapper forceInset={{top: 'always'}}>
    <NavigationBar
        onBack={() => navigation.goBack()}
        body={i18n.t('CryptoBalance.component.buyCrypto.titlePurchaseOf')}
        onClose={null}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        style={{ flex: 0.96, alignItems: 'center' }}
      >
      
      <DivSpace height-20 />
      <ScrollView >
        <SafeAreaView>
          <View flex-1>
            <View flex-1 textBlue01 height-160 paddingH-15 centerH centerV marginH-20 style={styles.boxTextBuy}>
              <ImageComponent source={{uri: iconCrypto}} width={35} height={35} />
              <DivSpace height-10 />
              <Text white h13 center>{i18n.t('CryptoBalance.component.buyCrypto.textBuy')}{' '}{showNameCrypto}{' '}{i18n.t('CryptoBalance.component.buyCrypto.textWithBalanceFrom')}</Text>
              <DivSpace height-10 />
              <Text textGray h10 center>{i18n.t('CryptoBalance.component.buyCrypto.textBuy')}{' '}{showNameCrypto}{' '}{i18n.t('CryptoBalance.component.buyCrypto.textAndUseYourUulala')}</Text>
            </View>
            <DivSpace height-10 />
            <View flex-1 height-280 bgGray>
              <DivSpace height-10 />
              <View paddingH-20>
                <View row>
                  <ImageComponent source={{uri: iconCrypto}} width={25} height={25} />
                  <DivSpace width-10 />
                  <Text><Text h18 bgBlue02 semibold>{showNameCrypto}</Text><Text bgBlue02 h12>{' '}({shortNameCrypto})</Text></Text>
                </View>
                <DivSpace height-5 />
                <Text h18 semibold bgBlue02>{balanceCrypto}{' '}<Text white>{shortNameCrypto}</Text></Text>
                {/* <DivSpace height-5 />
                <Text h12 white><Text textGray semibold>{balanceConvert}{' '}</Text><Text textGray>{' '}{currencyUser}</Text></Text> */}
              </View>
              <Chart shortName={shortNameCrypto}/>
            </View>
            <DivSpace height-10 />
            <View  marginH-20 paddingT-10 paddingH-11 bgBlue02 style={styles.containerAmount}>
              <DivSpace height-10 />
              <Text  center white h10>{i18n.t('CryptoBalance.component.buyCrypto.textBuy')}{' '}{showNameCrypto}{' '}{i18n.t('CryptoBalance.component.buyCrypto.textAndUseYourWallet')}</Text>
              <DivSpace height-10 />
              <Text  center textGray h10>{i18n.t('CryptoBalance.component.buyCrypto.textAvailableInWallet')}</Text>
              <Text  center textGray h10 semibold>{moneyFormatter(balanceInwallet)}{' '}{currencyUser}</Text>
              <DivSpace height-30 />
              <AmountCryptoTwo {...amount} numberConvert={(code) => getCode(code)} convertData={(value) => getDateConvert(value)}/> 
              <DivSpace height-15 />
              <View flex-1 centerH>
                <ButtonRounded
                  onPress={handlePay}
                  disabled={amountConvert? false: true}
                  size='lg'
                >
                  <Text h10 semibold>
                    {i18n.t('CryptoBalance.component.buyCrypto.buttonBuy')}{' '}{showCurrency}
                  </Text>
                </ButtonRounded>
              </View>
              <DivSpace height-15 />
            </View>
            <DivSpace height-10 />
          </View>
        </SafeAreaView>
      </ScrollView>
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

export default BuyCrypto;
