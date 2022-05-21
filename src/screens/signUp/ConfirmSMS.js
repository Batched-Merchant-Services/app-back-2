import React, { Fragment, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { saveUser } from '@store/ducks/user.ducks';
import { validateCode } from '@utils/api/switch';
import { scale, verticalScale } from 'react-native-size-matters';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import * as Animatable from 'react-native-animatable';
import i18n from '@utils/i18n';
import SMS from '@assets/brand/password.png';
import background from '@assets/brand/backgroundImage.png';

import {
  NavigationBar,
  DivSpace,
  View,
  ImageComponent,
  Text,
  Link,
  PinInput,
  SnackBar,
  ResizeImageBackground
} from '@components';


const ConfirmSMS = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandThemeImages = userData?.Theme?.images;
  const brandTheme = userData?.Theme?.colors;
  const page = navigation.getParam('page');
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [title, setTitle] = useState('');
  const [dontSnack, setDontSnack] = useState(true);
  const pinCode = useValidatedInput('pinCode', '');
  const isValid = isFormValid(pinCode);
  const dispatch = useDispatch();
  const email = navigation.getParam('email');
  const phone = navigation.getParam('phone');
  const lada = navigation.getParam('lada');
  const currency = navigation.getParam('currency');

  if (isValid) {
    if (dontSnack) {
      handlePressNext();
    }
  } else if (!dontSnack & !isValid) {
    setDontSnac();
  }

  function handlePressBack() {
    navigation.goBack();
  }

  async function handlePressNext() {
    const PinCode = pinCode.value;
    if (page) {
      navigation.navigate('CreatePassword', { page: page, pin: PinCode });
      setDontSnack(false);
    } else {
      const response = await validateCode(PinCode, 'active');
      if (response.code < 400) {
        dispatch(saveUser({ userCodeValidate: PinCode, phone: phone, lada: lada, currency: currency }));
        navigation.navigate('CreatePassword');
        setDontSnack(false);
      } else {
        setSnakVisible(true);
        setDontSnack(false);
        setTitle(response.message);
      }
    };
  };

  const handleCloseNotif = () => {
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
    <SignUpWrapper forceInset={{ top: 0 }}>
      {page === 'secretAnswer' && (
        <ResizeImageBackground source={background}>
          <DivSpace height-20 />
          <NavigationBar body={page === 'secretAnswer'?i18n.t('forgotPassword.component.navigatorRecoverMyPassword'):''} onBack={handlePressBack} />
          <DivSpace height-10 />
          <View flex-1 centerH centerV >
            <View >
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "position" : "height"}
                style={{ flex: 0.95, alignItems: 'center' }}
              >
                <View centerH>
                  <Animatable.View animation={'zoomInUp'} easing={'ease'} style={{ alignItems: 'center' }}>
                    <ImageComponent source={brandThemeImages?.sms ? brandThemeImages?.sms : SMS} width={scale(220)} height={verticalScale(149)} />
                  </Animatable.View>
                  <DivSpace height-60 />
                  <View paddingH-40 paddingV-40 style={{ borderColor: brandTheme?.bgOrange02 ?? Colors?.bgOrange02, borderWidth: 1, width: '90%' }}>
                    <Animatable.View animation={'fadeIn'} easing={'ease-in-out'} delay={900} style={{ alignItems: 'center' }}>
                      <View >
                        <Text h16 center medium>
                          {i18n.t('signUp.component.smsSent')}
                        </Text>
                      </View>
                    </Animatable.View>
                    <DivSpace height-55 />
                    <Animatable.View animation={'fadeIn'} easing={'ease-in-out'} delay={1100} style={{ alignItems: 'center' }}>
                      <Text h12 center medium>
                        {i18n.t('signUp.component.labelWeHaveSentYouPin')}
                      </Text>
                    </Animatable.View>
                    <DivSpace height-30 />
                    <Animatable.View animation={'fadeInRight'} delay={1200} >
                      <PinInput {...pinCode} colorStyle={{ color: 'white' }} contentStyle={{ backgroundColor: brandTheme.bgOrange02 ?? Colors?.bgOrange02 }} />
                    </Animatable.View>
                    <DivSpace height-35 />
                    <Link linkStyle={{ color: brandTheme.bgOrange02 ?? Colors?.bgOrange02 }}>
                      {i18n.t('myProfile.component.buttonForwardCode')}
                    </Link>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </View>
          </View>
        </ResizeImageBackground>
      )}

      {page !== 'secretAnswer' && (
        <>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "position" : ""}
            style={{ flex: 0.75 }}
          >
            <View style={{ height: '100%' }}>
              <DivSpace height-20 />
              <NavigationBar body={i18n.t('signUp.component.labelCreateNewPass')} onBack={handlePressBack} />
              <DivSpace height-40 />
              <View>
                <Animatable.View animation={'zoomInUp'} easing={'ease'} style={{ alignItems: 'center' }}>
                  <ImageComponent source={brandThemeImages?.sms ? brandThemeImages?.sms : SMS} width={scale(220)} height={verticalScale(149)} />
                </Animatable.View>
                <DivSpace height-30 />
                <Animatable.View animation={'fadeIn'} easing={'ease-in-out'} delay={900} style={{ alignItems: 'center' }}>
                  <View width-210>
                    <Text h16 white center medium>
                      {i18n.t('signUp.component.smsSent')}
                    </Text>
                  </View>
                </Animatable.View>
                <DivSpace height-55 />
                <Animatable.View animation={'fadeIn'} easing={'ease-in-out'} delay={1100} style={{ alignItems: 'center' }}>
                  <Text h12 white center medium>
                    {i18n.t('signUp.component.labelWeHaveSentYouPin')}
                  </Text>
                </Animatable.View>
                <DivSpace height-30 />
                <Animatable.View animation={'fadeInRight'} delay={1200} style={{ alignItems: 'center' }}>
                  <PinInput {...pinCode} />
                </Animatable.View>
                <DivSpace height-35 />
                <Link>
                  {i18n.t('myProfile.component.buttonForwardCode')}
                </Link>
              </View>
              <View flex-1 centerH bottom>
                <Animatable.View animation={'flipInY'} delay={1300} style={{ alignItems: 'center' }}>
                  <DivSpace height-40 />
                </Animatable.View>
              </View>
            </View>
          </KeyboardAvoidingView>

        </>
      )}
      <SnackBar
        message={title}
        isVisible={snakVisible}
        onClose={handleCloseNotif}
        animationAction={actionAnimated}
      />
    </SignUpWrapper>
  );
};
const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  actions: {
    saveUser: data => dispatch(saveUser(data)),
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmSMS);
