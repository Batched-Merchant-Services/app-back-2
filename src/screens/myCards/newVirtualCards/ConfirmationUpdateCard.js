import React from 'react';
import {  SafeAreaView } from 'react-native';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import Styles from './styles';
import confirmation from '@assets/icons/confVirtual.png';
import { scale, verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
//import cards from '@assets/cards/trucho.png';
import {
  ImageComponent,
  View,
  NavigationBar,
  Text,
  DivSpace,
  BoxBlue,
  BoxGradient,
  ButtonRounded
} from '@components';

const ConfirmationUpdateCard = ({ navigation }) =>   {

  const handlerGoHome = async () => {
    navigation.navigate('MyCards');
  };
  
  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView style={{ flex: 1}}>
        <NavigationBar
          onBack={() => navigation.goBack()}
          body={i18n.t('myCards.component.pinUpdateConfirmation.title')}
          onClose={null}
        />
        <DivSpace height-20/>
        <View flex-1 centerH>
          <BoxBlue centerH>
            <View centerH paddingH-50 width-320 height-520 style={Styles.confirmationCard}>
              <DivSpace height-38/>
              <Text h16 white medium center>{i18n.t('myCards.component.UpdateVirtualCard.textUpdatedVirtualCard')}</Text>
              <DivSpace height-50/>
              <View centerH centerV>
                <BoxGradient darkblue size={'82'}>
                  <ImageComponent
                    source={confirmation}
                    width={scale(55)}
                    height={verticalScale(55)}
                  />
                </BoxGradient>
              </View>
              <DivSpace height-90/>
              <Text h12 white medium center>{i18n.t('myCards.component.UpdateVirtualCard.textNowYouCanTopUpYour')}</Text>
              <View flex-1 centerH bottom >
                <ButtonRounded onPress={handlerGoHome}>
                  <Text h10  semibold>
                    {i18n.t('myCards.component.buttonBackToMyCards')}
                  </Text>
                </ButtonRounded>
              </View>
              <DivSpace height-50/>
            </View>
          </BoxBlue>
        </View>
      </SafeAreaView>
    </SignUpWrapper>
  );
};

export default ConfirmationUpdateCard;
