import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { scale, verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import {
  View,
  DivSpace,
  NavigationBar,
  BoxBlue,
  ImageComponent,
  ImageAvatar,
  Text,
  ButtonRounded
} from '@components';
import { moneyFormatter } from '@utils/formatters';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import startDisable from '@assets/icons/startDisable.png';

import Styles from '@screens/nationalPayments/styles';

const ReceivedInternationalPayment = ({ navigation }) => {
  function handlePressNext() {
    navigation.navigate('PayConfirmation');
  }

  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView style={Styles.viewInfoCntc} forceInset={{top: 'always'}}>
        <NavigationBar
          disableExtraTop
          onBack={() => navigation.goBack()}
          body={i18n.t('receivedInternationalPayments.component.title')}
          onClose={null}
        />
        <DivSpace height-15 />
        <BoxBlue>
          <View right marginT-15 marginR-15>
            <ImageComponent
              bgBlue01
              source={startDisable}
              width={scale(32)}
              height={verticalScale(30)}
            />
          </View>
          <View centerH>
            <ImageAvatar source={''} width={80} height={80} />
            <DivSpace height-15 />
            <Text H16 white semibold>
              FERNANDO MORALES
            </Text>
            <DivSpace height-5 />
            <Text H16 regular bgGray>
              015523033632
            </Text>
            <DivSpace height-35 />
            <Text H10 regular bgGray>
              {i18n.t('receivedInternationalPayments.component.available')}
            </Text>
            <DivSpace height-5 />
            <Text H10 semibold bgGray>
              {moneyFormatter(789812)}
            </Text>
          </View>
          <DivSpace height-40 />
          <View flex-1 marginH-65>
            <Text center h10 white>
              {i18n.t('receivedInternationalPayments.component.requested')}
            </Text>
            <Text center h32 white semibold>{moneyFormatter(1254.67)}</Text>
            <Text center h10 white>
              MXN
            </Text>
          </View>
          <View centerH centerV bottom>
            <ButtonRounded onPress={handlePressNext}>
              <Text h10 semibold>
                {i18n.t('nationalPayments.component.buttonPay')}
              </Text>
            </ButtonRounded>
          </View>
          <DivSpace height-60 />
        </BoxBlue>
      </SafeAreaView>
    </SignUpWrapper>
  );
};

export default ReceivedInternationalPayment;
