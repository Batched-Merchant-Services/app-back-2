import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { scale, verticalScale } from 'react-native-size-matters';
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
import confirmationSwap from '@assets/brand/confirmationSwap.png';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { useSelector } from 'react-redux';
import IconSwapConfirmation from '@utils/iconSVG/IconSwapConfirmation';

const ConfirmationSwap = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandThemeImages = userData?.Theme?.images;
  const brandTheme = userData?.Theme?.colors;
  const data = navigation.getParam('data');
  const convert = navigation.getParam('convert');
  const amount = navigation.getParam('amount');
  
  function handleBackHome() {
    navigation.navigate('MyWallet');
  }
  console.log('amount',amount,data,data?.total,(data?.amount + data?.fee))
  return (
    <SignUpWrapper>
      <NavigationBar
        onBack={null}
        body={'Confirmación'}
        onClose={null}
      />
      <DivSpace height-20 />
      <SafeAreaView>
        <View centerH>
          <BoxBlue containerStyle={{ height: verticalScale(536) }}>
            <View centerH flex-1 paddingH-30>
              <DivSpace height-15/>
              <Text h16 white medium center >
                {i18n.t('CryptoBalance.component.Swap.titleSwap')}
              </Text>
              <DivSpace height-15 />
              <BoxGradient disable>
                <IconSwapConfirmation width={scale(58)} height={verticalScale(58)}  fill={brandTheme?.bgBlue06??Colors?.bgBlue06} />
              </BoxGradient>
              <DivSpace height-15 />
              {/* <Text h12 center regular white>{i18n.t('CryptoBalance.component.Swap.textAmountSent')}</Text>
              <DivSpace height-5 /> */}
              <Text h20 white semibold center >
                {data?.amount + data?.fee}{' '}{data?.to_currency}{' '}{i18n.t('CryptoBalance.component.Swap.textOn')}{' '}{data?.from_currency}
              </Text>
              <DivSpace height-10 />
              <Text h12 center regular white>{i18n.t('CryptoBalance.component.Swap.textAmountReceived')}</Text>
              <DivSpace height-5 />
              <Text h20 white semibold center >
                {data?.amount}{' '}{data?.to_currency}
              </Text>
              <DivSpace height-10 />
              <Text h10 center regular white>{i18n.t('CryptoBalance.component.Swap.textCommissionTransaction')}</Text>
              <DivSpace height-5 />
              <Text h10 white semibold center >
                {data?.fee}{' '}{data?.to_currency}
              </Text>
              <DivSpace height-10 />
              <Text h10 center regular white>{i18n.t('CryptoBalance.component.Swap.textTransactionID')}</Text>
              <DivSpace height-5 />
              <Text h10 white semibold center >
                {data?.trx_id}
              </Text>
              <DivSpace height-10/>
              <Text h10 white center semibold><Text regular white>{i18n.t('CryptoBalance.component.Swap.textYouCanCheckBalance')}</Text>{' '}{i18n.t('CryptoBalance.component.Swap.textMyWallet')}</Text>
              <DivSpace height-20/>
              <Text h11 white ><Text semibold white>{i18n.t('CryptoBalance.component.Swap.textConfirmationTime')}</Text>{' '}{i18n.t('CryptoBalance.component.Swap.textDependingOnTheSpeed')}</Text>
              <DivSpace height-10/>
            </View>
            <View centerH>
              <ButtonRounded
                size='sm'
                onPress={handleBackHome}
              >
                <Text h10 bold>
                  {i18n.t('CryptoBalance.component.Swap.textCryptoWallet')}
                </Text>
              </ButtonRounded>
              <DivSpace height-20/>
            </View>
          </BoxBlue>
        </View>
      </SafeAreaView>
    </SignUpWrapper>
  );
};

export default ConfirmationSwap;
