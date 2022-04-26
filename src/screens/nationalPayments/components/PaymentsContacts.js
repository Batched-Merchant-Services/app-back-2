import React from 'react';

import { scale, verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import { 
  View, 
  Text, 
  DivSpace,
  ButtonRounded
} from '@components';
import Styles from '@screens/nationalPayments/styles';
import { useSelector } from 'react-redux';
import IconPeople from '@utils/iconSVG/IconPeople';
import Colors from '@styles/Colors';


const Credits = ({ navigation }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;


  const handleNext = () =>
    navigation.navigate('PaymentToContacts',{ page: 'payContacts' });

  return (
    <View textBlueDark style={Styles.carouselItem} paddingV-20>
      <View flex-1 centerH>
        <IconPeople width={scale(70)} height={verticalScale(42)}  fill={brandTheme?.orange??Colors?.orange} fillSecondary={brandTheme?.white??Colors?.white}/>
        
        <DivSpace height-15 />
        <Text semibold h14 white>
          {i18n.t('nationalPayments.component.textPaymentsToContacts')}
        </Text>
        <Text h14 white>
          {i18n.t('nationalPayments.component.textNational')}
        </Text>
        <DivSpace height-80 />
        <View marginH-60 >
          <Text center h12 white>
            <Text semibold white>
              {i18n.t('nationalPayments.component.textSendAPayment')}
            </Text>
            {' '}
            {i18n.t('nationalPayments.component.textToAnyContact')}
          </Text>
        </View>
      </View>
      <View centerH centerV bottom>
        <ButtonRounded onPress={handleNext}>
          <Text h10 semibold>
            {i18n.t('nationalPayments.component.buttonNext')}
          </Text>
        </ButtonRounded>
      </View>
      <DivSpace height-60 />
    </View>
  );
};

export default Credits;
