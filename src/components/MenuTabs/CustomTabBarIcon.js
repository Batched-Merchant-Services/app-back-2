import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { MenuTabIcon, MenuTabLabel, View, DivSpace } from '@components';
import i18n from '@utils/i18n';
//Images
import menuWallet from '@assets/icons/menuWallet.png';
import menuCard from '@assets/icons/menuCard.png';
import walletWitheCard from '@assets/icons/walletWitheCard.png';
import menuWhiteWallet from '@assets/icons/menuWhiteWallet.png';
import menuStore from '@assets/icons/menuStore.png';
import menuStoreWhite from '@assets/icons/menuStoreWhite.png';
import savvy from '@assets/icons/disabled/s.png';
import creditInvalid from '@assets/icons/disabled/creditInvalid.png';
import Colors from '@styles/Colors';

const CustomTabBarIcon = ({ index, focused, routeName,onPress, ...props }) => {
  
  useEffect(() => {
    global.store.dispatch({
      type   : 'SET_IS_NAVIGATION_IN',
      payload: true
    }); 
    global.store.dispatch({
      type   : 'SET_IS_MODAL_OPEN',
      payload: 'open',
    }); 
  }, []);


  const onSelect = () => {
    onPress(index);
  };
  
  let iconData = '';
  let iconFocuseData = '';
  let label = '';
  let invalid = '';

  switch (index) {
  case 0: 
    iconData = menuWhiteWallet;
    iconFocuseData = menuWallet;
    label = i18n.t('generics.labelMenuBalance');
    invalid = false
    break;

  case 1:
    iconData = walletWitheCard;
    iconFocuseData = menuCard;
    label = i18n.t('generics.labelMenuCards');
    invalid = false
    break;

  case 2:
    iconData = savvy;
    iconFocuseData = savvy;
    label = i18n.t('generics.labelMenuUulala');
    invalid = true
    break;
  case 3:
    iconData = creditInvalid;
    iconFocuseData = creditInvalid;
    label = i18n.t('generics.labelMenuCredits');
    invalid = true
    break;
  case 4:
    iconData = menuStoreWhite;
    iconFocuseData = menuStore;
    label = i18n.t('generics.labelMenuStore');
    invalid = false
    break;

  default: 
    iconData = menuWhiteWallet;
    iconFocuseData = menuWallet;
    label = i18n.t('generics.labelMenuBalance');
  }

  return (
    <TouchableOpacity
      onPress={onSelect}
      style={{
        width:'100%',
        backgroundColor: focused ? Colors?.textBlue01 : 'transparent'
      }}
    >
      <View row  height-65 centerV centerH>
        <View>
          <MenuTabIcon Invalid={invalid} focused={focused} icon={iconData} iconFocuse={iconFocuseData}/>
        </View>
        <DivSpace width-5/>
        <View>
          <MenuTabLabel Invalid={invalid} focused={focused} text={label} />
        </View>
       
      </View>
    </TouchableOpacity>
  );

};

CustomTabBarIcon.propTypes = {
  onPress: PropTypes.func,
};

export default CustomTabBarIcon;
