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
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';
import Styles from '@screens/recharges/styles';
import i18n from '@utils/i18n';
import { moneyFormatter } from '@utils/formatters';

const ModalRechargeUser = ({ isOpen, onClose }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const userName = 'Fernando';

  return (
    <ModalContainer showModal={isOpen}>
      <View flex-1 centerV centerH>
        <View centerH paddingH-24 white style={Styles.containerRechargeUser}>
          <TouchableOpacity style={[Styles.closeButtonUser,{ backgroundColor: brandTheme?.textBlueDark??Colors.textBlueDark}]} onPress={onClose}>
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
            Fernando Méndez
          </Text> 
          <Text h10 textBlueDark>
            {i18n.t('recharges.component.rechargeAccepted')}
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
          <DivSpace height-28 />
          <Text h14 textBlueDark>
            {i18n.t('recharges.component.rechargeAmount')}{' '}
            <Text semibold>{moneyFormatter(140)} MXN</Text>
          </Text>
          <DivSpace height-8 />
          <Text h14 textBlueDark>
            {i18n.t('recharges.component.rechargeCommission')}{' '}
            <Text semibold>{moneyFormatter(3.5)} MXN</Text>
          </Text>
          <DivSpace height-22 />
          <ButtonRounded size={'lg'} onPress={onClose}>
            <Text  h10 semibold>
              {i18n.t('recharges.component.rechargeGoToMeetPoint')}
            </Text>
          </ButtonRounded>
          <DivSpace height-36 />
          <Text h9 blue center>{i18n.t('recharges.component.rechargeCommissionNote')}</Text>
          <DivSpace height-43 />
        </View>
      </View>
    </ModalContainer>
  );
};

export default ModalRechargeUser;
