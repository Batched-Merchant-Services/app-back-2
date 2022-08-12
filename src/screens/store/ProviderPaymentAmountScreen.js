import React,{useState} from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  ButtonRounded,
  DivSpace,
  NavigationBar,
  Text,
  View,
  Line
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { useSelector} from 'react-redux';
import { moneyFormatter } from '@utils/formatters';
import i18n from '@utils/i18n';
import Styles from '@screens/store/styles';

const ProviderPaymentAmountScreen = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const [currencyUser]=useState(userData?userData.currencyUser:'');
  const dataSend = navigation.getParam('data');
  const infoPayment = navigation.getParam('info');
  const feeServiceSend = navigation.getParam('feeS');
  const feeTransactionSend = navigation.getParam('feeT');
  const referenceSend = navigation.getParam('datum1');
  const phoneSend = navigation.getParam('datum2');
  const amountSend = navigation.getParam('amount');
  const data = infoPayment ? infoPayment.data: dataSend;
  const phone = phoneSend ? phoneSend : data.phone;
  const reference = referenceSend ? referenceSend : data.reference;
  const amountParam = amountSend ? amountSend : data.amountParam;
  const feeService = feeServiceSend ? feeServiceSend : data.feeService;
  const feeTransaction = feeTransactionSend ? feeTransactionSend : data.feeTransaction;

  function handleBackPress() {
    navigation.goBack();
  }

  function handleNextPress() {
    navigation.navigate('Pin2faConfirmation', {
      data: {page: 'payServices', data: infoPayment ? data.data: data ,phone ,reference, amountParam,feeService,feeTransaction},
      next: 'ProviderPaymentSuccessful'
    });
  } 

  return (
    <SignUpWrapper>
      <NavigationBar
        disableExtraTop
        onBack={handleBackPress}
        body={i18n.t('storeProviderPayments.component.paymentTitle')}
      />
      <DivSpace height-20 />
      <View
        marginH-20
        paddingH-20
        paddingB-20
        textBlueDark
        style={Styles.providerPaymentContainer2}
      >
        <DivSpace height-26 />
        <Text h10 textGray center>
          {i18n.t('storeProviderPayments.component.confirmInformation')}
        </Text>
        <DivSpace height-20 />
        <Text h10 textGray center>
          {i18n.t('storeProviderPayments.component.provider')}
        </Text>
        <Text h12 center white>
          {dataSend? dataSend.biller_name: data.data.biller_name}
        </Text>
        <DivSpace height-12 />
        <Text h10 textGray center>
          {i18n.t('storeProviderPayments.component.textPhone')}
        </Text>
        <Text h12 center white>
          { phone }
        </Text>
        <DivSpace height-12 />
        <Text h10 textGray center>
          {i18n.t('storeProviderPayments.component.textReference')}
        </Text>
        <Text h12 center white>
          { reference }
        </Text>
        <DivSpace height-12 />
        <Text h10 textGray center>
          {i18n.t('storeProviderPayments.component.amount')}
        </Text>
        <Text h12 center white>
          {moneyFormatter(amountParam)}{' '}{currencyUser}
        </Text>
        <DivSpace height-20 />
        <Line color="bgBlue02" />
        <DivSpace height-20 />
        <Text h10 textGray semibold center>
          {i18n.t('storeProviderPayments.component.comission')}
        </Text>
        <Text h10 textGray semibold center>
          {moneyFormatter(feeService )}{' '}{currencyUser} 
        </Text>
        <DivSpace height-10 />
        <Text h10 textGray medium center>
          {i18n.t('storeProviderPayments.component.fee')}
        </Text>
        <Text h10 textGray semibold center>
          {moneyFormatter(feeTransaction )}{' '}{currencyUser}
        </Text>
        <DivSpace height-30 />
        <Text h10 regular center white>
          <Text semibold white>
            {i18n.t('storeProviderPayments.component.verify1')}
            {'\n'}
          </Text>
          {i18n.t('storeProviderPayments.component.verify2')}
        </Text>
        <DivSpace height-40 />
        <View centerH>
          <ButtonRounded
            style={{ width: scale(144), height: verticalScale(30) }}
            onPress={handleNextPress}
          >
            <Text h10 semibold>
              {i18n.t('storeProviderPayments.component.buttonPay')}
            </Text>
          </ButtonRounded>
        </View>
        <DivSpace height-30 />
      </View>
    </SignUpWrapper>
  );
};

ProviderPaymentAmountScreen.defaultProps = {};

export default ProviderPaymentAmountScreen;
