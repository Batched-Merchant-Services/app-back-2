import React from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import { View, Text, DivSpace } from '@components';
import PaymentsInternationalButton from '@screens/nationalPayments/components/PaymentsInternationalButton';
import Styles from '@screens/nationalPayments/styles';
import { useSelector } from 'react-redux';
import Received from '@assets/brand/recievedQR.png';
import Sent from '@assets/brand/requestQR.png';
import IconQrCodeYellowWhite from '@utils/iconSVG/IconQrCodeYellowWhite';
import Colors from '@styles/Colors';


const PaymentsBetweenUsers = ({ navigation }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const brandThemeImages = appData?.Theme?.images;

  const handleReceivedQRPress = () =>
    navigation.navigate('ReceivedQRPayment');

  const handleRequestedQRPress = () =>
    navigation.navigate('ScanQR');
 
  return (
    <View textBlueDark style={Styles.carouselItem} paddingV-25>
      <View flex-1 centerH>
        <View centerH centerV>
          <IconQrCodeYellowWhite width={scale(76)} height={verticalScale(44)}  fill={brandTheme?.orange??Colors?.orange} fillSecondary={brandTheme?.white??Colors?.white}/>
        </View>
        <DivSpace height-17 />
        <Text h14 white semibold>
          {i18n.t('receivedQRPayments.component.title')}
        </Text>
        <DivSpace height-40 />
        <View marginH-50>
          <Text center h12 white>
            {i18n.t('receivedQRPayments.component.textMakeaPayment')}
          </Text>
        </View>
        <DivSpace height-70 />
        <View height-126 row centerH centerV>
          <PaymentsInternationalButton
            label={i18n.t('receivedQRPayments.component.textPay')}
            image={brandThemeImages?.requestQR?brandThemeImages?.requestQR:Sent}
            onPress={handleRequestedQRPress}
          />
          <DivSpace width-30 />
          <PaymentsInternationalButton
            label={i18n.t('receivedQRPayments.component.textReceivedPay')}
            image={brandThemeImages?.recievedQR?brandThemeImages?.recievedQR:Received}
            onPress={handleReceivedQRPress }
          />
        </View>
      </View>
    </View>
  );
};

export default PaymentsBetweenUsers;
