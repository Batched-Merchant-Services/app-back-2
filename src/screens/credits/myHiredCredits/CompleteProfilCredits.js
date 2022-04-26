import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView,TouchableOpacity } from 'react-native';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { scale, verticalScale } from 'react-native-size-matters';
import { moneyFormatter } from '@utils/formatters';
import { useSelector } from 'react-redux';
import { 
  NavigatorHeader, 
  DivSpace,  
  View, 
  Text,
  ImageComponent,
  ButtonRounded,
  BoxLevelBadge
} from '@components';
import completeProf from '@assets/levels/completeProf.png';
import myCredist from '@assets/credits/myCredist.png';
import rowRight from '@assets/levels/rowRight.png';
import Colors from '@styles/Colors';
import IconWarning from '../../../utils/iconSVG/IconWarning';
import i18n from '@utils/i18n';
 
const CompleteProfilCredits = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const brandThemeImages = userData?.Theme?.images;
  const handlePressNext =() =>{
    navigation.navigate('CreditsContracted');
  };

  return (
    <SignUpWrapper >
      <NavigatorHeader brandTheme={brandThemeImages} avatarProfile={() => console.log('')} navigation={navigation} />
      <DivSpace height-10 />
      <Text h12 white center>{i18n.t('contractedCredits.component.titleMyCredits')}</Text>
      <DivSpace height-20 />
      <ScrollView >
        <DivSpace height-15 />
        <View centerH marginH-50>
          <ImageComponent
            source={myCredist}
            width={scale(222)}
            height={verticalScale(143)}
          />
          <DivSpace height-25 />
          <Text h12 white center>{i18n.t('contractedCredits.component.textWhenYouHaveContracted')}</Text>
          <DivSpace height-20 />
          <Text h11 white center>{i18n.t('contractedCredits.component.textYourCreditOffers')}<Text orange>"{i18n.t('contractedCredits.component.textUulalaLevel')}"</Text></Text>
        </View>
        <DivSpace height-20 />
        <View centerH >
          <ButtonRounded size = 'lg' onPress={handlePressNext} >
            <Text h10 semibold>
              {i18n.t('contractedCredits.component.textSeeCredits')}
            </Text>
          </ButtonRounded>
        </View>
        <DivSpace height-20 />
        <View  flex-1 marginH-15 centerV>
          <TouchableOpacity  style={{backgroundColor: brandTheme?.bgBlue06??Colors?.bgBlue06, borderRadius: 10, width: '100%', height: verticalScale(90),borderBottomWidth: 2,borderBottomColor: Colors?.orange}}>
            <View flex-1 centerV row marginH-10>
              <View style={{ flex: 0.2 }}><ImageComponent source={completeProf} width={scale(48)} height={verticalScale(48)} /></View>
              <DivSpace width-15 />
              <View flex-1 column>
                <View row centerV>
                  <IconWarning width={scale(16)} height={verticalScale(16)}  fill={brandTheme?.bgBlue06??Colors?.bgBlue06} fillSecondary={brandTheme?.bgBlue01??Colors?.bgBlue01}/>
                  <Text h10  medium orange>{' '}{' '}{i18n.t('contractedCredits.component.textImportant')} </Text>
                </View>
                <Text h12 white bold> {i18n.t('levels.component.textCompleteProfile')} <Text h12 white regular>{' '}{i18n.t('levels.component.textToAccessYour')}</Text></Text>
              </View>
              <View  right style={{ flex: 0.1 }}>
                <ImageComponent white source={rowRight} width={scale(7)} height={verticalScale(13)}  />
              </View>
            </View>
          </TouchableOpacity>
          <DivSpace height-10 />
        </View>
        <View marginH-15 >
          <TouchableOpacity  style={{backgroundColor: brandTheme?.textBlueDark??Colors?.textBlueDark, borderRadius: 10, width: '100%', height: verticalScale(160),padding: 20}}>
            <View row>
              <View flex-1 centerV><Text h10 medium white>{i18n.t('contractedCredits.component.titleMyLevel')}</Text></View>
              <View flex-1 right><BoxLevelBadge level={3} sm/></View>
            </View>
            <DivSpace height-5/>
            <View row>
              <View flex-1><Text h10 medium textGray>{i18n.t('contractedCredits.component.textSumOfMaximum')}</Text></View>
              <View right style={{flex: 0.6}}><Text h10 bold white>{moneyFormatter(2500)}</Text></View>
            </View>
            <DivSpace height-5/>
            <View row>
              <View flex-1><Text h10 medium textGray>{i18n.t('contractedCredits.component.textAmountHired')}</Text></View>
              <View right style={{flex: 0.6}}><Text h10 bold white>{moneyFormatter(1250)}</Text></View>
            </View>
            <DivSpace height-5/>
            <View row>
              <View flex-1><Text h10 medium textGray>{i18n.t('contractedCredits.component.textCreditsAvailable')}</Text></View>
              <View right style={{flex: 0.4}}><Text h10 bold white>03</Text></View>
            </View>
            <DivSpace height-5/>
            <View row>
              <View flex-1><Text h10 medium textGray>{i18n.t('contractedCredits.component.textContractedCredits')}</Text></View>
              <View right style={{flex: 0.4}}><Text h10 bold white>02</Text></View>
            </View>
            <DivSpace height-5/>
            <View row centerV>
              <View flex-1><Text h10 medium title>{i18n.t('contractedCredits.component.textToIncreaseYourAmount')}</Text></View>
              <View right style={{flex: 0.3}}><Text h10 medium orange>{i18n.t('contractedCredits.component.textDetail')}</Text></View>
              <View style={{ flex: 0.1 }} right><ImageComponent white source={rowRight} width={scale(7)} height={verticalScale(13)}  /></View>
            </View>
          </TouchableOpacity>
          <DivSpace height-10 />
        </View>
      </ScrollView>
    </SignUpWrapper>
  );
};

CompleteProfilCredits.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default CompleteProfilCredits;
