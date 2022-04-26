import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Switch } from 'react-native-switch';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { catalogLanguages,getListCurrency,updateCurrency } from '@utils/api/switch';
import {
  ButtonRounded,
  DivSpace,
  NavigationBar,
  Text,
  View,
  ImageComponent,
  BoxGradient,
  Select,
  Loader,
  SnackBar,
} from '@components';
import { useValidatedInput } from '@hooks/validation-hooks';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import RNRestart from 'react-native-restart';
import Styles from '@screens/configuration/styles';
import i18n from '@utils/i18n';
import Cog from '@assets/configuration/cog.png';
import Eye from '@assets/recharges/eye.png';
import LocalStorage from '@utils/localStorage';
import Colors from '@styles/Colors';

function getCode(setIsLoadingModal, setSnakVisible, code, setTitle) {
  setIsLoadingModal(true);
  setSnakVisible(false);
  if (code === true) {
    setTimeout(function () {
      setIsLoadingModal(false);
    }, 1500);
    setTimeout(function () {
      setSnakVisible(true);
      setTitle(i18n.t('configuration.component.modalLanguageChangedCorrectly'));
    }, 2000);
    setTimeout(function () {
      setSnakVisible(true);
      setTitle(i18n.t('configuration.component.textTheApplicationWillBeRestarted'));
    }, 4000);
    setTimeout(function () {
      RNRestart.Restart();
    }, 7000);
  } else {
    setIsLoadingModal(true);
    setTimeout(function () {
      setSnakVisible(true);
      setIsLoadingModal(false);
      setTitle(i18n.t('configuration.component.modalCouldNotChange'));
    }, 1000);
  }
}

async function catLanguages(setLanguageArray) {
  const token = await LocalStorage.get('auth_token');
  const response = await catalogLanguages(token);
  if (response.code < 400) {
    setTimeout(() => {
      setLanguageArray(response.data);
    }, 100);
  } else {
    setLanguageArray([]);
  }
}

async function updateListCurrency(setIsLoadingModal, setSnakVisible, code, setTitle,setCurrency) {
  setIsLoadingModal(true);
  const token = await LocalStorage.get('auth_token');
  const response = await updateCurrency(token,code.value);
  if (response.code < 400) {
    setTimeout(() => {
      setSnakVisible(true);
      setTitle(response.message);
      setIsLoadingModal(false);
    }, 1000);
  } else {
    setIsLoadingModal(true);
    setTimeout(function () {
      setSnakVisible(true);
      setIsLoadingModal(false);
      setTitle(response.message);
    }, 1000);
  }
}

async function catCurrencys(setCurrency) {
  const token = await LocalStorage.get('auth_token');
  const response = await getListCurrency(token);
  if (response.code < 400) {
    setTimeout(() => {
      setCurrency(response.data);
    }, 100);
  } else {
    
    setCurrency([]);
  }
}

