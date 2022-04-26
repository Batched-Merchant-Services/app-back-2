import React from 'react';
import { scale } from 'react-native-size-matters';
import Ripple from 'react-native-material-ripple';
import { View, BoxGradient, Text, DivSpace } from '@components';
import * as Animatable from 'react-native-animatable';
import { withNavigationFocus } from 'react-navigation';
import i18n from '@utils/i18n';
import Styles from '../styles';
import { useSelector } from 'react-redux';
import IconHandCard from '@utils/iconSVG/IconHandCard';
import IconLetter from '@utils/iconSVG/IconLetter';
import Colors from '@styles/Colors';

const CardRequestCard = ({navigation,dataAssociate}) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;


  const handleRequestNow = async () => {
    navigation.navigate('RequestCard');
  };

  function handleAddCard() {
    navigation.navigate('InfoReceivedCard',{page: 'associate', dataBackup: dataAssociate });
  }

  return (
    <View  style={{ width: '100%' }}>
      {navigation.isFocused() && <View
        textBlue01
        style={Styles.animation}
        marginT-17
        marginH-10
        height-106
        paddingV-16
        row
      >
        <Animatable.View style={Styles.containerButton} animation="flipInX" >
          <Ripple style={{flex: 1}} onPress={handleRequestNow}>
            <View flex-1 centerH>
              <BoxGradient blue size={scale(41)}>
                <IconLetter width={26} height={26}  fill={brandTheme?.orange??Colors?.orange} fillSecondary={brandTheme?.white??Colors?.white}/>
              </BoxGradient>
              <DivSpace height-6 />
              <Text h10 medium center white>
                {i18n.t('myCards.component.requesCard.textRequestCard')}
              </Text>
              <Text h10 medium center white>
                {i18n.t('myCards.component.requesCard.textShipping')}
              </Text>
            </View>
          </Ripple>
        </Animatable.View>
        <Animatable.View style={Styles.containerButton}  animation="flipInX" delay={150}>
          <Ripple rippleDuration={800}  style={{flex: 1}} onPress={handleAddCard}>
            <View flex-1 centerH>
              <BoxGradient blue size={scale(41)}>
                <IconHandCard width={26} height={26}  fill={brandTheme?.orange??Colors?.orange} fillSecondary={brandTheme?.white??Colors?.white}/>
              </BoxGradient>
              <DivSpace height-6 />
              <Text h10 medium center white>
                {i18n.t('myCards.component.requesCard.textAddCard')}
              </Text>
              <Text h10 medium center white>
                {i18n.t('myCards.component.requesCard.textAssociate')}
              </Text>
            </View>
          </Ripple>
        </Animatable.View>
      </View>}
    </View>
  );
};

export default withNavigationFocus(CardRequestCard);
