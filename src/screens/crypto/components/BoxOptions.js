import React from 'react';
import { View,ButtonWallet } from '@components';
import { withNavigationFocus } from 'react-navigation';
import { useSelector} from 'react-redux';
import IconBuyCrypto from '@utils/iconSVG/IconBuyCrypto';
import IconReceiveCrypto from '@utils/iconSVG/IconReceiveCrypto';
import IconSendCrypto from '@utils/iconSVG/IconSendCrypto';
import IconHistory from '@utils/iconSVG/IconHistory';
import buyCryptoDisabled from '@assets/icons/disabled/buyCrypto.png';
import receiveCryptoDisabled from '@assets/icons/disabled/receiveCrypto.png';
import Colors from '@styles/Colors';
import Styles from './styles';
import i18n from '@utils/i18n';

const BoxOptions = ({ navigation, dataPhysical,buy }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;

  function generateAddress() {
    navigation.navigate('WalletRecharge');
  }

  function handleHistoryc() {
    navigation.navigate('HistoricCrypto');
  }
  
  function handleBuy() {
    navigation.navigate('buyCrypto');
  }

  function handleSale() {
    navigation.navigate('CryptoSale');
  }

  function handleSend() {
    navigation.navigate('SendOrTransferOptions');
  }

  function handleReceived() {
    navigation.navigate('ReceiveCrypto');
  }
  
  function handleHistoric() {
    navigation.navigate('HistoricCrypto');
  }

  //handleReceived
  return (
    navigation.isFocused() &&<View>
      
      {buy === 'buy' &&(
        <View textBlue01 style={Styles.animation} height-100>
          <View centerH centerV
            row
            flex-1
          >
            <ButtonWallet invalid navigation={navigation} buttonStyle={{ backgroundColor: brandTheme?.textBlueDark??Colors.textBlueDark }} delay={100} srcImage={receiveCryptoDisabled}  onPress={handleBuy} titleText={i18n.t('CryptoBalance.component.ButtonBuy')}/> 
            <ButtonWallet  navigation={navigation} delay={100} buttonStyle={{ backgroundColor: brandTheme?.textBlueDark??Colors.textBlueDark }} IconButton={IconReceiveCrypto}  onPress={handleReceived} titleText={i18n.t('CryptoBalance.component.ButtonReceive')}/> 
          </View>
        </View>
      )}
      {buy === 'recharge' &&(
        <View textBlue01 style={Styles.animation} height-100>
          <View centerH centerV
            row
            flex-1
          >
            <ButtonWallet navigation={navigation} delay={100} buttonStyle={{ backgroundColor: brandTheme?.textBlueDark??Colors.textBlueDark }} IconButton={IconBuyCrypto}  onPress={generateAddress} titleText={i18n.t('CryptoBalance.component.rechargeCrypto.textTransferToAddress')}/> 
            <ButtonWallet navigation={navigation} delay={100} buttonStyle={{ backgroundColor: brandTheme?.textBlueDark??Colors.textBlueDark }} IconButton={IconReceiveCrypto}  onPress={handleHistoryc} titleText={i18n.t('CryptoBalance.component.rechargeCrypto.textRegistrationOfRequests')}/> 
          </View>
        </View> 
      )}
      {buy === 'crypto' &&(
        <View textBlue01 style={[Styles.animation]} height-190>
          <View centerH centerV
            row
            flex-1
            paddingT-10
            paddingB-8
          >
            <ButtonWallet invalid navigation={navigation} delay={100} buttonStyle={{ backgroundColor:Colors.textBlueDark }} srcImage={buyCryptoDisabled}  onPress={handleBuy} titleText={i18n.t('CryptoBalance.component.ButtonBuy')}/> 
            <ButtonWallet invalid navigation={navigation} delay={100} buttonStyle={{ backgroundColor:Colors.textBlueDark }}  srcImage={receiveCryptoDisabled}  onPress={handleSale} titleText={i18n.t('CryptoBalance.component.ButtonSell')}/> 
            <ButtonWallet  navigation={navigation} delay={100} buttonStyle={{ backgroundColor:Colors.textBlueDark }} IconButton={IconSendCrypto}  onPress={handleSend} titleText={i18n.t('CryptoBalance.component.ButtonSend')}/> 
          </View>
          <View row flex-1 paddingH-30>
            <ButtonWallet  navigation={navigation} delay={100} buttonStyle={{ backgroundColor:Colors.textBlueDark }} IconButton={IconReceiveCrypto}  onPress={handleReceived} titleText={i18n.t('CryptoBalance.component.ButtonReceive')}/> 
            <ButtonWallet  navigation={navigation} delay={100} buttonStyle={{ backgroundColor:Colors.textBlueDark }} IconButton={IconHistory}  onPress={handleHistoric} titleText={i18n.t('CryptoBalance.component.ButtonMovementRecord')}/> 
          </View>
        </View>
      )}
    </View>
  );
};

export default withNavigationFocus(BoxOptions);
