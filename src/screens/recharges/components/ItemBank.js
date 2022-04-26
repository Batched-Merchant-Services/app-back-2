import React from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import { ImageComponent,Text,DivSpace,View,ButtonRounded } from '@components';
import ItemWrapper from '@screens/recharges/components/ItemWrapper';
import Bank from '@assets/recharges/bank.png';

const ItemBank = ({ navigation }) => {

  function handlePressTransferBank() {
    navigation.navigate('BankTransfer');
  }

  return (
    <ItemWrapper
      navigation={navigation}
      icon={
        <ImageComponent
          source={Bank}
          width={scale(24)}
          height={verticalScale(25)}
        />
      }
    >
      <View paddingH-19>
        <Text h14 white center>{i18n.t('establecimientosATM.component.textSlideTransferBank')}{' '}</Text>
        <DivSpace height-15 />
        <Text h10 white center semibold>{i18n.t('establecimientosATM.component.textSlideFromYourBankAccount')}{' '}<Text regular>{i18n.t('establecimientosATM.component.textSlideToRechargueWallet')}</Text></Text>
      </View>
      <DivSpace height-40/>
      <View centerH>
        <ButtonRounded onPress={handlePressTransferBank} >
          <Text h10  semibold>
            {i18n.t('establecimientosATM.component.buttonNext')}
          </Text>
        </ButtonRounded>
      </View>
    </ItemWrapper>
  );
};

export default ItemBank;
