import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import {
  Text,
  View,
  Loader,
  Select,
  DivSpace,
  ButtonNext,
  SnackBar,
  ImageComponent,
  NavigationBar,
  AnimateLabelInput,
  AnimateLabelAmount,
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { moneyFormatter } from '@utils/formatters';
import { useSelector } from 'react-redux';
import i18n from '@utils/i18n';
import Styles from '@screens/store/styles';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { validatePayment } from '@utils/api/switch';
import LocalStorage from '@utils/localStorage';

const ProviderPaymentScreen = ({ navigation }) => {
  const redux = useSelector((state) => state);
  const userData = redux.user;
  const [sku, setSku] = useState('');
  const [title, setTitle] = useState('');
  const [typeSku, setTypeSku] = useState('');
  const [buttonNext, setButtonNext] = useState(false);
  const [amountMobile, setAmountMobile] = useState('');
  const [snakVisible, setSnakVisible] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [currencyUser] = useState(userData ? userData.currencyUser : '');
  const info = navigation.getParam('info');
  const data = navigation.getParam('data') ? navigation.getParam('data') : info.data.data;
  const phoneInfo = info ? info.data.phone : '';
  const referenceInfo = info ? info.data.reference : '';
  const phoneInfoSaved = phoneInfo ? phoneInfo : '';
  const referenceInfoSaved = referenceInfo ? referenceInfo : '';
  const datum1 = useValidatedInput('reference', referenceInfoSaved);
  const datum2 = useValidatedInput('phone', phoneInfoSaved);
  const amount = useValidatedInput('amount', '');
  const amountSelect = useValidatedInput('amount', { name: i18n.t('generics.selectOne') }, {
    changeHandlerSelect: 'onSelect'
  });


  const isValid = isFormValid(datum1, datum2, amount.value ? amount : amountSelect);

  function handleBackPress() {
    navigation.goBack();
  }

  async function handleNextPress() {
    setIsLoadingModal(true);
    const token = await LocalStorage.get('auth_token');
    const response = await validatePayment(
      token,
      amount.value ? amount.value : amountMobile,
      data.sku_lists[0].sku
        ? data.sku_lists[0].sku
        : sku,
      data.biller_id,
      data.sku_lists[0].type_sku
        ? data.sku_lists[0].type_sku
        : typeSku,
      datum2.value,
      datum1.value
    );
    if (response.code < 400) {
      setTimeout(function () {
        setIsLoadingModal(false);
        navigation.navigate('ProviderPaymentAmount', {
          data,
          datum1: datum1.value,
          datum2: datum2.value,
          amount: response.data.amount ? response.data.amount : amountMobile,
          feeS: response.data.fee_services,
          feeT: response.data.fee_transaccion,
        });
      }, 1000);
    } else {
      setIsLoadingModal(true);
      setTimeout(function () {
        setIsLoadingModal(false);
        setSnakVisible(true);
        setButtonNext(true);
        setTitle(response.message);
      }, 1000);
    }
  }

  const handleCloseNotif = () => {
    setSnakVisible(false);
    setButtonNext(false);
    setActionAnimated(true);
  };

  function onFill(code) {
    setSku(code.sku);
    setTypeSku(code.type_sku);
    setAmountMobile(code.amount);
  }

  return (
    <>
      <SignUpWrapper>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "height" : ""}
          style={{ flex: 1 }}
        >
          <NavigationBar
            disableExtraTop
            onBack={handleBackPress}
            body={i18n.t('storeProviderPayments.component.paymentTitle')}
          />
          <DivSpace height-20 />
          <View marginH-20 paddingB-20 textBlue01 style={Styles.providerPaymentContainer}>
            <View height-130 centerV centerH style={Styles.providerHeader}>
              <ImageComponent
                source={{ uri: data.logo }}
                width={'60%'}
                height={verticalScale(80)}
              />
            </View>
            <DivSpace height-20 />
            <View paddingL-20 paddingR-5>
              <Text h16 medium white>
                {data.biller_name}
              </Text>
              <DivSpace height-15 />
              <Text h10 regular white>
                {i18n.t('storeProviderPayments.component.fill')}
              </Text>
              <DivSpace height-7 />
              <AnimateLabelInput
                {...datum1}
                label={i18n.t('storeProviderPayments.component.textReference')}
                keyboardType={'default'}
                autoCapitalize={'none'}
              />
              <DivSpace height-5 />
              <AnimateLabelInput
                {...datum2}
                label={i18n.t('storeProviderPayments.component.textPhone')}
                keyboardType={'default'}
                autoCapitalize={'none'}
              />
              <DivSpace height-12 />
              <Text h10 textGray medium center>
                {i18n.t('storeProviderPayments.component.wallet')}
              </Text>
              <Text h10 textGray semibold center>
                {moneyFormatter(userData.balanceWallet)}{' '}{currencyUser}
              </Text>
              <DivSpace height-10 />
              <View centerH>
                <View style={{ width: '75%' }}>
                  {
                    data.dropdown
                      ? (<Select
                        {...amountSelect}
                        label={i18n.t('storeProviderPayments.component.amount')}
                        options={data.sku_lists}
                        onFill={(code) => onFill(code)}
                        topUp
                      />)
                      : (<AnimateLabelAmount
                        {...amount}
                        label={i18n.t('storeProviderPayments.component.amount')}
                        keyboardType={'default'}
                        autoCapitalize={'none'}
                      />)
                  }
                </View>
              </View>
              <DivSpace height-30 />
              <View centerH>
                <ButtonNext disabled={!isValid && !buttonNext ? true : buttonNext} onPress={handleNextPress} />
              </View>
              <DivSpace height-10 />
            </View>
          </View>
          {isLoadingModal && (
            <Loader
              isOpen={true}
              navigation={navigation} />)}
        </KeyboardAvoidingView>
      </SignUpWrapper>
      <SnackBar
        message={title}
        isVisible={snakVisible}
        onClose={handleCloseNotif}
        animationAction={actionAnimated}
      />
    </>
  );
};

export default ProviderPaymentScreen;
