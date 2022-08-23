import React from 'react';
import i18n from '@utils/i18n';
import { scale, verticalScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-navigation';
import { StatusBar } from 'react-native';
import { moneyFormatter } from '@utils/formatters';
import {
  Text,
  View,
  DivSpace,
  NavigationBar,
  ImageComponent,
  ButtonRounded
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import UulalaPoints from '@assets/levels/UulalaPoints.png';
import Styles from './styles';
import Colors from '@styles/Colors';
import Modal2faConfirmation from '@screens/auth2fa/Modal2faConfirmation';
import { useSelector } from 'react-redux';

const optionalConfigObject = {
  title                 : (i18n.t('fingerPrint.component.textConfirmFootPrint')),
  imageColor            : Colors?.textBlueDark,
  imageErrorColor       : '#ff0000',
  sensorDescription     : (i18n.t('fingerPrint.component.textFingerSent')),
  sensorErrorDescription: 'Failed',
  cancelText            : (i18n.t('fingerPrint.component.buttonCancel')),
  fallbackLabel         : 'Show Passcode',
  unifiedErrors         : false,
  passcodeFallback      : false 
};

const DetailBuyPoints = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const [showModal2fa, setShowModal2fa] = useState(false);

  function handlePressNext() {
    var foobar = [3, 2, 1];
    if (!foobar.includes(userData?.type2fa)) {
      setShowModal2fa(true);
    } else {
      navigation.navigate('Pin2faConfirmation', {
        data: { },
        next: 'ConfirmBuyPoints'
      });
      //navigation.navigate('Pin2faConfirmation');
    }
  }
 
  const handleClose = () => {
    setShowModal2fa(!showModal2fa);
  };

  return (
    <SignUpWrapper>
      <SafeAreaView style={Styles.viewInfoCntc} forceInset={{top: 'always'}}>
        <NavigationBar
          disableExtraTop
          onBack={() => navigation.goBack()}
          body={i18n.t('buyPoints.component.titlePointsUulala')}
          onClose={null}
        />
        <View  flex-1 centerV  marginH-20>
          <View centerH style={Styles.containerUuPoints}>
            <ImageComponent source={UulalaPoints} width={scale(295)} height={verticalScale(205)}/>
            <DivSpace height-8/>
            <Text h30 white semibold>350</Text>
            <Text h16 white>{i18n.t('buyPoints.component.titlePointsUulala')}</Text>
            <DivSpace height-20/>
            <Text h10 textGray>{i18n.t('buyPoints.component.textAvailableInWallet')}</Text>
            <Text h10 textGray semibold>{moneyFormatter(7898.12)}</Text>
            <DivSpace height-20/>
            <Text h10 textGray>{i18n.t('buyPoints.component.textPrice')}</Text>
            <Text h32 textGray semibold>{moneyFormatter(200)}</Text>
            <Text h10 textGray>USD</Text>
            <View flex-1 centerH centerV >
              <ButtonRounded  onPress={handlePressNext}>
                <Text h10 semibold>
                  {i18n.t('buyPoints.component.buttonBuy')}
                </Text>
              </ButtonRounded>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <Modal2faConfirmation
        visible={showModal2fa}
        onRequestClose={() => { setShowModal2fa(false) }}
        onPressOverlay={handleClose}
        navigation={navigation}
      />
    </SignUpWrapper>
  );
};

export default DetailBuyPoints;
