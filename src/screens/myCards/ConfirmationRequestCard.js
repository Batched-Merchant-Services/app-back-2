import React from 'react';
import {  SafeAreaView } from 'react-native';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import Styles from './styles';
import confirmation from '@assets/brand/confirmation.png';
import { scale, verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import {
  ImageComponent,
  View,
  NavigationBar,
  Text,
  DivSpace,
  BoxGradient,
  ButtonRounded
} from '@components';
import { useSelector } from 'react-redux';

const ConfirmationRequestCard = ({ navigation }) =>   {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandThemeImages = userData?.Theme?.images;

  const handlerGoHome = async () => {
    navigation.navigate('MyCards');
  };
  
  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView style={{ flex: 1}} forceInset={{top: 'always'}}>
        <NavigationBar
          onBack={() => navigation.goBack()}
          body={i18n.t('myCards.component.titleConfirmationRequest')}
          onClose={null}
        />
        <DivSpace height-20/>
        <View flex-1 centerH>
          <View centerH paddingH-50 width-320 height-520 textBlueDark style={Styles.confirmationCard}>
            <DivSpace height-38/>
            <Text h16 white medium center>{i18n.t('myCards.component.textYourCardIsOn')}</Text>
            <DivSpace height-50/>
            <View centerH centerV>
              <BoxGradient size={'82'}>
                <ImageComponent
                  source={brandThemeImages?.cardConfirmation?brandThemeImages?.cardConfirmation:confirmation}
                  width={scale(90)}
                  height={verticalScale(43)}
                />
              </BoxGradient>
            </View>
            <DivSpace height-90/>
            <Text h12 white medium center>{i18n.t('myCards.component.textYouWillReceive')}</Text>
            <View flex-1 centerH bottom >
              <ButtonRounded onPress={handlerGoHome}>
                <Text h10 semibold>
                  {i18n.t('myCards.component.buttonBackToMyCards')}
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

export default ConfirmationRequestCard;
