import React, { useState, useEffect } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';
import { KeyboardAvoidingView, Platform } from 'react-native';
import i18n from '@utils/i18n';
import {
  View,
  Text,
  DivSpace,
  Link,
  Select,
  ImageComponent,
  AnimateLabelInput,
  ButtonNext,
  SnackBar,
  Loader
} from '@components';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { signUp } from '@utils/api/switch';
import { catalogCountry } from '@utils/api/switch';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser } from '@store/ducks/user.ducks';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import Welcome from '@assets/brand/welcome.png';


const Register = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandThemeImages = userData?.Theme?.images;
  const Id = navigation.getParam('id');
  const IdCompany = Id ? Id.toString() : '';
  const [title, setTitle] = useState('');
  const [countries, setCountries] = useState([]);
  const [buttonNext, setButtonNext] = useState(false);
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const email = useValidatedInput('email', '');
  const phone = useValidatedInput('phone', '');
  const country = useValidatedInput('country', { name: i18n.t('generics.selectOne') }, {
    changeHandlerSelect: 'onSelect'
  });
  const dispatch = useDispatch();

  useEffect(() => {
    getContries();

  }, []);

  async function getContries() {
    const response = await catalogCountry();
    if (response.code < 400) {
      setCountries(response.data);
    } else {
      setCountries([]);
    }
  }



  const isValid = isFormValid(email, phone, country);

  const handlePressRegister = async () => {
    const Email = email.value;
    const PhoneNumber = phone.value;
    const Country = country.value.phone_code;
    const Currency = country.value.currency;
    const valueId = IdCompany;
    const response = await signUp(Email, PhoneNumber, Country, valueId);
    if (response.code < 400) {
      dispatch(saveUser({ emailUser: Email, phoneUser: PhoneNumber, lada: Country, }));
      setIsLoadingModal(true);
      setTimeout(function () {
        navigation.navigate('ConfirmSMS', { email: Email, phone: PhoneNumber, lada: Country, currency: Currency });
        setIsLoadingModal(false);
      }, 1000);

    } else {
      setIsLoadingModal(true);
      setTimeout(function () {
        setButtonNext(true);
        setSnakVisible(true);
        setIsLoadingModal(false);
        setTitle(response.message);
      }, 1000);

    }
  };

  const handleCloseError = () => {
    setSnakVisible(false);
    setButtonNext(false);
    setActionAnimated(true);
  };

  function handlePressSignIn() {
    navigation.navigate('Login');
  }

  return (
    <SignUpWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : ""}
        style={{ flex: 1 }}
      >
        <DivSpace height-50 />
        <View flex-1>
          <View>
            <Animatable.View animation={'slideInRight'} style={{ alignItems: 'center' }}>
              <ImageComponent
                source={brandThemeImages?.welcome ? brandThemeImages?.welcome : Welcome}
                width={scale(220)}
                height={verticalScale(149)}
              />
            </Animatable.View>
            <DivSpace height-18 />
            <Text h22 white center semibold>
              {i18n.t('signUp.component.textwelcomeToUulala')}
            </Text>
            <DivSpace height-12 />
            <Text h15 center white>
              {i18n.t('generics.createAcco')}
            </Text>
          </View>
          <DivSpace height-30 />
          <View paddingH-20>
            <Animatable.View animation={'fadeIn'} >
              <AnimateLabelInput
                {...email}
                label={i18n.t('signUp.component.labelEmail')}
                keyboardType={'email-address'}
                autoCapitalize={'none'}
              />
            </Animatable.View>
            <DivSpace height-8 />
            <Animatable.View animation={'fadeIn'} >
              <Select
                {...country}
                label={i18n.t('generics.country')}
                options={countries}
                size="sm"
              />
            </Animatable.View>
            <DivSpace height-8 />
            <Animatable.View animation={'fadeIn'} >
              <AnimateLabelInput
                {...phone}
                label={i18n.t('generics.phone')}
                keyboardType={'number-pad'}
                autoCapitalize={'none'}
              />
            </Animatable.View>
          </View>
          <View flex-1 centerH bottom>
            <ButtonNext disabled={!isValid && !buttonNext ? true : buttonNext} onPress={handlePressRegister} />
            <DivSpace height-15 />
            <Link onPress={handlePressSignIn}>
              {i18n.t('signUp.component.labelLinkSignIn')}
            </Link>
            <DivSpace height-20 />
          </View>
        </View>
        <SnackBar
          message={title}
          isVisible={snakVisible}
          onClose={handleCloseError}
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
export default Register;
