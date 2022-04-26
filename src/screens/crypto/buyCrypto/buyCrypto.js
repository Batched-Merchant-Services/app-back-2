import React,{useState} from 'react';
import i18n from '@utils/i18n';
import { ScrollView } from 'react-native';
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
import  AmountCrypto  from '@screens/crypto/components/AmountCrypto';
import { useSelector} from 'react-redux';
import { moneyFormatter } from '@utils/formatters';
import styles from './styles';

const BuyCrypto = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const infoData =  userData ? userData :'';
  const [showNameCrypto]=useState(userData?userData.nameCrypto:'');
  const [shortNameCrypto]=useState(userData?userData.typeCrypto:'');
  const [currencyUser]=useState(userData?userData.currencyUser:'');
  const [iconCrypto]=useState(userData?userData.iconCrypto:'');
  const [balanceInwallet]=useState(userData?userData.balanceWallet:'');
  const [amountConvert,setAmountConvert] = useState('');
  const [showCurrency,setShowCurrency] = useState('');

  function handlePay() {
    navigation.navigate('ConfirmationPinUser', {
      data: {page: 'buyCrypto',infoData, amountConvert,showCurrency },
      next: 'ConfirmationCrypto'
    });
  }
  
  const onFill =(code)=> {
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
                <Text h24 white><Text bgBlue02 semibold>173,760.52</Text><Text bgBlue02>{' '}{currencyUser}</Text></Text>
                <DivSpace height-5 />
                <Text h12 white><Text textGray semibold>7,240.185</Text><Text textGray>{' '}{currencyUser}</Text></Text>
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
              <AmountCrypto  onFillAmount={(code) => onFill(code)} onCurrency={(code) => onCurrency(code)}/>
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
              <Text h10 textGray center>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non magna egestas, pellentesque neque placerat purus. Donec sagittis nulla elit, a porttitor arcu mollis id.</Text>
              <DivSpace height-15 />
            </View>
            <DivSpace height-10 />
          </View>
        </SafeAreaView>
      </ScrollView>
    </SignUpWrapper>
  );
};

export default BuyCrypto;
