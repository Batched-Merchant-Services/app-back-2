import React from 'react';
import { scale } from 'react-native-size-matters';
import {
  DivSpace,
  NavigationBar,
  View,
  Text,
  ButtonRounded,
  ImageComponent
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import Cards from '@screens/myCards/components/Cards';
import i18n from '@utils/i18n';
import CancelCard from '@assets/cards/cancelCard.png';

const CancelCardScreen = ({ navigation }) => {
  const data = navigation.getParam('dataBackup');
  function handleCallPress() {
    navigation.navigate('CancelCardCancel',{dataBackup: data});
  }

  function handleBackPress() {
    navigation.goBack();
  }

  return (
    <SignUpWrapper>
      <NavigationBar
        onBack={handleBackPress}
        body={i18n.t('cardCancel.component.title')}
      />
      <DivSpace height-10 />
      <View
        marginH-20
        paddingV-20
        paddingH-20
        centerH
        textBlueDark
        style={{ borderRadius: 10 }}
      >
        <ImageComponent source={CancelCard} width={26} height={26} />
        <DivSpace height-11 />
        <Text h16 medium>{i18n.t('cardCancel.component.subtitle')}</Text>
        <DivSpace height-18 />
        <Cards
          {...data}
          available={true}
        />
        <DivSpace height-21 />
        <Text h12 center regular white>
          {i18n.t('cardCancel.component.description')}
        </Text>
        <DivSpace height-30 />
        <Text h12 center semibold white>
          {'01800 55 2303 3633'}
        </Text>
        <DivSpace height-30 />
        <ButtonRounded style={{height: scale(30), width: scale(182)}} onPress={handleCallPress}>
          <Text h12 >
            {i18n.t('cardCancel.component.call')}
          </Text>
        </ButtonRounded>
        <DivSpace height-21 />
        <Text h10 regular center white>
          {i18n.t('cardCancel.component.footer')}
        </Text>
      </View>
    </SignUpWrapper>
  );
};

export default CancelCardScreen;
