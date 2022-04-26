import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import i18n from '@utils/i18n';
import { View, ImageComponent, Text, DivSpace, ButtonNext, Link,NavigationBar } from '@components';
import styles from './styles';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';
const imageBackgroungOn = require('@assets/imagesBackground/imageBackgroungOn.png');
const infoPerson = require('@assets/brand/infoPerson.png');

class InformationPersonal extends Component {


  render() {
    const redux = useSelector(state => state);
    const userData = redux.user;
    const brandTheme = userData?.Theme?.colors;
    const brandThemeImages = userData?.Theme?.images;
    const { navigation } = this.props;
    return (
      <View style={[styles.containerInitProfile,{backgroundColor: brandTheme?.bgBlue01?? Colors?.bgBlue01}]}>
        <ImageBackground source={imageBackgroungOn} style={{ width: '100%', height: 188 }}>
          <DivSpace height-20 />
          <NavigationBar
            onBack={() => navigation.goBack()}
            body={null}
            onClose={null}
          />
          <DivSpace height-30 />
          <View flex-1 centerH>
            <ImageComponent source={ brandThemeImages?.infoPerson?brandThemeImages?.infoPerson:infoPerson} width={217} height={147} />
          </View>
        </ImageBackground>
        <DivSpace height-110 />
        <View>
          <Text h17 white center>{i18n.t('signUp.component.labelYourPersonalInf')}</Text>
          <Text h17 white center semibold>{i18n.t('signUp.component.labelIsProtected')}</Text>
        </View>
        <DivSpace height-30 />
        <View marginH-55>
          <Text h12 title center style={{ lineHeight: 21 }}>{i18n.t('signUp.component.labelWithYourData')}
            <Text white semibold>{' '}{i18n.t('signUp.component.labelCreditOptions')}</Text>
          </Text>
        </View>
        <DivSpace height-45 />
        <View flex-1 centerH bottom >
          <ButtonNext back onPress={() => navigation.goBack()} />
          <DivSpace height-15 />
          <Link>{i18n.t('onBoard.component.linkNoticeOfPrivacy')}</Link>
          <DivSpace height-80 />
        </View>
      </View>
    );
  }
}
export default InformationPersonal;
