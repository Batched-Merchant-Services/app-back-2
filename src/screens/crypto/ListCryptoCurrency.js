import React,{Fragment} from 'react';
import i18n from '@utils/i18n';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {
  Text,
  View,
  DivSpace,
  NavigationBar,
} from '@components';
import InfoBoxCrypto from '@screens/crypto/components/InfoBoxCrypto';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';

const Cryptos = [{icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/ETHEREUM-YOUTUBE-PROFILE-PIC.png', name: 'Ethereum', balance: '20776998', typeCurrency: 'MXN',percent: '3.21%',updateTime: 'Hace 1 minuto'},
  {icon: 'https://claveprivada.com/wp-content/uploads/2018/10/1024px-Bitcoin.svg.png', name: 'Bitcoin', balance: '30786998', typeCurrency: 'MXN',percent: '10.21%',updateTime: 'Hace 4 minuto'},
  {icon: 'https://s3.cointelegraph.com/storage/uploads/view/bf7541e09a456a3fc6113ec9c7cdf408.png', name: 'Litecoin', balance: '10776998', typeCurrency: 'MXN',percent: '5.21%',updateTime: 'Hace 10 minuto'},
  {icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/ETHEREUM-YOUTUBE-PROFILE-PIC.png', name: 'Ethereum', balance: '20776998', typeCurrency: 'MXN',percent: '3.21%',updateTime: 'Hace 1 minuto'},
  {icon: 'https://claveprivada.com/wp-content/uploads/2018/10/1024px-Bitcoin.svg.png', name: 'Bitcoin', balance: '30786998', typeCurrency: 'MXN',percent: '10.21%',updateTime: 'Hace 4 minuto'},
  {icon: 'https://s3.cointelegraph.com/storage/uploads/view/bf7541e09a456a3fc6113ec9c7cdf408.png', name: 'Litecoin', balance: '10776998', typeCurrency: 'MXN',percent: '5.21%',updateTime: 'Hace 10 minuto'}];

const ListCryptoCurrency = ({ navigation }) => {

  const handleBuyCrypto = () => {
    navigation.navigate('buyCrypto');
  };

  const InfoCryptoElement = Cryptos.map((item, key) => (
    <Fragment key={key}>
      <InfoBoxCrypto   onPress={handleBuyCrypto}  {...item} navigation={navigation}/>   
      <DivSpace height-12 />
    </Fragment>
  ));
  return (
    <SignUpWrapper>
      <SafeAreaView forceInset={{top: 'always'}} forceInset={{top: 'always'}}>
        <NavigationBar
          onBack={() => navigation.goBack()}
          body={i18n.t('CryptoBalance.component.title')}
          onClose={null}
        />
        <DivSpace height-20 />
        <ScrollView>
          <View marginH-20>
            <Text h11 white>{i18n.t('CryptoBalance.component.textSelectTheCryptocurrency')}</Text>
            <DivSpace height-10/>
            {InfoCryptoElement}
            <DivSpace height-10/>
          </View>
        </ScrollView>
       
      </SafeAreaView>
    </SignUpWrapper>
  );
};

export default ListCryptoCurrency;
