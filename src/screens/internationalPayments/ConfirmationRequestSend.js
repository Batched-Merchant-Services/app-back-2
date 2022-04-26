import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import {
  View,
  DivSpace,
  NavigationBar,
  BoxBlue,
  ImageComponent,
  Text,
  ButtonBackHome,
  BoxGradient
} from '@components';
import Sent from '@assets/internationalPayments/sent.png';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import Styles from '@screens/nationalPayments/styles';

const ConfirmationRequestSend = ({ navigation }) => {

  const handlePressHome = () => {
    navigation.navigate('MyWallet');
  };
  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView style={Styles.viewInfoCntc} forceInset={{top: 'always'}}>
        <NavigationBar
          disableExtraTop
          onBack={() => navigation.goBack()}
          body={i18n.t('requestInternationalPayments.component.title')}
          onClose={null}
        />
        <DivSpace height-20 />
        <BoxBlue>
          <DivSpace height-25 />
          <View centerH style={{ flex: 0.5 }} >
            <Text white h16 semibold>
              {i18n.t('requestInternationalPayments.component.textConfirmationSend')}
            </Text>
          </View>
          <View centerH style={{ flex: 1.2 }} >
            <BoxGradient>
              <ImageComponent
                source={Sent}
                width={verticalScale(60)}
                height={verticalScale(60)}
              />
            </BoxGradient>
          </View>
          <View centerH paddingH-75 flex-1 >
            <Text center h12 white>
              {i18n.t('requestInternationalPayments.component.textDescription')}{' '}
              <Text semibold white>{i18n.t('requestInternationalPayments.component.textMyPurse')}</Text>
            </Text>
          </View>
          <View centerH bottom flex-1 >
            <View centerH centerV bottom >
              <ButtonBackHome onPress={handlePressHome} />
            </View>
            
            <DivSpace height-50 />
          </View>
        </BoxBlue>
      </SafeAreaView>
    </SignUpWrapper>
  );
};

export default ConfirmationRequestSend;
