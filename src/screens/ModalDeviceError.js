import React, { useState, useEffect } from 'react';
import i18n from '@utils/i18n';
import {
  View,
  ModalContainer,
  DivSpace,
  ImageComponent,
  ButtonRounded,
  Text,
} from '@components';
import { scale, verticalScale } from 'react-native-size-matters';
import { TouchableOpacity, Animated,Linking } from 'react-native';
import styles from './styles';
import mailDevice from '@assets/icons/mailDevice.png';
import IconFacebook from '@assets/icons/IconFacebook.png';
import IconLinkedin from '@assets/icons/Iconlinkedin.png';
import IconYoutube from '@assets/icons/Iconyoutube.png';
import IconTwitter from '@assets/icons/Icontwitter.png';

const ModalDisabled = ({  isOpen,  navigation, onClose = () => null, page }) => {
  const [showOpen,setShowOpen ] = useState(true);
  let Open = isOpen ? true: false;
  const [scaleValue, setScaleValue] = useState(new Animated.Value(0));

  useEffect(() => {
    animationLogo();
  }, []);

  const handleFacebook = async () => {Linking.openURL('https://www.facebook.com/UULALAapp/');};
  const handleLinkedin = async () => {Linking.openURL('https://www.linkedin.com/company/uulala/');};
  const handleTwitter = async () => {Linking.openURL('https://twitter.com/uulalaapp');};
  const handleYoutube = async () => {Linking.openURL('https://www.youtube.com/c/uulala');};



  const animationLogo = async () => {
    Animated.timing(scaleValue, {
      toValue        : 1,
      delay          : 10,
      useNativeDriver: true,
    }).start();
    setTimeout(() => setScaleValue(new Animated.Value(0)), 500);
  };

  const translateX = scaleValue.interpolate({
    inputRange : [0, 1],
    outputRange: [0.65, 1],
  });

  return (
    <ModalContainer showModal={!showOpen? showOpen : Open}>
      <View paddingH-25 centerH textBlue01 style={styles.containerModal}>
        <DivSpace height-30 />
        <Text h14 textBlueDark center>
          {page !== 1.2? i18n.t('ModalDevice.component.title'): i18n.t('ModalDevice.component.titleActivateYourAccount')}
        </Text>
        <DivSpace height-10 />
        <Text h11 bgBlue01 center>
          {i18n.t('ModalDevice.component.textWeHaveSentYouEmail')}
        </Text>
        <DivSpace height-15 />
        <View centerH centerV>
          <ImageComponent
            textGray
            source={mailDevice}
            width={scale(240)}
            height={verticalScale(118)}
          />
        </View>
        <DivSpace height-40 />
        <View>
          <Text h11 bgBlue01 center>
            {page !== 1.2?i18n.t('ModalDevice.component.textEnterAndConfirm'):i18n.t('ModalDevice.component.textLoginAndConfirmThat')}
          </Text>
          <DivSpace height-30/>
          <Text h11 bgBlue01 center>
            {i18n.t('ModalDevice.component.textOnceConfirmedLog')}
          </Text>
        </View>
        <View flex-1 centerH bottom>
          <ButtonRounded
            onPress={onClose}
          >
            <Text h10 semibold>
              {i18n.t('ModalDevice.component.buttonToReturn')}
            </Text>
          </ButtonRounded>
          <DivSpace height-60 />
        </View>
      </View>
    </ModalContainer>
  );
};

export default ModalDisabled;
