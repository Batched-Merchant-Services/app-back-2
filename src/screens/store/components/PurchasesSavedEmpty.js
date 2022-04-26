import React from 'react';

import { View, DivSpace, Text, ImageComponent, BoxGradient } from '@components';
import i18n from '@utils/i18n';
import Box from '@assets/store/box.png';

const PurchasesSavedEmpty = () => {
  return (
    <View centerH textBlueDark style={{ borderRadius: 10 }}>
      <DivSpace height-36 />
      <Text h16 medium center white>
        {i18n.t('savedPurchases.component.empty')}
      </Text>
      <DivSpace height-54 />
      <BoxGradient size={75}>
        <ImageComponent source={Box} width={73} height={72} />
      </BoxGradient>
      <DivSpace height-62 />
      <Text h12 semibold center white>
        {i18n.t('savedPurchases.component.emptyDescription1')}
        <Text regular white>
          {i18n.t('savedPurchases.component.emptyDescription2')}
        </Text>
      </Text>
      <DivSpace height-148 />
    </View>
  );
};

export default PurchasesSavedEmpty;
