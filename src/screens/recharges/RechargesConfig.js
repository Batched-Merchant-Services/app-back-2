import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { verticalScale } from 'react-native-size-matters';
import { Switch } from 'react-native-switch';
import i18n from '@utils/i18n';
import {
  View,
  DivSpace,
  BoxBlue,
  ImageComponent,
  Text,
  ButtonRounded,
  NavigationBar 
} from '@components';
import { moneyFormatter } from '@utils/formatters';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import Styles from '@screens/recharges/styles';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';
import Config from '@assets/recharges/config.png';
import Minus from '@assets/recharges/minus.png';
import Plus from '@assets/recharges/plus.png';
import Available from '@assets/recharges/available.png';
import NoAvailable from '@assets/recharges/no-available.png';
import Eye from '@assets/recharges/eye.png';

const RechargesConfig = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;

  const [amount, setAmount] = useState(3.5);
  const [available, setAvailable] = useState(true);

  function increaseAmount() {
    const newAmount = amount + 0.5;
    setAmount(newAmount);
  }

  function decreaseAmount() {
    const newAmount = amount - 0.5;
    setAmount(newAmount < 0 ? 0 : newAmount);
  }

  const data = {
    coin    : 'MXN',
    userName: 'Fernando Morales'
  };

  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView style={Styles.viewInfoCntc} forceInset={{top: 'always'}}>
        <NavigationBar
          disableExtraTop
          onBack={() => navigation.goBack()}
          body={'Configurar comisión'}
          subtitle={'Persona a Persona'}
          onClose={null}
        />
        <DivSpace height-17 />
        <BoxBlue containerStyle={{ height: verticalScale(500) }}>
          <View flex-2 centerH>
            <DivSpace height-25 />
            <ImageComponent source={Config} width={36} height={30} />
            <DivSpace height-18 />
            <View width-260>
              <Text h14 center white>
                <Text semibold white>{i18n.t('rechargesConfig.component.commissionDescription1')}</Text>{' '}
                {i18n.t('rechargesConfig.component.commissionDescription2')}
              </Text>
            </View>
            <DivSpace height-21 />
            <View centerV centerH width-260 row>
              <View>
                <TouchableOpacity onPress={decreaseAmount}>
                  <ImageComponent source={Minus} height={35} width={35} />
                </TouchableOpacity>
              </View>
              <View flex-1>
                <Text h10 regular center white>
                  {i18n.t('rechargesConfig.component.yourCommission')}
                </Text>
                <Text h32 center white>
                  {moneyFormatter(amount)}
                </Text>
                <Text h10 regular center white>
                  {data.coin}
                </Text>
              </View>
              <View>
                <TouchableOpacity onPress={increaseAmount}>
                  <ImageComponent source={Plus} height={35} width={35} />
                </TouchableOpacity>
              </View>
            </View>
            <DivSpace height-16 />
            <View width-270>
              <Text h10 center white>
                {i18n.t('rechargesConfig.component.description1')}{' '}
                <Text semibold white>{i18n.t('rechargesConfig.component.description2')}{' '}</Text>
                {i18n.t('rechargesConfig.component.description3')}
              </Text>
            </View>
            <DivSpace height-23 />
            <View>
              <Switch
                value={available}
                onValueChange={setAvailable}
                circleSize={30}
                backgroundActive={brandTheme?.white??Colors.white}
                backgroundInactive={brandTheme?.white??Colors.white}
                switchWidthMultiplier={1.73}
                circleBorderWidth={0}
                circleActiveColor={'white'}
                circleInActiveColor={'white'}
                renderInsideCircle={() => (
                  <ImageComponent white source={Eye} width={16} height={10} />
                )}
              />
            </View>
            <DivSpace height-11 />
            <Text h10 semibold white>
              {i18n.t('rechargesConfig.component.available')}
            </Text>
            <DivSpace height-18 />
            <Text h10 textGray>
              {i18n.t('rechargesConfig.component.verify1')}{' '}
              <Text textGray semibold>
                {i18n.t('rechargesConfig.component.verify2')}
              </Text>
            </Text>
            <DivSpace height-15 />
            <View width-260 row center>
              <View flex-1 centerV centerH>
                <ImageComponent source={NoAvailable} width={44} height={46} />
                <DivSpace height-7 />
                <Text h10 textGray>
                  {i18n.t('rechargesConfig.component.notAvailable')}
                </Text>
              </View>
              <View flex-1 centerV centerH>
                <ImageComponent source={Available} width={44} height={46} />
                <DivSpace height-7 />
                <Text h10 textGray>
                  {i18n.t('rechargesConfig.component.available')}
                </Text>
              </View>
            </View>
            <DivSpace height-25 />
            <ButtonRounded style={{ width: 144 }}>
              <Text h10 semibold>
                {i18n.t('rechargesConfig.component.save')}
              </Text>
            </ButtonRounded>
          </View>
        </BoxBlue>
      </SafeAreaView>
    </SignUpWrapper>
  );
};

export default RechargesConfig;
