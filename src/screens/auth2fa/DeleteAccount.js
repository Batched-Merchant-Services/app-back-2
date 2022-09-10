import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Loader,
  SnackBar,
  BoxBlue,
  DivSpace,
  PinInput,
  ButtonRounded,
  NavigationBar,
  ImageComponent
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { SafeAreaView } from 'react-native';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import i18n from '@utils/i18n';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';
import IconSms from '@assets/brand/iconSms.png';


const DeleteAccount = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const codeActivation = useValidatedInput('number', '');
  const [isEnabled, setIsEnabled] = useState(false);
  const [codeSmsEmail, setCodeSmsEmail] = useState('');
  const [phoneUser, setPhoneUser] = useState('');
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [title, setTitle] = useState('');
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [buttonNext, setButtonNext] = useState(false);
  const isValid = isFormValid(codeActivation);

  function getLink() {
    console.log('send card portal')
  }

  function cancel() {
    console.log('cancel')
  }


  return (
    <SignUpWrapper >
      <SafeAreaView forceInset={{ top: 'always' }}>
        <NavigationBar
          onBack={() => navigation.goBack()}
          body={i18n.t('Auth2fa.titleDeleteYourAccount')}
        />
        <DivSpace height-15 />
        <View centerH>
          <BoxBlue textBlue01 containerStyle={{ padding: 20, justifyContent: "flex-start" }}>
            <View centerH>
              <DivSpace height-25 />
              <Text h13 regular textGray>{i18n.t('Auth2fa.titleDeleteYourAccount')}</Text>
              <DivSpace height-20 />
              <ImageComponent
                source={IconSms}
                width={scale(115)}
                height={verticalScale(115)}
              />
              <DivSpace height-20 />
              <Text h10 textGray regular>{i18n.t('Auth2fa.textDeleteAccountFromThePlatforms')}</Text>
              <DivSpace height-20 />
              <Text h10 textGray regular>{i18n.t('Auth2fa.textYourPhysicalAndVirtual')}</Text>
              <DivSpace height-20 />
              <Text h10 textGray regular>{i18n.t('Auth2fa.textThisOperationCannot')}</Text>
              <DivSpace height-50 />
              <View centerH>
                <ButtonRounded
                  size="lg"
                  onPress={getLink}
                >
                  <Text h11 semibold textBlue01 center>
                    {i18n.t('Auth2fa.buttonContinueToYourPortal')}
                  </Text>
                </ButtonRounded>
                <DivSpace height-30 />
                <ButtonRounded
                  onPress={cancel}
                >
                  <Text h11 semibold textBlue01 center>
                    {i18n.t('Auth2fa.buttonCancel')}
                  </Text>
                </ButtonRounded>
              </View>
            </View>
          </BoxBlue>
        </View>
      </SafeAreaView>
    </SignUpWrapper>
  );
}


export default DeleteAccount;