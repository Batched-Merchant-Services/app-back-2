import React,{ useState,useEffect } from 'react';
import { TouchableOpacity,Animated } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import close from '@assets/icons/close.png';
import { useSelector } from 'react-redux';
import { 
  View,
  Text,
  DivSpace,
  ImageComponent,
  ButtonRounded,
  ModalContainer,
} from '@components';

import IconWallet from '@utils/iconSVG/IconWallet';
import IconTransfer from '@utils/iconSVG/IconTransfer';
import IconBitcoin from '@utils/iconSVG/IconBitcoin';

import Colors from '@styles/Colors';

import i18n from '@utils/i18n';
import Styles from './styles';

const ModalBalances = ({ isOpen, onClose = () => null, navigation }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  let Open = isOpen ? true: false;
  const [showOpen ] = useState(true);
  const [scaleValue, setScaleValue] = useState(new Animated.Value(0));
 

  useEffect(() => {
    animationLogo();
  }, []);

 
  const goBack = async () => {
    navigation.navigate('MyWallet');
    onClose();
  };
  const animationLogo = async () => {
    Animated.timing(scaleValue, {
      toValue        : 1,
      delay          : 10,
      useNativeDriver: true
    }).start();
    setTimeout(() => setScaleValue(new Animated.Value(0)),500);
  };

  return (
    <ModalContainer showModal={!showOpen? showOpen : Open}>
      <View textBlue01 style={[Styles.containerModalIns]}>
        <View style={Styles.containerClose} >
          <TouchableOpacity onPress={onClose} style={[Styles.buttonClose,{backgroundColor: brandTheme?.bgBlue01??Colors.bgBlue01}]} >
            <ImageComponent white source={close} width={scale(10)} height={verticalScale(10)} />
          </TouchableOpacity>
        </View>
        <Text h10 bgGray center>{i18n.t('homeWallet.component.modalInstruction.title')}</Text>
        <DivSpace height-10 />
        <View flex-1 marginH-30>
          <IconWallet width={scale(32)} height={verticalScale(28)}  fill={brandTheme?.orange??Colors?.orange} fillSecondary={brandTheme?.white??Colors?.white}/>
          <DivSpace height-5 />
          <Text h14 orange>{i18n.t('homeWallet.component.modalInstruction.textUulalaWallet')}</Text>
          <DivSpace height-5 />
          <Text h11 white>{i18n.t('homeWallet.component.modalInstruction.textUseItInPayments')}</Text>
          <DivSpace height-15 />
          <IconTransfer width={scale(38)} height={verticalScale(28)}  fill={brandTheme?.orange??Colors?.orange} fillSecondary={brandTheme?.white??Colors?.white}/>
          <DivSpace height-5 />
          <Text h14 orange>{i18n.t('homeWallet.component.modalInstruction.textUulalaPhysicalCard')}</Text>
          <DivSpace height-5 />
          <Text h11 white>{i18n.t('homeWallet.component.modalInstruction.textUseItInEstablishments')}</Text>
          <DivSpace height-10 />
          <Text h11 white>{i18n.t('homeWallet.component.modalInstruction.textYouCanRequestAnd')}</Text>
          <DivSpace height-15 />
          <IconBitcoin width={scale(38)} height={verticalScale(28)}  fill={brandTheme?.orange??Colors?.orange} fillSecondary={brandTheme?.white??Colors?.white}/>
          <DivSpace height-5 />
          <Text h14 orange>{i18n.t('homeWallet.component.modalInstruction.textCryptocurrencies')}</Text>
          <DivSpace height-5 />
          <Text h11 white>{i18n.t('homeWallet.component.modalInstruction.textTakeAdvantageOfMarket')}</Text>
          <DivSpace height-10 />
          <Text h11 white>{i18n.t('homeWallet.component.modalInstruction.textCryptocurrenciesAreVirtualCurrencies')}</Text>
          <DivSpace height-20 />
          <View flex-1 bottom marginH-30 centerH>
            <ButtonRounded
              style={Styles.manualCreditButton}
              onPress={goBack}
            >
              <Text h10 semibold>
                {i18n.t('homeWallet.component.modalInstruction.buttonReturn')}
              </Text>
            </ButtonRounded>
            <DivSpace height-15 />
          </View>
        </View>
        
      </View>
      <DivSpace height-130 />
    </ModalContainer>
  );
};

export default ModalBalances;
