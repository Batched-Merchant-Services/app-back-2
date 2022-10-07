import React, { useState,useEffect } from 'react';
import { formatDate, formatDateSend } from '@utils/formatters';
import { KeyboardAvoidingView, Platform } from 'react-native';
import i18n from '@utils/i18n';
import {
  DivSpace,
  AnimateLabelInput,
  NavigationBar,
  View,
  SwitchControl,
  DropDownDatePicker,
  Text,
  ButtonRounded,
  Link,
  SnackBar,
  Loader
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { updateUser } from '@utils/api/switch';
import LocalStorage from '@utils/localStorage';


const PersonalInformation = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const userInfo = userData ? userData.infoUser : '';
  const inputName = userInfo ? userInfo.firstName : '';
  const inputMiddleName = userInfo ? userInfo.middleName ? userInfo.middleName : '' : '';
  const inputSlastName = userInfo ? userInfo.lastName : '';
  const inputBirthday = userInfo ? userInfo.birthday : '';
  const inputCurp = userInfo ? userInfo.otherNationalId : '';
  const inputRfc = userInfo ? userInfo.nationalId ? userInfo.nationalId : '' : '';
  const inputGender = userInfo ? userInfo.gender : '';
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [title, setTitle] = useState('');
  const [buttonNext, setButtonNext] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [Gender, setGender] = useState(inputGender);
  const name = useValidatedInput('name', inputName);
  const lastName = useValidatedInput('', inputMiddleName);
  const slastName = useValidatedInput('slastName', inputSlastName);
  const birthday = useValidatedInput('birthday', inputBirthday);
  const curp = useValidatedInput('curp', inputCurp);
  const rfc = useValidatedInput('', inputRfc);
  const isValid = isFormValid(name,slastName,birthday);
  const onclickSegment = useValidatedInput('segment', false, {
    changeHandlerName: 'onChangeSeg'
  });

  const onFill = code => {
    setGender(code === 1 ? 'F' : code === 2 ? 'M' : 'O');
  };
  const [nameDay, setIsBirthday] = useState({ text: formatDateSend(birthday.value), message: '' });

  const onDateSelected = (date, name) => {
    const format = formatDateSend(date);
    setIsBirthday({ text: format, message: ' ' });
  };

  useEffect(() => {
    setGender(inputGender === 1 || inputGender === 'F'  ? 'F' : inputGender === 2 || inputGender === 'M' ? 'M' : 'O');
  }, []);


  function handlePressBack() {
    navigation.goBack();
  }

  async function handlePressNext() {
    setIsLoadingModal(true);
    const token = await LocalStorage.get('auth_token');
    const response = await updateUser(
      token,
      name.value,
      lastName.value,
      slastName.value,
      Gender,
      nameDay.text,
      curp.value,
      rfc.value,
    );
    if (response.code < 400) {
      setTimeout(function () {
        navigation.navigate('MyProfile');
        setIsLoadingModal(false);
      }, 1000);
    } else {
      setIsLoadingModal(true);
      setTimeout(function () {
        setIsLoadingModal(false);
        setSnakVisible(true);
        setButtonNext(true);
        setTitle(response.message);
      }, 1000);
    }
  }

  function handleContactInform() {
    navigation.navigate('ContactInformationProfile');
  }

  const handleCloseNotif = () => {
    setSnakVisible(false);
    setButtonNext(false);
    setActionAnimated(true);
  };


  return (
    <SignUpWrapper >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : ""}
        style={{ flex: 1 }}
      >
        <NavigationBar onBack={handlePressBack} body={i18n.t('myProfile.component.titleMyPersonalInformation')} />
        <ScrollView>
          <SafeAreaView forceInset={{ top: 'always' }}>
            <DivSpace height-10 />
            <View row centerH>
              <View width-6 height-6 bgOrange02 style={{ borderRadius: 6 }}></View>
              <DivSpace width-6 />
              <View width-6 height-6 bgGray style={{ borderRadius: 6 }}></View>
              <DivSpace width-6 />
              <View width-6 height-6 bgGray style={{ borderRadius: 6 }}></View>
              <DivSpace width-6 />
              <View width-6 height-6 bgGray style={{ borderRadius: 6 }}></View>
              <DivSpace width-6 />
              <View width-6 height-6 bgGray style={{ borderRadius: 6 }}></View>
            </View>
            <DivSpace height-15 />
            <View flex-1>
              <View paddingH-20>
                <AnimateLabelInput
                  {...name}
                  label={i18n.t('myProfile.component.labelName')}
                  keyboardType={'default'}
                  returnKeyType={'done'}
                  autoCapitalize={'none'}
                />
                <DivSpace height-10 />
                <AnimateLabelInput
                  {...lastName}
                  label={i18n.t('myProfile.component.labelFirstLastName')}
                  keyboardType={'default'}
                  returnKeyType={'done'}
                  autoCapitalize={'none'}
                />
                <DivSpace height-10 />
                <AnimateLabelInput
                  {...slastName}
                  label={i18n.t('myProfile.component.labelSecondLastName')}
                  keyboardType={'default'}
                  returnKeyType={'done'}
                  autoCapitalize={'none'}
                />
                <DivSpace height-10 />
                <View row>
                  <View flex-1>
                    <Text h12 regular bgGray>
                      {i18n.t('myProfile.component.labelGender')}
                    </Text>
                    <DivSpace height-5 />
                    <SwitchControl
                      {...onclickSegment}
                      selectValue={Gender}
                      onSelected={code => onFill(code)}
                    />
                  </View>
                </View>

                <DivSpace height-20 />
                <DropDownDatePicker
                  onSelected={date => onDateSelected(date, 'birthday')}
                  placeholder={birthday.value !== '' ? formatDate(birthday.value) : 'MM/DD/YYYY'}
                  label={i18n.t('myProfile.component.labelMyBirthday')}
                />
                {/* <DivSpace height-30 />

                <AnimateLabelInput
                  {...curp}
                  label={i18n.t('myProfile.component.labelCURP')}
                  autoCapitalize={'characters'}
                /> */}
                <DivSpace height-10 />
                {/* <AnimateLabelInput
                {...rfc}
                label={i18n.t('myProfile.component.labelRFC')}
                keyboardType={'default'}
                autoCapitalize={'none'}
              /> */}
                <DivSpace height-15 />
                <Text h10 textGray>{i18n.t('myProfile.component.textTheInformationRequested')}<Text bold white>{' '}{i18n.t('myProfile.component.textItisProtectedWithUs')}</Text></Text>
                <DivSpace height-15 />
                <View left>
                  <Link onPress={() => { }}>
                    <Text h13 medium bgBlue06>
                      {i18n.t('myProfile.component.linkNoticeOfPrivacy')}
                    </Text>
                  </Link>
                </View>
                <DivSpace height-20 />
                <View row>
                  <View flex-1  >
                    <View centerH centerV bottom>
                      <ButtonRounded size='lg' onPress={handlePressNext} disabled={!isValid && !buttonNext ? true : buttonNext}>
                        <Text h10 semibold>
                          {i18n.t('myProfile.component.buttonSaveAndFinish')}
                        </Text>
                      </ButtonRounded>
                      <DivSpace height-15 />
                    </View>
                  </View>
                </View>
              </View>
            </View>

          </SafeAreaView>
        </ScrollView>
        <SnackBar
          message={title}
          isVisible={snakVisible}
          onClose={handleCloseNotif}
          animationAction={actionAnimated}
        />
        {isLoadingModal && (
          <Loader
            isOpen={true}
            navigation={navigation} />)}
      </KeyboardAvoidingView>
    </SignUpWrapper>
  );
};

export default PersonalInformation;
