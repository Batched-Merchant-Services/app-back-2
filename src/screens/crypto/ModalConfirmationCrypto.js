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
import { Animated } from 'react-native';
import { Modal } from 'react-native';
import Styles from './styles';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';

const ModalConfirmationCrypto = ({ visible, onRequestClose, getData, onPressOverlay, ...props }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const [shortNameCrypto] = useState(appData ? appData.typeCrypto : '');
  const [iconCrypto] = useState(appData ? appData.iconCrypto : '');
  const [showNameCrypto] = useState(appData ? appData.nameCrypto : '');
  const [showButtonModal, setShowButtonModal] = useState(true);
  const logo = require('@assets/brand/SAAVY.png');

  useEffect(() => {
    setTimeout(() => {
      setShowButtonModal(false);
    }, 5000);
  }, [showButtonModal]);


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View flex-1 centerV centerH style={{ backgroundColor: 'rgba(0, 0, 0, 0.30)', }}>
        <View centerH centerV style={Styles.containerModal}>
          <View centerH>
            <ImageComponent
              source={brandTheme?.uulalaLogo ? brandTheme?.uulalaLogo : logo}
              height={verticalScale(15)}
              width={scale(60)}
            />
          </View>
          <DivSpace height-15 />
          <View centerH>
            <ImageComponent source={{ uri: iconCrypto }} width={scale(55)} height={verticalScale(55)} />
            <DivSpace height-15 />
            <Text white h12 center>{i18n.t('CryptoBalance.component.sendCrypto.textOnlySend')}{' '}<Text white semibold>{showNameCrypto}</Text>{' '}<Text white >{i18n.t('CryptoBalance.component.sendCrypto.textCoin')}</Text>{' '}{i18n.t('CryptoBalance.component.sendCrypto.textToThisAddress')}</Text>
            <DivSpace height-15 />
            <Text white h12 center>{i18n.t('CryptoBalance.component.sendCrypto.textSendingAnyOther')}</Text>
          </View>
          <DivSpace height-15 />
          <View flex-1 centerH bottom>
            <ButtonRounded
              onPress={onPressOverlay}
              disabled={showButtonModal}
            >
              <Text h10 semibold>
                {i18n.t('CryptoBalance.component.sendCrypto.textIUnderstand')}
              </Text>
            </ButtonRounded>
          </View>
        </View>
      </View>
    </Modal>
  )
};

export default ModalConfirmationCrypto;
