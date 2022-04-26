import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { catalogTiket, createTiket } from '@utils/api/switch';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import i18n from '@utils/i18n';
import LocalStorage from '@utils/localStorage';
import Plane from '@assets/brand/plane.png';
import Styles from '@screens/contact/styles';
import {
  ButtonRounded,
  DivSpace,
  NavigationBar,
  Text,
  View,
  ImageComponent,
  AnimateLabelInput,
  Select,
  SnackBar,
  Loader,
} from '@components';
import { useSelector } from 'react-redux';


async function sendTiket(
  setIsLoadingModal,
  typeTiket,
  message,
  navigation,
  setSnakVisible,
  setButtonNext,
  setTitle
) {
  setIsLoadingModal(true);
  const selectType = typeTiket.value;
  const token = await LocalStorage.get('auth_token');
  const response = await createTiket(token, selectType.value, message.value);
  if (response.code < 400) {
    setTimeout(function () {
      navigation.navigate('ContactSuccessful', {
        ticketNumber: response.data.ticketNumber,
      });
      setIsLoadingModal(false);
    }, 1000);
  } else {
    closeSnackNotice(
      setIsLoadingModal,
      setSnakVisible,
      setButtonNext,
      setTitle,
      response
    );
  }
}

function closeSnackNotice(
  setIsLoadingModal,
  setSnakVisible,
  setButtonNext,
  setTitle,
  response
) {
  setIsLoadingModal(true);
  setTimeout(function () {
    setIsLoadingModal(false);
    setSnakVisible(true);
    setButtonNext(true);
    setTitle(response.message);
  }, 1000);
}

async function getTikets(setGetTiket) {
  const token = await LocalStorage.get('auth_token');
  const response = await catalogTiket(token);
  if (response.code < 400) {
    setGetTiket(response.data);
  } else {
    setGetTiket([]);
  }
}

const ContactScreen = ({ navigation }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandThemeImages = appData?.Theme?.images;
  
  const [title, setTitle] = useState('');
  const [getTiket, setGetTiket] = useState([]);
  const [buttonNext, setButtonNext] = useState(false);
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const message = useValidatedInput('messageOption', '');
  const typeTiket = useValidatedInput(
    'dropDownTiket',
    { name: i18n.t('generics.selectOne') },
    {
      changeHandlerSelect: 'onSelect',
    }
  );
  const isValid = isFormValid(message);

  useEffect(() => {
    getCatalogTiket();
  }, []);

  async function getCatalogTiket() {
    await getTikets(setGetTiket);
  }

  async function handleSendPress() {
    await sendTiket(
      setIsLoadingModal,
      typeTiket,
      message,
      navigation,
      setSnakVisible,
      setButtonNext,
      setTitle
    );
  }

  const handleCloseNotif = async () => {
    setSnakVisible(false);
    setButtonNext(false);
    setActionAnimated(true);
  };

  return (
    <SignUpWrapper >
      <SafeAreaView style={{flex:1}} forceInset={{top: 'always'}}>
        <NavigationBar
          onBack={() => navigation.goBack()}
          body={i18n.t('contact.component.title')}
        />
        <View centerH>
          <DivSpace height-10 />
          <ImageComponent source={brandThemeImages?.plane?brandThemeImages?.plane:Plane} width={82} height={82} />
          <DivSpace height-27 />
          <Text h12 regular center white>
            {i18n.t('contact.component.subtitle')}
          </Text>
          <DivSpace height-10 />
          <Text h10 regular center white>
            {i18n.t('contact.component.description')}
          </Text>
          <DivSpace height-10 />
          <View paddingH-20 style={{ width: '100%' }}>
            <Select
              {...typeTiket}
              label={i18n.t('contact.component.reason')}
              options={getTiket}
              size='sm'
            />
            <AnimateLabelInput
              {...message}
              label={i18n.t('contact.component.message')}
              keyboardType={'default'}
              autoCapitalize={'none'}
              numberOfLines={5}
              multiline
              multiInput
            />
          </View>
          <DivSpace height-39 />
          <ButtonRounded
            disabled={!isValid && !buttonNext ? true : buttonNext}
            onPress={handleSendPress}
            style={Styles.button}
          >
            <Text h10 semibold>
              {i18n.t('contact.component.send')}
            </Text>
          </ButtonRounded>
        </View>
      </SafeAreaView>
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

export default ContactScreen;
