import React from 'react';
import { SafeAreaView } from 'react-navigation';

import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { NavigationBar, DivSpace } from '@components';

import Styles from './styles';

const StoreConfirmation = ({ navigation }) => {
  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView style={Styles.wrapper} forceInset={{top: 'always'}}>
        <NavigationBar
          disableExtraTop
          onBack={() => navigation.goBack()}
          body={'Confirmación'}
        />
        <DivSpace height-20 />
      </SafeAreaView>
    </SignUpWrapper>
  );
};

export default StoreConfirmation;
