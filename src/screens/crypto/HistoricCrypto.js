import React, { useRef, useState,useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { moneyFormatter } from '@utils/formatters';
import EmptyState from '@screens/EmptyState';
import { Bubbles } from 'react-native-loader';
import {
  Text,
  View,
  DivSpace,
  NavigationBar,
  ButtonFloating
} from '@components';
import i18n from '@utils/i18n';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import LocalStorage from '@utils/localStorage';
import { getLiquidCrypto } from '@utils/api/switch';
import { useSelector} from 'react-redux';
import Styles from './styles';
import Colors from '@styles/Colors';

const Historic = ({
  amount,
  status,
  description,
  created_at,
  short_name,
  fee_comission,
  trx_id,
  total,
  currency,
  address,
  theme
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  function handlePress() {
    setIsOpen(!isOpen);
  }
  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={isOpen ? [Styles.opened,{backgroundColor: theme?.textBlueDark??Colors.textBlueDark}] : [Styles.closed,{ backgroundColor: theme?.textBlue01??Colors.textBlue01}]}
        marginB-10
        paddingH-9
      >
        <View paddingV-9>
          <View flex-1 row >
            <View flex-3 >
              <Text white h10 >
                {created_at}
              </Text>
            </View>
            <View right>
              <Text title h12 semibold>
                {amount}{' '}{short_name}
              </Text>
            </View>
          </View>
          <View flex-1 row >
            <View flex-3 >
              <Text white h10 medium numberOfLines={1}>
                {i18n.t('CryptoBalance.component.HistoryCrypto.textDepositID')}: {trx_id}
              </Text>
            </View>
            <View flex-1 right>
              <Text
                {...(status !=='approved' ? { red: true } : { green: true })}
                h11
                bold
                center
              >
                {moneyFormatter(amount)}{' '}{currency}
              </Text>
            </View>
          </View>
          {isOpen && (
            <>
              <DivSpace height-8 />
              <View style={[Styles.DivSpace,{backgroundColor: theme?.bgBlue02??Colors.bgBlue02 }]} />
              <DivSpace height-8 />
              <Text h10 bgGray>
                {i18n.t('CryptoBalance.component.HistoryCrypto.textTransferID')}{' '}{short_name}
              </Text>
              <Text h10 white semibold>
                {description}
              </Text>
              <DivSpace height-8 />
              <Text h10 bgGray>
                {i18n.t('CryptoBalance.component.HistoryCrypto.status')}
              </Text>
              <Text 
                {...(status !=='approved' ? { red: true } : { green: true })}
                h10
                semibold>
                {status}
              </Text>
              <DivSpace height-10 />
              <View style={Styles.DivSpace} />
              <DivSpace height-10 />
              <View row>
                <View flex-1>
                  <Text h10 bgGray>{i18n.t('CryptoBalance.component.HistoryCrypto.textAmountTransferred')}</Text>
                </View>
                <View flex-1 right>
                  <Text h10 white semibold>
                    {moneyFormatter(amount)}{' '}{currency}
                  </Text>
                </View>
              </View>
              <DivSpace height-8 />
              <View row>
                <View flex-1>
                  <Text h10 bgGray>{i18n.t('CryptoBalance.component.HistoryCrypto.textUulalaCommission')}</Text>
                </View>
                <View flex-1 right>
                  <Text h10 white semibold>
                    {moneyFormatter(fee_comission)}{' '}{currency}
                  </Text>
                </View>
              </View>
              <DivSpace height-8 />
              <View row>
                <View flex-1>
                  <Text h10 bgGray>{i18n.t('CryptoBalance.component.HistoryCrypto.textBalanceTransferred')}</Text>
                </View>
                <View flex-1 right>
                  <Text h10 white semibold>
                    {moneyFormatter(total)}{' '}{currency}
                  </Text>
                </View>
              </View>
              <DivSpace height-10 />
              <View style={Styles.DivSpace} />
              <DivSpace height-10 />
              <Text h10 white>
                {i18n.t('CryptoBalance.component.HistoryCrypto.textAddressUsed')}
              </Text>
              <Text h10 medium white>
                {address}
              </Text>
              <DivSpace height-8 />
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const HistoricCrypto = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const scrollView = useRef(null);
  const [ historicTrans,setHistoricTrans] = useState([]);
  const [ showEmpty,seshowEmpty] = useState(true);
  
  const handleGoUpPress = () =>
    scrollView.current.scrollTo({ x: 0, y: 0, animated: true });

  useEffect(() => {
    getLisCrypto();
  }, []);

  async function getLisCrypto() {
    const token = await LocalStorage.get('auth_token');
    const responseList = await getLiquidCrypto(token);
    if (responseList.code < 400) {
      setHistoricTrans(responseList.data);
      seshowEmpty(false);
    } else{
      setHistoricTrans([]);
      seshowEmpty(false);
    }
  }

  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView style={Styles.viewInfoCntc} forceInset={{top: 'always'}}>
        <NavigationBar
          disableExtraTop
          onBack={() => navigation.goBack()}
          body={i18n.t('CryptoBalance.component.HistoryCrypto.title')}
          onClose={null}
        />
        <DivSpace height-20 />
        <ScrollView ref={scrollView} style={Styles.scroll}>
          {historicTrans.length <= 0 &&(
            showEmpty ?
              <View height-30 centerH centerV >
                <Bubbles size={12} color={brandTheme?.bgOrange02??Colors?.bgOrange02}  />
              </View>
              :<EmptyState navigation={navigation}/>

          )}

          {historicTrans.length > 0 &&(
            historicTrans.map((datum, index) => (
              <Historic {...datum} key={index} theme={brandTheme}/>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
      {historicTrans.length > 0 &&( 
        <View centerH style={Styles.viewBtnFloating}>
          <ButtonFloating onPress={handleGoUpPress} />
        </View>
      )}
      <DivSpace height-20 />
    </SignUpWrapper>
  );
};

export default HistoricCrypto;
