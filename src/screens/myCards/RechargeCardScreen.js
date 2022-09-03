import React,{useState} from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import { KeyboardAvoidingView, Platform } from 'react-native';
import {
  DivSpace,
  NavigationBar,
  View,     
  Text,
  ButtonRounded,
  AnimateLabelAmount
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import Cards from '@screens/myCards/components/Cards';
import i18n from '@utils/i18n';
import { useSelector } from 'react-redux';
import { moneyFormatter } from '@utils/formatters';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import Styles from './styles';
import Modal2faConfirmation from '@screens/auth2fa/Modal2faConfirmation';

const RechargeCardScreen = ({ navigation }) => {
  const data = navigation.getParam('dataBackup');
  const redux = useSelector((state) => state);
  const userData = redux.user;
  const [showModal2fa, setShowModal2fa] = useState(false);
  const [currencyUser]=useState(userData?userData.currencyUser:'');
  const [balanceWallet]=useState(userData?userData.balanceWallet:'');
  const amount = useValidatedInput('amount', '');
  const isValid = isFormValid(amount);

  function handleRechargePress() {
    var foobar = [3, 2, 1];
    if (!foobar.includes(userData?.type2fa)) {
      setShowModal2fa(true);
    } else {
      navigation.navigate('Pin2faConfirmation', {
        data: {page: 'topUp',data: data, amount: amount.value},
        next: 'RechargeCardConfirmation'
      });
      //navigation.navigate('Pin2faConfirmation',{page: 'topUp',data: data, amount: amount.value});   
    }
  }

  function handleBackPress() {
    navigation.goBack();
  }

  const handleClose = () => {
    setShowModal2fa(!showModal2fa);
  };

  return (
    <SignUpWrapper>
    <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : ""}
          
        >
      <NavigationBar
        onBack={handleBackPress}
        body={i18n.t('cardRecharge.component.title')}
      />
      <DivSpace height-10 />
      <View
        marginH-20
        paddingV-20
        paddingH-20
        centerH
        textBlueDark
        style={{ borderRadius: 10 }}
      >
        <DivSpace height-16 />
          <Cards
            {...data}
            available={true}
            width={verticalScale(260)} 
            height={verticalScale(170)}
          />
        <DivSpace height-40 />
        <View>
          <Text h10 center textGray>
            {i18n.t('cardRecharge.component.walletAvailable')}
          </Text>
          <Text h10 center semibold textGray>
            {moneyFormatter(balanceWallet)}{' '}{currencyUser}
          </Text>
        </View>
        <DivSpace height-34 />
        <View width-163>
          <AnimateLabelAmount
            {...amount}
            label={i18n.t('cardRecharge.component.amount')}
            keyboardType={'default'}
            returnKeyType={'done'}
            autoCapitalize={'none'}
          />
        </View>
        
        <DivSpace height-26 />
        <ButtonRounded
          style={{ width: scale(144), height: scale(30) }}
          onPress={handleRechargePress}
          disabled={!isValid}
        >
          <Text h10 semibold>
            {i18n.t('cardRecharge.component.button')}
          </Text>
        </ButtonRounded>
      </View>
      </KeyboardAvoidingView>
      <Modal2faConfirmation
        visible={showModal2fa}
        onRequestClose={() => { setShowModal2fa(false) }}
        onPressOverlay={handleClose}
        navigation={navigation}
      />
    </SignUpWrapper>
  );
};

export default RechargeCardScreen;
