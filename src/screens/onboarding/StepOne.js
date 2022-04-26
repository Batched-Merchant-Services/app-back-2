import React, { Component } from 'react';
import {  ImageBackground } from 'react-native';
import i18n from '@utils/i18n';
import { View, ImageComponent, Text, DivSpace, ButtonNext, NavigationBar } from '@components';
import { scale, verticalScale } from 'react-native-size-matters';
import styles from './styles';

const imageBackgroungOn = require('@assets/imagesBackground/imageBackgroungOn.png');
const imageStepOne = require('@assets/imagesOnboard/imageOnboardOne.png');

class onboarStepOne extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View bgBlue01 style={styles.container}>
        <ImageBackground source={imageBackgroungOn} style={styles.imageBackgnd}>
          <DivSpace height-40 />
          <NavigationBar onBack={() => navigation.goBack()} />
          <DivSpace height-20 />
          <View flex-1 centerH>
            <ImageComponent source={imageStepOne} width={scale(220)} height={verticalScale(147)} />
          </View>
        </ImageBackground>
        <DivSpace height-100 />
        <View>
          <Text h15 white center>{i18n.t('onBoard.component.labelYourMoney')}</Text>
          <Text h15 white center semibold>{i18n.t('onBoard.component.labelAlwaysAvailable')}</Text>
        </View>
        <DivSpace height-30 />
        <View marginH-55>
          <Text h12 title center style={{lineHeight: 21}}>{i18n.t('onBoard.component.labelWithUulalaYou')}
            <Text white semibold> {i18n.t('onBoard.component.labelVirtualCard')}</Text>, {i18n.t('onBoard.component.labelYocanAlso')} <Text white semibold>{i18n.t('onBoard.component.labelSendandRecieved')}</Text>
          </Text>
        </View>
        <DivSpace height-45 />
        <View flex-1 row bottom centerH> 
          <View marginH-10 orange style={styles.steps}></View>
          <View marginH-10 white style={styles.stepsWhite}></View>
          <View marginH-10 white style={styles.stepsWhite}></View>
        </View>
        <DivSpace height-20 />
        <View centerH centerV bottom >
          <ButtonNext onPress={()=> navigation.navigate('onboarStepTwo')}/>
        </View>
        <DivSpace height-80 />
      </View>
    );
  }
}
export default onboarStepOne;
