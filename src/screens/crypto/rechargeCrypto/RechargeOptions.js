import React from 'react';
import { ScrollView} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { verticalScale } from 'react-native-size-matters';
import { useSelector} from 'react-redux';
import i18n from '@utils/i18n';
import {
  View,
  DivSpace,
  Text,
  NavigationBar,
  BoxBlue
} from '@components';

import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import BoxOption from '@screens/crypto/components/buttonOption';
import bankTransfer from '@assets/icons/disabled/bankTransfer.png';
import p2p from '@assets/icons/disabled/p2p.png';
import ATM from '@assets/icons/disabled/ATM.png';
import cardDisabled from '@assets/icons/disabled/cardDisabled.png';
import Btc from '@assets/icons/btcoin.png';


const RechargeOptions = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const Crypto = userData.statusCrypto;
  const handleTransfer = () =>
    navigation.navigate('');

  const handleCrypto = () =>
    navigation.navigate('RechargeCrypto');


  return (
    <SignUpWrapper forceInset={{top: 'always'}}>
      <NavigationBar
        onBack={() => navigation.goBack()}
        body={i18n.t('CryptoBalance.component.rechargeCrypto.titleReloadingOptions')}
        onClose={null}
      />
      <DivSpace height-20 />
      <ScrollView >
        <SafeAreaView >
          <View marginH-10 centerH>
            <BoxBlue containerStyle={{ height: verticalScale(510)}}>
              <DivSpace height-25/>
              <View marginH-20>
                <Text white h14 center>{i18n.t('CryptoBalance.component.rechargeCrypto.textRecharge')}</Text>
                <DivSpace height-5/>
                <Text orange h14 center>{i18n.t('CryptoBalance.component.rechargeCrypto.textMyWallet')}</Text>
                <DivSpace height-5/>
                <Text white h10 center>{i18n.t('CryptoBalance.component.rechargeCrypto.textSelectTheOption')}</Text>
              </View>
              <DivSpace height-20/>
              <View flex-1 centerH>
                <View row>
                  <BoxOption
                    label={i18n.t('CryptoBalance.component.rechargeCrypto.buttonTransferBanking')}
                    image={bankTransfer}
                    badge={17}
                    onPress={handleTransfer}
                    disabled
                  />
                  <DivSpace width-20/>
                  {/* <BoxOption
                    label={i18n.t('CryptoBalance.component.rechargeCrypto.buttonTransfersCoinPurse')}
                    image={cardDisabled}
                    badge={17}
                    onPress={handleTransfer}
                    disabled
                  /> */}
                  <BoxOption
                    label={i18n.t('CryptoBalance.component.rechargeCrypto.buttonPersonToPerson')}
                    image={p2p}
                    badge={17}
                    onPress={handleTransfer}
                    disabled
                  />
                </View>
                {/* <DivSpace height-15/>
                <View row>
                  <BoxOption
                    label={i18n.t('CryptoBalance.component.rechargeCrypto.buttonPersonToPerson')}
                    image={p2p}
                    badge={17}
                    onPress={handleTransfer}
                    disabled
                  />
                  <DivSpace width-20/>
                  <BoxOption
                    label={i18n.t('CryptoBalance.component.rechargeCrypto.buttonShopsAndATMs')}
                    image={ATM}
                    badge={17}
                    onPress={handleTransfer}
                    disabled
                  />
                </View> */}
                <DivSpace height-15/>
                {Crypto&&(
                  <View row>
                    <View flex-1 right>
                      <BoxOption
                        label={i18n.t('CryptoBalance.component.rechargeCrypto.buttonRechargeCryptocurrencies')}
                        image={Crypto?Btc:Btc}
                        badge={17}
                        onPress={Crypto? handleCrypto:handleTransfer }
                        disabled={Crypto? false: true}
                      />
                    </View>
                    <DivSpace width-20/>
                    <View flex-1/>
                  </View>
                )}
               
              </View>
            </BoxBlue>
          </View>
        </SafeAreaView>
      </ScrollView>
    </SignUpWrapper>
  );
};

export default RechargeOptions;