const ConfigurationScreen = ({ navigation }) => {
  const redux = useSelector((state) => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const [available, setAvailable] = useState(true);
  const [languageArray, setLanguageArray] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [title, setTitle] = useState('');
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const language = useValidatedInput(
    '',
    {
      name: userData.currentLanguage
        ? userData.currentLanguage
        : i18n.t('configuration.component.textSelectLanguage'),
    },
    {
      changeHandlerSelect: 'onSelect',
    }
  );
  
  const Currency = useValidatedInput(
    '',
    {
      name: userData.currencyUser
        ? userData.currencyUser
        : 'Select currency',
    },
    {
      changeHandlerSelect: 'onSelect',
    }
  );

  useEffect(() => {
    getLanguages();
    getCurrency();
  }, []);

  
  async function getLanguages() {
    await catLanguages(setLanguageArray);
  }
  async function getCurrency() {
    await catCurrencys(setCurrency);
  }

  function handleChangePatterPress() {
    navigation.navigate('AppPin', {
      data: {},
      next: 'Configuration',
    });
  }
 
  function handleForgetYourPassword() {
    navigation.navigate('ConfirmationPinUser', {
      data: { page: 'config' },
      next: 'CreatePassword',
    });
  }

  function onFill(code) {
    getCode(setIsLoadingModal, setSnakVisible, code, setTitle,navigation);
  }

  function updateCurrency(code) {
    updateListCurrency(setIsLoadingModal, setSnakVisible, code, setTitle,navigation,setCurrency);
  }
  

  const handleCloseNotif = () => {
    setSnakVisible(false);
    setActionAnimated(true);
  };

  return (
    <SignUpWrapper
      keyboardAware={false}
      forceInset={{top: 0}}
    >
      <DivSpace height-20 />
      <NavigationBar
        onBack={() => navigation.goBack()}
        body={i18n.t('configuration.component.title')}
      />
      <DivSpace height-15 />
      <ScrollView>
        <View flex-1 marginH-25>
          <View centerH>
            <BoxGradient size={82}>
              <ImageComponent bgOrange02 source={Cog} width={59} height={59} />
            </BoxGradient>
          </View>
          <DivSpace height-30 />
          <Text h12 bgGray medium>
            {i18n.t('configuration.component.textApplicationLanguage')}
          </Text>
          <DivSpace height-10 />
          <Text h11 textGray medium>
            {i18n.t('configuration.component.textItIsDetermined')}
          </Text>
          <DivSpace height-10 />
          <Select
            {...language}
            label={i18n.t('configuration.component.textSelectYourLanguage')}
            options={languageArray}
            onFill={(code) => onFill(code)}
            languages
            size='sm'
          />
          <DivSpace height-10 />
          <View
            height-1
            bgBlue06
            style={{ width: '100%' }}
          />
          <DivSpace height-15 />
          <Text h11 textGray medium>
            {i18n.t('configuration.component.textUpdateYourConfirmation')}
          </Text>
          <DivSpace height-10 />
          <ButtonRounded
            blue
            onPress={handleChangePatterPress}
            style={Styles.button}
          >
            <Text h10 semibold>
              {i18n.t('configuration.component.buttonUpdatePIN')}
            </Text>
          </ButtonRounded>
          <DivSpace height-20 />
          <View
            height-1
            bgBlue06
            style={{ width: '100%' }}
          />
          <DivSpace height-15 />
          <Text h12 bgGray medium>
            {i18n.t('configuration.component.textChangePassword')}
          </Text>
          <DivSpace height-10 />
          <Text h11 textGray medium>
            {i18n.t('configuration.component.textEnterYourApplication')}
          </Text>
          <DivSpace height-10 />
          <ButtonRounded
            blue
            onPress={handleForgetYourPassword}
            style={Styles.button}
          >
            <Text h10 semibold>
              {i18n.t('configuration.component.buttonChangePassword')}
            </Text>
          </ButtonRounded>
          <DivSpace height-20 />
          <View centerH textBlueDark style={Styles.card} row>
            <View flex-1 column>
              <Text h12 bgGray medium>
                {i18n.t('configuration.component.textPersonToPerson')}
              </Text>
              <DivSpace height-5 />
              <Text h11 regular textGray>
                {i18n.t('configuration.component.textShowMeAvailable')}
              </Text>
            </View> 
            <DivSpace width-20 />
            <View style={{ flex: 0.3 }} column>
              <Switch
                value={available}
                onValueChange={setAvailable}
                circleSize={30}
                backgroundActive={!available ?Colors.textGray : Colors.green}
                backgroundInactive={!available ? Colors.textGray : Colors.green }
                switchWidthMultiplier={1.73}
                circleBorderWidth={0}
                circleActiveColor={'white'}
                circleInActiveColor={'white'}
                renderInsideCircle={() => (
                  <ImageComponent textGray source={Eye} width={16} height={10} />
                )}
              />
              <DivSpace height-10 />
              <Text
                h9
                medium
                center
                style={{ color: available ? brandTheme.green??Colors.green : brandTheme.disabled??Colors.disabled }}
              >
                {available
                  ? i18n.t('configuration.component.statusValueAvailable')
                  : i18n.t('configuration.component.statusValueUnavailable')}
              </Text>
            </View>
          </View>
          <DivSpace height-15 />
          <View
            height-1
            bgBlue06
            style={{ width: '100%'}}
          />
          <DivSpace height-15 />
          <Text h12 bgGray semibold>
            {i18n.t('configuration.component.textWalletBalanceCurrency')}
          </Text>
          <DivSpace height-10 />
          <Text h11 textGray medium>
            {i18n.t('configuration.component.textIfYouReceiveAPaymentToYour')}
          </Text>
          <DivSpace height-15 />
          <Select
            {...Currency}
            label={i18n.t('configuration.component.selectWalletCurrency')}
            options={currency}
            onFill={(code) => updateCurrency(code)}
            size='sm'
          />
          <DivSpace height-15/>
          <TouchableOpacity>
            <Text h11 white center>
              {i18n.t('configuration.component.textCheckTheInformation')}
              <Text  bgBlue06 style={Styles.text}>
                {' '}
                {i18n.t('configuration.component.textUulalaOnlineBanking')}
              </Text>
            </Text>
          </TouchableOpacity>
          <DivSpace height-50 />
        </View>
      </ScrollView>
      <SnackBar
        message={title}
        isVisible={snakVisible}
        onClose={handleCloseNotif}
        animationAction={actionAnimated}
      />
      {isLoadingModal && <Loader isOpen={true} navigation={navigation} />}
    </SignUpWrapper>
  );
};

export default ConfigurationScreen;
