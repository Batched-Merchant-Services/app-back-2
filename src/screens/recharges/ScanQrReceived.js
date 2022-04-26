import React from 'react';
import { QrCodeReader, View } from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import i18n from '@utils/i18n';

const ScanQrReceived = ({ navigation }) => {
  const page = navigation.getParam('page') ==='sideMenu'? true: false;
  const handleRead = () => {};

  const handlePressBack = () => {
    navigation.goBack();
  };

  const handlePressNext = () => {
    navigation.navigate('ConfirmationPinUser', {
      data: {},
      next: 'RechargeReceivedSuccessful'
    });
  };

  const handlePressButton = () => {
    //navigation.navigate('paymentToEstablishment');
    navigation.navigate('ConfirmationPinUser', {
      data: {},
      next: 'RechargeReceivedSuccessful'
    });
  };

  return (
    <SignUpWrapper forceInset={{ top: 0, bottom: 0 }}>
      <View centerH centerV flex-1>
        <QrCodeReader
          onRead={handleRead}
          title={i18n.t('receivedQRPayments.component.titlePayQReceived')}
          description={i18n.t('receivedQRPayments.component.textScanTheCodeReceived')}
          buttonText={i18n.t('receivedQRPayments.component.buttonWriteCode')}
          onPressLeftControl={handlePressBack}
          onPressRightControl={handlePressNext}
          onPressButton={handlePressButton}
        />
      </View>
    </SignUpWrapper>
  );
};

export default ScanQrReceived;
