import React, { useState, useRef } from 'react';
import { ScrollView } from 'react-navigation';

import {
  DivSpace,
  NavigationBar,
  RawSwitchControl,
  View,
  ButtonFloating
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import PurchasesSavedEmpty from '@screens/store/components/PurchasesSavedEmpty';
import GiftCard from '@screens/store/components/GiftCard';
import Purchase from '@screens/store/components/Purchase';
import Styles from '@screens/store/styles';
import i18n from '@utils/i18n';

// TODO: Remove this once we have real data
import Data from './PurchasesSavedScreen.data';

const TABS = [
  {
    value: 'purchases',
    text : i18n.t('savedPurchases.component.purchases')
  },
  {
    value: 'giftcards',
    text : i18n.t('savedPurchases.component.giftcards')
  }
];

const PurchasesSavedScreen = ({ navigation }) => {
  const scrollView = useRef(null);
  const [option, setOption] = useState('purchases');
  const [data, setData] = useState(Data['purchases']);

  function handleGoUpPress() {
    scrollView.current.scrollTo({ x: 0, y: 0, animated: true });
  }

  function handleTabChange(option) {
    setOption(option);
    setData(Data[option]);
    scrollView.current.scrollTo({ x: 0, y: 0, animated: true });
  }

  function handlePress(datum) {
    return () =>
      navigation.navigate(
        datum.type === 'purchase'
          ? 'PurchaseSavedDetail'
          : 'GiftcardSavedDetail',
        { [datum.type]: datum }
      );
  }

  function handleRemovePress(index) {
    return () => {
      const newData = data.slice();
      newData.splice(index, 1);
      setData(newData);
    };
  }

  const Component = option === 'purchases' ? Purchase : GiftCard;

  return (
    <SignUpWrapper keyboardAware={false}>
      <NavigationBar
        onBack={() => navigation.goBack()}
        body={i18n.t('savedPurchases.component.title')}
      />
      <DivSpace height-5 />
      <View marginH-15 flex-1>
        <RawSwitchControl
          onChange={handleTabChange}
          defaultValue={'purchases'}
          options={TABS}
        />
        <DivSpace height-18 />
        <ScrollView ref={scrollView}>
          {data.length ? (
            data.map((datum, index) => (
              <Component
                key={index}
                index={index}
                onPress={handlePress}
                onRemovePress={handleRemovePress}
                {...datum}
              />
            ))
          ) : (
            <PurchasesSavedEmpty option={option} />
          )}
        </ScrollView>
        {!!data.length && (
          <View centerH style={Styles.providersViewBtnFloating}>
            <ButtonFloating onPress={handleGoUpPress} />
          </View>
        )}
      </View>
    </SignUpWrapper>
  );
};

export default PurchasesSavedScreen;
