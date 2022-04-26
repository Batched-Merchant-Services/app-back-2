import React, {useRef} from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { NavigationBar, View, ButtonFloating, ButtonRounded, Text,DivSpace } from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import PaymentElement from '@screens/internationalPayments/components/PaymentElement';
import i18n from '@utils/i18n';

import Styles from '@screens/internationalPayments/styles';

const RequestedInternationalPayments = ({ navigation }) => {
  let page = navigation.state.params.page ? navigation.state.params.page :'';

  const scrollView = useRef(null);
  const handleGoUpPress = () => scrollView.current.scrollTo({ x: 0, y: 0, animated: true });

  const payment = {
    contactName    : '',
    contactLastName: '',
    date           : '25/06/19',
    amount         : '10876.56',
    description    : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pharetra mattis fringilla. Maecenas porta tellus.'
  };
  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView forceInset={{top: 'always'}}>
        <NavigationBar
          disableExtraTop
          onBack={() => navigation.goBack()}
          body={page === 'sent'? i18n.t('requestedInternationalPayments.component.titleSent') : i18n.t('requestedInternationalPayments.component.title')}
          onClose={null}
        />
        <DivSpace height-15/>
        <ScrollView ref={scrollView} style={Styles.scrollView}>
          {Array.from({ length: 10 }).map((_, key) => (
            <PaymentElement key={key} payment={payment} white page={page}>
              <View row right>
                <ButtonRounded style={Styles.cancel}>
                  <Text h10 semibold>
                    {i18n.t('requestedInternationalPayments.component.cancel')}
                  </Text>
                </ButtonRounded>
              </View>
            </PaymentElement>
          ))}
        </ScrollView>
      </SafeAreaView>
      <View centerH style={Styles.viewBtnFloating}>
        <ButtonFloating
          onPress={handleGoUpPress}
        />
      </View>
    </SignUpWrapper>
  );
};

export default RequestedInternationalPayments;
