import React, { useState, useEffect } from 'react';
import i18n from '@utils/i18n';
import {
  View,
  ModalContainer,
  DivSpace,
  ImageComponent,
  ButtonRounded,
  Text,
} from '@components';
import { scale, verticalScale } from 'react-native-size-matters';
import { TouchableOpacity, Animated,Linking } from 'react-native';
import styles from './styles';
import SectionD from '@assets/icons/SectionD.png';
import IconFacebook from '@assets/icons/IconFacebook.png';
import IconLinkedin from '@assets/icons/Iconlinkedin.png';
import IconYoutube from '@assets/icons/Iconyoutube.png';
import IconTwitter from '@assets/icons/Icontwitter.png';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';

const ModalDisabled = ({  isOpen,  navigation, onClose = () => null, }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  const [showOpen,setShowOpen ] = useState(true);
  let Open = isOpen ? true: false;
  const [scaleValue, setScaleValue] = useState(new Animated.Value(0));

  useEffect(() => {
    animationLogo();
  }, []);

  const handleFacebook = async () => {Linking.openURL('https://www.facebook.com/savvywallet.io');};
  const handleLinkedin = async () => {Linking.openURL('https://www.linkedin.com/company/savvywallet');};
  const handleYoutube = async () => {Linking.openURL('https://www.youtube.com/channel/UC9WuAHYpvHiQhIotn6AivvA');};

  const handlePressBack = async () => {
    setShowOpen(false);
    onClose();
    navigation.navigate('MyWallet');
  };

  const animationLogo = async () => {
    Animated.timing(scaleValue, {
      toValue        : 1,
      delay          : 10,
      useNativeDriver: true,
    }).start();
    setTimeout(() => setScaleValue(new Animated.Value(0)), 500);
  };

  // const translateX = scaleValue.interpolate({
  //   inputRange : [0, 1],
  //   outputRange: [0.65, 1],
  // });

  return (
    <ModalContainer showModal={!showOpen? showOpen : Open}>
      <View centerH style={styles.containerModal}>
        <DivSpace height-30 />
        <Text h14 textBlue01 center>
          {i18n.t('ModalDisabled.component.title')}
        </Text>
        <DivSpace height-15 />
        <View centerH centerV>
          <ImageComponent
            source={SectionD}
            width={scale(240)}
            height={verticalScale(118)}
          />
        </View>
        <DivSpace height-15 />
        <View paddingH-20>
          <Text h11 style={styles.textBgblue} center>
            {i18n.t('ModalDisabled.component.textWeAreWorking')}{' '}
            <Text semibold style={styles.textBgblue}>{i18n.t('ModalDisabled.component.textNewFeatures')}{' '}</Text>
            {i18n.t('ModalDisabled.component.textForYourUulala')}{' '}
            <Text semibold style={styles.textBgblue}>{i18n.t('ModalDisabled.component.textWillBeAvailable')}</Text>
          </Text>
          <DivSpace height-28 />
          <Text h11 style={styles.textBgblue} center>
            {i18n.t('ModalDisabled.component.textIfYouWantMore')}
          </Text>
        </View>
        <DivSpace height-40 />
        <View row>
          <TouchableOpacity onPress={handleFacebook}>
            <ImageComponent
              bgBlue06
              source={IconFacebook}
              width={scale(30)}
              height={scale(30)}
            />
          </TouchableOpacity>
          <DivSpace width-38 />
          <TouchableOpacity onPress={handleLinkedin}>
            <ImageComponent
              bgBlue06
              source={IconLinkedin}
              width={scale(30)}
              height={scale(30)}
            />
          </TouchableOpacity>
          <DivSpace width-38 />
          <TouchableOpacity onPress={handleYoutube}>
            <ImageComponent
              bgBlue06
              source={IconYoutube}
              width={scale(35)}
              height={scale(35)}
            />
          </TouchableOpacity>
        </View>
        <View flex-1 centerH bottom style={{ marginTop: verticalScale(40) }}>
          <ButtonRounded
            onPress={handlePressBack}
          >
            <Text h10 semibold>
              {i18n.t('ModalDisabled.component.buttonReturn')}
            </Text>
          </ButtonRounded>
          <DivSpace height-30 />
        </View>
      </View>
    </ModalContainer>
  );
};

export default ModalDisabled;
