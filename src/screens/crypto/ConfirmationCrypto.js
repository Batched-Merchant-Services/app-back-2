import React, { Fragment,useState } from 'react';
import { SafeAreaView } from 'react-navigation';
import { verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  DivSpace,
  BoxBlue,
  ImageComponent,
  ButtonRounded,
  BoxGradient
} from '@components';
import i18n from '@utils/i18n';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import Styles from '@screens/recharges/styles';
import { useSelector} from 'react-redux';

const ConfirmationCrypto = ({navigation}) => {
  const dataInfo = navigation.getParam('data');
  const data = navigation.getParam('dataInfo');
  const redux = useSelector(state => state);
  const userData = redux.user;
  const PageSale = data?.page === 'saleCrypto'? true: false;
  const PageSend = data?.page === 'sendOrTransferCrypto' || data?.page === 'sendCryptoUsers'? true: false;
  const PageBuy = data?.page === 'buyCrypto' || dataInfo?.page === 'buyCrypto'? true: false;
  const [showNameCrypto]=useState(userData?userData.nameCrypto:'');
  const [iconCrypto]=useState(userData?userData.iconCrypto:'');
  const [currencyUser]=useState(userData?userData.currencyUser:'');
  function handleBackHome() {
    navigation.navigate('MyWallet');
  }


  return (
    <SignUpWrapper>
      <SafeAreaView style={Styles.viewInfoCntc} forceInset={{top: 'always'}}>
        <DivSpace height-25 />
        <Text h12 regular bgBlue06>
          {i18n.t('CryptoBalance.component.confirmationCrypto.titleConfirmation')}
        </Text>
        <DivSpace height-17 />
        <BoxBlue containerStyle={{ height: verticalScale(555) }}>
          <View centerH flex-1 paddingH-20>
            <DivSpace height-25 />
            {PageSend &&(
              <Text h16 white bold center >
                {i18n.t('CryptoBalance.component.sendCrypto.title')+' '+showNameCrypto+' '+i18n.t('CryptoBalance.component.sendCrypto.textPurchase')}
              </Text>
            )}
            <DivSpace height-10 />
            {PageSale &&(
              <Text h16 white bold center>
                {i18n.t('CryptoBalance.component.saleCrypto.title')+' '+showNameCrypto+' '+i18n.t('CryptoBalance.component.saleCrypto.textPurchase')}
              </Text>
            )}
            <DivSpace height-10 />
            {PageBuy &&(
              <Text h16 white bold center>
                {i18n.t('CryptoBalance.component.confirmationCrypto.textSuccessful')+' '+showNameCrypto+' '+i18n.t('CryptoBalance.component.confirmationCrypto.textPurchase')}
              </Text>
            )}
            <DivSpace height-15 />
            <BoxGradient>
              <ImageComponent source={{uri: iconCrypto}} height={56} width={57} />
            </BoxGradient>
            <DivSpace height-15 />
            {PageSend &&(
              <Fragment>
                <Text h12 center bgGray medium>{i18n.t('CryptoBalance.component.saleCrypto.textTransactionAmount')}</Text>
                <Text h18 white semibold center>{dataInfo.amount} <Text white regular>{dataInfo?.currency}</Text></Text>
              </Fragment>
            )}
            <DivSpace height-10 />
            {PageBuy &&(
              <Fragment>
                <Text h12 center bgGray medium>{i18n.t('CryptoBalance.component.confirmationCrypto.textPurchaseAmount')}</Text>
                <Text h18 white semibold center>{PageBuy?data.amount_total:dataInfo.amount_total} <Text white regular>{data?.currency}</Text></Text>
              </Fragment>
            )}
            <DivSpace height-10 />
            {PageSale &&(
              <Fragment>
                <Text h12 center bgGray medium>{i18n.t('CryptoBalance.component.saleCrypto.textSalesAmount')}</Text>
                <Text h18 white semibold center>{dataInfo.amount} <Text white regular>{dataInfo?.currency}</Text></Text>
              </Fragment>
            )}
            <DivSpace height-10 />
            {PageSend &&(
              <Fragment>
                <Text h10 bgGray>{i18n.t('CryptoBalance.component.confirmationCrypto.textTransactionFee')}</Text>
                <Text h10 bgGray bold>{dataInfo.fee}{' '}{dataInfo.currency}</Text>
              </Fragment>
            )}
            <DivSpace height-10 />
            {!PageSend &&(
              <Fragment>
                <Text h10 bgGray>{i18n.t('CryptoBalance.component.confirmationCrypto.textTransactionFee')}</Text>
                <Text h10 bgGray bold>{PageBuy?data.fee:dataInfo.fee} {currencyUser}</Text>
              </Fragment>
            )}
            <DivSpace height-10 />

            <Text h10 white regular>{i18n.t('CryptoBalance.component.confirmationCrypto.textTransactionID')}:</Text>
            <Text white h10 semibold>{PageBuy?data.id:dataInfo.id}</Text>
            <DivSpace height-10 />
            {PageSend || !PageBuy &&(
              <Fragment>
                <Text h10 center white medium>{i18n.t('CryptoBalance.component.saleCrypto.textAddress')}</Text>
                <Text h10 center white>{dataInfo.address}</Text>
              </Fragment>
            )}
            <DivSpace height-15 />
            {PageSend &&(
              <Text h10 bold regular center white>{i18n.t('CryptoBalance.component.saleCrypto.textYouCanCheck')}<Text h12 white semibold>{' '}{i18n.t('CryptoBalance.component.saleCrypto.textMyWallet')}</Text></Text>
            )}
            {PageSale &&(
              <Text h12 bold regular center white>{i18n.t('CryptoBalance.component.saleCrypto.textYouCanCheck')}{' '}<Text h12 white semibold>{i18n.t('CryptoBalance.component.saleCrypto.textMyWallet')}</Text></Text>
            )}
            {PageBuy &&(
              <Text h12 bold regular center white>{i18n.t('CryptoBalance.component.confirmationCrypto.textYouCanCheck')}{' '}{showNameCrypto}{' '}{i18n.t('CryptoBalance.component.confirmationCrypto.textBalanceInThe')}<Text h12 white semibold>{' '}{i18n.t('CryptoBalance.component.confirmationCrypto.textMyCryptocurrencies')}</Text></Text>
            )}
            <DivSpace height-20 />
            <Text h10 white semibold center>-{i18n.t('CryptoBalance.component.confirmationCrypto.textAConfirmationWasSent')}</Text>
            <Text h10 white semibold center>-{i18n.t('CryptoBalance.component.confirmationCrypto.textConfirmationTimeCan')}{''}<Text white h10 regular>{i18n.t('CryptoBalance.component.confirmationCrypto.textDependingOnTheSpeed')}{' '}{i18n.t('CryptoBalance.component.confirmationCrypto.textBlockchainTakesAndThe')}</Text></Text>
            <DivSpace height-10 />   
          </View>
          <View centerH centerV bottom>
            <ButtonRounded
              size= 'sm'
              onPress={handleBackHome}
            >
              <Text h10 bold>
                {i18n.t('CryptoBalance.component.confirmationCrypto.buttonMyBalance') +' '+ showNameCrypto}
              </Text>
            </ButtonRounded>
          </View>
          <DivSpace height-20/>
        </BoxBlue>
      </SafeAreaView>
    </SignUpWrapper>
  );
};

export default ConfirmationCrypto;
