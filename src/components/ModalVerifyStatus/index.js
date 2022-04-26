import React, { useState, useEffect } from 'react';
import i18n from '@utils/i18n';
import {
  View,
  ModalContainer,
  DivSpace,
  ImageComponent,
  ButtonRounded,
  Text,
  Link
} from '@components';
import { scale, verticalScale } from 'react-native-size-matters';
import { Animated } from 'react-native';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';
import styles from './styles';
import completeProf from '@assets/crypto/completeProf.png';

const ModalKYCStatus = ({  isOpen,  navigation, onClose = () => null, }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;


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
      <View centerH style={[styles.containerModal,{backgroundColor: brandTheme.textBlue01??Colors?.textBlue01 }]}>
        <DivSpace height-30 />
        <Text h14 semibold textBlueDark center>
          {i18n.t('ModalKYC.component.title')}
        </Text>
        <Text h14 medium textBlueDark center>
          {i18n.t('ModalKYC.component.textNecessary')}
        </Text>
        <DivSpace height-15 />
        <View centerH centerV>
          <ImageComponent
            source={completeProf}
            width={scale(240)}
            height={verticalScale(118)}
          />
        </View> 
        <DivSpace height-15 />
        <View paddingH-20>
          <Text h11 style={styles.textBgblue} center>
            {i18n.t('ModalKYC.component.textToAccessThis')}{' '}
            <Text semibold white>{i18n.t('ModalKYC.component.textYourProfileInformation')}{' '}</Text>
            {i18n.t('ModalKYC.component.textAndHaveYourInformation')}
          </Text>
          <DivSpace height-28 />
          <Text h11 style={styles.textBgblue} center>
            {i18n.t('ModalKYC.component.textTheVerificationProcess')}
          </Text>
        </View>
        <View flex-1 centerH bottom>
          <ButtonRounded
            onPress={onClose}
          >
            <Text h10 semibold>
              {i18n.t('ModalKYC.component.ButtonMyProfile')}
            </Text>
          </ButtonRounded>
          <DivSpace height-10/>
          <Link onPress={handlePressBack}>
            <Text h10 medium title>
              {i18n.t('ModalKYC.component.linkBack')}
            </Text>
          </Link>
          <DivSpace height-50 />
        </View>
      </View>
    </ModalContainer>
  );
};
 
export default ModalKYCStatus;
