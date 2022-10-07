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
import { TouchableOpacity, Animated, Linking } from 'react-native';
import styles from './styles';
import mailDevice from '@assets/brand/iconSecureDevice.png';
import deviceBloqued from '@assets/brand/deviceBloqued.png';
import IconFacebook from '@assets/icons/IconFacebook.png';
import IconLinkedin from '@assets/icons/Iconlinkedin.png';
import IconYoutube from '@assets/icons/Iconyoutube.png';
import IconTwitter from '@assets/icons/Icontwitter.png';

const ModalSecureDevicesNew = ({ isOpen, navigation, onClose = () => null, page, email, deviceStatus }) => {
  const [showOpen, setShowOpen] = useState(true);
  let Open = isOpen ? true : false;
  const [scaleValue, setScaleValue] = useState(new Animated.Value(0));

  useEffect(() => {
    animationLogo();
  }, []);

  const animationLogo = async () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      delay: 10,
      useNativeDriver: true,
    }).start();
    setTimeout(() => setScaleValue(new Animated.Value(0)), 500);
  };

  console.log('isOpen', isOpen, showOpen, deviceStatus)
  return (
    <ModalContainer showModal={!showOpen ? showOpen : Open}>
      <View paddingH-25 centerH textBlue01 style={styles.containerModal}>
        <DivSpace height-35 />
        <Text h14 white center>
          {i18n.t('homeWallet.component.modalSecureDevices.title')}
        </Text>
        <DivSpace height-15 />
        <View centerH centerV>
          <ImageComponent
            source={deviceStatus === 100 ? mailDevice : deviceBloqued}
            width={scale(175)}
            height={verticalScale(175)}
          />
        </View>
        <DivSpace height-45 />
        {deviceStatus === 100 && (
          <View>
            <Text h11 white center>
              {i18n.t('homeWallet.component.modalSecureDevices.textWeDetectedThatLogged')}{' '}
              <Text h11 white center semibold>
                {email}
              </Text>
            </Text>
            <DivSpace height-20 />
            <Text h11 white center semibold>
              {i18n.t('homeWallet.component.modalSecureDevices.textOneAuthorized')}
            </Text>
          </View>
        )}
        {deviceStatus === 303 && (
          <View>
            <Text h11 white center>
              {i18n.t('homeWallet.component.modalSecureDevices.textAccessToTheApplication')}
            </Text>
          </View>
        )}
        <View flex-1 centerH bottom>
          <ButtonRounded
            onPress={onClose}
          >
            <Text h10 semibold>
              {i18n.t('homeWallet.component.modalSecureDevices.buttonUnderstood')}
            </Text>
          </ButtonRounded>
          <DivSpace height-60 />
        </View>
      </View>
    </ModalContainer>
  );
};

export default ModalSecureDevicesNew;
