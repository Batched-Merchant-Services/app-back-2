import React from 'react';
import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

import { View, Text, DivSpace, ButtonRounded, Link } from '@components';
import i18n from '@utils/i18n';
import Colors from '@styles/Colors';

const Styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.textBlueDark,
    borderRadius   : 10
  }
});

const CardDisabledFooter = ({navigation, data}) => {

  function handleActivationPress() {
    navigation.navigate('InfoReceivedCard',{page: 'activate', dataBackup: data });
    //navigation.navigate('ActivateCard',{dataBackup: data});
  }

  return (
    <View style={{width: '100%'}} centerH>
      <View bgBlue01 width-294 paddingT-18 paddingB-26 style={Styles.container}>
        <Text medium h14 center white>
          {i18n.t('cardActivation.component.footer')}
        </Text>
        <DivSpace height-20 />
        <Text center h12 medium white>
          {i18n.t('cardActivation.component.footerDescription')}
        </Text>
        <DivSpace height-23 />
        <View centerH>
          <ButtonRounded style={{ width: scale(160), height: verticalScale(30) }} onPress={handleActivationPress}>
            <Text h12 semibold>
              {i18n.t('cardActivation.component.title')}
            </Text>
          </ButtonRounded>
          <DivSpace height-23 />
        </View>
      </View>
    </View>
    
  );
};

export default CardDisabledFooter;
