import React,{useState,useEffect} from 'react';
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
import  AmountCrypto  from '@screens/crypto/components/AmountCrypto';
import  AmountCryptoTwo  from '@screens/crypto/components/AmountCryptoTwo';
import { useSelector} from 'react-redux';
import { moneyFormatter } from '@utils/formatters';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { conversionCurrency } from '@utils/api/switch';
import styles from './styles';

const BuyCrypto = ({ navigation }) => {

  const redux = useSelector(state => state);
  const userData = redux.user;
  const infoData =  userData ? userData :'';
  const [balanceInwallet]=useState(userData?userData.balanceWallet:'');
  const [balanceCrypto]=useState(userData?userData.priceCrypto:'');
  const [showNameCrypto] = useState(userData ? userData.nameCrypto : '');
  const [shortNameCrypto] = useState(userData ? userData.typeCrypto : '');
  const [iconCrypto] = useState(userData ? userData.iconCrypto : '');
  const [currencyUser] = useState(userData ? userData.currencyUser : '');
  const [amountConvert,setAmountConvert] = useState('');
  const [showCurrency,setShowCurrency] = useState('');
  const amount = useValidatedInput('amount', '');
  const [balanceConvert,setBalanceConvert]=useState('');
  function handlePay() {
    navigation.navigate('ConfirmationPinUser', {
      data: {page: 'buyCrypto',infoData, amount,amountConvert,shortNameCrypto },
      next: 'ConfirmationCrypto'
    });
  }

  // useEffect(() => {
  //   getBalanceConvert();
  // }, []);


  async function getBalanceConvert() {
    console.log('balanceCrypto',userData)
    const token = await LocalStorage.get('auth_token');
    const responseBTC = await conversionCurrency(token, shortNameCrypto, 'USD', balanceCrypto);
    if (responseBTC.code < 400) {
      setBalanceConvert(responseBTC.data?.conversion?.toString());
    }
  }



  function getCode(code) {
    console.log('code',code)
    setAmountConvert(code);
  }
  
  const onFill =(code)=> {
    console.log('code',code)
    setAmountConvert(code);
  };
  const onCurrency =(code)=> {
    setShowCurrency(code);
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
              <DivSpace height-10 />
              <AmountCryptoTwo {...amount} onFillConvert={(code) => getCode(code)} />
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
    </SignUpWrapper>
  );
};

export default BuyCrypto;
