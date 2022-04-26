import React ,{useEffect,useState}from 'react';
import { SafeAreaView } from 'react-navigation';
import i18n from '@utils/i18n';
import {
  View,
  DivSpace,
  NavigationBar,
  BoxBlue,
  Text,
  ButtonRounded,
  AnimateLabelAmount,
  SnackBar,
  Loader
} from '@components';
import { moneyFormatter } from '@utils/formatters';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import LocalStorage from '@utils/localStorage';
import Styles from '@screens/nationalPayments/styles';
import { getInfoTransfer } from '@utils/api/switch';



const TransferWalletBank = ({ navigation }) => {
  const amount = useValidatedInput('amount', '');
  const isValid = isFormValid(amount);
  const [data, setData] = useState([]);
  const [clabe, setClabe] = useState('');
  const [bank, setBank] = useState('');
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [title, setTitle] = useState('');
  const [buttonNext, setButtonNext] = useState(false);

  async function  handlePressNext() {
    navigation.navigate('ConfirmationPinUser',{
      data: {page: 'transferWallet', amount: amount.value, clabe: clabe,bank: bank },
      next: 'TransferWalletBankSuccess'
    });
  }

  useEffect(() => {
    getInfo();
  }, []);

  async function getInfo () {
    const token = await LocalStorage.get('auth_token');
    const response = await getInfoTransfer(token);
    const clabeBank = response.data.bankInformation ? response.data.bankInformation.accountNumber:'';
    const nameBank = response.data.bankInformation ? response.data.bankInformation.bank:'';
    if (response.code < 400) {
      setData(response.data);
      setClabe(clabeBank);
      setBank(nameBank);
    }else{
      setData([]);
    }
  }

  const handleCloseNotif = () => {
    setSnakVisible(false);
    setButtonNext(false);
    setActionAnimated(true);
  };
 
  return (
    <SignUpWrapper>
      <SafeAreaView style={Styles.viewInfoCntc} forceInset={{top: 'always'}}>
        <NavigationBar
          disableExtraTop
          onBack={() => navigation.goBack()}
          body={i18n.t('transfers.component.title')}
          onClose={null}
        />
        <DivSpace height-15 />
        <BoxBlue>
          <View centerH>
            <DivSpace height-29 />
            <View width-244>
              <Text h14 center white>
                {i18n.t('transfers.component.transferDesciption1')}{' '}
                <Text semibold white>
                  {i18n.t('transfers.component.transferDesciption2')}
                </Text>
              </Text>
            </View>
            <DivSpace height-42 />
            <View center>
              <Text h10 white center>
                {i18n.t('transfers.component.account')}
              </Text>
              <DivSpace height-5 />
              <Text h12 white medium center>
                {clabe}
              </Text>
              <DivSpace height-5 />
              <Text h10 white medium center>
                {bank}
              </Text>
            </View>
            <DivSpace height-35 />
            <Text H10 regular bgGray>
              {i18n.t('transfers.component.available')}
            </Text>
            <DivSpace height-5 />
            <Text H10 semibold bgGray>
              {moneyFormatter(data.balance)}
            </Text>
          </View>
          <DivSpace height-32 />
          <View flex-1 marginH-65>
            <AnimateLabelAmount
              {...amount}
              label={i18n.t('transfers.component.labelAmountToTransfer')+':'}
              keyboardType={'default'}
              autoCapitalize={'none'}
            />
          </View>
          <View centerH>
            <ButtonRounded onPress={handlePressNext} disabled={!isValid && !buttonNext ? true: buttonNext}>
              <Text h10 semibold>
                {i18n.t('transfers.component.pay')}
              </Text>
            </ButtonRounded>
          </View>
          <DivSpace height-83 />
          <Text h10 white center>
            {i18n.t('transfers.component.comission')}{' '}
            {moneyFormatter(data.comissionAmount)} {data.comissionCoin}
          </Text>
          <DivSpace height-30 />
        </BoxBlue>
      </SafeAreaView>
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
    </SignUpWrapper>
  );
};

export default TransferWalletBank;
