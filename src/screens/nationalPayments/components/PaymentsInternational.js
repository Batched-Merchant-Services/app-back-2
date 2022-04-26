import React from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import { View, Text, DivSpace, ButtonRounded } from '@components';
import PaymentsInternationalButton from '@screens/nationalPayments/components/PaymentsInternationalButton';
import Styles from '@screens/nationalPayments/styles';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';
import Received from '@assets/internationalPayments/received.png';
import Sent from '@assets/internationalPayments/sent.png';
import IconPeople from '@utils/iconSVG/IconPeople';


const PaymentsInternational = ({ navigation }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  const handleReceivedPaymentsPress = () =>
    navigation.navigate('ReceivedInternationalPayments');
  const handleRequestedPaymentsPress = () =>
    navigation.navigate('RequestedInternationalPayments',{ page: 'sent' });
  const handleRequestPaymentPress = () =>
    navigation.navigate('PaymentToContacts',{ page: 'requestPayment' });

  return (
    <View textBlueDark style={Styles.carouselItem} paddingV-25>
      <View flex-1 centerH>
        <View centerH centerV>
          <IconPeople width={scale(76)} height={verticalScale(44)}  fill={brandTheme?.orange??Colors?.orange} fillSecondary={brandTheme?.white??Colors?.white}/>
        </View>
        <DivSpace height-17 />
        <Text h14 white center>
          {i18n.t('internationalPayments.component.title1')}{' '}
          <Text h14 semibold white>
            {i18n.t('internationalPayments.component.title2')}
            {'\n'}
          </Text>
          {i18n.t('internationalPayments.component.title3')}
        </Text>
        <DivSpace height-14 />
        <View width-220>
          <Text h12 white center>
            {i18n.t('internationalPayments.component.description')}
          </Text>
        </View>
        <DivSpace height-32 />
        <View height-126 row centerH centerV>
          <PaymentsInternationalButton
            label={i18n.t('internationalPayments.component.received')}
            image={Received}
            badge={17}
            onPress={handleReceivedPaymentsPress}
          />
          <DivSpace width-30 />
          <PaymentsInternationalButton
            label={i18n.t('internationalPayments.component.sent')}
            image={Sent}
            onPress={handleRequestedPaymentsPress}
          />
        </View>
        <DivSpace height-39 />
        <ButtonRounded onPress={handleRequestPaymentPress}>
          <Text h10 semibold>
            {i18n.t('internationalPayments.component.button')}
          </Text>
        </ButtonRounded>
      </View>
    </View>
  );
};

export default PaymentsInternational;
