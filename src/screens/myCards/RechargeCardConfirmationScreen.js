import React from 'react';
import { scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import {
  DivSpace,
  NavigationBar,
  View,
  Text,
  ImageComponent,
  BoxGradient,
  ButtonRounded
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import i18n from '@utils/i18n';

import Active from '@assets/brand/active.png';


const ActivateCardConfirmationScreen = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandThemeImages = userData?.Theme?.images;
  function handleActivatePress() {
    navigation.navigate('MyCards');
  }

  return (
    <SignUpWrapper>
      <NavigationBar body={i18n.t('cardRecharge.component.confirmation')} />
      <DivSpace height-10 />
      <View
        marginH-20
        paddingV-20
        paddingH-20
        centerH
        textBlueDark
        height-536
      >
        <Text center h16 medium white>
          {i18n.t('cardRecharge.component.activated')}
        </Text>
        <DivSpace height-70 />
        <BoxGradient size={82}>
          <ImageComponent
            source={brandThemeImages?.active?brandThemeImages?.active:Active}
            height={scale(59)}
            width={scale(61)}
            style={{
              width   : scale(61),
              height  : scale(59),
              position: 'absolute',
              top     : -scale(5),
              zIndex  : 2
            }}
          />
        </BoxGradient>
        <DivSpace height-70 />
        <Text h12 regular center white>
          {i18n.t('cardRecharge.component.confirmationDescription1')}
          <Text semibold orange>
            {i18n.t('cardRecharge.component.confirmationDescription2')}
          </Text>
        </Text>

        <DivSpace height-70 />
        <ButtonRounded
          style={{ width: scale(144), height: scale(30) }}
          onPress={handleActivatePress}
        >
          <Text h10 semibold >
            {i18n.t('cardRecharge.component.seeCard')}
          </Text>
        </ButtonRounded>
      </View>
    </SignUpWrapper>
  );
};

export default ActivateCardConfirmationScreen;
