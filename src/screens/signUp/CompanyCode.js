import React,{useState,useEffect} from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import {Alert} from 'react-native';
import i18n from '@utils/i18n';
import { validateCompanyCode } from '@utils/api/switch';
import notValid from '@assets/signup/notValid.png';
import * as Animatable from 'react-native-animatable';
import {
  DivSpace,
  View,
  BoxBlue,
  ImageComponent,
  Text,
  Link,
  PinInput,
  SnackBar,
  NavigationBar,
  ButtonRounded,
  Loader
} from '@components';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';

const CompanyCode = ({ navigation }) => {

  const pinCode = useValidatedInput('pinCode', '');
  const [nameCompany,setNameCompany] = useState('');
  const [description,setDescription] = useState(null);
  const [imageCompany,setImageCompany] = useState('');
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [dontSnack, setDontSnack] = useState(true);
  const [codeNotValid, setCodeNotValid] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [title, setTitle] = useState('');
  var isValid = isFormValid(pinCode);
  function handleRequestCode() {
    navigation.navigate('RequestCompanyCode');
  }

  if(isValid ){
    if ( dontSnack) {
      getInfo();
    }
  }else if (!dontSnack & !isValid) {
    setDontSnac();
  } 

  async function getInfo() {
    const Code = pinCode.value;
    const response = await validateCompanyCode(Code);
    if (response.code < 400) {
      setNameCompany(response.data.name);
      setImageCompany(response.data.pathLogo);
      setDontSnack(false);
      setCodeNotValid(false);
    }else{
      setSnakVisible(true);
      setCodeNotValid(true);
      setDontSnack(true);
      setTitle(response.message);
    }
  }

  async function someFunc(e) {
    const Code = pinCode.value;
    const response = await validateCompanyCode(Code);
    if (response.code < 400) {
      setIsLoadingModal(true);
      setCodeNotValid(false);
      setTimeout(function(){
        navigation.navigate('Register',{id: response.data.id});
        setIsLoadingModal(false);
      }, 1000);
    } else {
      setIsLoadingModal(true);
      setTimeout(function(){
        setSnakVisible(true);
        setDontSnack(false);
        setIsLoadingModal(false);
        setTitle(response.message);
      }, 1000);
    } 
    
  }

  function handlePressBack() {
    navigation.goBack();
  }

  const handleCloseNotif = async() => {
    setSnakVisible(false);
    setDontSnack(false);
    setActionAnimated(true);
  };

  async function setDontSnac() {
    setDontSnack(true);
    setSnakVisible(false);
    setActionAnimated(true);
  }

  return (
    <SignUpWrapper>
      <NavigationBar body={i18n.t('signUp.component.labelEntryCode')} onBack={handlePressBack} />
      <DivSpace height-20 />
      <View flex-1 centerH>
        <BoxBlue containerStyle={{ justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 25}}>
          <DivSpace height-25 />
          <Text h16 white>{i18n.t('signUp.component.labelEntryCode')}</Text>
          <DivSpace height-10 />
          <Text h12 bgGray>{i18n.t('signUp.component.labelEnterYourCompanyCode')}</Text>
          <DivSpace height-10 />
          <PinInput {...pinCode}/>
          <DivSpace height-15 />
          {!dontSnack && !codeNotValid &&(
            <Animatable.View animation={'fadeIn'}	 style={{alignItems:'center'}}>
              <DivSpace height-35 />
              <ImageComponent source={{uri: imageCompany}} width={scale(246)} height={verticalScale(66)}/>
              <DivSpace height-20 />
              <Text h12 white semibold>{nameCompany}</Text>
              <DivSpace height-25 />
            </Animatable.View>)}
          {codeNotValid&&(<Animatable.View animation={'fadeIn'}	 style={{alignItems:'center'}}>
            <ImageComponent bgBlue01 source={notValid} width={scale(246)} height={verticalScale(66)}/>
            <DivSpace height-20 />
            <Text h12 white semibold>{i18n.t('signUp.component.textInvalidCode')}</Text>
            <DivSpace height-25 />
          </Animatable.View>)}
          <Text h10 textGray semibold center>{i18n.t('signUp.component.labelYourProfileInUulala')}</Text>
          <DivSpace height-10 />
          <Text h10 textGray center>{i18n.t('signUp.component.labelTheInformationRequested')}</Text>
          <DivSpace height-30 />
          <View centerH>
            <ButtonRounded
              size="lg"
              disabled={!isValid && !codeNotValid ? true: codeNotValid}
              onPress={someFunc}
            >
              <Text h10 semibold>
                {i18n.t('signUp.component.buttonAccept')}
              </Text>
            </ButtonRounded>
            <DivSpace height-25 />
            <Link  onPress={handleRequestCode}>
              <Text h10 medium title>
                {i18n.t('signUp.component.linkIHaventCode')}
              </Text>
            </Link>
          </View>
        
        </BoxBlue>
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

export default CompanyCode;
