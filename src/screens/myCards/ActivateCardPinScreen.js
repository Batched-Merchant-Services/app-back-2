import React,{useState} from 'react';
import { scale } from 'react-native-size-matters';
import {
  DivSpace,
  NavigationBar,
  View,
  Text,
  ButtonRounded,
  BoxCardNipInput,
  SnackBar,
  Loader,
  BoxBlue
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { useValidatedInput,isFormValid } from '@hooks/validation-hooks';
import { CardActivation } from '@utils/api/switch';
import LocalStorage from '@utils/localStorage';
import i18n from '@utils/i18n';
import { useSelector } from 'react-redux';
import IconChangeNip from '../../utils/iconSVG/IconChangeNip';
import Colors from '@styles/Colors';

const ActivateCardPinScreen = ({ navigation }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const Proxy = navigation.getParam('Proxy');
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [title, setTitle] = useState('');
  const [buttonNext, setButtonNext] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const cardNip = useValidatedInput('cardNip', '');
  const cardNipConfirmation = useValidatedInput('cardNipConfirmation', '', {
    validationParams: [cardNip.value]
  });
  const isValid = isFormValid(cardNip,cardNipConfirmation);

  async function handleActivatePress () {
    try {
      setIsLoadingModal(true);
      const token = await LocalStorage.get('auth_token');
      const response = await CardActivation(token, Proxy, cardNipConfirmation.value);
      if (response.code < 400) {
        setTimeout(function(){
          navigation.navigate('ActivateCardConfirmation');
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
    <>
    <SignUpWrapper>
      <NavigationBar
        onBack={handleBackPress}
        body={i18n.t('cardActivation.component.title')}
      />
      <DivSpace height-10 />
      <View centerH >
        <BoxBlue>
          <DivSpace height-10 />
          <View centerH  paddingH-25>
            <IconChangeNip width={scale(23)} height={scale(23)}  fill={brandTheme?.orange??Colors?.orange} fillSecondary={brandTheme?.white??Colors?.white}/>
            <DivSpace height-26 />
            <Text center h14 medium white>
              {i18n.t('cardActivation.component.nipSubtitle')}
            </Text>
            <DivSpace height-35 />
            <Text h10 center white>
              {i18n.t('cardActivation.component.nip')}
            </Text>
            <DivSpace height-5 />
            <BoxCardNipInput {...cardNip} />
            <DivSpace height-35 />
            <Text h10 center white>
              {i18n.t('cardActivation.component.nipConfirmation')}
            </Text>
            <DivSpace height-5 />
            <BoxCardNipInput {...cardNipConfirmation} />
            <DivSpace height-35 />
            <Text h10 regular center white>
              {i18n.t('cardActivation.component.nipDescription')}
            </Text>
            <DivSpace height-26 />
            <ButtonRounded
              style={{ width: scale(144), height: scale(30) }}
              onPress={handleActivatePress}
              disabled={!isValid && !buttonNext ? true: buttonNext}
            >
              <Text h10 semibold>
                {i18n.t('cardActivation.component.buttonReloadCard')}
              </Text>
            </ButtonRounded>
          </View>
        </BoxBlue>
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
    </>
  );
};

export default ActivateCardPinScreen;
