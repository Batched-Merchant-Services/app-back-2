import React,{useState} from 'react';
import { SafeAreaView } from 'react-navigation';
import { TouchableOpacity } from 'react-native';
import {
  DivSpace,
  NavigationBar,
  View,
  Text,
  QrCode,
  ButtonBackHome,
  ImageComponent,
  ModalContainer,
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { scale, verticalScale } from 'react-native-size-matters';
import rowDown from '@assets/icons/rowDown.png';

import Styles from './styles';
import i18n from '@utils/i18n';

const EstablecimientosATM = ({ navigation }) => {

  function handlePressHome() {
    navigation.navigate('MyWallet');
  }


  return (
    <SignUpWrapper>
      <SafeAreaView style={Styles.viewInfoCntc} forceInset={{top: 'always'}}>
        <NavigationBar
          disableExtraTop
          onBack={() => navigation.goBack()}
          body={i18n.t('establecimientosATM.component.title')}
        />
        <ModalContainer>
          <View flex-1 centerV centerH>
            <View
              centerH
              paddingH-24
              style={Styles.containerQR}
            >
              <TouchableOpacity>
                <ImageComponent
                  white
                  source={rowDown}
                  width={scale(13)}
                  height={verticalScale(13)}
                />
              </TouchableOpacity>
              <DivSpace height-35 />
              <Text center h14 textBlueDark>
                {i18n.t('establecimientosATM.component.textSelectPayServices')}
              </Text>
              <DivSpace height-20 />
              <Text center h12 textBlueDark>
                {i18n.t('establecimientosATM.component.textScanTheFollowing')}
              </Text>
              <View  centerH centerV>
                <QrCode id={123} name={'guadalupe'} size={190}/>
              </View>
              <Text center h12 textBlueDark>
                {i18n.t('establecimientosATM.component.textOrUseThePayment')}<Text bold textBlueDark>36745827</Text>
              </Text>
              <DivSpace height-20 />
            </View>
            <View>
              <View
                paddingH-40
                centerV
                style={Styles.containerFooter}
              >
                <Text center h12 white>
                  {i18n.t('establecimientosATM.component.textOnceThePayment')}
                </Text>
                <DivSpace height-15 />
                <View centerH centerV bottom>
                  <ButtonBackHome onPress={handlePressHome} />
                </View>
              </View>
            </View>
          </View>
        </ModalContainer>
      </SafeAreaView>
    </SignUpWrapper>
  );
};

export default EstablecimientosATM;
