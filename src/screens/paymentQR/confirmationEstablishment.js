import React from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  NavigationBar,
  DivSpace,
  View,
  ImageComponent,
  Text,
  Link,
  ButtonBackHome,
  BoxGradient
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';

import i18n from '@utils/i18n';
import { moneyFormatter } from '@utils/formatters';
import { useSelector } from 'react-redux';
import Styles from './styles';
import imageConfirm from '@assets/brand/imageConfirm.png';


const confirmationEstablishment = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux?.user;
  const brandThemeImages = userData?.Theme?.images;

  function handlePressBack() {
    navigation.goBack();
  }
  const handlePressHome = () => {
    navigation.navigate('MyWallet');
  };

  return (
    <SignUpWrapper forceInset={{ bottom: 'never' }}>
      <NavigationBar
        onBack={handlePressBack}
        body={i18n.t('confirmationEstablishment.component.title')}
      />
      <DivSpace height-18 />
      <View marginH-18 textBlueDark style={Styles.manualCreditWrapper}>
        <View centerH paddingH-30>
          <DivSpace height-33 />
          <Text h16 medium center white>
            {i18n.t('confirmationEstablishment.component.textPaySuccess')}
          </Text>
          <DivSpace height-20 />
          <BoxGradient size={82}>
            <ImageComponent
              source={brandThemeImages?.imageConfirm?brandThemeImages?.imageConfirm:imageConfirm}
              width={scale(60)}
              height={verticalScale(68)}
            />
          </BoxGradient>
          <DivSpace height-20 />
          <Text h10 regular center textGray>
            {i18n.t('confirmationEstablishment.component.textAmount')}{' '}
          </Text>
          <Text h32 medium center white>
            {moneyFormatter(1500.89)}
          </Text>
          <Text h10 regular center textGray>
            MXN
          </Text>
          <DivSpace height-15 />
          <Text h12 medium center white>
            {i18n.t('confirmationEstablishment.component.textUulalaPoints')}{':'}
          </Text>
          <Text h15 semibold center white>
            +250
          </Text>
          <DivSpace height-15 />
          <Text h12 regular center white>
            {i18n.t('confirmationEstablishment.component.textYouCanFind')}{' '}
            <Text h12 semibold white>
              {i18n.t('confirmationEstablishment.component.textMyWallet')}
            </Text>
          </Text>
          <DivSpace height-43 />
          <Link>{i18n.t('confirmationEstablishment.component.linkSendToTheEstablishment')}</Link>
          <DivSpace height-43 />
          <View centerH centerV bottom>
            <ButtonBackHome onPress={handlePressHome} />
          </View>
          <DivSpace height-43 />
        </View>
      </View>
    </SignUpWrapper>
  );
};

export default confirmationEstablishment;
