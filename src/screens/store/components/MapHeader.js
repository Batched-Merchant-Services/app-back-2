import React from 'react';
import { TouchableOpacity } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';

import { ImageComponent, Text, View } from '@components';
import Styles from '@screens/recharges/styles';
import i18n from '@utils/i18n';

import BackArrow from '@assets/icons/nav-arrow.png';
import MapMenu from '@assets/store/map-menu.png';

const GRADIENT_COLORS = [
  'rgba(44, 54, 101, 1)',
  'rgba(44, 54, 101, 1)',
  'rgba(44, 54, 101, 1)',
  'rgba(44, 54, 101, 0.5)',
  'rgba(44, 54, 101, 0)'
];

const NavigationButton = ({ icon, iconSize = 22, onPress }) => {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            borderRadius   : 100,
            width          : verticalScale(34),
            height         : verticalScale(34),
            alignItems     : 'center',
            justifyContent : 'center',
            backgroundColor: '#4355AF'
          }}
        >
          <ImageComponent
            source={icon}
            height={verticalScale(11)}
            width={scale(22)}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

const MapHeader = ({ navigation, isNavigating }) => {
  function handleGoBack() {
    navigation.goBack();
  }

  function handleListPress() {
    navigation.navigate('ShoppingList',{ page: 'listMap' });
  }

  return (
    <LinearGradient colors={GRADIENT_COLORS} style={Styles.header}>
      <View style={Styles.button} centerV>
        <NavigationButton icon={BackArrow} onPress={handleGoBack} />
      </View>
      <View centerH centerV>
        <Text h12 title medium>
          {i18n.t('store.component.closeOffersTitle')}
        </Text>
        {!isNavigating && (
          <Text h10 white>
            {i18n.t('store.component.closeOffersSubtitle')}
          </Text>
        )}
      </View>
      <View style={Styles.button} centerV>
        {!isNavigating && (
          <TouchableOpacity onPress={handleListPress}>
            <ImageComponent source={MapMenu} height={40} width={40} />
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

export default MapHeader;
