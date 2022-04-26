import React,{useState} from 'react';
import { QrCodeReader, View, ModalDisabled } from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import i18n from '@utils/i18n';

const StoreScanQR = ({ navigation }) => {
  const [showModal] = useState(true);
  const page = navigation.getParam('page') ==='sideMenu'? true: false;
  const handleRead = () => {};

  const handlePressBack = () => {
    navigation.goBack();
  };

  const handlePressNext = () => {
    navigation.navigate('StoreShowQR');
  };


  const handlePressButton = () => {
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
      <ModalDisabled isOpen={showModal} navigation={navigation}/>
    </SignUpWrapper>
  );
};

export default StoreScanQR;
