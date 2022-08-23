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
import liverpool from '@assets/store/providers/liverpool.png';
import Modal2faConfirmation from '@screens/auth2fa/Modal2faConfirmation';
import { useSelector } from 'react-redux';


const paymentToEstablishment = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const amount = useValidatedInput('amount', '');
  const isValid = isFormValid(amount);
  const [showModal2fa, setShowModal2fa] = useState(false);

  function handlePressBack() {
    navigation.goBack();
  }

  
  function handlePay() {
    var foobar = [3, 2, 1];
    if (!foobar.includes(userData?.type2fa)) {
      setShowModal2fa(true);
    } else {
      navigation.navigate('Pin2faConfirmation', {
        data: {},
        next: 'confirmationEstablishment'
      });
      //navigation.navigate('Pin2faConfirmation');   
    }
  }

  return (
    <SignUpWrapper forceInset={{ bottom: 'never' }}>
      <NavigationBar
        onBack={handlePressBack}
        body={i18n.t('PaymentToEstablishment.component.title')}
      />
      <DivSpace height-18 />
      <View textBlueDark marginH-18 style={Styles.manualCreditWrapper}>
        <View
          centerH
          centerV
          height-118
          white
          style={Styles.manualCreditImageWrapper}
        >
          <ImageComponent
            source={liverpool}
            width={scale(228)}
            height={verticalScale(70)}
          />
        </View>
        <View centerH>
          <DivSpace height-39 />
          <Text h16 medium center white>
            Liverpool Insurgentes
          </Text>
          <DivSpace height-35 />
          <Text h10 medium center textGray>
            {i18n.t('PaymentToEstablishment.component.textAddress')}
          </Text>
          <Text h16 regular center white>
            Calle Roma 11, Izcalli pirámide, Tlalnepantla de baz
          </Text>
          <DivSpace height-25 />
          <Text h10 medium center textGray>
            {i18n.t('PaymentToEstablishment.component.textAvailableinWallet')}
          </Text>
          <Text h10 semibold center textGray>
            {moneyFormatter(8787.88)}
          </Text>
          <DivSpace height-25 />
          <View width-163>
            <AnimateLabelAmount
              {...amount}
              label={i18n.t('PaymentToEstablishment.component.inputPayAmount')}
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
              {i18n.t('PaymentToEstablishment.component.buttonPay')}
            </Text>
          </ButtonRounded>
          <DivSpace height-59 />
        </View>
      </View>
      <Modal2faConfirmation
        visible={showModal2fa}
        onRequestClose={() => { setShowModal2fa(false) }}
        onPressOverlay={handleClose}
        navigation={navigation}
      />
    </SignUpWrapper>
  );
};

export default paymentToEstablishment;
