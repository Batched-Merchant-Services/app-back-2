import React,{useState} from 'react';
import i18n from '@utils/i18n';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView, } from 'react-native';
import {
  Text,
  View,
  DivSpace,
  ImageComponent,
  AnimateLabelInput,
} from '@components';
import { scale, verticalScale } from 'react-native-size-matters';
import { useSelector} from 'react-redux';
import  BoxAddPercent  from '@screens/crypto/components/BoxAddPercent';
import change from '@assets/crypto/change.png';
import Styles from './styles';
import Colors from '@styles/Colors';


const AmountCrypto = ({ onFillAmount,onCurrency,onChange,addAmount,...props }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const infoData =  userData ? userData :'';
  const brandTheme = userData?.Theme?.colors;
  const [currency, setCurrency] = useState(false);
  

  const handleChangeCurrency = () => {
    setCurrency(!currency);
    onCurrency(currency? infoData.typeCrypto:'USD');
  };

  return (
    <View flex-1>
      <View flex-1 row>
        <View flex-1>
          <AnimateLabelInput
            value={addAmount}
            onChangeText={onChange}
            label={i18n.t('CryptoBalance.component.sendCrypto.inputAmountToSend')}
            keyboardType={'number-pad'}
            autoCapitalize={'none'}
            style={{fontSize: 16}}
          />
          <Text h15 orange semibold style={{position: 'absolute',top: 23,right: 10}}>{currency? 'USD':infoData.typeCrypto}</Text>
        </View>
        <DivSpace width-10 />
        <TouchableOpacity onPress={handleChangeCurrency} style={[Styles.changeCurrency,{backgroundColor: brandTheme?.textBlueDark??Colors?.textBlueDark}]}>
          <ImageComponent
            white
            source={change}
            width={scale(25)}
            height={verticalScale(25)}
          />
          <Text bgGray h9>{currency?infoData.typeCrypto:'USD'}</Text>
        </TouchableOpacity>
      </View>
      
      <DivSpace height-10 />
      <BoxAddPercent  onFill={(code) => onChange(code)} currency ={currency}/>
    </View>
  );
};

AmountCrypto.propTypes = {
  onFill      : PropTypes.func,
  onFillAmount: PropTypes.func,
  onCurrency  : PropTypes.func
};
export default AmountCrypto;
