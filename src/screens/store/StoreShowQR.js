import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { scale } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import {
  NavigationBar,
  Text,
  DivSpace,
  View,
  QrCode,
  ImageComponent
} from '@components';
import { toggleLoginWithFingerprint } from '@store/ducks/user.ducks';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';
import Styles from './styles';
import Credit from '@assets/credits/credit-image.png';
import Scan from '@assets/icons/scan.png';

const StoreShowQR = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const handleQRPress = () => navigation.navigate('StoreScanQR');

  const renderIcon = () => {
    return (
      <TouchableOpacity style={[Styles.buttonLztn,{backgroundColor: brandTheme?.textBlueDark??Colors.textBlueDark}]} onPress={handleQRPress}>
        <ImageComponent source={Scan} height={scale(35)} width={scale(35)} />
      </TouchableOpacity>
    );
  };

  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView style={Styles.wrapper} forceInset={{top: 'always'}}>
        <NavigationBar
          disableExtraTop
          onBack={() => navigation.goBack()}
          body={'Compra a crédito\nen establecimiento'}
          onClose={renderIcon()}
        />
        <DivSpace height-20 />
        <View centerH centerV>
          <View style={Styles.centerQR}>
            <DivSpace height-19 />
            <View centerH>
              <View
                padding-9
                style={{
                  backgroundColor: 'white',
                  borderRadius   : 6,
                  shadowColor    : '#000',
                  shadowOffset   : {
                    width : 0,
                    height: 2
                  },
                  shadowOpacity: 0.2,
                  shadowRadius : 4,
                  elevation    : 2
                }}
              >
                <ImageComponent source={Credit} width={89} height={27} />
              </View>
            </View>
            <DivSpace height-20 />
            <Text medium h12 textGray center>
              Liverpool
            </Text>
            <DivSpace height-5 />
            <Text h14 center textBlueDark medium>
              Muestra el código para{'\n'}adquirir el crédito
            </Text>
              <View  centerH centerV>
                <QrCode id={123} name={'guadalupe'} size={190}/>
              </View>
            <View marginH-34 row centerH>
              <Text h12 textBlueDark>
                O la referencia:{' '}
              </Text>
              <Text h12 textBlueDark semibold>
                73649490
              </Text>
            </View>
            <DivSpace height-22 />
            <View centerH centerV bottom textBlueDark style={[Styles.bordersBottom]}>
              <Text center h10>
                Una vez escaneádo el código se realizará la{'\n'}compra y podrás
                verificar el status en la{'\n'}sección{' '}
                <Text semibold>“Mis créditos”</Text>
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SignUpWrapper>
  );
};
const mapStateToProps = state => ({
  loginWithFingerPrint: state.user.loginWithFingerPrint
});

const mapDispatchToProps = { toggleLoginWithFingerprint };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreShowQR);
