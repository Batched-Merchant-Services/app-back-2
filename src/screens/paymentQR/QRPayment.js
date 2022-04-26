import React,{useState} from 'react';
import { SafeAreaView } from 'react-navigation';
import { Clipboard } from 'react-native';
import i18n from '@utils/i18n';
import { connect } from 'react-redux';
import {
  NavigationBar,
  SnackBar,
  Text,
  DivSpace,
  View,
  QrCode,
  Link
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { toggleLoginWithFingerprint } from '@store/ducks/user.ducks';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';
import Styles from './styles';

 
const QRPayment = ({ navigation }) => {
  const redux = useSelector(state => state);
  const [title, setTitle] = useState('');
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;

  const handleCopy = () => {
    Clipboard.setString(userData.idUser);
    setSnakVisible(true);
    setTitle(i18n.t('generics.NotificationCopiedText'));
  };

  const handleCloseNotif = () => {
    setSnakVisible(false);
    setActionAnimated(true);
  };


  return (
    <>
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView style={Styles.wrapper} forceInset={{top: 'always'}}>
        <NavigationBar
          disableExtraTop
          onBack={() => navigation.goBack()}
          body={i18n.t('receivedQRPayments.component.titlePayQR')}
          onClose={null}
        />
        <DivSpace height-20 />
        <View height-480 style={Styles.centerQR}>
          <DivSpace height-40 />
          <Text center style={Styles.textGray} semibold>{i18n.t('receivedQRPayments.component.textRecibirPago')}<Text regular style={Styles.textGray}>{' '}{i18n.t('receivedQRPayments.component.textQR')}</Text></Text>
          <DivSpace height-20 />
          <Text center style={Styles.textGray} h14 medium>{i18n.t('receivedQRPayments.component.textShowTheCode')}</Text>
          <DivSpace height-20 />
          <View  centerH centerV>
            <QrCode id={userData.idUser?userData.idUser:'0' } size={220}/>
          </View>
          <View flex-1 bottom>
            <View centerH centerV style={Styles.bordersBottom}>
              <Text style={Styles.textGray}>{i18n.t('receivedQRPayments.component.textOrUseReference')}</Text>
              <Text style={Styles.textGray} semibold center h11>{userData.idUser}</Text>
              <DivSpace height-5 />
              <Link onPress={handleCopy} linkStyle = {{color: brandTheme?.disabled??Colors.disabled}}>{i18n.t('CryptoBalance.component.receiveCrypto.buttonTapInTheBox')}</Link>
              <DivSpace height-2 />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SignUpWrapper>
    <SnackBar
      message={title}
      isVisible={snakVisible}
      onClose={handleCloseNotif}
      animationAction={actionAnimated}
    />
    </>
  );
};
const mapStateToProps = state => ({
  loginWithFingerPrint: state.user.loginWithFingerPrint
});

const mapDispatchToProps = { toggleLoginWithFingerprint };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QRPayment);
