import React from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import i18n from '@utils/i18n';
import { scale, verticalScale } from 'react-native-size-matters';
import { moneyFormatter } from '@utils/formatters';
import LinearGradient from 'react-native-linear-gradient';
import Styles from '../styles';

import {
  View,
  Text,
  DivSpace,
  ImageComponent,
  BoxLevelBadge
} from '@components';
import store from '@assets/store/oferts.png';
import creditDirecty from '@assets/icons/creditDirecty.png';
import Colors from '@styles/Colors';

const ElementList = ({descount,expires,typeOfer,level,fifteenPayments,balance, description ,onPress} ) => {
  return (
    <View flex-1 centerH>
      <View flex-1 marginH-15 width-300>
        <TouchableOpacity onPress={onPress}>
          <ImageBackground source={store} style={Styles.imageCreditDirec} imageStyle={{ borderRadius: 5 }}>
            <DivSpace height-10/>
            <View row>
              <View flex-1/>
              <View centerH centerV white width-105 height-45 marginR-10 style={Styles.creditImage}>
                <ImageComponent
                  source={creditDirecty}
                  width={scale(89)}
                  height={verticalScale(27)}
                />
              </View>
            </View>
          </ImageBackground>
          <View white style={Styles.containerWhite}>
            <View centerV width-134 height-18 style={Styles.comboDiscount} >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[Colors?.orange,Colors?.bgOrange02]}
                style={Styles.linearDiscount}
              >
                <Text semibold h10 white>{descount} de descuento</Text>
              </LinearGradient>
            </View>
            <View paddingH-10>
              <DivSpace height-10/>
              <Text bgBlue02 medium h12>
                {i18n.t('store.component.textOfferProv')}
              </Text>
              <DivSpace height-10/>
              <Text bgBlue02 medium h10>
                {description}
              </Text>
              <DivSpace height-10/>
              <View  row>
                <Text h10 bgBlue02>{i18n.t('store.component.textExpirationDate')}{' '}<Text h10 bgBlue02 semibold>{expires}</Text></Text>
                <DivSpace width-30/>
                <View flex-1 right>
                  <Text h10 bgBlue02>{fifteenPayments} pagos Quincenales</Text>
                </View>
              </View>
              <DivSpace height-10/>
            </View>
            <View row centerV>
              <View centerV width-82 height-18  >
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#6990FC','#775EFF']}
                  style={Styles.linearCredit}
                >
                  <Text semibold h10 white center>{typeOfer}</Text>
                </LinearGradient>
              </View>
              <DivSpace width-20/>
              <BoxLevelBadge level={level} />
              <View flex-1 right paddingR-15>
                <Text bgBlue02 h22>{moneyFormatter(balance)}</Text>
              </View>
            </View>
            <DivSpace height-10/>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ElementList;
