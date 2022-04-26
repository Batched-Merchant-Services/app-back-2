import React, { useState,useEffect } from 'react';
import { ScrollView, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { onboarding,catalogSecurityQuestion } from '@utils/api/switch';
import { formatDateSend } from '@utils/formatters';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { scale, verticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import i18n from '@utils/i18n';
import Link from '@components/Link';
import Select from '@components/Select';
import i from '@assets/icons/i.png';
import LocalStorage from '@utils/localStorage';
import styles from './styles';
import IconWarning from '../../utils/iconSVG/IconWarning';
import Colors from '@styles/Colors';
import {
  AnimateLabelInput,
  Text,
  View,
  DivSpace,
  SwitchControl,
  ImageComponent,
  ButtonNext,
  Checkbox,
  DropDownDatePicker,
  SnackBar,
  Loader
} from '@components';


const RegisterInitProfile = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [securityQuestions, setSecurityQuestions] = useState([]);
  const [title, setTitle] = useState('');
  const [gender, setGender] = useState('');
  const [buttonNext, setButtonNext] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [nameDay, setIsBirthday] = useState({ text: ', message: ' });
  const checkTandC = useValidatedInput('accepTerms', false, {
    changeHandlerName: 'onChange'
  });
  const onclickSegment = useValidatedInput('segment', false, {
    changeHandlerName: 'onChangeSeg'
  });
  const securityQ = useValidatedInput('securityQ', {name: i18n.t('generics.selectOne')}, {
    changeHandlerSelect: 'onSelect'
  });

  
  useEffect(() => {
    getQuestion();
  }, []);

  async function  getQuestion (){
    const response = await catalogSecurityQuestion();
    if (response.code < 400) {
      setSecurityQuestions(response.data);
    }else{
      setSecurityQuestions([]);
    }
  }

  const onFill = code => {
    setGender(code === 2 ? 'M' : code === 1 ? 'F' : 'O');
  };

  const name = useValidatedInput('name', '');
  const curp = useValidatedInput('curp', '');
  const flastname = useValidatedInput('', '');
  const slastname = useValidatedInput('slastName', '');
  const answer = useValidatedInput('answerS', '');
  const birthday = useValidatedInput('birthday', '');
  const isValid = checkTandC.value
    ? isFormValid(
      name,
      curp,
      securityQ,
      answer,
      birthday,
      checkTandC
    )
    : null;

  const handlePressNext = async () => {
    const token = await LocalStorage.get('auth_token');
    const Name = name.value;
    const Curp = curp.value;
    const Flastname = flastname.value;
    const Slastname = slastname.value;
    const Answer = answer.value;
    const security =securityQ.value;
    const phoneUser = userData.phoneUser;
    const emailUser = userData.emailUser;
    const ladaUser = userData.lada;
    const response = await onboarding(
      token,
      Name ,
      Flastname,
      Slastname,
      gender,
      nameDay.text,
      Curp,
      security.name,
      security.value,
      Answer,
      checkTandC.value,
      phoneUser,
      emailUser,
      ladaUser

    );
    if (response.code < 400) {
      setIsLoadingModal(true);
      setTimeout(function(){
        navigation.navigate('Login');
        setIsLoadingModal(false);
      }, 1000);
    } else {
      setIsLoadingModal(true);
      setTimeout(function(){
        setIsLoadingModal(false);
        setSnakVisible(true);
        setButtonNext(true);
        setTitle(response.message);
      }, 1000);
     
    }
  };

  const onDateSelected = (date, name) => {
    const format =formatDateSend(date);
    setIsBirthday({ text: format, message: ' ' });
  };
  const handleInfoPers = () => {
    navigation.navigate('InformationPersonal');
  };

  const handleCloseNotif = () => {
    setSnakVisible(false);
    setButtonNext(false);
    setActionAnimated(true);
  };

  return (
    <SafeAreaView style={[styles.containerInitProfile,{backgroundColor: brandTheme?.bgBlue01??Colors?.bgBlue01}]} forceInset={{top: 'always'}}>
      {Platform.OS === 'ios' ? <DivSpace height-0 />: <DivSpace height-25 /> }
      <ScrollView>
        <KeyboardAwareScrollView
          keyboardOpeningTime={100}
          contentContainerStyle={{ flex: 1 }}
        >
          <DivSpace height-10 />
          <View row centerH centerV>
            <View style={{ flex: 0.5 }} />
            <View flex-1 centerH>
              <Text h16 white medium>
                {' '}
                {i18n.t('myProfile.component.labelTitleOnboard')}{' '}
              </Text>
            </View>
            <View style={styles.viewInform} right>
              <TouchableOpacity
                style={[styles.information,{backgroundColor: brandTheme?.textBlueDark??Colors?.textBlueDark}]}
                onPress={handleInfoPers}
              >
                <ImageComponent
                  white
                  source={i}
                  width={scale(7)}
                  height={verticalScale(12)}
                />
              </TouchableOpacity>
            </View>
          </View>
          <DivSpace height-18 />

          <View style={{ paddingHorizontal: 25 }}>
            <AnimateLabelInput
              {...name}
              label={i18n.t('myProfile.component.labelName')}
              keyboardType={'default'}
              autoCapitalize={'none'}
            />
            <DivSpace height-13 />
            <AnimateLabelInput
              {...flastname}
              label={i18n.t('myProfile.component.labelFirstLastName')}
              keyboardType={'default'}
              autoCapitalize={'none'}
            />
            <DivSpace height-13 />
            <AnimateLabelInput
              {...slastname}
              label={i18n.t('myProfile.component.labelSecondLastName')}
              keyboardType={'default'}
              autoCapitalize={'none'}
            /> 
            <DivSpace height-13 />
            <View row>
              <View flex-1>
                <Text h12 regular bgGray>
                  {i18n.t('myProfile.component.labelGender')}
                </Text>
                <DivSpace height-5 />
                <SwitchControl
                  {...onclickSegment}
                  selectValue={true}
                  onSelected={code => onFill(code)}
                />
              </View>
            </View>
            <DivSpace height-15 />
            <DropDownDatePicker
              onSelected={date => onDateSelected(date, 'birthday')}
              label={i18n.t('myProfile.component.labelMyBirthday')}
            />
            <DivSpace height-30 />
            <AnimateLabelInput
              {...curp}
              label={i18n.t('myProfile.component.labelCurp')}
              autoCapitalize={'characters'}
            />
            <DivSpace height-10 />
          </View>
          <View textBlue01 height-205>
            <DivSpace height-18 />
            <View marginH-25>
              <View row centerV>
                <IconWarning width={scale(15)} height={verticalScale(15)}  fill={brandTheme?.bgOrange01??Colors?.bgOrange01}  fillSecondary={brandTheme?.bgBlue01??Colors?.bgBlue01}/>
                <Text h11 bgOrange02>
                  {' '}
                  {i18n.t('onBoard.component.labelimportantRemember')}
                </Text>
              </View>
              <DivSpace height-13 />
              <Select
                {...securityQ}
                label={i18n.t('onBoard.component.choseSecurityQuestion')}
                options={securityQuestions}
              />
              <DivSpace height-8 />
              <AnimateLabelInput
                {...answer}
                label={i18n.t('generics.answerSecret')}
                keyboardType={'default'}
                autoCapitalize={'none'}
              />
            </View>
          </View>
          <DivSpace height-15 />
          <View flex-1 bottom marginH-25>
            <View row centerV>
              <Checkbox {...checkTandC} checkedValue={true} />
              <DivSpace width-8 />
              <Text white h12 medium>
                {i18n.t('onBoard.component.textNoticeOfPrivacy')}
              </Text>
              <DivSpace width-8 />
              <Link>{i18n.t('onBoard.component.linkNoticeOfPrivacy')}</Link>
            </View>
            <DivSpace height-15 />
            <Text white h12 medium>
              {i18n.t('onBoard.component.textRememberToComplete')}
            </Text>
            <DivSpace height-15 />
          </View>

          <View centerH centerV>
            <DivSpace height-15 />
            <ButtonNext onPress={handlePressNext} disabled={!isValid && !buttonNext ? true: buttonNext} />
            <DivSpace height-10 />
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
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
    </SafeAreaView>
  );
};
export default RegisterInitProfile;
