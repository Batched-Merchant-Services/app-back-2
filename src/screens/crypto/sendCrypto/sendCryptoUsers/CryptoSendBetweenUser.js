import React, { useState,Fragment } from 'react';
import i18n from '@utils/i18n';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { NavigationEvents } from 'react-navigation';
import { useValidatedInput } from '@hooks/validation-hooks';
import {
  Text,
  View,
  Loader,
  DivSpace,
  SnackBar,
  ImageComponent,
  NavigationBar,
  ButtonRounded,
  ButtonWallet,
  AnimateLabelInput
} from '@components';
import LocalStorage from '@utils/localStorage';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import IconReceiveCrypto from '@utils/iconSVG/IconReceiveCrypto';
import rowRight from '@assets/imagesOnboard/rowRight.png';
import iconUulala from '@assets/icons/logoUulalaSm.png';
import { getUserInfoCrypto } from '@utils/api/switch';
import Colors from '@styles/Colors';

const CryptoSendBetweenUser = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const codeQR = navigation.getParam('data');
  const [amountConvert, setAmountConvert] = useState('');
  const [showNameCrypto] = useState(userData ? userData.nameCrypto : '');
  const [showInputQRCode, setShowInputQRCode] = useState(codeQR ? true : false);
  const [shortNameCrypto] = useState(userData ? userData.typeCrypto : '');
  const [currencyUser] = useState(userData ? userData.currencyUser : '');
  const [iconCrypto] = useState(userData ? userData.iconCrypto : '');
  const [balanceCrypto] = useState(userData ? userData.balanceCrypto : '');
  const [showCurrency, setShowCurrency] = useState('');
  //snack notifications
  const [title, setTitle] = useState('');
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
 
  //validate Input
  const idUser = useValidatedInput('user', codeQR);
  const transferReference = useValidatedInput('transferReference', '');
  const equivalentAmount = useValidatedInput('equivalentAmount', '');
  const address = useValidatedInput('address', codeQR);
  const userToTransfer = useValidatedInput('userToTransfer', '', {
    changeHandlerSelect: 'onSelect'
  });

  async function getInfoUser() { 
    setIsLoadingModal(true);
    const id =codeQR? codeQR: idUser.value;
    const token = await LocalStorage.get('auth_token');
    const response = await getUserInfoCrypto(token,id);
    if (response.code < 400) {
      setTimeout(function () {
        navigation.navigate('CryptoTransferUsers',{info: response.data});
        setIsLoadingModal(false);
      }, 1000);
      
    }else{
      closeSnackNotice(response);
    }
  }
  function getAddress() {
    setShowInputQRCode(codeQR ? true : false);

  }
  function handleScanQRAddress() {
    navigation.navigate('ScanQRAddress');
  }


  // function handlePay() {
  //   const addressCrypto = codeQR ? codeQR : idUser;
  //   navigation.navigate('ConfirmationPinUser', {
      
  //     data: { page: 'sendOrTransferCrypto', showNameCrypto, amountConvert, addressCrypto },
  //     next: 'ConfirmationCrypto'
  //   });
  // }

  const handleCloseNotif = () => {
    setSnakVisible(false);
    setActionAnimated(true);
  };


  function closeSnackNotice(response) {
    setIsLoadingModal(true);
    setTimeout(function () {
      setSnakVisible(true);
      setIsLoadingModal(false);
      setTitle(response.message);
    }, 1000);
  }

  const onFill = (code) => {
    setAmountConvert(code);
  };
  const onCurrency = (code) => {
    setShowCurrency(code);
  };

  return (
    <SignUpWrapper  forceInset={{top: 'always'}}>
      <NavigationBar
        onBack={() => navigation.goBack()}
        body={i18n.t('CryptoBalance.component.CryptoSendBetweenUser.titleCryptocurrencyShipping')}
        onClose={null}
      />
      <DivSpace height-20 />
      <ScrollView >
        <SafeAreaView>
          <View marginH-20>
            <View flex-1 height-130 paddingH-15 centerH centerV textBlue01 style={{ borderRadius: 10 }}>
              <View row centerH centerV>
                <ImageComponent source={{ uri: iconCrypto }} width={45} height={45} />
                <ImageComponent white source={rowRight} width={10} height={10} />
                <DivSpace width-5 />
                <ImageComponent source={iconUulala} width={25} height={25} />
              </View>
              
              <DivSpace height-10 />
              <Text white h13 center>{i18n.t('CryptoBalance.component.sendCrypto.textSend') + ' ' + showNameCrypto}{' '}{i18n.t('CryptoBalance.component.CryptoSendBetweenUser.textToUserUulala')}</Text>
            </View>
            <DivSpace height-15 />
            <View padding-10 textBlue01 style={{ borderRadius: 10 }}>
              <DivSpace height-15 />
              <Text center white h11>{i18n.t('CryptoBalance.component.CryptoSendBetweenUser.textSearchUserUulala')}</Text>
              <DivSpace height-15 />
              {showInputQRCode&&(
                <Fragment>
                  <View flex-1 padding-10>
                    <Text h17 white>{codeQR}</Text>
                  </View>
                  <DivSpace height-10 />
                </Fragment>
              )}
              {!showInputQRCode&&(
                <View flex-1>
                  <AnimateLabelInput
                    {...idUser}
                    label={i18n.t('CryptoBalance.component.CryptoSendBetweenUser.inputUulalaUserID')}
                    keyboardType={'default'}
                    autoCapitalize={'none'}
                    onEndEditing={getInfoUser}
                  />
                </View>
              )}
              {showInputQRCode&&(
                <View row centerH>
                  <ButtonRounded
                    onPress={getInfoUser}
                    size='sm'
                    
                  >
                    <Text h10 semibold>
                      {i18n.t('CryptoBalance.component.CryptoSendBetweenUser.buttonSend')}
                    </Text>
                  </ButtonRounded>
                  <DivSpace width-7 />
                  <ButtonRounded
                    onPress={handleScanQRAddress}
                    size='sm'
                    blue
                  >
                    <Text h10 semibold>
                      {i18n.t('CryptoBalance.component.CryptoSendBetweenUser.buttonScanQR')}
                    </Text>
                  </ButtonRounded>
                </View>
              )}
              
              <DivSpace height-15 />
              <View centerH centerV>
                <Text center white h11>{i18n.t('CryptoBalance.component.CryptoSendBetweenUser.textIfYouDoNotHave')}</Text>
                <DivSpace height-18 />
                {!showInputQRCode&&(
                  <Fragment>
                    <ButtonRounded
                      onPress={handleScanQRAddress}
                      size='sm'
                      blue
                    >
                      <Text h10 semibold>
                        {i18n.t('CryptoBalance.component.CryptoSendBetweenUser.buttonScanQR')}
                      </Text>
                    </ButtonRounded>
                    <DivSpace height-18 />
                  </Fragment>
                )}
                <Text h9 white center>{i18n.t('CryptoBalance.component.CryptoSendBetweenUser.textYourContactWillFindTheir')}</Text>
                <DivSpace height-15 />
                <View width-70 height-68 style={{borderColor: brandTheme?.orange??Colors.orange,borderWidth:2}}>
                  <ButtonWallet  navigation={navigation} delay={100} IconButton={IconReceiveCrypto} titleText={i18n.t('CryptoBalance.component.ButtonReceive')}/> 
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
      <SnackBar
        message={title}
        isVisible={snakVisible}
        onClose={handleCloseNotif}
        animationAction={actionAnimated}
      />
      {isLoadingModal &&(
        <Loader 
          isOpen={true}
          navigation={navigation} />)}
      <NavigationEvents
        onWillFocus={payload => {
          getAddress(payload);
        }}
      />
    </SignUpWrapper>
  );
};

export default CryptoSendBetweenUser;
