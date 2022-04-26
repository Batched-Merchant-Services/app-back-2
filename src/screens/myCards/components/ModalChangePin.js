import React, { useState, useEffect } from 'react';
import i18n from '@utils/i18n';
import {
  View,
  ModalContainer,
  DivSpace,
  ImageComponent,
  ButtonRounded,
  BoxGradient,
  Text
} from '@components';
import { scale, verticalScale } from 'react-native-size-matters';
import { Animated } from 'react-native';
import { useSelector} from 'react-redux';
import passwordImage from '@assets/brand/password.png';
import Styles from '../styles';


const ModalChangePin = ({  isOpen,  navigation, onClose = () => null, }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandThemeImages = appData?.Theme?.images;

  let Open = isOpen ? true: false;
  const [showOpen,setShowOpen ] = useState(true);

  const [scaleValue, setScaleValue] = useState(new Animated.Value(0));

  useEffect(() => {
    animationLogo();
  }, []);
  
  const handlePressBack = async () => {
    setShowOpen(false);
    onClose();
    navigation.goBack();
  };

  const animationLogo = async () => {
    Animated.timing(scaleValue, {
      toValue        : 1,
      delay          : 10,
      useNativeDriver: true,
    }).start();
    setTimeout(() => setScaleValue(new Animated.Value(0)), 500);
  };


  return (
    <ModalContainer showModal={!showOpen? showOpen : Open}>
     <DivSpace height-10 />
      <View textBlue01 style={Styles.containerModal}>
        <DivSpace height-30 />
        <View flex-1 marginH-30  centerH >
          <Text h15 white bold>{i18n.t('myCards.component.modalChangePin.title')}</Text>
          <DivSpace height-20 />
          <BoxGradient size={verticalScale(85)}>
          <ImageComponent
            source={brandThemeImages?.password?brandThemeImages?.password:passwordImage}
            height={verticalScale(70)}
            width={verticalScale(70)}
            style={{
              height  : verticalScale(70),
              width   : verticalScale(70),
              position: 'absolute',
              top     : -scale(5),
              zIndex  : 2
            }}
          />
        </BoxGradient>
          <DivSpace height-20 />
          <Text h12 white center>{i18n.t('myCards.component.modalChangePin.textPleaseCall')}{' '}<Text bold white>888-988-7348{' '}</Text>{i18n.t('myCards.component.modalChangePin.textForUSOr')}{' '}<Text bold white>001- 888-988-7348{' '}</Text>{i18n.t('myCards.component.modalChangePin.textInternational')}</Text>
          <DivSpace height-20 />
          <Text h12 white center>{i18n.t('myCards.component.modalChangePin.textYouWillNeedToInput')}</Text>
          <DivSpace height-20 />
          <Text h12 white center>{i18n.t('myCards.component.modalChangePin.textChooseOptionTwo')}</Text>
          <DivSpace height-35 />
          <View flex-1  centerH centerV>
            <ButtonRounded style={{ width: scale(160), height: verticalScale(30) }} onPress={handlePressBack} >
              <Text h12 semibold>
                {i18n.t('myCards.component.modalChangePin.buttonUnderstood')}
              </Text>
            </ButtonRounded>
          </View>
          
          
        </View>
      </View>
    </ModalContainer>
  );
};
 
export default ModalChangePin;
