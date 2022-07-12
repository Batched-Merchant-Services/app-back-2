import React from 'react';
import {
  DivSpace,
  View,
  Text,
  ImageComponent,
  ModalContainer,
  ButtonRounded
} from '@components';
import { scale, verticalScale } from 'react-native-size-matters';
import clock from '@assets/brand/clock.png';
import Styles from './styles';
import i18n from '@utils/i18n';
import { useSelector } from 'react-redux';

const ModalInactive = ({ isOpen, onClose, onEnter }) => {
  console.log('isOpen',isOpen)
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandThemeImages = appData?.Theme?.images;

  return (
    <ModalContainer showModal={isOpen} >
      <View flex-1 centerH Top-50 >
        <View textBlue01 centerH paddingH-24 style={[Styles.containerRechargeUser]}>
          <DivSpace height-41 />
          <Text h14 white semibold center>
            {i18n.t('modalCloseSession.component.title')}
          </Text> 
          <DivSpace height-10 />
          <View centerH centerV
          ><ImageComponent
              source={brandThemeImages?.clock?brandThemeImages?.clock:clock}
              width={scale(200)}
              height={verticalScale(200)}
            />
          </View>
          <DivSpace height-30 />
          <Text h12 center white>{i18n.t('modalCloseSession.component.textForSecurity')}{' '}<Text bold white>{i18n.t('modalCloseSession.component.textWeClosedYour')}</Text></Text>
          <DivSpace height-30 />
          <ButtonRounded size={'lg'} onPress={onClose}>
            <Text h10 semibold>
              {i18n.t('modalCloseSession.component.buttonEnter')}
            </Text>
          </ButtonRounded>
          
          <DivSpace height-43 />
        </View>
      </View>
    </ModalContainer>
  );
};

export default ModalInactive;
