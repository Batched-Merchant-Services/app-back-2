import React,{useState} from 'react';
import i18n from '@utils/i18n';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { useSelector} from 'react-redux';

import {
  Text,
  View
} from '@components';
import styles from './styles';
import { conversionCurrency } from '@utils/api/switch';
import LocalStorage from '@utils/localStorage';

const BoxAddPercent = ({ onFill,currency,two }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const [balanceCrypto]=useState(userData?userData.balanceCrypto:'');
  const [typeCrypto]=useState(userData?userData.typeCrypto:'');
  
  const calculatePercentage = async(numberPercentage) => {
    if( two ){
      onFill(balanceCrypto); 
    }else{
      const token = await LocalStorage.get('auth_token');
      const percent = Math.floor(balanceCrypto*numberPercentage)/100;
      console.log('balanceCrypto',balanceCrypto,'currency',currency,'typeCrypto',typeCrypto)
      const percentConverts = await conversionCurrency(token,currency? 'USD':typeCrypto ,currency? typeCrypto:'USD' ,percent);
      if (percentConverts.code < 400) {
        const percentString = percentConverts.data?.conversion?.toString();
        onFill(percentString); 
      }
    }
   
  };


  return (
    <View flex-1>
      <View row centerH>
        <TouchableOpacity onPress={() => calculatePercentage(100)} style={styles.boxPercent}>
          <Text bgGray h9>{i18n.t('CryptoBalance.component.buyCrypto.buttonAddThe')}{' '}<Text bold bgGray>100%</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

BoxAddPercent.propTypes = {
  onFill: PropTypes.func
};
export default BoxAddPercent;
