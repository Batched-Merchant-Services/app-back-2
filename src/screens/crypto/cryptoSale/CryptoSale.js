import React,{useState} from 'react';
import i18n from '@utils/i18n';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  DivSpace,
  ContainerCrypto,
  ImageComponent,
  NavigationBar,
  ButtonRounded
} from '@components';
import rowEquals from '@assets/icons/rowEquals.png';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import  AmountCrypto  from '@screens/crypto/components/AmountCrypto';
import styles from './styles';
import { useSelector} from 'react-redux';

const CryptoSale = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const infoData =  userData ? userData :'';
  const [showNameCrypto]=useState(userData?userData.nameCrypto:'');
  const [shortNameCrypto]=useState(userData?userData.typeCrypto:'');
  const [currencyUser]=useState(userData?userData.currencyUser:'');
  const [iconCrypto]=useState(userData?userData.iconCrypto:'');
  const [showCurrency,setShowCurrency] = useState('');
  const [amountConvert,setAmountConvert] = useState('');
 

  function handlePay() {
    navigation.navigate('ConfirmationPinUser', {
      data: {page: 'saleCrypto',infoData, amountConvert,showCurrency},
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
    <SignUpWrapper>
      <SafeAreaView forceInset={{top: 'always'}}>
        <NavigationBar
          onBack={() => navigation.goBack()}
          body={i18n.t('CryptoBalance.component.saleCrypto.title')}
          onClose={null}
        />
        <DivSpace height-20 />
        <ScrollView>
          <View marginH-20>
            <View flex-1 height-160 textBlue01 paddingH-15 centerH centerV style={styles.boxText}>
              <ImageComponent source={{uri: iconCrypto}} width={35} height={35} />
              <DivSpace height-10 />
              <Text white h13 center>{i18n.t('CryptoBalance.component.saleCrypto.textSellYour') +' '+showNameCrypto}{' '}{i18n.t('CryptoBalance.component.saleCrypto.textBalanceAndReceive')}</Text>
              <DivSpace height-10 />
              <Text bgGray h10 center>{i18n.t('CryptoBalance.component.saleCrypto.textTheSaleWillBe')}</Text>
            </View>
            <DivSpace height-15 />
            <ContainerCrypto onPress={null}>
              <View centerH centerV>
                <DivSpace height-10 />
                <Text h11 orange>{i18n.t('CryptoBalance.component.titleMyBalance')}:</Text>
                <View row centerH centerV >
                  <Text h16 white>0.00012{' '}<Text bgGray>{shortNameCrypto}</Text></Text>
                  <DivSpace width-10 />
                  <ImageComponent
                    white
                    source={rowEquals}
                    width={scale(30)}
                    height={verticalScale(30)}
                  />
                  <DivSpace width-10 />
                  <Text h16 white>1234.56{' '}<Text bgGray>{currencyUser}</Text></Text>
                </View>
              </View>
            </ContainerCrypto>
            <DivSpace height-15 />
            <View paddingT-10 paddingH-11 textBlue01 style={{ borderRadius: 10}}>
              <DivSpace height-10 />
              <Text center white h10>{i18n.t('CryptoBalance.component.saleCrypto.textEnterTheAmount')} {showNameCrypto} {i18n.t('CryptoBalance.component.saleCrypto.textTheEquivalentInYour')}</Text>
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
                    {i18n.t('CryptoBalance.component.saleCrypto.buttonSale')}{' '}{showNameCrypto}
                  </Text>
                </ButtonRounded>
              </View>
              <DivSpace height-15 />
              <Text h10 bgGray center>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non magna egestas, pellentesque neque placerat purus. Donec sagittis nulla elit, a porttitor arcu mollis id.</Text>
              <DivSpace height-15 />
            </View>
            <DivSpace height-15 />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SignUpWrapper>
  );
};

export default CryptoSale;
