import React, { useState } from 'react';
import { SafeAreaView } from 'react-navigation';
import { TouchableOpacity } from 'react-native';
import {
  DivSpace,
  View,
  Text,
  QrCode,
  ButtonBackHome,
  ImageComponent,
  ModalContainer,

} from '@components';
import { scale, verticalScale } from 'react-native-size-matters';
import rowDown from '@assets/icons/rowDown.png';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';
import Styles from '@screens/recharges/styles';
import i18n from '@utils/i18n';

const ModalQrATM = ({ navigation, isOpen, onClose }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;

  const handlePressHome = () => {
    navigation.navigate('MyWallet');
  };

  return (
    <SafeAreaView style={Styles.viewInfoCntc} forceInset={{top: 'always'}}>
      <ModalContainer showModal={isOpen}>
        <View flex-1 centerV centerH>
          <View
            centerH
            paddingH-24
            white
            style={Styles.containerQR}
          >
            <TouchableOpacity
              style={[Styles.closeButton,{backgroundColor: brandTheme?.textBlueDark??Colors.textBlueDark}]}
              onPress={onClose}>
              <ImageComponent
                white
                source={rowDown}
                width={scale(13)}
                height={verticalScale(13)}
              />
            </TouchableOpacity>
            <DivSpace height-35 />
            <Text center h14 textBlueDark>
              {i18n.t('establecimientosATM.component.textSelectPayServices')}
            </Text>
            <DivSpace height-20 />
            <Text center h12 textBlueDark>
              {i18n.t('establecimientosATM.component.textScanTheFollowing')}
            </Text>
              <View  centerH centerV>
                <QrCode id={123} name={'guadalupe'} size={190}/>
              </View>
            <Text center h12 textBlueDark>
              {i18n.t('establecimientosATM.component.textOrUseThePayment')}<Text bold textBlueDark>36745827</Text>
            </Text>
            <DivSpace height-20 />
          </View>
          <View
            paddingH-40
            centerV
            textBlueDark
            style={Styles.containerFooter}
          >
            <Text center h12 white>
              {i18n.t('establecimientosATM.component.textOnceThePayment')}
            </Text>
            <DivSpace height-15 />
            <View centerH centerV bottom>
              <ButtonBackHome onPress={handlePressHome} />
            </View>
          </View>
        </View>
      </ModalContainer>
    </SafeAreaView>
  );
};

export default ModalQrATM;
