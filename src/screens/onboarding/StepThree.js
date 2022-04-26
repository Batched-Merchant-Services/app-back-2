import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import i18n from '@utils/i18n';
import { View, ImageComponent, Text, DivSpace, ButtonNext, NavigationBar } from '@components';
import { scale, verticalScale } from 'react-native-size-matters';
import styles from './styles';

const imageBackgroungOn = require('@assets/imagesBackground/imageBackgroungOn.png');
const imageStepThree = require('@assets/imagesOnboard/imageOnboardThree.png');

class onboarStepThree extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={imageBackgroungOn} style={styles.imageBackgnd}
        >
          <DivSpace height-40 />
          <NavigationBar onBack={() => navigation.goBack()} />
          <DivSpace height-20 />
          <View flex-1 centerH>
            <ImageComponent source={imageStepThree} width={scale(220)} height={verticalScale(147)} />
          </View>
        </ImageBackground>
        <DivSpace height-100 />
        <View>
          <Text h15 white center>
            {i18n.t('onBoard.component.labelMoreCredits')}
          </Text>
          <Text h15 white center semibold>
            {i18n.t('onBoard.component.labelBecauseWe')}
          </Text>
        </View>
        <DivSpace height-30 />
        <View marginH-55>
          <Text h12 title center style={{lineHeight: 21}}>
            {i18n.t('onBoard.component.labelUseYourApplication')}
            <Text white semibold> {i18n.t('onBoard.component.labelCreditOptions')} </Text>
          </Text>
        </View>
        <DivSpace height-50 />
        <View flex-1 row centerH bottom>
          <View marginH-10 white style={styles.stepsWhite} ></View>
          <View marginH-10 white style={styles.stepsWhite}></View>
          <View marginH-10 orange style={styles.steps}></View>
        </View>
        <DivSpace height-20 />
        <View centerH centerV bottom >
          <ButtonNext onPress={()=> navigation.navigate('MyWallet')} />
        </View>
        <DivSpace height-80 />
      </View>
    );
  }
}
export default onboarStepThree;
