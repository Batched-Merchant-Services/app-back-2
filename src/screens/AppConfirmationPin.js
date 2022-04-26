import React,{ useState, useEffect } from 'react';
import Ripple from 'react-native-material-ripple';
import PinView from 'react-native-pin-view';
import TouchID from 'react-native-touch-id';
import i18n from '@utils/i18n';
import Styles from './styles';
import { connect,useSelector } from 'react-redux';
import { completeRegister } from '@utils/api/switch';
import { withNavigationFocus } from 'react-navigation';
import { saveUserRegistration } from '@store/ducks/user.ducks';
import { scale, verticalScale } from 'react-native-size-matters';
import BiometricCheck from '@assets/biometric/biometric-check.png';
import LocalStorage from '@utils/localStorage';
import Colors from '@styles/Colors';

import {
  View,
  Text,
  DivSpace,
  NavigationBar,
  ModalContainer,
  ImageComponent,
  ButtonRounded,
  SnackBar,
  Loader
} from '@components';



const ConfirmationPinUser = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const data = navigation.getParam('data') || {};
  const next = navigation.getParam('next');
  const page = navigation.getParam('page') === 'AppNewPin'? true: false;
  const [snakVisible, setSnakVisible] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [title, setTitle] = useState('');
  const [textWarning, setTextWarning] = useState(false);
  const [biometricModalOpened, setBiometricModalOpened] = useState(false);
  const [biometricDevice, setBiometricDevice] = useState('TouchID');

  const optionalConfigObject = {
    title                 : i18n.t('fingerPrint.component.textConfirmFootPrint'),
    imageColor            : brandTheme.bgBlue07??Colors?.textBlueDark,
    imageErrorColor       : brandTheme.red??Colors?.red,
    sensorDescription     : i18n.t('fingerPrint.component.textFingerSent'),
    sensorErrorDescription: 'Failed',
    cancelText            : i18n.t('fingerPrint.component.buttonCancel'),
    fallbackLabel         : 'Show Passcode',
    unifiedErrors         : false,
    passcodeFallback      : false
  };



  useEffect(() => {
    (async () => {
      try {
        setBiometricDevice(TouchID.isSupported(optionalConfigObject));
        setBiometricModalOpened(page?false: true);
      } catch (e) {
        // Currently not supported
        setBiometricDevice(null);
        setBiometricModalOpened(false);
      }
    })();
  }, []);


  async function handlePressBiometricAuthorizePress() {
    try {
      await TouchID.authenticate('', optionalConfigObject);
      setBiometricModalOpened(false);
      navigation.navigate(next, data);
    } catch (e) {
      /* auth error */
    }
  }

  const onComplete=async (inputtedPin, clear) =>{
    const PinConfirm = await LocalStorage.get('AppConfirmationPin');
    if(inputtedPin !== PinConfirm){
      clear();
      setTextWarning(true);
    }else{
      someFunc(PinConfirm);
      setTextWarning(false);
    }
  };

  async function someFunc(PinConfirm) {
    setIsLoadingModal(true);
    const response = await completeRegister(userData.userPass,userData.userCodeValidate,PinConfirm);
    if (response.code < 400) {
      setTimeout(async function(){
        const token = response.data ? response.data.token : '';
        await LocalStorage.set('auth_token', token);
        navigation.navigate(next);
        setIsLoadingModal(false);
      }, 1000);
    } else {
      setIsLoadingModal(true);
      setTimeout(function(){
        setIsLoadingModal(false);
        setSnakVisible(true);
        setTitle(response.message);
      }, 1000);
    }
  }
 
  const handleCloseNotif = () => {
    setSnakVisible(false);
    setActionAnimated(true);
  };
  
  function handleUsePatternPress() {
    setBiometricModalOpened(false);
  }

  function handlePressBack() {
    navigation.goBack();
  }
  

  return (
    <View flex-1 textBlueDark >
      <ModalContainer
        animationType="slide"
        transparent={true}
        showModal={biometricModalOpened}
      >
        <View flex-1 centerV centerH>
          <View width-314 white paddingV-39 style={Styles.biometricModalContainer}>
            <View centerH>
              <DivSpace height-6 />
              <Ripple onPress={handlePressBiometricAuthorizePress}>
                <View centerH column>
                  <Text h16 regular textBlueDark>
                    {i18n.t(
                      biometricDevice === 'FaceID'
                        ? `biometric.component.confirmWithFaceID`
                        : `biometric.component.confirmWithTouchID`
                    )}
                  </Text>
                  <DivSpace height-36 />
                  <ImageComponent
                    bgBlue07
                    source={BiometricCheck}
                    width={scale(131)}
                    height={scale(126)}
                  />
                </View>
              </Ripple>
              <DivSpace height-55 />
              <ButtonRounded darkBlue onPress={handleUsePatternPress}>
                <Text h10 semibold>
                  {i18n.t(`biometric.component.usePattern`)}
                </Text>
              </ButtonRounded>
            </View>
          </View>
        </View>
      </ModalContainer>
      <View textBlueDark flex-1>
        <DivSpace height-30 />
        <NavigationBar
          onBack={handlePressBack}
          body={i18n.t('AppNewPin.component.AppConfirmationPin.title')}
          onClose={null}
          Style={[Styles.buttonBack,{ backgroundColor: brandTheme.textBlue01??Colors?.textBlue01 }]}
          textStyle={[Styles.textTitle,{color: brandTheme.white??Colors?.white}]}
        />
        <View paddingH-55> 
          <DivSpace height-20 />
          <Text h12 red regular center>{i18n.t('AppNewPin.component.textYouWillUseIt')}</Text>
          <DivSpace height-10 />
          <Text h12 white regular center>{i18n.t('AppNewPin.component.textSixDigits')}:</Text>
        </View>
        <DivSpace height-15 />
        { textWarning?<Text h10 red bold center>{i18n.t('AppNewPin.component.AppConfirmationPin.textWrongPin')}</Text>: null}
        { textWarning?<DivSpace height-15 />: null}
        <PinView
          pinLength={6}
          buttonTextColor={brandTheme.textBlue01??Colors?.textBlue01}
          buttonBgColor={brandTheme.bgOrange02??Colors?.bgOrange02}
          inputBgColor={brandTheme.white??Colors?.white}
          inputBgOpacity={0.5}
          inputActiveBgColor={brandTheme.textBlue01??Colors?.textBlue01}
          onComplete={onComplete}
          inputViewStyle={{width: verticalScale(25), height: verticalScale(25)}}
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
    </View>
  );
};

 

const mapStateToProps = state => ({
  saveUserRegistration: state.user.saveUserRegistration
});

const mapDispatchToProps = {saveUserRegistration };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigationFocus(ConfirmationPinUser));
