import React from 'react';

import { scale, verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import {
  View,
  Text,
  ImageComponent,
  DivSpace,
  Link
} from '@components';
import Styles from '@screens/nationalPayments/styles';

import stepOneCards from '@assets/cards/virtualStepOne.png';

const InfoVirtualStepOne = ({ navigation }) => {

  return (
    <View textBlueDark style={Styles.carouselItem} paddingV-20>
      <View flex-1 centerH marginH-15 >
        <Text semibold h16 white>
          {i18n.t('myCards.component.newVirtualCards.stepOne.title')}
        </Text>
        <DivSpace height-25 />
        <ImageComponent source={stepOneCards} width={'100%'} height={verticalScale(232)} />
        <DivSpace height-15 />
        <Text h11 white>
          1. {i18n.t('myCards.component.newVirtualCards.stepOne.textYouWillReceive')}
        </Text>
        <DivSpace height-15 />
        <Text h11 white semibold>
          {i18n.t('myCards.component.newVirtualCards.stepOne.textCopyTheFourDigit')}
        </Text>
        <DivSpace height-15 />
        <View centerH>
          <Text h11 white>
            {i18n.t('myCards.component.newVirtualCards.stepOne.textPressTheLinkToTheCard')}
          </Text>
          <DivSpace width-2 />
          <Link>
            <Text h11 medium white>
              {i18n.t('myCards.component.newVirtualCards.stepOne.linkCardRedemptionSite')}
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default InfoVirtualStepOne;
