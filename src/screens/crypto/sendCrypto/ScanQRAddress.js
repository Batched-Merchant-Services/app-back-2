import React,{useState} from 'react';
import i18n from '@utils/i18n';
import {
  View,
  Loader,
  QrCodeReader,
  SnackBar
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import LocalStorage from '@utils/localStorage';
import { getUserInfoCrypto } from '@utils/api/switch';

const ScanQRAddress = ({ navigation }) => {
  const page = navigation.getParam('page');
  const [title, setTitle] = useState('');
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
   
  const handleRead = async(e) => {
    console.log('e',e);
    if (page === 'addAddress') {
      navigation.navigate('AddNewAddressCrypto',{data: e.data});  
    } else {
      getInfoUser(e.data);
    }
  };

  async function getInfoUser(id) { 
    setIsLoadingModal(true);
    const token = await LocalStorage.get('auth_token');
    const response = await getUserInfoCrypto(token,id);
    if (response.code < 400) {
      setTimeout(function () {
        navigation.navigate('CryptoTransferUsers',{info: response.data});
        setIsLoadingModal(false);
      }, 1000);
      
    }else{
      closeSnackNotice(response);
    }
  }
  const handleCloseNotif = () => {
    setSnakVisible(false);
    setActionAnimated(true);
  };


  function closeSnackNotice(response) {
    setIsLoadingModal(true);
    setTimeout(function () {
      setSnakVisible(true);
      setIsLoadingModal(false);
      setTitle(response.message);
    }, 1000);
  }
  
  const handlePressBack = () => {
    navigation.goBack();
  };

 

  return (
    <SignUpWrapper forceInset={{ top: 0, bottom: 0 }}>
      <View centerH centerV flex-1>
        <QrCodeReader
          onRead={handleRead}
          title={i18n.t('CryptoBalance.component.sendCrypto.textScanQRAddress')}
          description={i18n.t('CryptoBalance.component.sendCrypto.textScanScanThePersonCode')}
          onPressLeftControl={handlePressBack}
          onPressRightControl={null}
          onPressButton={null}
        />
      </View>
      <SnackBar
        message={title}
        isVisible={snakVisible}
        onClose={handleCloseNotif}
        animationAction={actionAnimated}
      />
      {isLoadingModal &&(
        <Loader 
          isOpen={true}
          navigation={navigation} />)}
    </SignUpWrapper>
    
  );
};

export default ScanQRAddress;
