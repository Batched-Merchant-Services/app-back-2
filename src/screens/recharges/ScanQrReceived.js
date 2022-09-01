import React,{useState} from 'react';
import { QrCodeReader, View } from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import i18n from '@utils/i18n';

const ScanQrReceived = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const [showModal2fa, setShowModal2fa] = useState(false);
  const page = navigation.getParam('page') === 'sideMenu' ? true : false;
  const handleRead = () => { };

  const handlePressBack = () => {
    navigation.goBack();
  };

  const handlePressNext = () => {
    var foobar = [3, 2, 1];
    if (!foobar.includes(userData?.type2fa)) {
      setShowModal2fa(true);
    } else {
      navigation.navigate('Pin2faConfirmation', {
        data: {},
        next: 'RechargeReceivedSuccessful'
      });
      //navigation.navigate('Pin2faConfirmation');   
    }
  };

  const handlePressButton = () => {
    var foobar = [3, 2, 1];
    if (!foobar.includes(userData?.type2fa)) {
      setShowModal2fa(true);
    } else {
      //navigation.navigate('paymentToEstablishment');
      navigation.navigate('Pin2faConfirmation', {
        data: {},
        next: 'RechargeReceivedSuccessful'
      });
      //navigation.navigate('Pin2faConfirmation');
    }
  };

  const handleClose = () => {
    setShowModal2fa(!showModal2fa);
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
      <Modal2faConfirmation
        visible={showModal2fa}
        onRequestClose={() => { setShowModal2fa(false) }}
        onPressOverlay={handleClose}
        navigation={navigation}
      />
    </SignUpWrapper>
  );
};

export default ScanQrReceived;
