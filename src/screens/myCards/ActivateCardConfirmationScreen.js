import React from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
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
      <NavigationBar body={i18n.t('cardActivation.component.confirmation')} />
      <DivSpace height-10 />
      <View
        marginH-20
        paddingV-20
        paddingH-20
        centerH
        textBlueDark
        style={{ borderRadius: 10 }}
        height-536
      >
        <Text center h16 medium white>
          {i18n.t('cardActivation.component.activated')}
        </Text>
        <DivSpace height-70 />
        <BoxGradient size={82}>
          <ImageComponent
            source={brandThemeImages?.Active?brandThemeImages?.Active:Active}
            height={verticalScale(51)}
            width={verticalScale(53)}
            style={{
              height  : verticalScale(51),
              width   : verticalScale(53),
              position: 'absolute',
              top     : -scale(5),
              zIndex  : 2
            }}
          />
        </BoxGradient>
        <DivSpace height-70 />
        <Text h12 regular center white>
          {i18n.t('cardActivation.component.confirmationDescription1')}
          <Text semibold orange>
            {i18n.t('cardActivation.component.confirmationDescription2')}
          </Text>
        </Text>

        <DivSpace height-70 />
        <ButtonRounded
          style={{ width: scale(144), height: scale(30) }}
          onPress={handleActivatePress}
        >
          <Text h10 semibold>
            {i18n.t('cardActivation.component.seeCard')}
          </Text>
        </ButtonRounded>
      </View>
    </SignUpWrapper>
  );
};

export default ActivateCardConfirmationScreen;
