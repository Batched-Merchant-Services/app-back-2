import React from 'react';
import { TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';

import { Text, DivSpace, View, ImageComponent } from '@components';
import Styles from '@screens/store/styles';
import i18n from '@utils/i18n';
import Close from '@assets/icons/close-blue.png';
import Copy from '@assets/icons/copy.png';
import Angle from '@assets/icons/angle-right-orange.png';

const Purchase = ({
  onPress = () => null,
  onCopyPress = () => null,
  onRemovePress = () => null,
  index,
  ...purchase
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
        <View flex-1>
          <View row paddingT-10>
            <View
              width-80
              height-40
              style={[Styles.providerRecordLogo, {height: scale(40)}]}
              centerV
              centerH
            >
              <ImageComponent
                source={purchase.provider.logo}
                width={scale(80)}
                height={scale(34)}
              />
            </View>
            <DivSpace width-10 />
            <View paddingT-3>
              <View>
                <Text h12 medium bgBlue02>
                  {purchase.provider.name}
                </Text>
                <Text h12 medium bgBlue02>
                  {purchase.provider.subname}
                </Text>
                <DivSpace height-5 />
              </View>
            </View>
          </View>
          <View>
            <DivSpace height-10 />
            <Text h10 semibold bgBlue02 numberOfLines={2}>
              {purchase.description1}
              <Text h10 medium bgBlue02>
                {purchase.description2}
              </Text>
            </Text>
          </View>
        </View>
        <View centerH style={{ justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={onRemovePress(index)}>
            <ImageComponent
              source={Close}
              width={scale(22)}
              height={scale(22)}
            ></ImageComponent>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPress(purchase)}>
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
              {purchase.code}
            </Text>
          </View>

          <TouchableOpacity onPress={onCopyPress(purchase.code)}>
            <ImageComponent white source={Copy} width={22} height={22} />
          </TouchableOpacity>
        </View>
        <DivSpace width-10 />
        <View style={Styles.datumContainer} paddingV-5 paddingL-8 paddingR-16>
          <Text h10 textGray>
            {i18n.t('savedPurchases.component.valid')}
          </Text>
          <Text h10 bgBlue02 medium>
            {purchase.date}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Purchase;
