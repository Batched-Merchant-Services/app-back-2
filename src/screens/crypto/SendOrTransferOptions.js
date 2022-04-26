import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { scale,verticalScale } from 'react-native-size-matters';
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
import welcome_back from '@assets/brand/welcome_back.png';
import sendExchange from '@assets/brand/plane.png';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';
import IconInternational from '../../utils/iconSVG/IconInternational';

const SendOrTransferOptions = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;

  const handleUserUulala = () =>
    navigation.navigate('CryptoSendBetweenUser');

  const handleExchange = () => navigation.navigate('SendCrypto');

  return (
    <SignUpWrapper forceInset={{top: 'always'}}>
      <NavigationBar
         onBack={() => navigation.goBack()}
        body={i18n.t(
          'CryptoBalance.component.SendOrTransferOptions.titlePaymentsBetweenUsers'
        )}
        onClose={null}
      />
      <DivSpace height-20 />
      <ScrollView>
        <SafeAreaView >
          <View marginH-10 centerH>
            <BoxBlue containerStyle={{ height: verticalScale(480) }}>
              <DivSpace height-35 />
              <View centerH marginH-20>
              <IconInternational width={scale(60)} height={verticalScale(47)}  fill={brandTheme?.orange??Colors?.orange} fillSecondary={brandTheme?.white??Colors?.white}/>
                <DivSpace height-20 />
                <Text white h14 center>
                  {i18n.t(
                    'CryptoBalance.component.SendOrTransferOptions.textSendingOrTransferring'
                  )}
                </Text>
                <DivSpace height-10 />
                <Text white h12 center>
                  {i18n.t(
                    'CryptoBalance.component.SendOrTransferOptions.textTransferCryptoToOther'
                  )}
                </Text>
              </View>
              <DivSpace height-40 />
              <View flex-1 centerH>
                <View row>
                  <BoxOption
                    label={i18n.t(
                      'CryptoBalance.component.SendOrTransferOptions.boxOptionUserUulala'
                    )}
                    image={welcome_back}
                    badge={17}
                    onPress={handleUserUulala}
                  />
                  <DivSpace width-20 />
                  <BoxOption
                    label={i18n.t(
                      'CryptoBalance.component.SendOrTransferOptions.boxOptionExternalWallet'
                    )}
                    image={sendExchange}
                    badge={17}
                    onPress={handleExchange}
                  />
                </View>
              </View>
            </BoxBlue>
          </View>
        </SafeAreaView>
      </ScrollView>
    </SignUpWrapper>
  );
};

export default SendOrTransferOptions;
