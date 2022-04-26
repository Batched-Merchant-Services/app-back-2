import React from 'react';
import { scale } from 'react-native-size-matters';
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

import Canceled from '@assets/brand/canceled.png';
import { useSelector } from 'react-redux';

const ActivateCardConfirmationScreen = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandThemeImages = userData?.Theme?.images;

  function handleActivatePress() {
    navigation.navigate('MyCards');
  }

  return (
    <SignUpWrapper>
      <NavigationBar body={i18n.t('cardCancel.component.confirmation')} />
      <DivSpace height-10 />
      <View
        marginH-20
        paddingV-20
        paddingH-30
        textBlueDark
        style={{ borderRadius: 10 }}
        centerH
        height-536
      >
        <Text center h16 medium white>
          {i18n.t('cardCancel.component.canceled')}
        </Text>
        <DivSpace height-31 />
        <BoxGradient size={82}>
          <ImageComponent
            source={brandThemeImages?.canceledCard?brandThemeImages?.canceledCard:Canceled}
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
        <DivSpace height-51 />
        <Text h12 regular center white>
          {i18n.t('cardCancel.component.confirmationDescription1')}
          <Text semibold orange>
            {i18n.t('cardCancel.component.confirmationDescription2')}
          </Text>
        </Text>
        <DivSpace height-33 />
        <Text h10 regular center white>
          {i18n.t('cardCancel.component.confirmationDescription3')}
          <Text semibold orange>
            {i18n.t('cardCancel.component.confirmationDescription4')}
          </Text>
        </Text>
        <DivSpace height-72 />
        <ButtonRounded
          style={{ width: scale(144), height: scale(30) }}
          onPress={handleActivatePress}
        >
          <Text h10 semibold>
            {i18n.t('cardCancel.component.back')}
          </Text>
        </ButtonRounded>
        <DivSpace height-71 />
      </View>
    </SignUpWrapper>
  );
};

export default ActivateCardConfirmationScreen;
