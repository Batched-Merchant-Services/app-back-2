import React,{useState} from 'react';
import { scale } from 'react-native-size-matters';
import {
  DivSpace,
  NavigationBar,
  View,
  Text,
  ButtonRounded,
  ContainerCardsInput,
  TextInputDate,
  BoxCVV,
  SnackBar,
  Loader
} from '@components';
import Cards from '@screens/myCards/components/Cards';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import LocalStorage from '@utils/localStorage';
import { validateCardInformation,associateCard } from '@utils/api/switch';
import i18n from '@utils/i18n';

const ActivateCardScreen = ({ navigation }) => {
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [title, setTitle] = useState('');
  const [buttonNext, setButtonNext] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const data = navigation.getParam('dataBackup');
  const page = navigation.getParam('page');
  const cardNumber = useValidatedInput('cardNumber', '');
  const cardExpiration = useValidatedInput('cardExpiration', '');
  const cardCVV = useValidatedInput('cardCVV', '');
  const isValid = isFormValid(cardNumber,cardExpiration,cardCVV);
  const Page = page ? 'associate': 'activation';
 
  const  handleActivatePress =async() => {
    try {
      setIsLoadingModal(true);
      const token = await LocalStorage.get('auth_token');
      const response =  page === 'associate' ? await associateCard(token,cardNumber.value,cardExpiration.value,cardCVV.value): await validateCardInformation(token,data.proxyKey,cardNumber.value,cardExpiration.value,cardCVV.value);
      if (response.code < 400) {
        setTimeout(function(){
          navigation.navigate('ActivateCardPin',{ Proxy: response.data.proxyKey });
          setIsLoadingModal(false);
        }, 1000);
        
      } else{
        setIsLoadingModal(true);
        setTimeout(function(){
          setSnakVisible(true);
          setButtonNext(true);
          setIsLoadingModal(false);
          setTitle(response.message);
        }, 1000);
      }
    } catch (e) {
    }
    
  };

  function handleBackPress() {
    navigation.goBack();
  }

  function formatCardNumber(cardNumber) {
    return cardNumber.padEnd(16, '*').match(/.{1,4}/g).join(' ');
  }

  function formatCardExpiration(cardExpiration) {
    return cardExpiration.padEnd(4, '0').match(/.{1,2}/g).join('/');
  }

  function formatCardCVV(cardCVV) {
    return cardCVV.padEnd(3, '*');
  }

  const handleCloseNotif = () => {
    setSnakVisible(false);
    setButtonNext(false);
    setActionAnimated(true);
  };


  return (
    <SignUpWrapper>
      <NavigationBar onBack={handleBackPress} body={ page === 'associate' ?i18n.t('myCards.component.associateCard.title') :i18n.t('cardActivation.component.title')} />
      <DivSpace height-10 />
      <View
        marginH-20
        paddingV-20
        paddingH-20
        centerH
        textBlueDark
        style={{ borderRadius: 10 }}
      >
        <Text center h14 medium white>
          {i18n.t('cardActivation.component.activateTitle')}
        </Text>
        <DivSpace height-16 />
        <Cards
          {...data}
          page={Page}
          cardNumber={formatCardNumber(cardNumber.value)}
          dueDate={ formatCardExpiration(cardExpiration.value)}
          cvv={formatCardCVV(cardCVV.value)}
          input
        />
        <DivSpace height-20 />
        <View>
          <Text h10 center white>
            {i18n.t('cardActivation.component.cardNumber')}
          </Text>
          <DivSpace height-5 />
          <ContainerCardsInput {...cardNumber} />
        </View>
        <DivSpace height-38 />
        <View row>
          <View flex-1>
            <Text h10 center white>
              {i18n.t('cardActivation.component.cardExpiration')}
            </Text>
            <DivSpace height-5 />
            <TextInputDate {...cardExpiration} />
          </View>
          <View
            style={{
              height          : '100%',
              borderRightWidth: 1,
              borderColor     : '#8EADFF'
            }}
          ></View>
          <View flex-1>
            <Text h10 center white>
              {i18n.t('cardActivation.component.cardCVV')}
            </Text>
            <DivSpace height-5 />
            <BoxCVV {...cardCVV} />
          </View>
        </View>
        <DivSpace height-26 />
        <ButtonRounded
          style={{ width: scale(144), height: scale(30) }}
          disabled={!isValid && !buttonNext ? true: buttonNext}
          onPress={handleActivatePress}
          
        >
          <Text h10 semibold>
            {i18n.t('cardActivation.component.title')}
          </Text>
        </ButtonRounded>
        <DivSpace height-20 />
        <Text h10 regular center white> 
          {i18n.t('cardActivation.component.activateDescription')}
        </Text>
      </View>
      <DivSpace height-16 />
      <View row centerH>
        <View bgGray width-6 height-6 style={{borderRadius: 6}}></View>
        <DivSpace width-6 />
        <View  bgOrange02 width-6 height-6 style={{borderRadius: 6}}></View>
      </View>
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
    </SignUpWrapper>
  );
};

export default ActivateCardScreen;
