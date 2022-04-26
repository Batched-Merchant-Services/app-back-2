import React, { Fragment,useState } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { NavigationBar, DivSpace } from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import CreditInfo from '@screens/credits/components/CreditInfo';
import CreditElement from '@screens/credits/components/CreditElement';
import i18n from '@utils/i18n';
import data from './MyCreditOptions.data';
  
const MyCreditOptions = ({ navigation }) => {
  function handlePressBack() {
    navigation.goBack();
  }

  function handlePressCreditElement(credit) {
    navigation.navigate('CreditAcceptance', { credit });
  }

  const creditElements = data.availableCredits.map((credit, key) => (
    <Fragment key={key}>
      <CreditElement
        {...credit}
        onPress={() => handlePressCreditElement(credit)}
        index={key}
      />
      <DivSpace height-15 />
    </Fragment>
  ));

  return (
    <SignUpWrapper forceInset={{ bottom: 'never' }}>
      <ScrollView style={{ height: '100%' }}>
        <NavigationBar
          onBack={handlePressBack}
          body={i18n.t('myCreditOptions.component.title')}
        />
        <DivSpace height-15 />
        <CreditInfo {...data.creditInfo} />
        <DivSpace height-15 />
        {creditElements}
        <DivSpace height-15 />
      </ScrollView>
    </SignUpWrapper>
  );
};

MyCreditOptions.propTypes = {
  navigation: PropTypes.shape({
    goBack  : PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default MyCreditOptions;
