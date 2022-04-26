import React from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import { ImageComponent, Text, DivSpace, View, ButtonRounded } from '@components';
import ModalQrATM from '@screens/recharges/components/ModalQrATM';
import ItemWrapper from '@screens/recharges/components/ItemWrapper';
import ATM from '@assets/recharges/atm.png';

const ItemATM = ({openModal,closeModal,navigation}) => {
  const [isRechargeQRModal] = React.useState(
    false
  );
  function handelOpenModal() {
    setTimeout(() => {
      openModal(true);
    }, 3);
  }
  

  function handelCloseModal() {
    setTimeout(() => {
      closeModal(true);
    }, 3);
  }
  
  
  return (
    <ItemWrapper
      icon={
        <ImageComponent
          source={ATM}
          width={scale(28)}
          height={verticalScale(30)}
        />
      }
    >
      <View paddingH-19>
        <Text h14 white center>{i18n.t('establecimientosATM.component.textSlideRechargueInATM')}{' '}<Text bold white>{i18n.t('establecimientosATM.component.textSlideEstablishmentsATM')}</Text></Text>
        <DivSpace height-15/>
        <Text h10 white center semibold>{i18n.t('establecimientosATM.component.textSelectUbication')}{' '}<Text regular white>{i18n.t('establecimientosATM.component.textSlideEstablishmentsATM')}</Text></Text>
      </View>
      <DivSpace height-30/>
      <View centerH>
        <ButtonRounded blue onPress={handelOpenModal} >
          <Text h10 semibold>
            {i18n.t('establecimientosATM.component.buttonShowCode')}
          </Text>
        </ButtonRounded>
      </View>
      <ModalQrATM 
        isOpen={isRechargeQRModal}
        onClose={handelCloseModal}
        navigation={navigation} />
    </ItemWrapper>
  );
};

export default ItemATM;
