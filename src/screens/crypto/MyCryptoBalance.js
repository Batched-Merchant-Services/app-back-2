import React,{useState,useEffect} from 'react';
import i18n from '@utils/i18n';
import { NavigationEvents } from 'react-navigation';
import { ScrollView } from 'react-native';
import { useSelector} from 'react-redux';
import LocalStorage from '@utils/localStorage';
import { conversionCurrency } from '@utils/api/switch';
import styles from './styles';
import {
  Text,
  View,
  DivSpace,
  ContainerCrypto,
  ImageComponent,
  NavigationBar,
} from '@components';
import BoxOptions from '@screens/crypto/components/BoxOptions';
import Chart from '@screens/crypto/components/Chart';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';



const MyCryptoBalance = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const page = navigation.getParam('page') ;
  const buy = page === 'buy' ? true : false;
  const [balanceConvert,setBalanceConvert]=useState('');
  const [showNameCrypto]=useState(userData?userData.nameCrypto:'');
  const [shortNameCrypto]=useState(userData?userData.typeCrypto:'');
  const [iconCrypto]=useState(userData?userData.iconCrypto:'');
  const [balanceCrypto]=useState(userData?userData.balanceCrypto:'');
  const [priceCrypto]=useState(userData?userData.priceCrypto:'');
  const titleBalance = i18n.t('CryptoBalance.component.title')+' '+showNameCrypto;
  useEffect(() => {
    getBalanceConvert();
  },[]);

  
  async function getBalanceConvert() {
    const token = await LocalStorage.get('auth_token');
    const responseBTC = await conversionCurrency(token,shortNameCrypto,'USD',balanceCrypto);
    if (responseBTC.code < 400) {
      setBalanceConvert(responseBTC.data?.conversion?.toString());
    }
  }

  return (
    <SignUpWrapper>
      <NavigationBar
        onBack={() => navigation.goBack()}
        body={page === 'recharge'? i18n.t('CryptoBalance.component.rechargeCrypto.titleTopUpCryptocurrency'): buy ? i18n.t('CryptoBalance.component.buyCrypto.titleBuyCryptocurrencies'): titleBalance}
        onClose={null}
      />
      <DivSpace height-15 />
      <ScrollView>
        <View marginH-20>
          {buy&&(
            <View flex-1 height-160 paddingH-15 centerH centerV textBlue01 style={styles.boxTextBuy}>
              <ImageComponent source={{uri: iconCrypto}} width={35} height={35} />
              <DivSpace height-10 />
              <Text white h13 center>{i18n.t('CryptoBalance.component.buyCrypto.textBuy')}{' '}{showNameCrypto}{' '}{i18n.t('CryptoBalance.component.buyCrypto.textWithBalanceFrom')}</Text>
              <DivSpace height-10 />
              <Text bgGray h10 center>{i18n.t('CryptoBalance.component.buyCrypto.textBuy')}{' '} {showNameCrypto}{' '}{i18n.t('CryptoBalance.component.buyCrypto.textAndUseYourUulala')}</Text>
            </View>
          )}

          {page === 'recharge' &&(
            <View flex-1 height-115 paddingH-15 centerH centerV textBlue01 style={styles.boxTextBuy}>
              <ImageComponent source={{uri: iconCrypto}} width={35} height={35} />
              <DivSpace height-10 />
              <Text white h12 center>{i18n.t('CryptoBalance.component.rechargeCrypto.textRecharge')}<Text semibold orange>{' '}{i18n.t('CryptoBalance.component.rechargeCrypto.textMyWallet')}</Text></Text>
              <DivSpace height-10 />
              <Text bgGray h12 center>{i18n.t('CryptoBalance.component.rechargeCrypto.textbyTransferOf')}<Text semibold bgGray>{' '}{showNameCrypto}</Text></Text>
            </View>
          )}
          <DivSpace height-10 />
          {!buy&& page !== 'recharge' &&(
            <ContainerCrypto >
              <View centerH centerV padding-10>
                <Text h11 orange>{i18n.t('CryptoBalance.component.titleMyBalance')}:</Text>
                <View flex-1 row centerH centerV >
                  <View flex-1>
                    <Text h11 white center>{balanceCrypto}{' '}<Text bgGray>{shortNameCrypto}</Text>{' '}</Text>
                  </View>
                  <View width-21 height-2 white></View>
                  <View flex-1>
                    <Text h11 white center>{' '}{balanceConvert}{' '}<Text bgGray>USD</Text></Text>
                  </View>
                  
                </View>
              </View>
            </ContainerCrypto>
          )}
        </View>
        <DivSpace height-10 />
        <View flex-1 height-280 style={{backgroundColor:'white'}}>
          <DivSpace height-10 />
          <View paddingH-20>
            <View row>
              <ImageComponent source={{uri: iconCrypto}} width={25} height={25} />
              <DivSpace width-10 />
              <Text white><Text h18 style={styles.textChart} semibold>{showNameCrypto}</Text><Text style={styles.textChart} h12>{' '}({shortNameCrypto})</Text></Text>
            </View>
            <DivSpace height-5 />
            <Text h24 white><Text style={styles.textChart} semibold>{priceCrypto}</Text><Text style={styles.textChart}>{' '}{shortNameCrypto}</Text></Text>
          </View>
          <Chart shortName={shortNameCrypto}/>
        </View>
        <DivSpace height-10 />
        <View marginH-20>
          <DivSpace height-10 />
          <BoxOptions navigation={navigation} buy={page}/>
        </View>
        <DivSpace height-10 />
      </ScrollView>
      <NavigationEvents
        onWillFocus={payload => {
          getBalanceConvert(payload);
        }}
      />
    </SignUpWrapper>
  );
};

export default MyCryptoBalance;
