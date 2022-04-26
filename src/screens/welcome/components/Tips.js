import React from 'react';

import { scale, verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import { TouchableOpacity } from 'react-native';
import { View, Text, ImageComponent, DivSpace } from '@components';
import Styles from '@screens/welcome/styles';
import MyTips from '@assets/welcome/tips.png';
import TipsButton from '@assets/welcome/tips-button.png';

const Tips = () => {
  return (
    <View style={Styles.carouselItem} paddingV-20>
      <Text center h17 medium blueDark>
        {i18n.t('welcome.component.tips')}
      </Text>
      <DivSpace height-12 />
      <View centerH>
        <ImageComponent
          source={MyTips}
          width={scale(195)}
          height={verticalScale(132)}
        />
        <DivSpace height-12 />
        <Text h10 blueDark>
          {i18n.t('welcome.component.tipsDescription')}
        </Text>
        <DivSpace height-15 />
        <View width-235>
          <Text h11 blueDark center>
            {i18n.t('welcome.component.tipWallet1')}{' '}
            <Text semibold white>{i18n.t('welcome.component.tipWallet2')}</Text>{' '}
            {i18n.t('welcome.component.tipWallet3')}
          </Text>
        </View>
        <DivSpace height-28 />
        <TouchableOpacity>
          <ImageComponent
            source={TipsButton}
            width={scale(40)}
            height={verticalScale(40)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Tips;
