import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  DivSpace,
  View,
  Text,
  QrCode,
  ImageComponent,
  ModalContainer
} from '@components';
import { scale, verticalScale } from 'react-native-size-matters';
import rowDown from '@assets/icons/rowDown.png';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';
import Styles from '@screens/recharges/styles';
import i18n from '@utils/i18n';

const ModalRechargeQR = ({ isOpen, onClose }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const userName = 'Fernando';

  return (
    <ModalContainer showModal={isOpen}>
      <View flex-1 centerV centerH>
        <View centerH paddingH-24 white style={Styles.containerRechargeQR}>
          <TouchableOpacity style={[Styles.closeButton,{backgroundColor: brandTheme?.textBlueDark??Colors.textBlueDark}]} onPress={onClose}>
            <ImageComponent
              white
              source={rowDown}
              width={scale(13)}
              height={verticalScale(13)}
            />
          </TouchableOpacity>
          <DivSpace height-35 />
          <Text center h14 textBlueDark>
            {i18n.t('recharges.component.rechargeQRDescription1')}
            <Text semibold> {userName} </Text>
            {i18n.t('recharges.component.rechargeQRDescription2')}
          </Text>
            <View  centerH centerV>
              <QrCode id={123} name={'guadalupe'} size={190}/>
            </View>
          <DivSpace height-43 />
        </View>
        <View paddingH-40 centerV bgGray style={Styles.containerRechargeFooter}>
          <DivSpace height-28 />
          <Text center h12 textBlueDark>
            {i18n.t('recharges.component.rechargeQRFooter')}{' '}
            <Text semibold white>36745827</Text>
          </Text>
          <DivSpace height-28 />
        </View>
      </View>
    </ModalContainer>
  );
};

export default ModalRechargeQR;
