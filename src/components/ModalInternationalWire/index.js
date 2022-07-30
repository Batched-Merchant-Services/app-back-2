import React, { useState, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { TouchableOpacity, Animated } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { getCatalogAccounts, getTypeTransfer } from '@utils/api/switch';
import { Bubbles } from 'react-native-loader';
import close from '@assets/icons/close.png';
import cardWallet from '@assets/brand/cardWallet.png';
import LocalStorage from '@utils/localStorage';
import {
  View,
  Text,
  DivSpace,
  ImageComponent,
  ButtonRounded,
  ModalContainer,
  BoxGradient,
  AnimateLabelAmount,
  Select
} from '@components';

import i18n from '@utils/i18n';
import Styles from './styles';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';

const ModalInternationalWire = ({ isOpen, onClose = () => null, navigation }) => {

  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const brandThemeImages = appData?.Theme?.images;
  let Open = isOpen ? true : false;
  const [showOpen] = useState(true);
  const [scaleValue, setScaleValue] = useState(new Animated.Value(0));
  

  useEffect(() => {
    animationLogo();
  }, []);

  const goTransfer = async () => {
    onClose();
  };

  const animationLogo = async () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      delay: 10,
      useNativeDriver: true
    }).start();
    setTimeout(() => setScaleValue(new Animated.Value(1)), 500);
  };

  const translateX = scaleValue.interpolate({
    inputRange : [0, 1],
    outputRange: [0.65, 1]
  });


  return (
    <ModalContainer showModal={!showOpen ? showOpen : Open}>
      <View style={[Styles.containerModal, { backgroundColor: brandTheme.textBlue01 ?? Colors?.textBlue01 }]}>
        <View style={Styles.containerClose} >
          <TouchableOpacity onPress={onClose} style={[Styles.buttonClose, { backgroundColor: brandTheme.bgBlue02 ?? Colors?.bgBlue02 }]} >
            <ImageComponent white source={close} width={scale(10)} height={verticalScale(10)} />
          </TouchableOpacity>
        </View>
        <Text h14 orange center semibold>{i18n.t('homeWallet.component.modalInternationalWire.title')}</Text>
        <DivSpace height-15 />
        <View centerH centerV>
          <Animated.View style={[{ opacity: scaleValue,alignItems: 'center',justifyContent: 'center',transform: [{scale: translateX}] }]}>
            <BoxGradient size={scale(70)}>
              <ImageComponent
                source={ brandThemeImages?.cardWallet?brandThemeImages?.cardWallet:cardWallet}
                width={scale(60)}
                height={scale(60)}
              />
            </BoxGradient>
          </Animated.View>
        </View>
        <DivSpace height-10 />
        <View  marginH-20>
          <Text h11 white semibold><Text h11 orange semibold>1.</Text> {i18n.t('homeWallet.component.modalInternationalWire.textTheInternational')}</Text>
          <Text h11 white>{i18n.t('homeWallet.component.modalInternationalWire.textOne')}</Text>
          <DivSpace height-10 />
          <Text h11 white> <Text h11 orange semibold>2.</Text><Text h11 white semibold>{i18n.t('homeWallet.component.modalInternationalWire.textPleaseInclude')}</Text>{' '}
            {i18n.t('homeWallet.component.modalInternationalWire.textTwo')}
          </Text>
          <DivSpace height-10 />
          <Text h11 white semibold>
            {i18n.t('homeWallet.component.modalInternationalWire.textToRegister')}{' '}<Text h11 orange semibold>support@savvywallet.io</Text> 
          </Text>
        </View>
        <View flex-1 bottom centerH>
          <ButtonRounded
            style={Styles.manualCreditButton}
            onPress={goTransfer}
          >
            <Text h10 semibold>
            {i18n.t('homeWallet.component.modalInternationalWire.buttonUnderstood')}
            </Text>
          </ButtonRounded>
          <DivSpace height-20 />
        </View>
      </View>
    </ModalContainer>
  );
};

export default ModalInternationalWire;
