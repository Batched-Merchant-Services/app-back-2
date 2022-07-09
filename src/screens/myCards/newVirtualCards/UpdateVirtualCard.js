import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  View,
  Text,
  DivSpace,
  Loader,
  BoxCVV,
  TextInputDate,
  ContainerCardsInput,
  SnackBar,
  ButtonRounded,
  NavigationBar
} from '@components';
import { SafeAreaView } from 'react-native';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import LocalStorage from '@utils/localStorage';
import Cards from '@screens/myCards/components/Cards';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import i18n from '@utils/i18n';
import { updateCardVirtual } from '../../../utils/api/switch';

const UpdateVirtualCard = ({ navigation }) => {
  const data = navigation.getParam('dataBackup');
  const cardNumber = useValidatedInput('cardNumber', '');
  const Expiration = useValidatedInput('cardExpiration', '');
  const Cvv = useValidatedInput('cardCVV', '');
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [buttonNext, setButtonNext] = useState(false);
  const [title, setTitle] = useState('');
  const isValid = isFormValid(cardNumber, Expiration, Cvv);

  async function handleNext() {
    try {
      setIsLoadingModal(true);
      const token = await LocalStorage.get('auth_token');
      const response = await updateCardVirtual(token, Cvv?.value, cardNumber?.value);
      
      if (response.code < 400) {
        setTimeout(function () {
          navigation.navigate('ConfirmationUpdateCard');
          setIsLoadingModal(false);
        }, 1000);

      } else {
        setIsLoadingModal(true);
        setTimeout(function () {
          setSnakVisible(true);
          setButtonNext(true);
          setIsLoadingModal(false);
          setTitle(response.message);
        }, 1000);
      }
    } catch (e) {
      console.log('e', e)
    }

  }


  const handleCloseNotif = () => {
    setSnakVisible(false);
    setButtonNext(false);
    setActionAnimated(true);
  };


  function handleBackPress() {
    navigation.goBack();
  }
  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : ""}
          style={{flex:0.8}}
        >
         <NavigationBar onBack={handleBackPress} body={i18n.t('myCards.component.UpdateVirtualCard.textUpdateCard')} />
          <View  centerH style={{height:'100%'}}>
            <DivSpace height-20 />
            <View centerH>
            <Cards
              {...data}
              available={true}
              width={verticalScale(260)}
              height={verticalScale(170)}
            />
             <DivSpace height-20 />
             <View paddingH-80>
              <Text white h12 medium>
                {i18n.t('myCards.component.UpdateVirtualCard.title')}
              </Text>
            </View>
            </View>
            
             <DivSpace height-20 />
            <View flex-1 centerH >
              <View left>
                <Text h14 left semibold white >
                  {i18n.t('myCards.component.UpdateVirtualCard.inputCardNumbers')}
                </Text>
              </View>
              <DivSpace height-10 />
              <View left>
                <ContainerCardsInput {...cardNumber} />
              </View>
            </View>
            <DivSpace height-20 />
            <View flex-1 row>
              <View flex-1 centerH >
                <Text h14 left semibold white>
                  {i18n.t('myCards.component.UpdateVirtualCard.inputExpiration')}
                </Text>
                <DivSpace height-10 />
                <View left>
                  <TextInputDate {...Expiration} />
                </View>
              </View>
              <View flex-1 centerH>
                <Text h14 left semibold white>
                  {i18n.t('myCards.component.UpdateVirtualCard.inputCVV')}
                </Text>
                <DivSpace height-10 />
                <View left>
                  <BoxCVV {...Cvv} />
                </View>
              </View>
            </View>
            <View centerH>
              <ButtonRounded onPress={handleNext} disabled={!isValid && !buttonNext ? true : buttonNext}>
                <Text h12 semibold>
                  {i18n.t('myCards.component.UpdateVirtualCard.buttonUpdateCard')}
                </Text>
              </ButtonRounded>
            </View>
          </View>
          
        </KeyboardAvoidingView>
       
      </SafeAreaView>

    </SignUpWrapper>
  );
};

export default UpdateVirtualCard;
