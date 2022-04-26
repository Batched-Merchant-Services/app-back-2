import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { scale,verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import {
  View,
  DivSpace,
  BoxBlue,
  ImageComponent,
  Text,
  ButtonRounded
} from '@components';
import { moneyFormatter } from '@utils/formatters';
import { useSelector } from 'react-redux';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import Styles from '@screens/recharges/styles';
import StartDisable from '@assets/icons/startDisable.png';
import StartInactive from '@assets/icons/startInactive.png';
const logoUulala = require('@assets/brand/welcome_back.png');

const RechargeReceivedSuccess = ({navigation}) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const data = {
    amount  : 5006.59,
    coin    : 'MXN',
    userName: 'Fernando Morales'
  };
  const handlePressHome = () => {
    navigation.navigate('MyWallet');
  };
  

  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView style={Styles.viewInfoCntc} forceInset={{top: 'always'}}>
        <DivSpace height-20 />
        <ImageComponent
          source={brandTheme?.uulalaLogo??logoUulala}
          height={verticalScale(25)}
          width={scale(76)}
        />
        <DivSpace height-5 />
        <Text h12 regular bgBlue06>
          {i18n.t('recharges.component.rechargeSuccessful')}
        </Text>
        <DivSpace height-17 />
        <BoxBlue containerStyle={{ height: verticalScale(550) }}>
          <View centerH flex-1>
            <DivSpace height-28 />
            <Text h12 regular white>
              {i18n.t('receivedQRPayments.component.textRememberToCharge')}:
            </Text>
            <Text h28 medium white>
              {moneyFormatter(data.amount)}
            </Text>
            <Text h12 regular white>
              {data.coin}
            </Text>
            <DivSpace height-15 />
            <View width-178>
              <Text h12 bold white center>
                {i18n.t('receivedQRPayments.component.textCash')}
              </Text>
            </View>
            <DivSpace height-20 />
            <View width-207>
              <Text h10 center white>
                {i18n.t('receivedQRPayments.component.textTheCommission')}
              </Text>
            </View>
            <DivSpace height-30 />
            <View white
              style={Styles.userImage}
            />
            <DivSpace height-15 />
            <Text h12 center white>
              {i18n.t('recharges.component.rate')}
            </Text>
            <Text h14 center semibold white>
              {data.userName}
            </Text>
            <DivSpace height-31 />
            <View centerV centerH row>
              <TouchableOpacity>
                <ImageComponent bgBlue06 source={StartInactive} height={26} width={27} />
              </TouchableOpacity>
              <DivSpace width-5 />
              <TouchableOpacity>
                <ImageComponent bgBlue06 source={StartInactive} height={26} width={27} />
              </TouchableOpacity>
              <DivSpace width-5 />
              <TouchableOpacity>
                <ImageComponent bgBlue06 source={StartInactive} height={26} width={27} />
              </TouchableOpacity>
              <DivSpace width-5 />
              <TouchableOpacity>
                <ImageComponent textBlue01 source={StartDisable} height={26} width={27} />
              </TouchableOpacity>
              <DivSpace width-5 />
              <TouchableOpacity>
                <ImageComponent textBlue01 source={StartDisable} height={26} width={27} />
              </TouchableOpacity>
            </View>
          </View>
          <View centerH >
            <ButtonRounded size = 'lg' onPress={handlePressHome}>
              <Text h10 semibold>
                {i18n.t('receivedQRPayments.component.ButtonBackHome')}
              </Text>
            </ButtonRounded>
            <DivSpace height-20 />
            <ButtonRounded size = 'lg' blue onPress={()=>{}}>
              <Text h10 semibold>
                {i18n.t('receivedQRPayments.component.buttonCloseApp')}
              </Text>
            </ButtonRounded>
          </View>
          <DivSpace height-30 />
        </BoxBlue>
      </SafeAreaView>
    </SignUpWrapper>
  );
};

export default RechargeReceivedSuccess;
