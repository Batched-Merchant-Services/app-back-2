import React from 'react';
import { verticalScale } from 'react-native-size-matters';
import { Linking } from 'react-native';
import {
  DivSpace,
  NavigationBar,
  View,
  Text,
  ButtonRounded,
  ImageComponent,
  BoxGradient
} from '@components';
import i18n from '@utils/i18n';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import tokenVirtual from '@assets/brand/tokenVirtual.png';
import { useSelector } from 'react-redux';

const ConfirmCardVirtual = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandThemeImages = userData?.Theme?.images;

  const page = navigation.getParam('page');
  const link = navigation.getParam('link');
  function handleBackPress() {
    navigation.goBack();
  }

  async function handlePressNext() {
    Linking.openURL(link);
  }
 
  return (
    <SignUpWrapper>
      <NavigationBar
        onBack={handleBackPress}
        body={!page? i18n.t('myCards.component.confirmationVirtualCard.title'):i18n.t('myCards.component.confirmationVirtualCard.textConsultVirtual')}
      />
      <DivSpace height-10 />
      <View
        marginH-20
        paddingV-20
        paddingH-30
        textBlueDark
        style={{borderRadius: 10 }}
        centerH
        height-536
      >
        <DivSpace height-11 />
        <Text h16 medium center white>
          {!page? i18n.t('myCards.component.confirmationVirtualCard.textGenerateVirtualCard'):i18n.t('myCards.component.confirmationVirtualCard.textConsultVirtual')}
        </Text>
        <DivSpace height-35 />
        <BoxGradient size ={82} >
          <ImageComponent
            source={brandThemeImages?.tokenVirtual?brandThemeImages?.tokenVirtual:tokenVirtual}
            width={verticalScale(60)}
            height={verticalScale(60)}
          />
        </BoxGradient>
        <DivSpace height-25/>
        {!page &&(
          <Text h12 white center>{i18n.t('myCards.component.confirmationVirtualCard.textASecureLogin')} <Text bold white>{' '}{i18n.t('myCards.component.confirmationVirtualCard.textLoginToken')}</Text>{' '}{i18n.t('myCards.component.confirmationVirtualCard.textToEnterThePanel')}</Text>
        )}
        {page &&(
          <View>
            <Text h10 medium white center>{i18n.t('myCards.component.confirmationVirtualCard.textDateAndCard')}</Text>
            <Text textGray h10 center>14/08/2019</Text>
            <Text medium h12 white center>Comida para Max</Text>
            <DivSpace height-20/>
            <Text white h12 center>{i18n.t('myCards.component.confirmationVirtualCard.textYouWillBe')}</Text>
            <Text white h12 center semibold>{i18n.t('myCards.component.confirmationVirtualCard.textCheckTheInformation')}</Text>
          </View>
          
        )}
        <DivSpace height-28 />
        <View width-246 height-34  bgBlue01 style={{ borderRadius: 30}} centerV centerH>
          <Text h20 white> ******* ******** ********</Text>
        </View>
        <DivSpace height-30 />
        <Text h10 textGray center>{i18n.t('myCards.component.confirmationVirtualCard.textTheGeneratedToken')} <Text bold textGray>{' '}{i18n.t('myCards.component.confirmationVirtualCard.textYouDoNotNeed')}</Text></Text>
        <DivSpace height-55 />
        <View centerH>
          <ButtonRounded
            onPress={handlePressNext}
            size='lg'
          >
            <Text h10 semibold>
              {i18n.t('myCards.component.confirmationVirtualCard.buttonGoToCardPanel')}
            </Text>
          </ButtonRounded>
        </View>
      </View>
    </SignUpWrapper>
  );
};
export default ConfirmCardVirtual;
