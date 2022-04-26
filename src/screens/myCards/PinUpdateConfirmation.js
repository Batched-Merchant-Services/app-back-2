import React from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  DivSpace,
  NavigationBar,
  View,
  Text,
  ImageComponent,
  BoxGradient,
  ButtonRounded,
  BoxBlue
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import i18n from '@utils/i18n';

import Active from '@assets/brand/active.png';
import { useSelector } from 'react-redux';

const PinUpdateConfirmation = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandThemeImages = userData?.Theme?.images;

  function handleActivatePress() {
    navigation.navigate('MyCards');
  }

  return (
    <SignUpWrapper>
      <NavigationBar body={i18n.t('myCards.component.pinUpdateConfirmation.title')} />
      <DivSpace height-10 />
      <View centerH >
        <BoxBlue>
          <DivSpace height-10 />
          <View centerH  paddingH-25>
            <DivSpace height-8 />
            <Text center h16 medium white>
              {i18n.t('myCards.component.pinUpdateConfirmation.textUpdatedCardInformation')}
            </Text>
            <DivSpace height-70 />
            <BoxGradient size={82}>
              <ImageComponent
                source={brandThemeImages?.active?brandThemeImages?.active:Active}
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
              {i18n.t('myCards.component.pinUpdateConfirmation.textYourPINChange')}
            </Text>
            <DivSpace height-10 />
            <Text h10 regular center white>
              {i18n.t('myCards.component.pinUpdateConfirmation.textUsItAtATMsAndToApprove')}
            </Text>
            <DivSpace height-80 />
            <ButtonRounded
              style={{ width: scale(144), height: scale(30) }}
              onPress={handleActivatePress}
            >
              <Text h10 semibold>
                {i18n.t('myCards.component.pinUpdateConfirmation.buttonBackToCard')}
              </Text>
            </ButtonRounded>
            <DivSpace height-20 />
          </View>
        </BoxBlue>
      </View>
     
    </SignUpWrapper>
  );
};

export default PinUpdateConfirmation;
