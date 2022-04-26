import React,{useState} from 'react';
import { scale } from 'react-native-size-matters';
import {
  ButtonRounded,
  ButtonBackHome,
  DivSpace,
  NavigationBar,
  Text,
  View,
  BoxGradient,
  ImageComponent,
  SnackBar
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import i18n from '@utils/i18n';
import Styles from '@screens/store/styles';
import Payment from '@assets/store/payment.png';
import { useDispatch } from 'react-redux';
import { addItem } from '@store/ducks/user.ducks';

const ProviderPaymentSuccessfulScreen = ({ navigation }) => {
  const data = navigation.getParam('data');
  const date = navigation.getParam('date');
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [title, setTitle] = useState(i18n.t('storeProviderPayments.component.textSaved'));
  const dispatch = useDispatch();


  const handleSavePayment = () =>{
    dispatch(addItem({ data,date }));
    setSnakVisible(true);
    setTitle(title);
  }; 


  function handleHomePress() {
    navigation.navigate('MyWallet');
    setSnakVisible(false);
  }

  const handleCloseNotif = async () => {
    setSnakVisible(false);
    setActionAnimated(true);
  };

  return (
    <>
    <SignUpWrapper>
      <NavigationBar
        disableExtraTop
        onBack={null}
        body={i18n.t('storeProviderPayments.component.confirmation')}
      />
      <DivSpace height-20 />
      <View
        marginH-20
        paddingH-20
        paddingB-45
        centerH
        textBlueDark
        style={Styles.providerPaymentContainer2}
      >
        <DivSpace height-26 />
        <Text medium h16 center white>
          {i18n.t('storeProviderPayments.component.paymentTitle')}
        </Text>
        <DivSpace height-26 />
        <BoxGradient size={82}>
          <ImageComponent source={Payment} width={82} height={82} />
        </BoxGradient>
        <DivSpace height-26 />
        <Text h12 white>{i18n.t('storeProviderPayments.component.waiting')}</Text>
        <DivSpace height-22 />
        <Text h10 textGray center>
          {i18n.t('storeProviderPayments.component.rejected1')}{' '}
          <Text h10 semibold textGray>
            {i18n.t('storeProviderPayments.component.rejected2')}
          </Text>
        </Text>
        <DivSpace height-22 />
        <Text h12 white>{i18n.t('storeProviderPayments.component.save')}</Text>
        <DivSpace height-22 />
        <ButtonRounded
          blue
          style={{ width: scale(180), height: scale(30) }}
          onPress={handleSavePayment}
        >
          <Text h10 semibold center style={{ width: scale(180) }}>
            {i18n.t('storeProviderPayments.component.saveButton')}
          </Text>
        </ButtonRounded>
        <DivSpace height-38 />
        <ButtonBackHome onPress={handleHomePress} />
      </View>
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

export default ProviderPaymentSuccessfulScreen;
