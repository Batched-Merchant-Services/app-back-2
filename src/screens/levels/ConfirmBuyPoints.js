import React from 'react';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import i18n from '@utils/i18n';
import {
  Text,
  View,
  DivSpace,
  NavigationBar,
  ImageComponent,
  ButtonRounded
} from '@components';
import { scale, verticalScale } from 'react-native-size-matters';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import circleLevel from '@assets/levels/circleLevel.png';
import uulalaLevel from '@assets/levels/uulalaLevel.png';
import Styles from './styles';



const ConfirmBuyPoints = ({ navigation }) => {
  
  const handlePressMyLevel =()=>{
    navigation.navigate('Level');
  };

  return (
    <SignUpWrapper>
      <SafeAreaView style={[Styles.viewInfoCntc]} forceInset={{top: 'always'}}>
        <NavigationBar
          disableExtraTop
          onBack={() => navigation.goBack()}
          body={i18n.t('buyPoints.component.titleBuyPoints')}
          onClose={null}
        />
        <View flex-1 centerV>
          <View paddingH-40 marginH-20 centerH style={Styles.containerUuPoints}>
            <DivSpace height-20/>
            <Text h16 white medium center>¡{i18n.t('buyPoints.component.textPointsPurchased')}!</Text>
            <DivSpace height-20/>
            <ImageBackground source={circleLevel} style={Styles.circleLevel} resizeMode="repeat">
              <ImageComponent source={uulalaLevel} width={scale(46)} height={verticalScale(46)}/>
            </ImageBackground>
            <DivSpace height-20/>
            <Text h30 white semibold>350</Text>
            <Text h16 white >{i18n.t('buyPoints.component.titlePointsUulala')}</Text>
            <DivSpace height-20/>
            <Text h12 white center>{i18n.t('buyPoints.component.texThePointsWere')}</Text>
            <Text h12 white bold>"{i18n.t('buyPoints.component.levelUulala')}"</Text>
            <DivSpace height-20/>
            <Text h12 white center>{i18n.t('buyPoints.component.textYouCanFind')}<Text h12 white bold>{' '}"{i18n.t('buyPoints.component.textMyCredits')}"</Text></Text>
            <View flex-1 centerH centerV bottom>
              <DivSpace height-20/>
              <ButtonRounded  onPress={handlePressMyLevel} >
                <Text h10 semibold>
                  {i18n.t('buyPoints.component.buttonMyUulalaLevel')}
                </Text>
              </ButtonRounded>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SignUpWrapper>
  );
};

export default ConfirmBuyPoints;
