import React,{useState} from 'react';
import i18n from '@utils/i18n';
import { View, QrCodeReader,SnackBar,Loader } from '@components';
import { useValidatedInput,isFormValid } from '@hooks/validation-hooks';
import { saveInfoPayment} from '@store/ducks/user.ducks';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import LocalStorage from '@utils/localStorage';
import { userExternalId } from '@utils/api/switch';
import { useDispatch } from 'react-redux';

  
const ConfirmationQR = ({ navigation }) => {
  const dispatch = useDispatch();
  const code = useValidatedInput('code', '');
  const isValid = isFormValid(code);
  const [title,setTitle] = useState('');
  const [buttonNext, setButtonNext] = useState(false);
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  

  const handleRead = async(e) => {
    setIsLoadingModal(true);
    const token = await LocalStorage.get('auth_token');
    const response = await userExternalId(token,e.data);
    if (response.code < 400) {
      setTimeout(function(){
        const image =response.data.avatarImage;
        const Name = response.data.firstName? response.data.firstName: '';
        const LatsName = response.data.lastName? response.data.lastName: '';
        dispatch(saveInfoPayment({ imageUserQRScan: image, fullNameUserQRScan: Name +' '+ LatsName,nameQRScan: Name, lastNameQRScan: LatsName }));
        navigation.navigate('ContactInformation',{page: 'QRCode',codeExternal: e.data,imageSearch: image, nameSearch: Name, lastName: LatsName});
        setIsLoadingModal(false);
      }, 1000);
      
    }else {
      setIsLoadingModal(true);
      setTimeout(function(){
        setIsLoadingModal(false);
        setSnakVisible(true);
        setButtonNext(true);
        setTitle(response.message);
      }, 1000);
    }
  };
  
  const handleCloseNotif = () => {
    setSnakVisible(false);
    setButtonNext(false);
    setActionAnimated(true);
	  };

  const handlePressBack = () => {
    navigation.goBack();
  };

  const handlePressButton = () => {
    navigation.navigate('SearchByUserCode');
  };

  return (
    <>
    <SignUpWrapper forceInset={{ top: 0, bottom: 0 }}>
      <View centerH centerV flex-1>
        <QrCodeReader
          onRead={handleRead}
          title={i18n.t('sendQRPayments.component.title') + '\n'+ i18n.t('sendQRPayments.component.textSendPay')}
          description={i18n.t('receivedQRPayments.component.textScanTheCodeReceived')}
          buttonText={i18n.t('receivedQRPayments.component.buttonWriteCode')}
          onPressLeftControl={handlePressBack}
          onPressRightControl={null}
          onPressButton={handlePressButton}
        />
      </View>
    </SignUpWrapper>
    {isLoadingModal &&(
      <Loader 
        isOpen={true}
        navigation={navigation} />)}
      <SnackBar
        message={title}
        isVisible={snakVisible}
        onClose={handleCloseNotif}
        animationAction={actionAnimated}
      />
    </>
  );
};

export default ConfirmationQR;
