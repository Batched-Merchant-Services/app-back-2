import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView,Platform} from 'react-native';
import i18n from '@utils/i18n';
import {
  DivSpace,
  AnimateLabelInput,
  NavigationBar,
  View,
  Text,
  ButtonRounded,
  Link,
  SnackBar,
  Loader
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
import { useSelector } from 'react-redux';
import { getBankCatalog, updateUserBankInformation } from '@utils/api/switch';
import LocalStorage from '@utils/localStorage';


const BankInformation = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const userInfo = userData.infoUser;
  const idUser = userData ? userInfo.bankInformation ? userInfo.bankInformation.id : '' : '';
  const inputNBank = userInfo ? userInfo.bankInformation.bankName : '';
  const inputAccount = userInfo ? userInfo.bankInformation.accountNumber : '';
  const inputIntebank = userInfo ? userInfo.bankInformation.routingNumber : '';
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [bankCatalog, setBankCatalog] = useState([]);
  const [title, setTitle] = useState('');
  const [buttonNext, setButtonNext] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const bank = useValidatedInput('dropdownBank', inputNBank);
  const accountNo = useValidatedInput('accountNo', inputAccount);
  const interbankClabe = useValidatedInput('interbankClabe', inputIntebank);

  useEffect(() => {
    getBankCatalogs();
  }, []);

  async function getBankCatalogs() {
    const token = await LocalStorage.get('auth_token');
    const response = await getBankCatalog(token);
    if (response.code < 400) {
      setBankCatalog(response.data);
    }
  }

  function handlePressBack() {
    navigation.goBack();
  }


  async function handlePressNext() {
    setIsLoadingModal(true);
    const token = await LocalStorage.get('auth_token');
    const response = await updateUserBankInformation(
      token,
      bank.value,
      accountNo.value,
      interbankClabe.value,
      idUser
    );
    if (response.code < 400) {
      setTimeout(function () {
        navigation.navigate('MyProfile');
        setIsLoadingModal(false);
      }, 1000);
    } else {
      setIsLoadingModal(true);
      setTimeout(function () {
        setIsLoadingModal(false);
        setSnakVisible(true);
        setButtonNext(true);
        setTitle(response.message);
      }, 1000);
    }
  }


  const handleCloseNotif = () => {
    setSnakVisible(false);
    setButtonNext(false);
    setActionAnimated(true);
  };

  const isValid = isFormValid(accountNo, interbankClabe, bank);
  return (
    <SignUpWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : ""}
        style={{ flex: 1 }}
      >
        <NavigationBar onBack={handlePressBack} body={i18n.t('myProfile.component.titleBankInformation')} />
        <ScrollView>
          <SafeAreaView forceInset={{ top: 'always' }}>
            <DivSpace height-10 />
            <View row centerH>
              <View width-6 bgGray height-6 style={{ borderRadius: 6 }}></View>
              <DivSpace width-6 />
              <View width-6 bgGray height-6 style={{ borderRadius: 6 }}></View>
              <DivSpace width-6 />
              <View width-6 bgGray height-6 style={{ borderRadius: 6 }}></View>
              <DivSpace width-6 />
              <View width-6 height-6 bgGray style={{ borderRadius: 6 }}></View>
              <DivSpace width-6 />
              <View width-6 bgOrange02 height-6 style={{ borderRadius: 6 }}></View>
            </View>
            <DivSpace height-25 />
            <View flex-1>
              <View paddingH-20>
                <Text h12 white center>
                  {i18n.t('myProfile.component.textWithThisInformation')} <Text orange>"{i18n.t('myProfile.component.labelMyWallet')}"</Text>{' '}{i18n.t('myProfile.component.labelToYourPersonal')}
                </Text>
                <DivSpace height-20 />
                <AnimateLabelInput
                  {...bank}
                  label={i18n.t('myProfile.component.selectBakn')}
                  keyboardType={'default'}
                  returnKeyType={'done'}
                  autoCapitalize={'none'}
                />
                <DivSpace height-10 />
                <AnimateLabelInput
                  {...accountNo}
                  label={i18n.t('myProfile.component.inputAccountNo')}
                  keyboardType={'default'}
                  returnKeyType={'done'}
                  autoCapitalize={'none'}
                />
                <DivSpace height-10 />
                <AnimateLabelInput
                  {...interbankClabe}
                  label={i18n.t('myProfile.component.inputInterbankClabe')}
                  keyboardType={'default'}
                  returnKeyType={'done'}
                  autoCapitalize={'none'}
                />
                <DivSpace height-15 />
                <View row>
                  <View flex-1  >
                    <View centerH centerV bottom>
                      <ButtonRounded size='lg' onPress={handlePressNext} disabled={!isValid && !buttonNext ? true : buttonNext}>
                        <Text h10 semibold>
                          {i18n.t('myProfile.component.buttonSaveAndFinish')}
                        </Text>
                      </ButtonRounded>
                    </View>
                  </View>
                </View>
                <DivSpace height-25 />
                <Text h10 textGray>{i18n.t('myProfile.component.labelTheInformationRequested')}</Text>
                <Text h10 textGray>{i18n.t('myProfile.component.labelYourInformation')}{' '}<Text bold white>e{i18n.t('myProfile.component.labelItIsProtected')}</Text></Text>
                <DivSpace height-15 />
                <View left>
                  <Link onPress={() => { }}>
                    <Text h13 medium bgBlue06>
                      {i18n.t('myProfile.component.linkNoticeOfPrivacy')}
                    </Text>
                  </Link>
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
        {isLoadingModal && (
          <Loader
            isOpen={true}
            navigation={navigation} />)}
      </KeyboardAvoidingView>
    </SignUpWrapper>
  );
};

export default BankInformation;
