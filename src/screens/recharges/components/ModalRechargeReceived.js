import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  DivSpace,
  View,
  Text,
  ImageComponent,
  ModalContainer,
  ButtonRounded
} from '@components';
import { scale, verticalScale } from 'react-native-size-matters';

import Close from '@assets/icons/close.png';
import StartInactive from '@assets/icons/startInactive.png';

import Styles from '@screens/recharges/styles';
import i18n from '@utils/i18n';
import { moneyFormatter } from '@utils/formatters';

const ModalRechargeReceived = ({ isOpen, onClose,onCancel }) => {
  const userName = 'Fernando';

  return (
    <ModalContainer showModal={isOpen}>
      <View flex-1 centerV centerH>
        <View height-520 centerH paddingH-24 style={Styles.containerRechargeUser}>
          <TouchableOpacity style={Styles.closeButtonUser} onPress={onClose}>
            <ImageComponent
              source={Close}
              width={scale(13)}
              height={verticalScale(13)}
            />
          </TouchableOpacity>
          <DivSpace height-41 />
          <View
            style={{
              backgroundColor: 'bgGray',
              height         : scale(110),
              width          : scale(110),
              borderRadius   : 100
            }}
          />
          <DivSpace height-28 />
          <Text h14 textBlueDark semibold>
            Urbano Ballesteros
          </Text>
          <DivSpace height-8 />
          <View row>
            <ImageComponent bgBlue06 source={StartInactive} width={14} height={14} />
            <DivSpace width-2 />
            <ImageComponent bgBlue06 source={StartInactive} width={14} height={14} />
            <DivSpace width-2 />
            <ImageComponent bgBlue06 source={StartInactive} width={14} height={14} />
            <DivSpace width-2 />
            <ImageComponent bgBlue06 source={StartInactive} width={14} height={14} />
            <DivSpace width-2 />
            <ImageComponent bgBlue06 source={StartInactive} width={14} height={14} />
          </View>
          <DivSpace height-8 />
          <Text h12 bgBlue02>
            250 m
          </Text>
          <DivSpace height-20 />
          <Text h16 textBlueDark>
            {i18n.t('recharges.component.textRechargeRequested')}
          </Text>
          <Text h16 textBlueDark semibold center>{moneyFormatter(140)} MXN</Text>
          <DivSpace height-15/>
          <Text h10 textGray>
            {i18n.t('recharges.component.textAvailableInWallet')}
          </Text>
          <Text h10 textGray semibold>{moneyFormatter(789.12)} MXN</Text>
          <DivSpace height-15 />
          <Text h12 textBlueDark>
            {i18n.t('recharges.component.textYourCommision')}{' '}
            <Text semibold>{moneyFormatter(3.5)} MXN</Text>
          </Text>
          <DivSpace height-22 />
          <ButtonRounded size={'lg'} onPress={onClose}>
            <Text h10 semibold>
              {i18n.t('recharges.component.buttonAcceptRequest')}
            </Text>
          </ButtonRounded>
          <DivSpace height-30 />
          <Text h9 blue center>{i18n.t('recharges.component.rechargeCommissionNote')}</Text>
          <DivSpace height-43 />
        </View>
        <DivSpace height-12 />
        <View>
          <ButtonRounded size={'lg'} blue onPress={onCancel}>
            <Text h10 semibold>
              {i18n.t('recharges.component.buttonCancel')}
            </Text>
          </ButtonRounded>
        </View>
      </View>
    </ModalContainer>
  );
};

export default ModalRechargeReceived;
