import React, { useState, useEffect, Fragment } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import i18n from '@utils/i18n';
import {
  DivSpace,
  AnimateLabelInput,
  NavigationBar,
  ButtonRounded,
  View,
  Text,
  Checkbox,
  Link,
  Select,
  SnackBar,
  Loader
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserContactInfo, catalogCountry } from '@utils/api/switch';
import LocalStorage from '@utils/localStorage';
import { cleanErrorProfile, createAddress, editAddress, getCountries, getState } from '../../store/actions/profile.actions';

const ContactInformationProfile = ({ navigation }) => {
  const redux = useSelector(state => state);
  const dispatch = useDispatch();
  const userData = redux?.user;
  const userGraph = redux?.userGraph;
  const profileData = redux?.profile;
  const userProfile = userGraph?.dataUser?.usersProfile ? userGraph?.dataUser?.usersProfile[0] : '';
  const userInfo = userProfile ? userProfile?.accounts : '';
  const addressState = userInfo ? userInfo?.address : '';
  const addressFirst = addressState ? userInfo?.address[0] : '';
  const addressSecond = addressState ? userInfo?.address[1] : '';
  const inputPhoneNumber = userInfo ? userInfo?.phoneNumber : '';
  const inputEmail = userInfo ? userInfo?.email : '';
  const inputIdUser = userData?.idUser ? userData?.idUser : '';
  const inputStreet = addressState?.length > 0 ? addressFirst?.street ? addressFirst?.street : '' : '';
  const inputNumberOutIn = addressState?.length > 0 ? addressFirst?.number ? addressFirst?.number : '' : '';
  const inputSuburb = addressState?.length > 0 ? addressFirst?.suburb !== '' ? addressFirst?.suburb : '' : '';
  const inputCountry = addressState?.length > 0 ? addressFirst?.country !== '' ? addressFirst?.country : '' : '';
  const inputZipCode = addressState?.length > 0 ? addressFirst?.zipCode ? addressFirst?.zipCode : '' : '';
  const inputDelegation = addressState?.length > 0 ? addressFirst?.city !== '' ? addressFirst?.city : '' : '';
  const inputState = addressState?.length > 0 ? addressFirst?.state !== '' ? addressFirst?.state : '' : '';

  const inputStreetShipping = addressState?.length > 0 ? addressSecond?.street ? addressSecond?.street : '' : '';
  const inputNumberOutInShipping = addressState?.length > 0 ? addressSecond?.number ? addressSecond?.number : '' : '';
  const inputSuburbShipping = addressState?.length > 0 ? addressSecond?.suburb !== '' ? addressSecond?.suburb : '' : '';
  const inputCountryShipping = addressState?.length > 0 ? addressSecond?.country !== '' ? addressSecond?.country : '' : '';
  const inputZipCodeShipping = addressState?.length > 0 ? addressSecond?.zipCode ? addressSecond?.zipCode : '' : '';
  const inputDelegationShipping = addressState?.length > 0 ? addressSecond?.city !== '' ? addressSecond?.city : '' : '';
  const inputStateShipping = addressState?.length > 0 ? addressSecond?.state !== '' ? addressSecond?.state : '' : '';

  const inputIdAddress = addressState?.length > 0 ? addressFirst?.id ? addressFirst?.id : '' : '';

  const [countryCatalog, setCountryCatalog] = useState([]);
  const [countryShippCatalog, setCountryShippCatalog] = useState([]);
  const [stateShippCatalog, setStateShippCatalog] = useState([]);
  const [stateCatalog, setStateCatalog] = useState([]);
  const [showStateAddress, setShowStateAddress] = useState(false);
  const [snakVisible, setSnakVisible] = useState(false);
  const [showInfoEU, setShowInfoEU] = useState(false);
  const [showInfoEUShipping, setShowInfoEUShipping] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [title, setTitle] = useState('');
  const [buttonNext, setButtonNext] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [typeAddress, setTypeAddress] = useState('');
  //address Shipping
  const streetShipping = useValidatedInput('street', inputStreetShipping);
  const delegationShipping = useValidatedInput('delegation', inputDelegationShipping);
  const numberOutInShipping = useValidatedInput(showInfoEUShipping || inputCountryShipping === 'Mexico +52' ? '' : '', inputNumberOutInShipping);
  const suburbShipping = useValidatedInput(showInfoEUShipping || inputCountryShipping === 'Mexico +52' ? 'suburb' : '', inputSuburbShipping);
  const CPShipping = useValidatedInput('postalCode', inputZipCodeShipping);
  const stateShipping = useValidatedInput('state', inputStateShipping === '' || inputStateShipping === undefined ? { name: i18n.t('generics.selectOne') } : { name: inputStateShipping }, {
    changeHandlerSelect: 'onSelect'
  });
  const countryShipping = useValidatedInput('country', inputCountryShipping === '' || inputCountryShipping === undefined ? { name: i18n.t('generics.selectOne') } : { name: inputCountryShipping }, {
    changeHandlerSelect: 'onSelect'
  });

  //address
  const street = useValidatedInput('street', inputStreet);
  const delegation = useValidatedInput('delegation', inputDelegation);
  const numberOutIn = useValidatedInput(showInfoEU || inputCountry === 'Mexico +52' ? '' : '', inputNumberOutIn);
  const suburb = useValidatedInput(showInfoEU || inputCountry === 'Mexico +52' ? 'suburb' : '', inputSuburb);
  const CP = useValidatedInput('postalCode', inputZipCode);
  const country = useValidatedInput('country', inputCountry === '' || inputCountry === undefined ? { name: i18n.t('generics.selectOne') } : { name: inputCountry }, {
    changeHandlerSelect: 'onSelect'
  });
  const state = useValidatedInput('state', inputState === '' || inputState === undefined ? { name: i18n.t('generics.selectOne') } : { name: inputState }, {
    changeHandlerSelect: 'onSelect'
  });
  const checkTandC = useValidatedInput('accepTerms', false, {
    changeHandlerName: 'onChange'
  });
  const isValid = isFormValid(street, CP, state, delegation, country);
  const isValidMX = isFormValid(street, CP, state, delegation, country, numberOutIn, suburb);
  const isValidShipping = isFormValid(streetShipping, delegationShipping, stateShipping, countryShipping, CPShipping);
  const isValidShippingMX = isFormValid(streetShipping, delegationShipping, stateShipping, countryShipping, CPShipping, numberOutInShipping, suburbShipping);
  const validAddress = showInfoEU ? !isValidMX : !isValid;
  const validAddressShipp = showInfoEUShipping ? !isValidShippingMX : !isValidShipping;


  // useEffect(() => {
  //   countryCatalogs();
  //   const IDCountry = inputCountry === 'Mexico +52' ? true : false;
  //   setShowInfoEU(IDCountry);
  // }, []);

  // async function countryCatalogs() {
  //   const token = await LocalStorage.get('auth_token');
  //   const responseCountry = await catalogCountry(token);
  //   if (responseCountry.code < 400) {
  //     setCountryCatalog(responseCountry.data);
  //   }
  // }
  useEffect(() => {
    dispatch(cleanErrorProfile());
  }, [])




  useEffect(() => {
    dispatch(getCountries());
    const IDCountry = inputCountry === 'Mexico +52' || inputState === 'MEX' ? true : false;
    const IDCountryShip = inputCountryShipping === 'Mexico +52' || inputStateShipping === 'MEX' ? true : false;
    setShowInfoEU(IDCountry); 
    setShowInfoEUShipping(IDCountryShip);
  }, []);

  useEffect(() => {
    if (profileData?.stateAddress) {
      if (profileData?.stateAddress?.length > 0) {
        if (profileData?.typeState === 'billing') {
          setStateCatalog(profileData?.stateAddress);
        } else {
          setStateShippCatalog(profileData?.stateAddress);
        }
        setShowStateAddress(true);
      } else {
        setShowStateAddress(false);
      }
    } else {
      setShowStateAddress(true)
    }
  }, [profileData?.stateAddress]);


  useEffect(() => {
    if (profileData?.countries) {
      if (profileData?.countries?.length > 0) {
        setCountryCatalog(profileData?.countries);
        setCountryShippCatalog(profileData?.countries);
        // const valueCountry = profileData?.countries?.filter(key => key?.countryNumber === address?.country);
        // setValueCountries(...valueCountry);
      }
    }
  }, [profileData?.countries]);

  useEffect(() => {
    setIsLoadingModal(false);
  }, [profileData?.successCreateAddress]);

  useEffect(() => {
    setIsLoadingModal(false);
  }, [profileData?.successEditAddress]);




  function handlePressBack() {
    navigation.goBack();
  }
  const handleOption = (code) => {
    const codeId = code?.value;
    const IDCountry = codeId === 484 ? true : false;
    setShowInfoEU(IDCountry);
    dispatch(getState(codeId, 'billing'));
    setTypeAddress('billing');
  };

  const handleOptionShipping = (code) => {
    const codeId = code?.value;
    const IDCountry = codeId === 484 ? true : false;
    setShowInfoEUShipping(IDCountry);
    dispatch(getState(codeId, 'shipping'));
    setTypeAddress('shipping');
  };


  function getUpdateAddress() {
    setIsLoadingModal(true);
    const valueCountry = country?.value ?? '';
    const valueCountrySipping = countryShipping?.value ?? '';
    const valueState = state?.value ?? '';
    const valueStateSipping = stateShipping?.value ?? '';
    const dataUpdateAddress = {
      id: addressFirst?.id ?? '',
      accountId: userProfile?.accountId ?? "",
      suburb: suburb?.value ?? "",
      city: delegation.value ?? "",
      country: valueCountry?.name ?? "",
      state: valueState?.name ?? "",
      street: street?.value ?? "",
      number: numberOutIn?.value ?? "",
      typeAddress: 'billing',
      zipCode: CP?.value ?? "",
      shortName: 'billing',
      isComplete: true
    }
    const dataUpdateAddressShipping = {
      id: addressSecond?.id ?? '',
      accountId: userProfile?.accountId ?? "",
      suburb: checkTandC?.value ? suburb?.value : suburbShipping?.value,
      city: checkTandC?.value ? delegation?.value : delegationShipping?.value,
      country: checkTandC?.value ? valueCountry?.name : valueCountrySipping?.name,
      state: checkTandC?.value ? valueState?.name : valueStateSipping?.name,
      street: checkTandC?.value ? street?.value : streetShipping?.value,
      number: checkTandC?.value ? numberOutIn?.value : numberOutInShipping?.value,
      typeAddress: 'shipping',
      zipCode: checkTandC?.value ? CP?.value : CPShipping?.value,
      shortName: 'shipping',
      isComplete: true
    }
    dispatch(editAddress({ arrayUpdateAddress: [dataUpdateAddress, dataUpdateAddressShipping] }))
  }

  function getCreateAddress() {
    setIsLoadingModal(true);
    const valueCountry = country?.value ?? '';
    const valueCountrySipping = countryShipping?.value ?? '';
    const valueState = state?.value ?? '';
    const valueStateSipping = stateShipping?.value ?? '';
    const dataCreateAddress = {
      accountId: userProfile?.accountId ?? "",
      suburb: suburb?.value ?? "",
      city: delegation.value ?? "",
      country: valueCountry?.value ?? "",
      state: valueState?.value ?? "",
      street: street?.value ?? "",
      number: numberOutIn?.value ?? "",
      typeAddress: 'billing',
      zipCode: CP?.value ?? "",
      shortName: 'billing',
      isComplete: true
    }
    const dataCreateAddressShipping = {
      accountId: userProfile?.accountId ?? "",
      suburb: checkTandC?.value ? suburb?.value : suburbShipping?.value,
      city: checkTandC?.value ? delegation?.value : delegationShipping?.value,
      country: checkTandC?.value ? valueCountry?.value : valueCountrySipping?.value,
      state: checkTandC?.value ? valueState?.value : valueStateSipping?.value,
      street: checkTandC?.value ? street?.value : streetShipping?.value,
      number: checkTandC?.value ? numberOutIn?.value : numberOutInShipping?.value,
      typeAddress: 'shipping',
      zipCode: checkTandC?.value ? CP?.value : CPShipping?.value,
      shortName: 'shipping',
      isComplete: true
    }
    dispatch(createAddress({ arrayAddress: [dataCreateAddress, dataCreateAddressShipping] }));

  }



  // async function handlePressNext() {
  //   setIsLoadingModal(true);
  //   const token = await LocalStorage.get('auth_token');
  //   const method = addressState.length > 0 ? updateUserContactInfo : createAddress;
  //   const response = await method(
  //     token,
  //     delegation.value,
  //     suburb.value,
  //     country.value.name,
  //     state.value,
  //     street.value,
  //     numberOutIn.value,
  //     CP.value,
  //     country.value.country_code,
  //     inputIdAddress,
  //     addressState.length > 0 ? inputIdUser : ''
  //   );
  //   if (response.code < 400) {
  //     setTimeout(function () {
  //       navigation.navigate('MyProfile');
  //       setIsLoadingModal(false);
  //     }, 1000);
  //   } else {
  //     setIsLoadingModal(true);
  //     setTimeout(function () {
  //       setIsLoadingModal(false);
  //       setSnakVisible(true);
  //       setButtonNext(true);
  //       setTitle(response.message);
  //     }, 1000);
  //   }
  // }

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
                <DivSpace height-3 />
                {showStateAddress && (
                  <Fragment>
                    <Select
                      {...state}
                      label={i18n.t('myProfile.component.SelectState')}
                      options={stateCatalog}
                    />
                    <DivSpace height-10 />
                  </Fragment>
                )}
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
                  {...CP}
                  label={i18n.t('myProfile.component.SelectCP')}
                  keyboardType={'default'}
                  returnKeyType={'done'}
                  autoCapitalize={'none'}
                />
                <DivSpace height-10 />
                <View row centerV>
                  <Checkbox {...checkTandC} checkedValue={true} />
                  <DivSpace width-10 />
                  <Text h12 white>
                    Use billing address to shipping
                  </Text>
                </View>
                <DivSpace height-10 />

                {!checkTandC?.value && (
                  <Fragment>
                    <Select
                      {...countryShipping}
                      onFill={(code) => handleOptionShipping(code)}
                      label={i18n.t('generics.textCountry')}
                      options={countryShippCatalog}
                    />
                    <DivSpace height-10 />
                    <Select
                      {...stateShipping}
                      label={i18n.t('myProfile.component.SelectState')}
                      options={stateShippCatalog}
                    />
                    <DivSpace height-10 />
                    <AnimateLabelInput
                      {...streetShipping}
                      label={i18n.t('myProfile.component.labelStreet')}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      autoCapitalize={'none'}
                    />
                    <DivSpace height-10 />
                    {showInfoEUShipping && (
                      <Fragment>
                        <AnimateLabelInput
                          {...numberOutInShipping}
                          label={i18n.t('myProfile.component.labelOutInsNumber')}
                          keyboardType={'default'}
                          returnKeyType={'done'}
                          autoCapitalize={'none'}
                        />
                        <DivSpace height-10 />
                      </Fragment>
                    )}
                    {showInfoEUShipping && (
                      <Fragment>
                        <AnimateLabelInput
                          {...suburbShipping}
                          label={i18n.t('myProfile.component.labelSuburb')}
                          keyboardType={'default'}
                          returnKeyType={'done'}
                          autoCapitalize={'none'}
                        />
                        <DivSpace height-10 />
                      </Fragment>
                    )}
                    <AnimateLabelInput
                      {...delegationShipping}
                      label={i18n.t('myProfile.component.SelectDelegationOrMunicipality')}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      autoCapitalize={'none'}
                    />
                    <DivSpace height-10 />
                    <AnimateLabelInput
                      {...CPShipping}
                      label={i18n.t('myProfile.component.SelectCP')}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      autoCapitalize={'none'}
                    />
                    <DivSpace height-10 />
                  </Fragment>
                )}
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
                      <ButtonRounded size='lg' onPress={addressState?.length > 0 ? getUpdateAddress : getCreateAddress} disabled={typeAddress === 'shipping' ? validAddressShipp : validAddress}>
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
