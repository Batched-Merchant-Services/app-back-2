import React from 'react';

import { scale, verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import { 
  View, 
  Text, 
  ImageComponent, 
  DivSpace,
  ButtonRounded
} from '@components';
import Styles from '@screens/nationalPayments/styles';
import stepTwoCards from '@assets/cards/virtualStepTwo.png';


const InfoVirtualStepTwo = ({ navigation }) => {

  const handleNext = () =>
    navigation.navigate('PaymentToContacts',{ page: 'payContacts' });

  return (
    <View textBlueDark style={Styles.carouselItem} paddingV-20>
      <View flex-1 centerH marginH-15>
        <Text semibold h16 white>
          {i18n.t('myCards.component.newVirtualCards.stepTwo.title')}
        </Text>
        <DivSpace height-25 />
        <ImageComponent source={stepTwoCards} width={'100%'} height={verticalScale(157)} />
        <DivSpace height-35 />
        <Text h11 white>
          2.{i18n.t('myCards.component.newVirtualCards.stepTwo.textEnterTheRequiredData')}
        </Text>
        <DivSpace height-10 />
        <Text h11 white semibold left>
          {i18n.t('myCards.component.newVirtualCards.stepTwo.textPressActivateCard')}
        </Text>
      </View>
    </View>
  );
};

export default InfoVirtualStepTwo;
