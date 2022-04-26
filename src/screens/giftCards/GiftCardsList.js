import React, { Fragment } from 'react';
import GiftCardsElement from '@screens/giftCards/components/GiftCardsElement';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { withNavigationFocus } from 'react-navigation';
import { NavigationBar, DivSpace } from '@components';
import data from './GiftCardsList.data.js';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import i18n from '@utils/i18n';


const GiftCardsList = ({ navigation }) => {

  function handlePressDetailGift(gift) {
    navigation.navigate('GiftCardDetails', { gift });
  }

  const giftCardsElement = data.giftCards.map((gift, key) => (
    <Fragment key={key}>
      <GiftCardsElement
        {...gift}
        onPress={() => handlePressDetailGift(gift)}
        index={key}
        navigation={navigation}
      />
      <DivSpace height-15 />
    </Fragment>
  ));

  return (
    <SignUpWrapper forceInset={{ bottom: 'never' }}>
      <ScrollView style={{ height: '100%' }}>
        <NavigationBar
          onBack={() => navigation.goBack()}
          body={i18n.t('myCreditOptions.component.title')}
        />
        <DivSpace height-15 />
        <DivSpace height-15 />
        {giftCardsElement}
        <DivSpace height-15 />
      </ScrollView>
    </SignUpWrapper>
  );
};

GiftCardsList.propTypes = {
  navigation: PropTypes.shape({
    goBack  : PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default withNavigationFocus(GiftCardsList);
