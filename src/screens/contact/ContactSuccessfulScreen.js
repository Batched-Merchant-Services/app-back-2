import React from 'react';
import i18n from '@utils/i18n';
import Styles from '@screens/contact/styles';
import Plane from '@assets/brand/plane.png';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import {
  ButtonRounded,
  DivSpace,
  NavigationBar,
  Text,
  View,
  ImageComponent,
} from '@components';
import { useSelector} from 'react-redux';

const ContactSuccessfulScreen = ({navigation}) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandThemeImages = appData?.Theme?.images;
  const numberTiket = navigation.getParam('ticketNumber');

  function handleWelcomePress() {
    navigation.navigate('MyWallet');
  }

  return (
    <SignUpWrapper>
      <NavigationBar
        onBack={null}
        body={i18n.t('contact.component.successfulTitle')}
      />
      <DivSpace height-10 />
      <View marginH-20 textBlueDark paddingV-20 centerH style={[Styles.card]}>
        <DivSpace height-25 />
        <Text h16 white>
          {i18n.t('contact.component.successfulSubtitle')}
        </Text>
        <DivSpace height-45 />
        <ImageComponent source={brandThemeImages?.plane?brandThemeImages?.plane:Plane} width={82} height={82} />
        <DivSpace height-50 />
        <Text h12 regular center white>
          {i18n.t('contact.component.successfulDescription')}
        </Text>
        <DivSpace height-35 />
        <Text h12 white>
          {i18n.t('contact.component.successfulTicket')}
        </Text>
        <DivSpace height-8 />
        <Text h16 semibold white>
          {numberTiket}
        </Text>
        <DivSpace height-8 />
        <Text h10 textGray center>
          {i18n.t('contact.component.successfulMail')}
        </Text>
        <DivSpace height-45 />
        <ButtonRounded onPress={handleWelcomePress} style={Styles.button}>
          <Text h10 semibold>
            {i18n.t('contact.component.welcome')}
          </Text>
        </ButtonRounded>
        <DivSpace height-20 />
      </View>
    </SignUpWrapper>
  );
};

export default ContactSuccessfulScreen;