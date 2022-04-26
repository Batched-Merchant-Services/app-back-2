import React from 'react';
import { ImageBackground } from 'react-native';
import { scale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import { View, Text, DivSpace } from '@components';
import Styles from '../styles';
import cardEmpty from '@assets/brand/cardGray.png';
import { useSelector } from 'react-redux';
 
const CardEmpty = ({ input, available, page, ...item }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandThemeImages = userData?.Theme?.images;
  return (
    <View style={Styles.containerEmpty}>
      <ImageBackground source={brandThemeImages?.cardGray?{uri: brandThemeImages?.cardGray}:cardEmpty} style={Styles.imageEmpty}>
        <View
          centerH
          disabled
          centerV
          width-160
          height-20
          marginT-5
          marginL-5
          style={{
            borderTopLeftRadius: 10,
            borderBottomRightRadius: 10
          }}
        >
          <Text white h10 semibold>
            {i18n.t('myCards.component.textGetYourPhysicalCard')}
          </Text>
        </View>
      </ImageBackground>
    </View>
   
  );
};

export default CardEmpty;
