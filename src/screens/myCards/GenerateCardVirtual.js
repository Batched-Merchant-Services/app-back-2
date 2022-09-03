import React, { useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { saveUser } from '@store/ducks/user.ducks';
import { moneyFormatter } from '@utils/formatters';
import { useSelector, useDispatch } from 'react-redux';
import { generateCardVirtual } from '@utils/api/switch';
import { scale, verticalScale } from 'react-native-size-matters';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import i18n from '@utils/i18n';
import LocalStorage from '@utils/localStorage';
import cardNumber from '@assets/brand/cardNumbers.png';
import backGroundCard from '@assets/icons/backgrounCard.png';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import ModalInfoSwift from '@screens/myCards/components/ModalInfoSwift';
import Colors from '@styles/Colors';
import {
  DivSpace,
  NavigationBar,
  View,
  Text,
  ButtonRounded,
  ImageComponent,
  AnimateLabelAmount,
  AnimateLabelInput,
  SnackBar,
  Loader
} from '@components';




const GenerateCardVirtual = ({ navigation }) => {

  const dispatch = useDispatch();
  const redux = useSelector((state) => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const brandThemeImages = userData?.Theme?.images;
  const [title, setTitle] = useState('');
  const [isSwift, setIsSwift] = useState(false);
  const amount = useValidatedInput('amount', '');
  const reference = useValidatedInput('reference', '');
  const [buttonNext, setButtonNext] = useState(false);
  const [snakVisible, setSnakVisible] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [currencyUser] = useState(userData ? userData.currencyUser : '');
  const isValid = isFormValid(amount, reference);


  function handleBackPress() {
    navigation.goBack();
  }

  async function handlePressNext() {
    try {
      const token = await LocalStorage.get('auth_token');
      const response = await generateCardVirtual(token, amount.value, reference.value);
      if (response.code < 400) {
        setTimeout(function () {
          setIsLoadingModal(false);
          dispatch(saveUser({ openModalInfoSwitch: true }));
          if (userData.openModalInfoSwitch) {
            navigation.navigate('ConfirmCardVirtual', { link: response.data.redemption_link });
          } else {
            setIsSwift(true);
          }

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

    } catch (e) {
      console.log(e);
    }
  }


  const handleOncloseModal = () => {
    setIsSwift(false);
  };


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
        <NavigationBar
          onBack={handleBackPress}
          body={i18n.t('myCards.component.generateVirtualCard.titleNewVirtualCard')}
        />
        <DivSpace height-10 />
        <View
          marginH-20
          paddingV-20
          textBlueDark
          style={{ borderRadius: 10 }}
        >
          <DivSpace height-11 />
          <Text h15 medium center white>
            {i18n.t('myCards.component.generateVirtualCard.textGenerateVirtualCard')}
          </Text>
          <DivSpace height-18 />
          <View paddingH-20>
            <Text h11 white center>
              {i18n.t('myCards.component.generateVirtualCard.textTheNumbersAre')}
            </Text>
            <Text h11 white bold center>
              {i18n.t('myCards.component.generateVirtualCard.textRememberToCreate')}
            </Text>
          </View>

          <DivSpace height-18 />
          <ImageBackground
            source={backGroundCard}
            style={{
              width: '100%',
              height: verticalScale(180),
              justifyContent: 'center',
              alignItems: 'center',
            }}
            imageStyle={{ tintColor: brandTheme?.orange ?? Colors?.orange }}
          >
            <ImageComponent
              source={brandThemeImages?.cardNumbers ? brandThemeImages?.cardNumbers : cardNumber}
              width={scale(210)}
              height={verticalScale(150)}
            />
          </ImageBackground>
          <View marginH-65>
            <AnimateLabelAmount
              {...amount}
              label={i18n.t('myCards.component.generateVirtualCard.inputNewVirtualCard') + ':'}
              keyboardType={'default'}
              returnKeyType={'done'}
              autoCapitalize={'none'}
            />
          </View>
          <DivSpace height-15 />
          <Text H10 regular white center>
            {i18n.t('transfers.component.available')}
          </Text>
          <DivSpace height-5 />
          <Text H10 semibold white center>
            {moneyFormatter(userData.balanceWallet)}{' '}{currencyUser}
          </Text>
          <DivSpace height-20 />
          <View marginH-30>
            <AnimateLabelInput
              {...reference}
              label={i18n.t('myCards.component.generateVirtualCard.inputReference')}
              autoCapitalize={'none'}
              borderLight
            />
          </View>
          <DivSpace height-10 />
          <View centerH>
            <ButtonRounded
              onPress={handlePressNext}
              disabled={!isValid && !buttonNext ? true : buttonNext}
              size='lg'
            >
              <Text h10 semibold>
                {i18n.t('myCards.component.generateVirtualCard.buttonGenerateVirtualCard')}
              </Text>
            </ButtonRounded>
          </View>
          <DivSpace height-15 />
        </View>
        {isSwift && (
          <ModalInfoSwift
            isOpen={true}
            onClose={handleOncloseModal}
            navigation={navigation}
          />
        )}
        {isLoadingModal && (
          <Loader
            isOpen={true}
            navigation={navigation} />)}

        <SnackBar
          message={title}
          isVisible={snakVisible}
          onClose={handleCloseNotif}
          animationAction={actionAnimated}
        />
      </KeyboardAvoidingView>
    </SignUpWrapper>
  );
};
export default GenerateCardVirtual;
