import React from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  NavigationBar,
  DivSpace,
  View,
  ImageComponent,
  Text,
  Link,
  ButtonRounded,
  BoxGradient
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';

import i18n from '@utils/i18n';
import Styles from './styles';
import uulala from '@assets/credits/uulala.png';

const ManualCreditPayment = ({ navigation }) => {

  function handlePressBack() {
    navigation.goBack();
  }

  return (
    <SignUpWrapper forceInset={{ bottom: 'never' }}>
      <NavigationBar
        onBack={handlePressBack}
        body={i18n.t('manualCreditPayment.component.confirmation')}
      />
      <DivSpace height-18 />
      <View marginH-18 textBlueDark style={Styles.manualCreditWrapper}>
        <View centerH>
          <DivSpace height-33 />
          <Text h16 medium center white>
            {i18n.t('manualCreditPayment.component.completed')}
          </Text>
          <DivSpace height-28 />
          <BoxGradient size={82}>
            <ImageComponent
              source={uulala}
              width={scale(68)}
              height={verticalScale(68)}
            />
          </BoxGradient>
          <DivSpace height-42 />
          <Text h12 medium center white>
            {i18n.t('manualCreditPayment.component.points')}{' '}
          </Text>
          <Text h32 medium center white>
            +250
          </Text>
          <DivSpace height-22 />
          <Text h12 regular center white>
            {i18n.t('manualCreditPayment.component.reachNext')}
          </Text>
          <DivSpace height-47 />
          <Link>{i18n.t('manualCreditPayment.component.details')}</Link>
          <DivSpace height-62 />
          <View centerH centerV bottom>
            <ButtonRounded style={{width: scale(180)}} onPress={() => {}}>
              <Text h12 semibold>
                {i18n.t('manualCreditPayment.component.myLevel')}
              </Text>
            </ButtonRounded>
          </View>
          <DivSpace height-43 />
        </View>
      </View>
    </SignUpWrapper>
  );
};

export default ManualCreditPayment;
