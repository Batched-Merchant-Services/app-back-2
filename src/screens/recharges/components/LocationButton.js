import React from 'react';
import { TouchableOpacity } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { View, ImageComponent } from '@components';
import Location from '@assets/recharges/location.png';
import Styles from '@screens/recharges/styles';

const LocationButton = ({ onPress, isRecharging, showInfoBox }) => {
  return (
    <TouchableOpacity
      style={
        [isRecharging ? Styles.locationWrapperRecharging : Styles.locationWrapper,
          showInfoBox ? Styles.locationShowBox: Styles.locationWrapper]
      }
      onPress={onPress}
    >
      <View white style={Styles.locationButton} centerH centerV>
        <ImageComponent
          source={Location}
          width={scale(20)}
          height={verticalScale(20)}
        />
      </View>
    </TouchableOpacity>
  );
};

export default LocationButton;
