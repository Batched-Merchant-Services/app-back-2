import React, { useState, useEffect } from 'react';
import i18n from '@utils/i18n';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import passwordImage from '@assets/brand/password.png';
import * as Animatable from 'react-native-animatable';
import { forgotPassword, catalogSecurityQuestion } from '@utils/api/switch';
import {
  ButtonNext,
  DivSpace,
  AnimateLabelInput,
  ImageComponent,
  NavigationBar,
  Text,
  View,
  SnackBar,
  Loader,
  ResizeImageBackground
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import { connect, useDispatch, useSelector } from 'react-redux';
import { saveUser } from '@store/ducks/user.ducks';
import background from '@assets/brand/backgroundImage.png';
import Colors from '@styles/Colors';

const SecretAnswer = ({ navigation, }) => {
  const page = navigation.getParam('page');
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandThemeImages = appData?.Theme?.images;
  const brandTheme = appData?.Theme?.colors;

  const [title, setTitle] = useState('');
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [buttonNext, setButtonNext] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const email = useValidatedInput('emailOrPhone', '');
  const aswerSecret = useValidatedInput('securityAnswer', '');
  const answer = useValidatedInput('dropdownQuestion', { name: i18n.t('generics.selectOne') }, {
    changeHandlerSelect: 'onSelect'
  });
  const isValid = isFormValid(email);
  const dispatch = useDispatch();


  function handlePressGoBack() {
    navigation.goBack();
  }

  async function PressForgotPassword() {
    const Answer = aswerSecret.value;
    const security = answer.value;
    const Email = email.value;
    dispatch(saveUser({ answer: Answer, email: Email }));
    setIsLoadingModal(true);
    const response = await forgotPassword(Email, security.name, security.value, Answer);
    if (response.code < 400) {
      setTimeout(function () {
        navigation.navigate('ConfirmSMS', { page: page ? page : 'secretAnswer' });

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

  const handleCloseNotif = async () => {
    setSnakVisible(false);
    setButtonNext(false);
    setActionAnimated(true);
  };

  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <ResizeImageBackground source={background}>
        <DivSpace height-20 />
        <NavigationBar body={i18n.t('forgotPassword.component.navigatorRecoverMyPassword')} onBack={handlePressGoBack} />
        <DivSpace height-10 />
        <View flex-1 >
          <View >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "position" : "height"}
              style={{ flex: 0.9, alignItems: 'center' }}
            >
              <View >
                <Animatable.View animation={'fadeIn'} delay={300} style={{ alignItems: 'center' }}>
                  <View centerH centerV>
                    <ImageComponent source={brandThemeImages?.password ? brandThemeImages?.password : passwordImage} width={scale(155)} height={verticalScale(155)} />
                  </View>
                </Animatable.View>
              </View>
              <DivSpace height-40 />
              <View centerH>
                <Text h16 center medium>
                  {i18n.t('forgotPassword.component.labelAnswer')}
                </Text>
                <DivSpace height-19 />
                <View width-250>
                  <Text h12 center>
                    {i18n.t('forgotPassword.component.labelDescriptionForget')}
                  </Text>
                </View>
              </View>
              <DivSpace height-20 />
              <View paddingV-30 centerH centerV  style={{ borderColor: brandTheme?.bgOrange02 ?? Colors?.bgOrange02, borderWidth: 1 }}>
              <View style={{ width: '92%' }}>
                <Animatable.View animation={'zoomInUp'} >
                  <AnimateLabelInput
                    {...email}
                    label={i18n.t('generics.emailOrPhone')}
                    keyboardType={'default'}
                    autoCapitalize={'none'}
                    style={{ color: Colors.white }}
                    containerStyle={{ backgroundColor: 'white' }}
                  />
                </Animatable.View>
                <DivSpace height-20 />
                <View centerH>
                  <ButtonNext
                    disabled={!isValid && !buttonNext ? true : buttonNext}
                    onPress={PressForgotPassword} />
                </View>
              </View>
              </View>
            </KeyboardAvoidingView>
          </View>

        </View>
      </ResizeImageBackground>
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
)(SecretAnswer);
