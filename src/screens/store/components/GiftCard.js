import React from 'react';
import { TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';

import { Text, DivSpace, View, ImageComponent } from '@components';
import Styles from '@screens/store/styles';
import { moneyFormatter } from '@utils/formatters';
import i18n from '@utils/i18n';
import Close from '@assets/icons/close-blue.png';
import Copy from '@assets/icons/copy.png';
import Angle from '@assets/icons/angle-right-orange.png';

const GiftCard = ({
  onPress = () => null,
  onCopyPress = () => null,
  onRemovePress = () => null,
  index,
  ...card
}) => {
  return (
    <View
      marginB-15
      paddingV-13
      paddingH-10
      bgGray
      style={Styles.providerRecordContainer}
    >
      <View row>
        <View>
          <View
            width-93
            height-100
            style={[Styles.providerRecordLogo, {height: scale(60)}]}
            centerV
            centerH
          >
            <ImageComponent
              source={card.provider.logo}
              width={scale(75)}
              height={scale(60)}
            />
          </View>
        </View>
        <DivSpace width-10 />
        <View flex-1>
          <Text h10 semibold textGray>
            {i18n.t('savedPurchases.component.giftcard')}
          </Text>
          <Text h12 semibold bgBlue02>
            {card.provider.name}
          </Text>
          <DivSpace height-5 />
          <Text h18 semibold bgBlue02>
            {moneyFormatter(card.amount)}
          </Text>
        </View>
        <View centerH style={{ justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={onRemovePress(index)}>
            <ImageComponent
              source={Close}
              width={scale(22)}
              height={scale(22)}
            ></ImageComponent>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPress(card)}>
            <View paddingH-10 paddingT-10>
              <ImageComponent
                bgOrange02
                source={Angle}
                width={scale(14)}
                height={scale(14)}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <DivSpace height-15 />
      <View row>
        <View
          white
          style={Styles.datumContainer}
          paddingV-5
          paddingH-8
          flex-1
          row
          centerH
          centerV
        >
          <View flex-1>
            <Text h10 textGray>
              {i18n.t('savedPurchases.component.code')}
            </Text>
            <Text h12 bgBlue02 medium>
              {card.code}
            </Text>
          </View>

          <TouchableOpacity onPress={onCopyPress(card.code)}>
            <ImageComponent white source={Copy} width={22} height={22} />
          </TouchableOpacity>
        </View>
        <DivSpace width-10 />
        <View style={Styles.datumContainer} paddingV-5 paddingL-8 paddingR-16>
          <Text h10 textGray>
            {i18n.t('savedPurchases.component.valid')}
          </Text>
          <Text h10 bgBlue02 medium>
            {card.date}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default GiftCard;
