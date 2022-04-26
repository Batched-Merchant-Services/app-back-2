import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import i18n from '@utils/i18n';
import { View, ImageComponent, Text, DivSpace, ButtonNext, NavigationBar } from '@components';
import { scale, verticalScale } from 'react-native-size-matters';
import styles from './styles';

const imageBackgroungOn = require('@assets/imagesBackground/imageBackgroungOn.png');
const imageStepTwo = require('@assets/imagesOnboard/imageOnboardTwo.png');

class onboarStepTwo extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground source={imageBackgroungOn} style={styles.imageBackgnd}>
          <DivSpace height-40 />
          <NavigationBar onBack={() => navigation.goBack()} />
          <DivSpace height-20 />
          <View flex-1 centerH>
            <ImageComponent source={imageStepTwo} width={scale(220)} height={verticalScale(147)} />
          </View>
        </ImageBackground>
        <DivSpace height-100 />
        <View >
          <Text h15 white center>{i18n.t('onBoard.component.labelInUulala')}</Text>
          <Text h15 white center semibold>{i18n.t('onBoard.component.labelWeSupport')}</Text>
        </View>
        <DivSpace height-30 />
        <View marginH-55>
          <Text h12 title center style={{lineHeight: 21}} >{i18n.t('onBoard.component.labelInUulala')}
            <Text white semibold > {i18n.t('onBoard.component.labelWeFacilitate')} </Text>, {i18n.t('onBoard.component.labelFromPayment')}
          </Text>
        </View>
        <DivSpace height-50 />
        <View flex-1 row centerH bottom > 
          <View marginH-10 white style={styles.stepsWhite}></View>
          <View marginH-10 orange style={styles.steps}></View>
          <View marginH-10 white style={styles.stepsWhite}></View>
        </View>
        <DivSpace height-20/>
        <View centerH centerV bottom >
          <ButtonNext onPress={()=> navigation.navigate('onboarStepThree')}/>
        </View>
        <DivSpace height-80 />
      </View>
    );
  }
}
export default onboarStepTwo;
