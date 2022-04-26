import React from 'react';
import { DivSpace, Text, View } from '@components';
import { ImageBackground } from 'react-native';
import bordersCard from '@assets/cards/bordersCard.png';
import viewCard from '@assets/cards/viewCard.png';
import i18n from '@utils/i18n';
import Styles from './styles';

const BoxVirtualCard = ({ cardNumber, cvv, dueDate, name, type }) => {
 
  return (
    <View  centerH>
      <ImageBackground source={bordersCard} style={Styles.bordersCard}>
        <ImageBackground source={viewCard} style={Styles.containerCard} imageStyle={{ borderRadius: 12 }} >
          <View bottom style={Styles.containerText}>
            <Text white h10> {i18n.t('myCards.component.textCardNumber')}</Text>
            <Text bgGray h18> {cardNumber}</Text>
            <DivSpace height-10/>
            <View row>
              <View column>
                <Text white h8> {i18n.t('myCards.component.textValidUntil')}</Text>
                <Text bgGray h15> {dueDate}</Text>
              </View>
              <DivSpace width-8/>
              <View column>
                <Text white h8> {i18n.t('myCards.component.textCVV')}</Text>
                <Text bgGray h18> {cvv}</Text>
              </View>
            </View>
            <DivSpace height-7/>
            <Text bgGray h15> {name}</Text>
          </View>
        </ImageBackground>
      </ImageBackground>
    </View>
  );
};

export default BoxVirtualCard;