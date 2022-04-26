import React,{ useState } from 'react';
import PinView from 'react-native-pin-view';
import i18n from '@utils/i18n';
import Styles from './styles';
import { connect } from 'react-redux';
import { updateAppConfirmationPin } from '@utils/api/switch';
import { withNavigationFocus } from 'react-navigation';
import { saveUserRegistration } from '@store/ducks/user.ducks';
import { verticalScale } from 'react-native-size-matters';
import LocalStorage from '@utils/localStorage';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';
import {
  View,
  Text,
  DivSpace,
  Loader,
  NavigationBar,
  SnackBar 
} from '@components';

const ConfirmationPinUser = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const [snakVisible, setSnakVisible] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [title, setTitle] = useState('');
  const [textWarning, setTextWarning] = useState(false);


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
    const token = await LocalStorage.get('auth_token');
    const response = await updateAppConfirmationPin(token,PinConfirm);
    if (response.code < 400) {
      setTimeout(function(){
        navigation.navigate('PasswordConfirmation',{page: 'changePin'}); 
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
 
  function handlePressBack() {
    navigation.goBack();
  }


  return (
    <View textBlueDark flex-1>
      <DivSpace height-30 />
      <NavigationBar
        onBack={handlePressBack}
        body={i18n.t('AppNewPin.component.AppConfirmationPin.title')}
        onClose={null}
        Style={[Styles.buttonBack,{ backgroundColor: brandTheme.textBlue01??Colors?.textBlue01 }]}
        textStyle={[Styles.textTitle,{color:brandTheme.white??Colors?.white}]}
      />
      <View paddingH-55> 
        <DivSpace height-20 />
        <Text h12 textGray regular center>{i18n.t('AppNewPin.component.textYouWillUseIt')}</Text>
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
