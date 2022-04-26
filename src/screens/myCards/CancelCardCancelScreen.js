import React from 'react';
import { scale } from 'react-native-size-matters';
import {
  DivSpace,
  NavigationBar,
  View,
  Text,
  ButtonRounded
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import Cards from '@screens/myCards/components/Cards';
import i18n from '@utils/i18n';
import IconCancelCard from '@utils/iconSVG/IconCancelCard';
import { useSelector } from 'react-redux';
import { verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';

const CancelCardCancelScreen = ({ navigation }) => {
  const data = navigation.getParam('dataBackup');
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  function handleCancelPress() {
    navigation.navigate('ConfirmationPinUser', {
      data: { page: 'cardCancel',data: data },
      next: 'CancelCardConfirmation',
    });
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
        <IconCancelCard width={scale(30)} height={verticalScale(30)}  fill={brandTheme?.orange??Colors?.orange} fillSecondary={brandTheme?.white??Colors?.white}/>
        <DivSpace height-16 />
        <Text h16 medium white>{i18n.t('cardCancel.component.subtitle')}</Text>
        <DivSpace height-18 />
        <Cards
          {...data}
          available={true}
        />
        <DivSpace height-21 />
        <Text h12 center regular white>
          {i18n.t('cardCancel.component.description')}
        </Text>
        <DivSpace height-21 />
        <Text h10 center regular white>
          {i18n.t('cardCancel.component.remanent1')}
          <Text h10 orange>
            {i18n.t('cardCancel.component.remanent2')}
          </Text>
        </Text>
        <DivSpace height-21 />
        <ButtonRounded style={{height: scale(30), width: scale(182)}} onPress={handleCancelPress}>
          <Text h12>
            {i18n.t('cardCancel.component.cancel')}
          </Text>
        </ButtonRounded>
        <DivSpace height-21 />
        <Text h10 regular center white>
          {i18n.t('cardCancel.component.footer2')}
        </Text>
      </View>
    </SignUpWrapper>
  );
};

export default CancelCardCancelScreen;
