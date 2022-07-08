import React,{useState} from 'react';
import i18n from '@utils/i18n';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import {
  Text,
  View,
  DivSpace,
  ImageComponent,
  Loader,
  AnimateLabelInput,
} from '@components';
import LocalStorage from '@utils/localStorage';
import { useValidatedInput } from '@hooks/validation-hooks';
import { useSelector} from 'react-redux';
import  BoxAddPercent  from '@screens/crypto/components/BoxAddPercent';
import change from '@assets/crypto/change.png';
import Styles from './styles';
import Colors from '@styles/Colors';
import { conversionCurrency } from '@utils/api/switch';
import { scale, verticalScale } from 'react-native-size-matters';


const AmountCryptoTwo = ({  value, error, onChangeText,onFillConvert, ...props}) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const infoData =  userData ? userData :'';
  const brandTheme = userData?.Theme?.colors;
  const [showNameCrypto]=useState(userData?userData.nameCrypto:'');
  const [shortNameCrypto]=useState(userData?userData.typeCrypto:'');
  const [iconCrypto]=useState(userData?userData.iconCrypto:'');
  const [feeCrypto]=useState(userData?userData.feeCrypto:'');
  const [currencyUser]=useState(userData?userData.currencyUser:'');
  const [addAmountPercent, setAddAmountPercent] = useState('');
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const currencyUSD = useValidatedInput('currency', '');
  const [currency, setCurrency] = useState(false);
  const [amount, setAmount] = useState(false);

  const onChange = (code) => {
    const value = code?code.toString():'';
    onChangeText(value);
    convertAmountSend(value);
  };

  const handleBlur = () => {
    convertAmountSend(value);
  };


  
  async function convertAmountSend(value) {
    setIsLoadingModal(true);
    const token = await LocalStorage.get('auth_token');
    const responseBTC = await conversionCurrency(token,shortNameCrypto,'USD',value);
    if (responseBTC.code < 400) {
      setIsLoadingModal(false);
      currencyUSD.onChangeText(responseBTC.data?.conversion?.toString());
      onFillConvert(responseBTC.data?.conversion?.toString());
      //setTotalSwapUSD(responseBTC.data?.conversion?.toString());
    }else{
      setIsLoadingModal(false);
    }
  }
  return (
    <View flex-1>
      <View flex-1 >
        <View flex-1>
          <AnimateLabelInput
            value={value}
            onChangeText={onChangeText}
            label={i18n.t('CryptoBalance.component.sendCrypto.inputAmountToSend')}
            keyboardType={'number-pad'}
            autoCapitalize={'none'}
            style={{fontSize: 16}}
            onEndEditing={handleBlur}
            onBlur={handleBlur}
          />
          <Text h15 orange semibold style={{position: 'absolute',top: 23,right: 10}}>{currency? 'USD':infoData.typeCrypto}</Text>
        </View>
        <View centerH>
          <ImageComponent
            white
            source={change}
            width={scale(20)}
            height={verticalScale(20)}
          />
        </View>
        <DivSpace height-5 />
        <View flex-1>
          <AnimateLabelInput
            {...currencyUSD}
            editable={false}
            label={i18n.t('CryptoBalance.component.sendCrypto.inputAmountToSend')}
            keyboardType={'number-pad'}
            autoCapitalize={'none'}
            style={{fontSize: 16}}
          />
          <Text h15 orange semibold style={{position: 'absolute',top: 23,right: 10}}>USD</Text>
        </View>
        {/* <TouchableOpacity onPress={handleChangeCurrency} style={[Styles.changeCurrency,{backgroundColor: brandTheme?.textBlueDark??Colors?.textBlueDark}]}>
          <ImageComponent
            white
            source={change}
            width={scale(25)}
            height={verticalScale(25)}
          />
          <Text bgGray h9>{currency?infoData.typeCrypto:'USD'}</Text>
        </TouchableOpacity> */}
      </View>
      
      <DivSpace height-10 />
      <BoxAddPercent  onFill={(code) => onChange(code)} currency ={currency} two/>
      
      {/* <DivSpace height-20 />
      <Text  center textGray h10>{i18n.t('CryptoBalance.component.sendCrypto.textTransactionFee')}</Text>
      <Text  center textGray h10 semibold>{feeCrypto}{' '}{currencyUser}{' '}{i18n.t('CryptoBalance.component.sendCrypto.textTransaction')}</Text> */}
      {isLoadingModal &&(
        <Loader 
          isOpen={true} />)}
    </View>
  );
};

AmountCryptoTwo.propTypes = {
  onFill      : PropTypes.func,
  onFillAmount: PropTypes.func,
  onCurrency  : PropTypes.func
};
export default AmountCryptoTwo;
