import React from 'react';

import { scale, verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import { View, Text, ImageComponent, DivSpace, ButtonRounded } from '@components';
import Styles from '@screens/welcome/styles';

import MyCredits from '@assets/welcome/credits.png';

const Credits = ({ newOffers = 0 }) => {
  return (
    <View style={Styles.carouselItem} paddingV-20>
      <Text center h17 medium blueDark>
        {i18n.t('welcome.component.credits')}
      </Text>
      <DivSpace height-12 />
      <View centerH>
        <ImageComponent source={MyCredits} width={scale(197)} height={verticalScale(136)} />
        <DivSpace height-20 />
        <Text h11 blueDark>
          {i18n.t('welcome.component.creditsValue1')}
        </Text>
        <DivSpace height-5 />
        <Text h32 blueDark bold>
          {newOffers}
        </Text>
        <DivSpace height-5 />
        <Text h11 blueDark>
          {i18n.t('welcome.component.creditsValue2')}
        </Text>
        <DivSpace height-30 />
        <View height-30>
          <ButtonRounded blue>
            <Text h10 semibold>
              {i18n.t('welcome.component.creditsButton')}
            </Text>
          </ButtonRounded>
        </View>
      </View>
    </View>
  );
};

export default Credits;
