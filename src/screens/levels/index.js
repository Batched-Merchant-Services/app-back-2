import React, {useState}from 'react';
import i18n from '@utils/i18n';
import { TouchableOpacity,ImageBackground, ScrollView } from 'react-native';
import {
  DivSpace,
  NavigatorHeader,
  View,
  Text,
  ButtonRounded,
  ImageComponent,
  ModalDisabled,
  MenuContainer,
  ButtonWallet
} from '@components';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import StepIndicator from 'react-native-step-indicator';
import { scale, verticalScale } from 'react-native-size-matters';
import IconTransfer from '@utils/iconSVG/IconTransfer';
import rowRight from '@assets/levels/rowRight.png';
import completeProf from '@assets/levels/completeProf.png';
import logoUulalaSm from '@assets/icons/logoUulalaSm.png';
import levelUp from '@assets/icons/levelUp.png';

import Styles from './styles';
import Colors from '@styles/Colors';
import IconWarning from '../../utils/iconSVG/IconWarning';

const circularShadow = require( '@assets/levels/circularShadow.png');


const Levels = ({ navigation }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const brandThemeImages = appData?.Theme?.images;
  const [showStep, setShowStep] = useState('02');
  const [showNextStep, setShowNextStep] = useState(parseInt(showStep)+1);
  const [showPoint, setShowPoints] = useState(3.20);
  const [shoWarning,setShoWarning] = useState(false);
  const [showPrize,setShowPrize] = useState(false);

  const labels = ['0','25','50','75','100'];
  const customStyles = {
    stepIndicatorSize                : 7,
    currentStepIndicatorSize         : 7,
    separatorStrokeWidth             : 1,
    currentStepStrokeWidth           : 3,
    stepStrokeCurrentColor           : brandTheme?.orange??Colors?.orange,
    stepStrokeWidth                  : 3,
    stepStrokeFinishedColor          : brandTheme?.orange??Colors?.orange,
    stepStrokeUnFinishedColor        : brandTheme?.bgBlue06??Colors?.bgBlue06,
    separatorFinishedColor           : brandTheme?.orange??Colors?.orange,
    separatorUnFinishedColor         : brandTheme?.textBlueDark??Colors?.textBlueDark,
    stepIndicatorFinishedColor       : brandTheme?.orange??Colors?.orange,
    stepIndicatorUnFinishedColor     : brandTheme?.bgBlue06??Colors?.bgBlue06,
    stepIndicatorCurrentColor        : brandTheme?.orange??Colors?.orange,
    stepIndicatorLabelFontSize       : 0,
    currentStepIndicatorLabelFontSize: 9,
    stepIndicatorLabelCurrentColor   : brandTheme?.orange??Colors?.orange,
    stepIndicatorLabelFinishedColor  : brandTheme?.red??Colors?.red,
    stepIndicatorLabelUnFinishedColor: brandTheme?.bgBlue06??Colors?.bgBlue06,
    labelColor                       : brandTheme?.white??Colors?.white,
    labelSize                        : 13,
    currentStepLabelColor            : brandTheme?.orange??Colors?.orange
  };

  const [showModal] = useState(true);
  const handlePressNextLevel =()=>{
    navigation.navigate('BuyPoints');
  };

  return (
    <SignUpWrapper>
      <NavigatorHeader brandTheme={brandThemeImages} avatarProfile={() => console.log('')} navigation={navigation} />
      {navigation.isFocused() &&<ScrollView>
        <DivSpace height-8 />
        <View flex-1>
          <Text h14 title center>{i18n.t('levels.component.textMyUulalaLevel')}</Text>
          <DivSpace height-8 />
          <View centerH>
            <ImageBackground source={circularShadow} style={Styles.containerImage}>
              <AnimatedCircularProgress
                size={verticalScale(131)}
                width={verticalScale(17)}
                fill={80}
                rotation={0}
                tintColor={brandTheme?.bgOrange02??Colors?.bgOrange02}
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor={brandTheme?.bgBlue07??Colors?.bgBlue07}>
                {
                  (fill) => (
                    <View centerH>
                      <Text white h11 bgOrange02>
                        {i18n.t('levels.component.textLevel')}
                      </Text>
                      <Text white style={Styles.showNumberLevel}>
                        {showStep}
                      </Text>
                    </View>
                  )
                }
              </AnimatedCircularProgress>
            </ImageBackground>
          </View>
          <DivSpace height-20 />
          <View row>
            <View flex-1 centerV paddingL-20>
              <Text h10 title>{i18n.t('levels.component.textLevel')}</Text>
              <DivSpace height-3 />
              <View centerH centerV style={Styles.textShowStep}>
                <Text h10 white bold >{showStep}</Text>
              </View>
            </View>
            <View flex-1 centerH centerV>
              <Text h10 title>{i18n.t('levels.component.textMyPoints')}</Text>
              <DivSpace height-3 />
              <Text h18 white>{showPoint}</Text>
            </View>
            <View flex-1 right centerV paddingR-20>
              <Text h10 title>{i18n.t('levels.component.textLevel')}</Text>
              <DivSpace height-3 />
              <View centerH centerV  style={Styles.showNextStep}>
                <Text h10 white bold>{showNextStep}</Text>
              </View>
            </View>
          </View>
          <DivSpace height-20 />
          <View row>
            <View style={Styles.viewLineL}/>
            <View flex-1 >
              <StepIndicator
                customStyles={customStyles}
                currentPosition={showPoint}
                labels={labels}
              />
            </View>
            <View style={Styles.viewLineR}/>
          </View>
          <DivSpace height-25 />
          <View  centerH>
            <ButtonRounded size='lg'>
              <Text h10 semibold>
                {i18n.t('levels.component.buttonSeeCredits')}
              </Text>
            </ButtonRounded>
          </View>
          <DivSpace height-20 />
          <View marginH-20>
            { shoWarning &&(
              <View>
                <TouchableOpacity  style={{backgroundColor: brandTheme?.textBlueDark??Colors?.textBlueDark, borderRadius: 10, width: '100%', height: verticalScale(90),borderBottomWidth: 2,borderBottomColor: brandTheme?.orange??Colors?.orange}}>
                  <View flex-1 centerV row marginH-10>
                    <View style={{ flex: 0.2 }}><ImageComponent source={completeProf} width={scale(48)} height={verticalScale(48)} /></View>
                    <DivSpace width-15 />
                    <View flex-1 column>
                      <View row centerV>
                        <IconWarning width={scale(16)} height={verticalScale(16)}  fill={brandTheme?.bgOrange01??Colors?.bgOrange01}  fillSecondary={brandTheme?.bgBlue01??Colors?.bgBlue01}/>
                        <Text h10  medium orange>{' '}{' '}Importante</Text>
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
            )}
            { showPrize &&(
              <View>
                <TouchableOpacity  style={{backgroundColor: brandTheme?.textBlueDark??Colors?.textBlueDark, borderRadius: 10, width: '100%', height: verticalScale(90),borderBottomWidth: 2,borderBottomColor: brandTheme?.green??Colors?.green}}>
                  <View flex-1 centerV row marginH-10>
                    <View style={{ flex: 0.2 }}><IconTransfer width={scale(48)} height={verticalScale(48)}  fill={brandTheme?.orange??Colors?.orange} fillSecondary={brandTheme?.white??Colors?.white}/></View>
                    <DivSpace width-5 />
                    <View flex-1 column>
                      <Text h12 textGray> {i18n.t('levels.component.textCongratulationsWon')} <Text h12 white semibold> $300.00 {'\n'}</Text> {i18n.t('levels.component.textToLevelUp')} <Text h12 white semibold>{i18n.t('levels.component.textClaimThem')}</Text></Text>
                      <DivSpace height-5 />
                      <Text white textGray h10>{i18n.t('levels.component.textValidity')}: 12/02/2020</Text>
                    </View>
                    <View>
                      <ImageComponent white source={rowRight} width={scale(7)} height={verticalScale(13)}  />
                    </View>
                  </View>
                </TouchableOpacity>
                <DivSpace height-20/>   
              </View>
            )}
            <View centerH>
              <MenuContainer boxStyles={{ marginHorizontal: 10 }}>
                <View flex-1 row marginV-15 centerH centerV >
                  <ButtonWallet  buttonStyle={{ backgroundColor: brandTheme?.textBlueDark??Colors.textBlueDark }} srcImage={logoUulalaSm} onPress={() => navigation.navigate('LevelsInfo')}  buttonStyle={{ left: 12 }} titleText={i18n.t('levels.component.textInformation') +'\n'+ i18n.t('levels.component.textTheInformation')}/>
                  <ButtonWallet  buttonStyle={{ backgroundColor: brandTheme?.textBlueDark??Colors.textBlueDark }} srcImage={levelUp}  onPress={handlePressNextLevel} buttonStyle={{ right: 12 }} titleText={i18n.t('levels.component.textLevel') +'\n'+ i18n.t('levels.component.textUp')}/>
                </View>
              </MenuContainer>
            </View>
          </View>
        </View>
        <ModalDisabled isOpen={showModal} navigation={navigation}/>
      </ScrollView>}
    </SignUpWrapper>
  );
};
 
export default withNavigationFocus(Levels);
