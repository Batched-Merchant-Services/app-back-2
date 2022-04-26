import React from 'react';
import { TouchableOpacity } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';

import { ImageComponent, Text, View } from '@components';
import Styles from '@screens/recharges/styles';
import i18n from '@utils/i18n';

import BackArrow from '@assets/icons/nav-arrow.png';
import Settings from '@assets/icons/settings.png';
import Visible from '@assets/icons/visible.png';

const GRADIENT_COLORS = [
  'rgba(44, 54, 101, 1)',
  'rgba(44, 54, 101, 1)',
  'rgba(44, 54, 101, 1)',
  'rgba(44, 54, 101, 0.5)',
  'rgba(44, 54, 101, 0)'
];

const NavigationButton = ({ icon, iconSize = 16, onPress }) => {
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
            height={verticalScale(iconSize)}
            width={scale(iconSize)}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

const NavigationHeader = ({ navigation, isRecharging }) => {
  function handleGoBack() {
    navigation.goBack();
  }

  function handleGoSettings() {
    navigation.navigate('RechargesConfig');
  }

  return (
    <LinearGradient colors={GRADIENT_COLORS} style={Styles.header}>
      <View style={Styles.button} centerV>
        <NavigationButton icon={BackArrow} onPress={handleGoBack} />
      </View>
      <View centerH centerV>
        <Text h12 title medium>
          {i18n.t('recharges.component.title')}
        </Text>
        {!isRecharging && (
          <Text h10 white>
            {i18n.t('recharges.component.available')}
          </Text>
        )}
      </View>
      <View style={Styles.button} centerV>
        {!isRecharging && (
          <>
            <NavigationButton icon={Settings} onPress={handleGoSettings} />
            <View style={Styles.badge}>
              <ImageComponent
                source={Visible}
                height={verticalScale(15)}
                width={verticalScale(15)}
              />
            </View>
          </>
        )}
      </View>
    </LinearGradient>
  );
};

export default NavigationHeader;
