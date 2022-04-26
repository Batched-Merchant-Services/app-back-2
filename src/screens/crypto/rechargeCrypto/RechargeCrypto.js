import React, { useState,Fragment,useEffect,useRef } from 'react';
import { ScrollView} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { useDispatch } from 'react-redux';
import LocalStorage from '@utils/localStorage';
import { saveInfoCrypto} from '@store/ducks/user.ducks';
import { getListBuyCrypto } from '@utils/api/switch';
import { Bubbles } from 'react-native-loader';
import { scale, verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import {
  View,
  DivSpace,
  ImageComponent,
  Text,
  NavigationBar,
  ButtonFloating
} from '@components';
import IconWallet from '@utils/iconSVG/IconWallet';
import IconBitcoin from '@utils/iconSVG/IconBitcoin';
import rowRight from '@assets/icons/rowRight.png';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import InfoBoxLiquid from '@screens/crypto/components/InfoBoxLiquid';
import Styles from './styles';
import Colors from '@styles/Colors';
import { useSelector} from 'react-redux';

const RechargeCrypto = ({ navigation }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  
  const scrollView = useRef(null);
  const [ showListCrypto,setShowListCrypto] = useState([]);

  useEffect(() => {
    getLisCrypto();
  }, []);

  const handlePressListCrypto = (item,page) => {
    const currencyId = item? item.cryptocurrency_id: '';
    const typeCrypto = item? item.short_name: '';
    const nameCrypto = item? item.name: '';
    const iconCrypto = item? item.icon: '';
    dispatch(saveInfoCrypto({ currencyId: currencyId,iconCrypto: iconCrypto,typeCrypto: typeCrypto,nameCrypto: nameCrypto  }));
    navigation.navigate('MyCryptoBalance',{page: page});
  };

  async function getLisCrypto() {
    const token = await LocalStorage.get('auth_token');
    const responseList = await getListBuyCrypto(token);
    if (responseList.code < 400) {
      setShowListCrypto(responseList.data);
    } else{
      setShowListCrypto([]);
    }
  }
  
  const handleGoUpPress = () =>
    scrollView.current.scrollTo({ x: 0, y: 0, animated: true });


  const InfoCryptoElement = showListCrypto.map((item, key) => (
    <Fragment key={key}>
      <InfoBoxLiquid  buy onPress={()=> handlePressListCrypto(item,'recharge')} {...item} navigation={navigation}/>   
      <DivSpace height-12 />
    </Fragment>
  ));

  return (
    <SignUpWrapper forceInset={{top: 'always'}}>
      <NavigationBar
        onBack={() => navigation.goBack()}
        body={i18n.t('CryptoBalance.component.rechargeCrypto.titleTopUpCryptocurrency')}
        onClose={null}
      />
      <DivSpace height-20 />
      <ScrollView ref={scrollView} style={Styles.scroll}>
        <SafeAreaView >
          <View flex-1>
            <View flex-1 height-160 paddingH-15 centerH centerV marginH-20 textBlue01 style={Styles.boxTextBuy}>
              <View row centerV>
                <IconBitcoin width={scale(32)} height={verticalScale(28)}  fill={brandTheme?.orange??Colors?.orange} fillSecondary={brandTheme?.white??Colors?.white}/>
                <DivSpace width-10 />
                <ImageComponent white source={rowRight} width={12} height={12} />
                <DivSpace width-10 />
                <IconWallet width={scale(32)} height={verticalScale(28)}  fill={brandTheme?.orange??Colors?.orange} fillSecondary={brandTheme?.white??Colors?.white}/>
              </View>
              
              <DivSpace height-10 />
              <Text white h12 center>{i18n.t('CryptoBalance.component.rechargeCrypto.textRechargeCrypto')}{' '}<Text orange semibold>{i18n.t('CryptoBalance.component.rechargeCrypto.textMyWalletCrypto')}</Text></Text>
              <Text white h12 center>{i18n.t('CryptoBalance.component.rechargeCrypto.textThrough')}{' '} <Text semibold white>{i18n.t('CryptoBalance.component.rechargeCrypto.textCryptocurrencies')}</Text></Text>
              <DivSpace height-10 />
              <Text bgGray h10 center>{i18n.t('CryptoBalance.component.rechargeCrypto.textTheyWillBeTaken')}</Text>
            </View>
            <View marginH-15>
              <DivSpace height-5/>
              <Text h10 bgGray center>{i18n.t('CryptoBalance.component.rechargeCrypto.textSelectTheCryptocurrency')}</Text>
              <DivSpace height-5/>
              {showListCrypto.length>0 ?
                InfoCryptoElement 
                :
                <View flex-1 height-100 centerH centerV >
                  <Bubbles size={12} color={brandTheme?.bgOrange02??Colors?.bgOrange02}  />
                </View>
              }
              <DivSpace height-5/>
            </View>
            
          </View>
        </SafeAreaView>
      </ScrollView>
      <View centerH>
        <ButtonFloating onPress={handleGoUpPress} />
      </View>
     
    </SignUpWrapper>
  );
};

export default RechargeCrypto;
