import React, { useState, useEffect, Fragment } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import i18n from '@utils/i18n';
import {
  DivSpace,
  AnimateLabelInput,
  NavigationBar,
  View,
  Text,
  ButtonRounded,
  ButtonNext,
  Link,
  Select,
  SnackBar,
  Loader
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
import { useSelector } from 'react-redux';
import { updateUserContactInfo, createAddress, catalogCountry } from '@utils/api/switch';
import LocalStorage from '@utils/localStorage';


const ContactInformationProfile = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const userInfo = userData.infoUser;
  const addressState = userInfo ? userInfo.address : '';
  const addressFirst = userInfo ? userInfo.address[0] : '';
  const inputPhoneNumber = userInfo ? userInfo.phoneNumber : '';
  const inputEmail = userInfo ? userInfo.email : '';
  const inputIdUser = userData.idUser ? userData.idUser : '';
  const inputStreet = addressState.length > 0 ? addressFirst.street ? addressFirst.street : '' : '';
  const inputNumberOutIn = addressState.length > 0 ? addressFirst.number ? addressFirst.number : '' : '';
  const inputSuburb = addressState.length > 0 ? addressFirst.suburb !== '' ? addressFirst.suburb : '' : '';
  const inputCountry = addressState.length > 0 ? addressFirst.country !== '' ? addressFirst.country : '' : '';
  const inputZipCode = addressState.length > 0 ? addressFirst.zipCode ? addressFirst.zipCode : '' : '';
  const inputIdAddress = addressState.length > 0 ? addressFirst.id ? addressFirst.id : '' : '';
  const inputDelegation = addressState.length > 0 ? addressFirst.city !== '' ? addressFirst.city : '' : '';
  const inputState = addressState.length > 0 ? addressFirst.state !== '' ? addressFirst.state : '' : '';
  const [countryCatalog, setCountryCatalog] = useState([]);
  const [snakVisible, setSnakVisible] = useState(false);
  const [showInfoEU, setShowInfoEU] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [title, setTitle] = useState('');
  const [buttonNext, setButtonNext] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const street = useValidatedInput('street', inputStreet);
  const delegation = useValidatedInput('delegation', inputDelegation);
  const state = useValidatedInput('state', inputState);
  const numberOutIn = useValidatedInput(showInfoEU || inputCountry === 'MEXICO' ? 'number' : '', inputNumberOutIn);
  const suburb = useValidatedInput(showInfoEU || inputCountry === 'MEXICO' ? 'suburb' : '', inputSuburb);
  const CP = useValidatedInput('postalCode', inputZipCode);

  useEffect(() => {
    countryCatalogs();
    const IDCountry = inputCountry === 'MEXICO' ? true : false;
    setShowInfoEU(IDCountry);
  }, []);

  async function countryCatalogs() {
    const token = await LocalStorage.get('auth_token');
    const responseCountry = await catalogCountry(token);
    if (responseCountry.code < 400) {
      setCountryCatalog(responseCountry.data);
    }
  }


  const country = useValidatedInput('country', inputCountry === '' || inputCountry === undefined ? { name: i18n.t('generics.selectOne') } : { name: inputCountry }, {
    changeHandlerSelect: 'onSelect'
  });

  const isValid = isFormValid(street, numberOutIn, suburb, CP, state, delegation, country);

  function handlePressBack() {
    navigation.goBack();
  }
  const handleOption = (code) => {
    const IDCountry = code.id === 142 ? true : false;
    setShowInfoEU(IDCountry);
  };


  async function handlePressNext() {
    setIsLoadingModal(true);
    const token = await LocalStorage.get('auth_token');
    const method = addressState.length > 0 ? updateUserContactInfo : createAddress;
    const response = await method(
      token,
      delegation.value,
      suburb.value,
      country.value.name,
      state.value,
      street.value,
      numberOutIn.value,
      CP.value,
      country.value.country_code,
      inputIdAddress,
      addressState.length > 0 ? inputIdUser : ''
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

  const handleCloseNotif = () => {
    setSnakVisible(false);
    setButtonNext(false);
    setActionAnimated(true);
  };



  return (
    <SignUpWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : ""}
        style={{ flex: 1 }}
      >
        <NavigationBar onBack={handlePressBack} body={i18n.t('myProfile.component.textContactInformation')} />
        <ScrollView>
          <SafeAreaView forceInset={{ top: 'always' }}>
            <DivSpace height-10 />
            <View row centerH>
              <View width-6 height-6 bgGray style={{ borderRadius: 6 }}></View>
              <DivSpace width-6 />
              <View width-6 height-6 bgOrange02 style={{ borderRadius: 6 }}></View>
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
                <Text h12 textGray>{i18n.t('myProfile.component.textDigitNumber')}</Text>
                <Text h14 textGray medium>{inputPhoneNumber}</Text>
                <DivSpace height-10 />
                <Text h12 textGray>{i18n.t('generics.email')}</Text>
                <Text h14 textGray medium>{inputEmail}</Text>
                <DivSpace height-20 />
                <Text h12 medium textGray>{i18n.t('generics.labelAddress')}</Text>
                <DivSpace height-15 />
                <Select
                  {...country}
                  onFill={(code) => handleOption(code)}
                  label={i18n.t('generics.textCountry')}
                  options={countryCatalog}
                />
                <DivSpace height-10 />
                <AnimateLabelInput
                  {...street}
                  label={i18n.t('myProfile.component.labelStreet')}
                  keyboardType={'default'}
                  returnKeyType={'done'}
                  autoCapitalize={'none'}
                />
                <DivSpace height-10 />
                {showInfoEU && (
                  <Fragment>
                    <AnimateLabelInput
                      {...numberOutIn}
                      label={i18n.t('myProfile.component.labelOutInsNumber')}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      autoCapitalize={'none'}
                    />
                    <DivSpace height-10 />
                  </Fragment>
                )}
                {showInfoEU && (
                  <Fragment>
                    <AnimateLabelInput
                      {...suburb}
                      label={i18n.t('myProfile.component.labelSuburb')}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      autoCapitalize={'none'}
                    />
                    <DivSpace height-10 />
                  </Fragment>
                )}
                <AnimateLabelInput
                  {...delegation}
                  label={i18n.t('myProfile.component.SelectDelegationOrMunicipality')}
                  keyboardType={'default'}
                  returnKeyType={'done'}
                  autoCapitalize={'none'}
                />
                <DivSpace height-10 />
                <AnimateLabelInput
                  {...state}
                  label={i18n.t('myProfile.component.SelectState')}
                  keyboardType={'default'}
                  returnKeyType={'done'}
                  autoCapitalize={'none'}
                />
                <DivSpace height-10 />

                <AnimateLabelInput
                  {...CP}
                  label={i18n.t('myProfile.component.SelectCP')}
                  keyboardType={'default'}
                  returnKeyType={'done'}
                  autoCapitalize={'none'}
                />
                <DivSpace height-10 />
                <Text h10 textGray>{i18n.t('myProfile.component.textTheInformationRequested')}<Text bold white>{' '}{i18n.t('myProfile.component.textItisProtectedWithUs')}</Text></Text>
                <DivSpace height-15 />
                <View left>
                  <Link onPress={() => { }}>
                    <Text h13 medium bgBlue06>
                      {i18n.t('myProfile.component.linkNoticeOfPrivacy')}
                    </Text>
                  </Link>
                </View>
                <DivSpace height-15 />
                <Text h10 textGray>{i18n.t('myProfile.component.textVerifyYourinformation')}</Text>
                <DivSpace height-15 />
                <View row>
                  <View flex-1  >
                    <View centerH centerV bottom>
                      <ButtonRounded size='lg' onPress={handlePressNext} disabled={!isValid}>
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

export default ContactInformationProfile;
