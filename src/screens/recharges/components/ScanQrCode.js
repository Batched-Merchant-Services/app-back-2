import React from 'react';
import { QrCodeReader, View } from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import i18n from '@utils/i18n';

const ScanQrCode = ({ navigation }) => {
  const page = navigation.getParam('page') ==='sideMenu'? true: false;
  const handleRead = () => {};

  const handlePressBack = () => {
    navigation.goBack();
  };

  const handlePressNext = () => {
    navigation.navigate('StoreShowQR');
  };

  // const handlePressButton = () => {
  //   page
  //     ? navigation.navigate('StoreCashPurchase',{page: page})
  //     : navigation.navigate('StoreCaptureQR');
  // };

  const handlePressButton = () => {
    //navigation.navigate('ContactInformation',{pageScann:'pageScann'});
    navigation.navigate('paymentToEstablishment');
  };

  return (
    <SignUpWrapper forceInset={{ top: 0, bottom: 0 }}>
      <View centerH centerV flex-1>
        <QrCodeReader
          onRead={handleRead}
          title={page ? i18n.t('ScanQROffer.component.textScanQrCode'):i18n.t('store.component.scanQRTitle')}
          description={i18n.t('store.component.scanQRDescription')}
          buttonText={page ? i18n.t('ScanQROffer.component.buttonEnterCode') :i18n.t('store.component.scanQRButton')}
          onPressLeftControl={handlePressBack}
          onPressRightControl={handlePressNext}
          onPressButton={handlePressButton}
        />
      </View>
    </SignUpWrapper>
  );
};

export default ScanQrCode;
