import React from 'react';
import { TouchableOpacity } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { moneyFormatter } from '@utils/formatters';
import LinearGradient from 'react-native-linear-gradient';
import Styles from './styles';
import i18n from '@utils/i18n';
import { useSelector} from 'react-redux';
import {
  Text,
  View,
  DivSpace,
  ImageComponent,
} from '@components';
import logoUuLevel from '@assets/levels/logoUuLevel.png';
import rowRight from '@assets/levels/rowRight.png';
import Colors from '@styles/Colors';

const BoxCardLevel = ({
  containerStyle = {},
  title,
  points,
  price,
  ...props
}) => {

  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  return (
    <TouchableOpacity {...props}>
      <View right height-150 style={[Styles.containerBoxCardLevel,{backgroundColor: brandTheme.textBlueDark??Colors.textBlueDark}]}>
        <View row>
          <View flex-1 centerV>
            <View height-20>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={title ?[brandTheme.white??Colors.white,brandTheme.bgOrange02??Colors.bgOrange02]:['transparent','transparent']}
                style={Styles.boxLinearGradient}
              >
                <Text semibold h10 white>{title}</Text>
              </LinearGradient>    
            </View>
            <DivSpace height-5/>
            <View marginH-15>
              <Text bold white h26>{points}</Text>
              <Text medium white h16>{i18n.t('levels.component.textPointsUulala')}</Text>
              <DivSpace height-7/>
              <Text white h10>{i18n.t('levels.component.textPrice')}</Text>
              <DivSpace height-5/>
              <Text bold white h12>{moneyFormatter(price)} USD</Text>
            </View>
          </View>
          <View right flex-1><ImageComponent source={logoUuLevel} width={verticalScale(185)} height={verticalScale(150)}/></View>
          <View bottom marginR-15 style={Styles.rowLeft}><ImageComponent source={rowRight} width={scale(10)} height={verticalScale(12)}/></View>
        </View>
      </View>
    </TouchableOpacity>
  );
};


export default BoxCardLevel;
