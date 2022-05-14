import React,{useState,Fragment,useEffect} from 'react';
import i18n from '@utils/i18n';
import { ScrollView,KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { NavigationEvents } from 'react-navigation';
import { useValidatedInput,isFormValid } from '@hooks/validation-hooks';
import { addNewAddress,conversionCurrency } from '@utils/api/switch';
import {
  Text,
  View,
  Loader,
  DivSpace,
  ContainerCrypto,
  SnackBar,
  ImageComponent,
  NavigationBar,
  ButtonRounded,
  AnimateLabelInput,
} from '@components';

import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import LocalStorage from '@utils/localStorage';
import { useSelector} from 'react-redux';

const AddNewAddressCrypto = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const codeQR = navigation.getParam('data');
  const [showInputQRCode,setShowInputQRCode]=useState(codeQR?true:false);
  const [balanceConvert,setBalanceConvert]=useState('');
  const [shortNameCrypto]=useState(userData?userData.typeCrypto:'');
  const [iconCrypto]=useState(userData?userData.iconCrypto:'');
  const [balanceCrypto]=useState(userData?userData.balanceCrypto:'');
  //messages
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [snakVisible, setSnakVisible] = useState(false);
  const [buttonNext, setButtonNext] = useState(false);
  const [title, setTitle] = useState('');
  const [actionAnimated, setActionAnimated] = useState(false);
  //validate Input
  const nameContact = useValidatedInput('name', '');
  const emailTransfer = useValidatedInput('email', '');
  const address = useValidatedInput('address', codeQR);

  const isValid = isFormValid(nameContact,emailTransfer,address);

  useEffect(() => {
    getBalanceConvert();
  },[]);

  
  async function getBalanceConvert() {
    const token = await LocalStorage.get('auth_token');
    const responseBTC = await conversionCurrency(token,'USD',shortNameCrypto,balanceCrypto);
    if (responseBTC.code < 400) {
      setBalanceConvert(responseBTC.data?.conversion?.toString());
    }
  }


  function getAddress() {
    setShowInputQRCode(codeQR?true:false);
  }

  function changeInputQR() {
    setShowInputQRCode(false);
  }

  
  async function handlePay() {
    setIsLoadingModal(true);
    const name = nameContact.value;
    const email= emailTransfer.value;
    const addressValue = address.value;
    const token = await LocalStorage.get('auth_token');
    const response = await addNewAddress(token,shortNameCrypto,addressValue?addressValue:codeQR,name,email);
    if (response.code < 400) {
      setTimeout(function () {
        setSnakVisible(false);
        setIsLoadingModal(false);
        navigation.navigate('SendCrypto');
      }, 1000);
    }else{
      setIsLoadingModal(true);
      setTimeout(function(){
        setIsLoadingModal(false);
        setSnakVisible(true);
        setButtonNext(true);
        setTitle(response.message);
      }, 1000);
    }
  }

  function handleScanQRAddress() {
    navigation.navigate('ScanQRAddress',{page: 'addAddress'});
  }

  const handleCloseNotif = () => {
    setSnakVisible(false);
    setButtonNext(false);
    setActionAnimated(true);
  };


  return (
    <SignUpWrapper forceInset={{top: 'always'}}>
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : ""}
        style={{ flex: 1 }}
      >
      <NavigationBar
        onBack={() => navigation.goBack()}
        body={i18n.t('CryptoBalance.component.sendCrypto.title')}
        onClose={null}
      />
      <DivSpace height-20 />
      <ScrollView >
        <SafeAreaView >
          <View marginH-20>
            <View flex-1 height-130 paddingH-15 centerH textBlue01 centerV style={{ borderRadius: 10}}>
              <ImageComponent source={{uri: iconCrypto}} width={35} height={35} />
              <DivSpace height-10 />
              <Text white h13 center>{i18n.t('CryptoBalance.component.AddNewAddressCrypto.textAddAddressesValid')}</Text>
            </View>
            <DivSpace height-15 />
            <ContainerCrypto >
              <View centerH centerV padding-10>
                <Text h11 orange>{i18n.t('CryptoBalance.component.titleMyBalance')}:</Text>
                <View flex-1 row centerH centerV >
                  <View flex-1>
                    <Text h13 white center>{balanceCrypto}{' '}<Text textGray>{shortNameCrypto}</Text>{' '}</Text>
                  </View>
                  <View width-21 height-2 white ></View>
                  <View flex-1>
                    <Text h13 white center>{' '}{balanceConvert}{' '}<Text textGray>USD</Text></Text>
                  </View>
                  
                </View>
              </View>
            </ContainerCrypto>
            <DivSpace height-15 />
            <View paddingT-10 paddingH-11 textBlue01 style={{ borderRadius: 10}}>
              <DivSpace height-10 />
              <Text center white h11>{i18n.t('CryptoBalance.component.sendCrypto.textShippingInformation')}</Text>
              <DivSpace height-15 />
              <Fragment>
                {showInputQRCode&&(
                  <Fragment>
                    <View flex-1 padding-10>
                      <Text h18 white>{codeQR}</Text>
                    </View>
                    <DivSpace height-10 />
                  </Fragment>
                )}
                
                {!showInputQRCode&&(
                  <View flex-1>
                    <AnimateLabelInput
                      {...address}
                      label={i18n.t('CryptoBalance.component.sendCrypto.inputAddressOfTheWallet')}
                      keyboardType={'default'}
                      autoCapitalize={'none'}
                      multiline
                    />
                  </View>
                )}
                
                {showInputQRCode&&(
                  <View row centerH>
                    <ButtonRounded
                      onPress={handleScanQRAddress}
                      size='sml'
                      blue
                    >
                      <Text h10 semibold>
                        {i18n.t('CryptoBalance.component.sendCrypto.buttonRescan')}
                      </Text>
                    </ButtonRounded>
                    <DivSpace width-10 />
                    <ButtonRounded
                      onPress={changeInputQR}
                      size='sml'
                      blue
                    >
                      <Text h10 semibold>
                        {i18n.t('CryptoBalance.component.sendCrypto.buttonAddAddress')}
                      </Text>
                    </ButtonRounded>
                  </View>
                )}
                {!showInputQRCode&&(
                  <View flex-1 centerH>
                    <ButtonRounded
                      onPress={handleScanQRAddress}
                      size='sm'
                      blue
                    >
                      <Text h10 semibold>
                        {i18n.t('CryptoBalance.component.sendCrypto.buttonScanQR')}
                      </Text>
                    </ButtonRounded>
                  </View>
                )}
              </Fragment>
              <DivSpace height-15 />
              <Text h11 white center>{i18n.t('CryptoBalance.component.AddNewAddressCrypto.textRememberThatTheAddress')}</Text>
              <DivSpace height-15/>
              <AnimateLabelInput
                {...nameContact}
                label={i18n.t('CryptoBalance.component.AddNewAddressCrypto.inputContactName')}
                keyboardType={'default'}
                autoCapitalize={'none'}
              />
              <DivSpace height-10/>
              <AnimateLabelInput
                {...emailTransfer}
                label={i18n.t('CryptoBalance.component.AddNewAddressCrypto.inputTransferNotificationEmail')}
                keyboardType={'default'}
                autoCapitalize={'none'}
              />
              <DivSpace height-10 />
              <View flex-1 centerH>
                <ButtonRounded
                  onPress={handlePay}
                  disabled={!isValid && !buttonNext ? true: buttonNext}
                  size='sm'
                >
                  <Text h10 semibold>
                    {i18n.t('CryptoBalance.component.AddNewAddressCrypto.buttonValidateAddress')}
                  </Text>
                </ButtonRounded>
              </View>
              <DivSpace height-15/>
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
          getBalanceConvert(payload);
        }}
      />
      </KeyboardAvoidingView>
    </SignUpWrapper>
  );
};

export default AddNewAddressCrypto;
