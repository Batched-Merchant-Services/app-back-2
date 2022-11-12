import React, { useState, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { TouchableOpacity, Animated } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { getCatalogAccounts, getTypeTransfer } from '@utils/api/switch';
import { Bubbles } from 'react-native-loader';
import close from '@assets/icons/close.png';
import cardWallet from '@assets/brand/cardWallet.png';
import LocalStorage from '@utils/localStorage';
import Modal2faConfirmation from '@screens/auth2fa/Modal2faConfirmation';
import {
  View,
  Text,
  DivSpace,
  ImageComponent,
  ButtonRounded,
  ModalContainer,
  BoxGradient,
  AnimateLabelAmount,
  Select
} from '@components';

import i18n from '@utils/i18n';
import Styles from './styles';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';

const ModalBalances = ({ isOpen, onClose = () => null, navigation }) => {

  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const brandThemeImages = appData?.Theme?.images;
  let Open = isOpen ? true : false;
  const [showOpen] = useState(true);
  const [balanceO, setBalanceO] = useState([]);
  const [balanceD, setBalanceD] = useState([]);
  const [showSelectD, setShowSelectD] = useState(false);
  const [showSelectO, setShowSelectO] = useState(false);
  const [showBubbles, setshowBubbles] = useState(false);
  const [showModal2fa, setShowModal2fa] = useState(false);
  const [scaleValue, setScaleValue] = useState(new Animated.Value(0));
  const amount = useValidatedInput('amount', '');
  const Origin = useValidatedInput('dropdownOrigin', { name: i18n.t('generics.selectOne') }, {
    changeHandlerSelect: 'onSelect'
  });

  const Destiny = useValidatedInput('dropdownDestiny', { name: i18n.t('generics.selectOne') }, {
    changeHandlerSelect: 'onSelect'
  });

  useEffect(() => {
    animationLogo();
    getCatalogs();
  }, []);


  async function getCatalogs() {
    const token = await LocalStorage.get('auth_token');
    const response = await getCatalogAccounts(token);
    if (response.code < 400) {
      setBalanceO(response.data);
      setShowSelectO(true);
    } else {
      setBalanceO([]);
      setShowSelectO(false);
    }
  };

  const isValid = isFormValid(amount, Origin, Destiny);

  const goTransfer = async () => {
    var foobar = [3, 2, 1];
    if (!foobar.includes(appData?.type2fa)) {      
      setShowModal2fa(true);
    } else {
      navigation.navigate('Pin2faConfirmation', {
        data: {
          page: 'transferBalance',
          amount: amount.value,
          origin: Origin.value.value,
          destiny: Destiny.value.value,
          originName: Origin.value.name,
          destinyName: Destiny.value.name,
          typeTrans: Origin.value.typeTransfer
        },
        next: 'TransBalanceConfirm'
      });
      onClose();
    };
  }

  const animationLogo = async () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      delay: 10,
      useNativeDriver: true
    }).start();
    setTimeout(() => setScaleValue(new Animated.Value(1)), 500);
  };

  async function onFill(code) {
    setShowSelectD(false);
    setshowBubbles(true);
    const token = await LocalStorage.get('auth_token');
    const response = await getTypeTransfer(token, code.typeTransfer);
    if (response.code < 400) {
      setShowSelectD(true);
      setshowBubbles(false);
      setBalanceD(response.data);
    } else {
      setBalanceD([]);
      setshowBubbles(false);
      setShowSelectD(false);
    }
  }

  const translateX = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.65, 1]
  });

  const handleClose = () => {
    setShowModal2fa(!showModal2fa);
    onClose();
  };

  return (
    <ModalContainer showModal={!showOpen ? showOpen : Open}>
      <View style={[Styles.containerModal, { backgroundColor: brandTheme.textBlue01 ?? Colors?.textBlue01 }]}>
        <View style={Styles.containerClose} >
          <TouchableOpacity onPress={onClose} style={[Styles.buttonClose, { backgroundColor: brandTheme.bgBlue02 ?? Colors?.bgBlue02 }]} >
            <ImageComponent white source={close} width={scale(10)} height={verticalScale(10)} />
          </TouchableOpacity>
        </View>
        <Text h10 bgGray center>{i18n.t('homeWallet.component.Balances.titleMyWallet')}</Text>
        <DivSpace height-15 />
        <View centerH centerV>
          <Animated.View style={[{ opacity: scaleValue, alignItems: 'center', justifyContent: 'center', transform: [{ scale: translateX }] }]}>
            <BoxGradient size={82}>
              <ImageComponent
                source={brandThemeImages?.cardWallet ? brandThemeImages?.cardWallet : cardWallet}
                width={scale(66)}
                height={verticalScale(60)}
              />
            </BoxGradient>
          </Animated.View>
        </View>
        <DivSpace height-10 />
        <View marginH-20 >
          <Text h11 bgGray center >{i18n.t('homeWallet.component.Balances.titleMyBalances')}</Text>
          <DivSpace height-15 />

          {showSelectO
            ? <Animatable.View animation={'fadeIn'} >
              <Select
                {...Origin}
                onFill={(code) => onFill(code)}
                label={i18n.t('homeWallet.component.Balances.selectTransferOrigin')}
                options={balanceO}
                size="sm"
              />
            </Animatable.View>
            : <View height-30 centerH centerV >
              <Bubbles size={12} color={brandTheme.bgOrange02 ?? Colors?.bgOrange02} />
            </View>
          }
          <DivSpace height-10 />
          {showSelectD
            ? <Animatable.View animation={'fadeIn'} >
              <Select
                {...Destiny}
                label={i18n.t('homeWallet.component.Balances.selectTransferDestination')}
                options={balanceD}
                size="sm"
              />
            </Animatable.View>
            : showBubbles
              ? <View height-30 centerH centerV >
                <Bubbles size={12} color={brandTheme.bgOrange02 ?? Colors?.bgOrange02} />
              </View>
              : null
          }
          <View centerV marginH-40>
            <AnimateLabelAmount
              {...amount}
              label={i18n.t('homeWallet.component.Balances.inputBalanceToTransfer')}
              keyboardType={'numeric'}
              autoCapitalize={'none'}
            />
            <DivSpace height-30 />
            <View centerH>
              <ButtonRounded
                style={Styles.manualCreditButton}
                onPress={goTransfer}
                disabled={!isValid}
              >
                <Text h10 semibold>
                  {i18n.t('homeWallet.component.Balances.buttonTransfer')}
                </Text>
              </ButtonRounded>
            </View>
          </View>
          <DivSpace height-20 />
          <Text h9 bgGray center>{i18n.t('homeWallet.component.Balances.textTheTransferOfBalances')}</Text>
        </View>
      </View>
      <DivSpace height-100 />
      <Modal2faConfirmation
        visible={showModal2fa}
        onRequestClose={() => { setShowModal2fa(false) }}
        onPressOverlay={handleClose}
        navigation={navigation}
      />
    </ModalContainer>
  );
};

export default ModalBalances;
