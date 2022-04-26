import React, { useRef } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import {
  ButtonFloating,
  ButtonRounded,
  DivSpace,
  NavigationBar,
  Text,
  View
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import PaymentElement from '@screens/internationalPayments/components/PaymentElement';
import i18n from '@utils/i18n';

import Styles from '@screens/internationalPayments/styles';

const ReceivedInternationalPayments = ({ navigation }) => {
  const scrollView = useRef(null);
  const handleGoUpPress = () =>
    scrollView.current.scrollTo({ x: 0, y: 0, animated: true });
  const handleAcceptPayment = () =>
    navigation.navigate('ReceivedInternationalPayment')
    ;
  const handlePaymentPress = () =>
    navigation.navigate('ReceivedInternationalPayment');

  const payment = {
    contactName    : 'Urbano Fernando',
    contactLastName: 'Ballesteros Morales',
    date       : '25/06/19',
    amount     : '12358.99',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pharetra mattis fringilla. Maecenas porta tellus.'
  };

  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView forceInset={{top: 'always'}}>
        <NavigationBar
          disableExtraTop
          onBack={() => navigation.goBack()}
          body={i18n.t('receivedInternationalPayments.component.title')}
          onClose={null}
        />
        <DivSpace height-15/>
        <ScrollView ref={scrollView} style={Styles.scrollView}>
          {Array.from({ length: 10 }).map((_, key) => (
            <PaymentElement
              key={key}
              payment={payment}
              onPress={handlePaymentPress}
            >
              <View row>
                <View flex-1>
                  <ButtonRounded darkBlue style={Styles.deny}>
                    <Text h10 semibold>
                      {i18n.t('receivedInternationalPayments.component.deny')}
                    </Text>
                  </ButtonRounded>
                </View>
                <View flex-1 right>
                  <ButtonRounded
                    style={Styles.accept}
                    onPress={handleAcceptPayment}
                  >
                    <Text h10 semibold>
                      {i18n.t('receivedInternationalPayments.component.accept')}
                    </Text>
                  </ButtonRounded>
                </View>
              </View>
            </PaymentElement>
          ))}
        </ScrollView>
      </SafeAreaView>
      <View centerH style={Styles.viewBtnFloating}>
        <ButtonFloating onPress={handleGoUpPress} />
      </View>
    </SignUpWrapper>
  );
};

export default ReceivedInternationalPayments;
