import React from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  NavigationBar,
  DivSpace,
  View,
  ImageComponent,
  Text,
  ButtonRounded,
  AnimateLabelAmount
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';

import i18n from '@utils/i18n';
import { moneyFormatter } from '@utils/formatters';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import Styles from './styles';
import CreditImage from '@assets/credits/credit-image.png';

const ManualCreditPayment = ({ navigation }) => {
  const amount = useValidatedInput('amount', '');
  const isValid = isFormValid(amount);

  function handlePressBack() {
    navigation.goBack();
  }

  function handlePay() {
    navigation.navigate('ConfirmationPinUser', {
      data: {},
      next: 'ManualCreditPaymentSuccessful'
    });
  }

  return (
    <SignUpWrapper forceInset={{ bottom: 'never' }}>
      <NavigationBar
        onBack={handlePressBack}
        body={i18n.t('manualCreditPayment.component.title')}
      />
      <DivSpace height-18 />
      <View marginH-18 textBlueDark style={Styles.manualCreditWrapper}>
        <View
          centerH
          centerV
          height-118
          style={Styles.manualCreditImageWrapper}
        >
          <ImageComponent
            source={CreditImage}
            width={scale(186)}
            height={verticalScale(56)}
          />
        </View>
        <View centerH>
          <DivSpace height-39 />
          <Text h16 medium center>
            Elecreódomésticos{'\n'}Liverpool
          </Text>
          <DivSpace height-35 />
          <Text h10 medium center textGray>
            {i18n.t('manualCreditPayment.component.date')}
          </Text>
          <Text h16 regular center>
            12/12/2020
          </Text>
          <DivSpace height-25 />
          <Text h10 medium center textGray>
            {i18n.t('manualCreditPayment.component.available')}
          </Text>
          <Text h10 semibold center textGray>
            {moneyFormatter(8787.88)}
          </Text>
          <DivSpace height-25 />
          <View width-163>
            <AnimateLabelAmount
              {...amount}
              label={i18n.t('manualCreditPayment.component.amount')}
              keyboardType={'default'}
              autoCapitalize={'none'}
            />
          </View>
          <DivSpace height-30 />
          <ButtonRounded
            style={Styles.manualCreditButton}
            onPress={handlePay}
            disabled={!isValid}
          >
            <Text h10 semibold>
              {i18n.t('manualCreditPayment.component.pay')}
            </Text>
          </ButtonRounded>
          <DivSpace height-59 />
        </View>
      </View>
    </SignUpWrapper>
  );
};

export default ManualCreditPayment;
