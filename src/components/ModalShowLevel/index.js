import React, { useState, useEffect } from 'react';
import i18n from '@utils/i18n';
import { 
  View,  
  ModalContainer,
  DivSpace,
  BoxGradient,
  ImageComponent,
  ButtonRounded,
  ButtonNext,
  BoxLevelBadge,
  Text } from '@components';
import { scale,verticalScale } from 'react-native-size-matters';
import { TouchableOpacity, Animated } from 'react-native';
import Close from '@assets/icons/close.png';
import styles from './styles';
import levelStep from '@assets/levels/levelStep.png';
import levelStep1 from '@assets/levels/levelStep1.png';
import levelStep2 from '@assets/levels/levelStep2.png';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';

const ModalShowLevel = ({ children, isOpen, Step , navigation }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  const [ Open,setIsOpen ] = useState(isOpen);

  const [showStepModal, setShowStepModal] = useState(Step);
  const [scaleValue, setScaleValue] = useState(new Animated.Value(0));

  useEffect(() => {
    animationLogo();
  }, []);

  const handleInformationStepOne = async () => {
    setShowStepModal(1);
    animationLogo();
  };

  const handleInformationStepTwo = async () => {
    setShowStepModal(2);
    animationLogo();
  };

  const handlePressClose = async () => {
    setIsOpen(false);
  };

  const handlePress = async () => {
    setIsOpen(false);
  };

  const animationLogo = async () => {
    Animated.timing(scaleValue, {
      toValue        : 1,
      delay          : 10,
      useNativeDriver: true
    }).start();
    setTimeout(() => setScaleValue(new Animated.Value(0)),500);
  };

  const translateX = scaleValue.interpolate({
    inputRange : [0, 1],
    outputRange: [0.65, 1]
  });
  
  return (
    <ModalContainer showModal={Open}>
      <View centerH  style={[styles.containerModal,{ backgroundColor: brandTheme.textBlue01??Colors?.textBlue01 }]}>
        <DivSpace height-30 />
        <View row>
          <View
            style={[styles.stepGray,{backgroundColor: showStepModal === 0 ? brandTheme.bgOrange02??Colors?.bgOrange02 : brandTheme.textGray??Colors?.textGray}]}
          />
          <DivSpace width-5 />
          <View
            style={[styles.stepGray,{backgroundColor: showStepModal === 1 ? brandTheme.bgOrange02??Colors?.bgOrange02 : brandTheme.textGray??Colors?.textGray }]}
          />
          <DivSpace width-5 />
          <View style={[styles.stepGray,{ backgroundColor: showStepModal === 2 ? brandTheme.bgOrange02??Colors?.bgOrange02 : brandTheme.textGray??Colors?.textGray }]}
          />
        </View>
        <View centerH centerV bgBlue01 style={[styles.buttonClose]}>
          <TouchableOpacity onPress={handlePress}  style={styles.touchableButton}>
            <ImageComponent
              white
              source={Close}
              width={scale(10)}
              height={verticalScale(10)}
            />
          </TouchableOpacity>
        </View>
        <DivSpace height-25 />
        <View centerH centerV>
          <Animated.View style={[{opacity: scaleValue,alignItems:'center',justifyContent:'center',transform:[{scale: translateX}]}]}>
            <BoxGradient size={118}>
              <ImageComponent
                source={showStepModal === 0 ? levelStep : showStepModal === 1 ? levelStep1:levelStep2}
                width={scale(75)}
                height={verticalScale(80)}
              />
            </BoxGradient>
          </Animated.View>
        </View>
        <DivSpace height-20 />
        <View marginH-80>
          <Text h12 white center>
            {i18n.t('levels.component.textHowDoThe')} {'\n'}<Text semibold>{i18n.t('levels.component.textUulalaLevels')}</Text>
          </Text>
        </View>
        <DivSpace height-25 />
        <View marginH-18>
          { showStepModal === 0 &&(
            <View >
              <View marginH-28>
                <Text h10 semibold white center>
                  {i18n.t('levels.component.textTheTransactions')} <Text regular> {i18n.t('levels.component.textWithUulalaYou')} </Text>
                  <Text semibold white>{i18n.t('levels.component.textTheyWillGive')}{' '}</Text>
                  <Text regular white>{i18n.t('levels.component.textInUulala')}</Text>
                </Text>
              </View>
              <DivSpace height-15 />
              <View marginH-45>
                <Text h11 semibold white center>
                  {i18n.t('levels.component.textTheUulalaLevels')}{' '}<Text regular>{i18n.t('levels.component.textYouAreAllowed')}{' '}</Text>
                  <Text semibold white>{i18n.t('levels.component.textAccessCredits')}{' '}</Text>
                  <Text regular white>{i18n.t('levels.component.textAndSomeReal')}</Text>
                </Text>
              </View>
              <DivSpace height-20 />
              <View bottom style={{ marginTop: verticalScale(28) }} centerH>
                <ButtonNext onPress={handleInformationStepOne} />
              </View>
            </View>
          )}
          { showStepModal === 1 &&(
            <View marginH-28>
              <Text h10 regular white center>
                {i18n.t('levels.component.textThehigherYouruulal')}{' '}
                <Text semibold white>{i18n.t('levels.component.textMakeAllYourDaily')}</Text>
              </Text>
              <DivSpace height-20 />
              <View bottom style={{ marginTop: verticalScale(64) }} centerH>
                <ButtonNext onPress={handleInformationStepTwo} />
              </View>
            </View>
          )}
          { showStepModal === 2 &&(
            <View marginH-28>
              <Text h10 regular white center>
                {i18n.t('levels.component.textTheIconsWith')}{' '}<Text semibold>{i18n.t('levels.component.textUulalaLogo')}{' '}</Text>
                {i18n.t('levels.component.textIndicateTheLevel')}
              </Text>
              <DivSpace height-40 />
              <View centerH>
                <BoxLevelBadge level={3} />
              </View>
              <View centerH bottom style={{ marginTop: verticalScale(40) }}>
                <ButtonRounded   style={{width: scale(110)}} onPress={handlePressClose}>
                  <Text h10 semibold>
                    {i18n.t('levels.component.buttonStart')}
                  </Text>
                </ButtonRounded>
              </View>
            </View>
          )}
        </View>
      </View>
    </ModalContainer>
  );
};

export default ModalShowLevel;
