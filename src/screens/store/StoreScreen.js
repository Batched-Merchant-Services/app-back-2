import React,{useState} from 'react';
import { NavigatorHeader, Text, DivSpace, View, ModalDisabled } from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import i18n from '@utils/i18n';
import StoreOption from '@screens/store/components/StoreOption';
import PaysReacharges from '@assets/brand/pays-recharges.png';
import * as Animatable from 'react-native-animatable';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';

//invalid
import MicroOffersI from '@assets/icons/disabled/MODisabled.png';
import GiftCardsI from '@assets/icons/disabled/giftCDisabled.png';
import BuysI from '@assets/icons/disabled/buySdisabled.png';

const Store = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandThemeImages = userData?.Theme?.images;
  const [showModal,setShowModal] = useState(false);

  const onClose = () => {
    setShowModal(false);
  };

  const showModals =() => {
    setShowModal(true);
  };
  return (
    <SignUpWrapper>
      <NavigatorHeader brandTheme={brandThemeImages} avatarProfile={() => console.log('')} navigation={navigation} />
      <DivSpace height-11 />
      <Text center h14 medium title>
        {i18n.t('store.component.title')}
      </Text>
      <DivSpace height-50 />
      {navigation.isFocused() && <View>
        <View row height-150>
          <Animatable.View style={{flex:1, alignItems:'center', justifyContent:'center'}}  animation="pulse">
            <StoreOption
              image={MicroOffersI}
              label={i18n.t('store.component.microOffers')}
              invalid
              onPress={showModals}
              width={78}
              height={55}
            />
          </Animatable.View>
          <Animatable.View style={{flex:1,alignItems:'center',justifyContent:'center'}} animation="pulse" delay={150}>
            <StoreOption
              image={PaysReacharges}
              label={i18n.t('store.component.paysReacharges')}
              onPress={navigation.navigate.bind(navigation, 'StoreProviderPayments')}
              width={88}
              height={55}
            />
          </Animatable.View>
        </View>
        <DivSpace height-60 />
        <View row height-150>
          <Animatable.View style={{flex:1, alignItems:'center', justifyContent:'center'}}  animation="pulse" delay={300}>
            <StoreOption
              image={GiftCardsI}
              label={i18n.t('store.component.giftCards')}
              invalid
              onPress={showModals}
              width={66}
              height={53}
            />
          </Animatable.View>
          <Animatable.View style={{flex:1,alignItems:'center',justifyContent:'center'}} animation="pulse" delay={450}>
            <StoreOption
              image={BuysI}
              label={i18n.t('store.component.buys')}
              invalid
              onPress={showModals}
              width={70}
              height={61}
            />
          </Animatable.View>
        </View>
        <ModalDisabled isOpen={showModal} navigation={navigation} onClose={onClose}/>
      </View>}
     
    </SignUpWrapper>
  );
};

export default withNavigationFocus(Store);
