import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  DivSpace,
  BoxBlue,
  ImageComponent,
  NavigationBar,
  ButtonRounded,
  BoxGradient,
} from '@components';
import i18n from '@utils/i18n';
import coinCrypto from '@assets/brand/coinCrypto.png';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { useSelector } from 'react-redux';

const RechargeConfirmation = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandThemeImages = userData?.Theme?.images;

  function handleBackHome() {
    navigation.navigate('MyWallet');
  }
  return (
    <SignUpWrapper forceInset={{top: 'always'}}>
      <NavigationBar
        onBack={() => navigation.goBack()}
        body={i18n.t('CryptoBalance.component.rechargeCrypto.titlePaymentInProcess')}
        onClose={null}
      />
      <DivSpace height-20 />
      <SafeAreaView >
        <View centerH>
          <BoxBlue containerStyle={{ height: verticalScale(536) }}>
            <View centerH flex-1 paddingH-30>
              <DivSpace height-28 />
              <Text h16 white medium center >
                {i18n.t('CryptoBalance.component.rechargeCrypto.textAwaitingConfirmation')}
              </Text>
              <DivSpace height-20 />
              <BoxGradient>
                <ImageComponent source={brandThemeImages?.coinCrypto?brandThemeImages?.coinCrypto:coinCrypto} height={64} width={71} />
              </BoxGradient>
              <DivSpace height-30 />
              <Text h12 center semibold white>{i18n.t('CryptoBalance.component.rechargeCrypto.textTheFundsWillBeDeposited')}</Text>
              <DivSpace height-5 />
              <Text white h12 center>{i18n.t('CryptoBalance.component.rechargeCrypto.textWhenTheTransfer')}</Text>
              <DivSpace height-35/>
              <Text h10 white center><Text semibold white>{i18n.t('CryptoBalance.component.rechargeCrypto.textTheConfirmationTimeCan')}</Text>{' '}{i18n.t('CryptoBalance.component.rechargeCrypto.textDependingOnTheSpeedThat')}</Text>
              <DivSpace height-10/>
            </View>
            <View flex-1 centerH bottom>
              <ButtonRounded
                size='sm'
                onPress={handleBackHome}
              >
                <Text h10 bold>
                  {i18n.t('CryptoBalance.component.rechargeCrypto.buttonMyBalance')}
                </Text>
              </ButtonRounded>
              <DivSpace height-50 />
            </View>
          </BoxBlue>
        </View>
      </SafeAreaView>
    </SignUpWrapper>
  );
};

export default RechargeConfirmation;
