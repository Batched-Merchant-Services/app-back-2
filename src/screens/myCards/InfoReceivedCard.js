import React from 'react';
import {  SafeAreaView } from 'react-native';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import Styles from './styles';
import cardEnvelope from '@assets/brand/cardEnvelope.png';
import { scale, verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import {
  ImageComponent,
  View,
  NavigationBar,
  Text,
  DivSpace,
  ButtonRounded
} from '@components';
import { useSelector } from 'react-redux';
  
const InfoReceivedCard= ({ navigation }) =>   {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandThemeImages = userData?.Theme?.images;
  const dataBackup = navigation.getParam('dataBackup');
  const page = navigation.getParam('page');
  
  const handlerGoHome = async () => {
    navigation.navigate('ActivateCard',{page: page, dataBackup: dataBackup });
  };
  
  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView style={{ flex: 1}} forceInset={{top: 'always'}}>
        <NavigationBar
          onBack={() => navigation.goBack()}
          body={page === 'associate' ?i18n.t('myCards.component.associateCard.title') :i18n.t('cardActivation.component.title')}
          onClose={null}
        />
        <DivSpace height-20/>
        <View flex-1 centerH>
          <View centerH paddingH-30 width-320 height-520 textBlueDark style={Styles.confirmationCard}>
            <DivSpace height-38/>
            <Text h12 white semibold center>{i18n.t('myCards.component.titleInfoReceived')}</Text>
            <DivSpace height-40/>
            <Text h12 center regular white><Text semibold white>{i18n.t('myCards.component.textIfYouReceived')}</Text>
              <Text white>{' '}{i18n.t('myCards.component.textAtWorkOrWe')}</Text>
              <Text semibold white>{' '}{i18n.t('myCards.component.textNewSealed')}</Text> 
            </Text>
            <DivSpace height-50/>
            <View centerH centerV>
              <ImageComponent
                source={brandThemeImages?.cardEnvelope?brandThemeImages?.cardEnvelope:cardEnvelope}
                width={scale(200)}
                height={verticalScale(200)}
              />
            </View>
            <View height-80 centerH bottom >
              <ButtonRounded onPress={handlerGoHome}>
                <Text h10 semibold>
                  {i18n.t('myCards.component.buttonNext')}
                </Text>
              </ButtonRounded>
            </View>
            <DivSpace height-50/>
          </View>
        </View>
      </SafeAreaView>
    </SignUpWrapper>
  );
};

export default InfoReceivedCard;
