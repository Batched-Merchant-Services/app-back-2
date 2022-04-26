import React from 'react';
import { scale } from 'react-native-size-matters';

import {
  DivSpace,
  ImageComponent,
  NavigationBar,
  View,
  Text,
  ButtonRounded
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { moneyFormatter } from '@utils/formatters';
import i18n from '@utils/i18n';

const GiftcardSavedDetailScreen = ({ navigation }) => {
  const giftcard = navigation.getParam('giftcard');

  return (
    <SignUpWrapper keyboardAware={false}>
      <NavigationBar
        onBack={() => navigation.goBack()}
        body={i18n.t('savedPurchases.component.purchaseTitle')}
      />
      <DivSpace height-8 />
      <View
        marginH-20
        centerH
        textBlueDark
        style={{ borderRadius: 20 }}
      >
        <DivSpace height-48 />
        <View
          white
          padding-5
          style={{ borderRadius: 10 }}
        >
          <ImageComponent
            source={giftcard.provider.logo}
            width={209}
            height={123}
          />
        </View>
        <DivSpace height-29 />
        <Text center h12 regular textGray>
          {i18n.t('savedPurchases.component.balance')}
        </Text>
        <Text center h26 semibold white>
          {moneyFormatter(giftcard.amount)}
        </Text>
        <DivSpace height-29 />
        <View centerH>
          <Text h12 textGray>
            {giftcard.provider.name}
          </Text>
          <DivSpace height-5 />
          <Text h16 semibold white>
            {giftcard.code}
          </Text>
        </View>
        <DivSpace height-37 />
        <View centerH>
          <ButtonRounded style={{ width: scale(154), height: scale(18) }} blue>
            <Text h10 medium>
              {i18n.t('savedPurchases.component.valid')} {giftcard.date}
            </Text>
          </ButtonRounded>
          <DivSpace height-35 />
          <ButtonRounded style={{ width: scale(180), height: scale(30) }}>
            <Text h12 semibold>
              {i18n.t('savedPurchases.component.copy')}
            </Text>
          </ButtonRounded>
        </View>
        <DivSpace height-29 />
        <Text center h10 semibold>
          {i18n.t('savedPurchases.component.giftcardDescription')}
        </Text>
        <View width-270>
          <Text center h10 regular textGray>
            {giftcard.description1}
            <Text center h10 semibold textGray>
              {giftcard.description2}
            </Text>
            {giftcard.description3}
          </Text>
        </View>
        <DivSpace height-59 />
      </View>
    </SignUpWrapper>
  );
};

export default GiftcardSavedDetailScreen;
