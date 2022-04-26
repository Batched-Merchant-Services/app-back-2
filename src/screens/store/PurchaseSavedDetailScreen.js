import React from 'react';
import { TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';

import {
  DivSpace,
  ImageComponent,
  NavigationBar,
  View,
  Text,
  Link,
  ButtonRounded
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import i18n from '@utils/i18n';
import Copy from '@assets/icons/copy.png';

const PurchasesSavedDetailScreen = ({ navigation }) => {
  const purchase = navigation.getParam('purchase');

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
        style={{ borderRadius: 20}}
      >
        <DivSpace height-48 />
        <View
          padding-5
          bgGray
          style={{ borderRadius: 10 }}
        >
          <ImageComponent
            source={purchase.provider.logo}
            width={142}
            height={60}
          />
        </View>
        <DivSpace height-17 />
        <Text center h12 regular white>
          {purchase.provider.name} {purchase.provider.subname}
        </Text>
        <DivSpace height-30 />
        <View width-256>
          <Text center h12 regular white>
            <Text center h12 semibold white>
              {purchase.description1}
            </Text>{' '}
            {purchase.description2}
          </Text>
        </View>
        <DivSpace height-20 />
        <View width-256>
          <Text h10 regular center white>
            {i18n.t('savedPurchases.component.continue')}
          </Text>
        </View>
        <DivSpace height-24 />
        <View centerH>
          <Text h12 textGray>
            {purchase.provider.name}
          </Text>
          <DivSpace height-5 />
          <Text h16 semibold white>
            {purchase.code}
          </Text>
          <DivSpace height-13 />
          <TouchableOpacity>
            <View row>
              <ImageComponent white source={Copy} width={18} height={18} />
              <DivSpace width-5 />
              <Link>
                <Text h10 title medium>
                  {i18n.t('savedPurchases.component.copy')}
                </Text>
              </Link>
            </View>
          </TouchableOpacity>
        </View>
        <DivSpace height-29 />
        <View centerH>
          <ButtonRounded style={{ width: scale(154), height: scale(18) }} blue>
            <Text h10 medium>
              {i18n.t('savedPurchases.component.valid')} {purchase.date}
            </Text>
          </ButtonRounded>
          <DivSpace height-35 />
          <ButtonRounded style={{ width: scale(180), height: scale(30) }}>
            <Text h12 semibold>
              {i18n.t('savedPurchases.component.site')}
            </Text>
          </ButtonRounded>
        </View>
        <DivSpace height-40 />
        <Link>{i18n.t('savedPurchases.component.terms')}</Link>
        <DivSpace height-38 />
      </View>
    </SignUpWrapper>
  );
};

export default PurchasesSavedDetailScreen;
