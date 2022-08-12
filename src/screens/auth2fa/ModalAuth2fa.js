import React, { useEffect, useState } from 'react';
import { View, Text, ButtonRounded, DivSpace,Link,ImageComponent } from '@components';
import { Modal,Clipboard } from 'react-native';
import { useSelector } from 'react-redux';
import { formatDate } from '@utils/formatters';
import i18n from '@utils/i18n';
//import Clipboard from '@react-native-community/clipboard';
import { scale, verticalScale } from 'react-native-size-matters';
import Styles from './styles';
import IconWarning from '../../utils/iconSVG/IconWarning';
import Colors from '@styles/Colors';
import IconCode from '@assets/brand/iconCode.png';

const ModalAuth2fa = ({ visible, onRequestClose, getData, onPressOverlay, ...props }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const authData = redux?.auth;
  const brandTheme = appData?.Theme?.colors;
  const [showButtonModal, setShowButtonModal] = useState(true);
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [title, setTitle] = useState('');
  const [clabe, setClabe] = useState(appData?.clabeQr);


  useEffect(() => {
    setClabe(authData?.dataQrCode?.secretCode??clabe)
  }, [authData?.dataQrCode]);

  useEffect(() => {
    setTimeout(() => {
      setShowButtonModal(false);
    }, 5000);
  }, [showButtonModal]);
  
  const copyToClipboard = () => {
    Clipboard.setString(clabe);
    setSnakVisible(true);
    setTitle(i18n.t('generics.NotificationCopiedText'));
  }

  const closeSnack = () => {
    setSnakVisible(false);
    setActionAnimated(true);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View flex-1 centerV centerH  style={{backgroundColor:'rgba(0, 0, 0, 0.30)'}}>
        <View centerH centerV textBlue01 padding-20 style={{ width: '92%', height: '83%' ,borderRadius:8}}>
          <DivSpace height-20 />
          <Text h14 regular textGray>{i18n.t('Auth2fa.textDontForgetTo')}!</Text>
          <View centerH>
            <ImageComponent
              source={IconCode}
              width={scale(130)}
              height={verticalScale(130)}
            />
          </View>
          <DivSpace height-10 />
          <Text h11 light textGray>{i18n.t('Auth2fa.textIsTheFormOf')}{' '}<Text textGray semibold>{i18n.t('Auth2fa.textRecoverYourAuthenticationIn')}</Text></Text>
          <DivSpace height-10 />
          <View bgBlue01 padding-10 style={{ borderRadius: 8,width:'100%' }}>
            <Text h11 textGray medium>{i18n.t('Auth2fa.textSecurityKey')}:</Text>
            <DivSpace height-5 />
            <Text textGray h12 semibold>{clabe}</Text>
            <DivSpace height-5 />
            <Link onPress={copyToClipboard}>
              <Text h12 orange left>{i18n.t('CryptoBalance.component.rechargeCrypto.textTapTheBoxToCopy')}</Text>
            </Link>
          </View>
          <DivSpace height-20 />
          <View row paddingH-10 centerV style={{backgroundColor:'#ED931E'}} height-55>
            <IconWarning width={scale(20)} height={verticalScale(20)} fill={brandTheme?.bgOrange01 ?? Colors?.bgOrange01} fillSecondary={brandTheme?.bgBlue01 ?? Colors?.bgBlue01} />
            <DivSpace width-10 />
            <View flex-1>
              <Text h12 semibold textBlue01>{i18n.t('Auth2fa.textKeepYourKeyWhere')},{' '}<Text regular textBlue01>{i18n.t('Auth2fa.textItWillBeRequired')}</Text></Text>
            </View>
          </View>
          <DivSpace height-20 />
          <Text h12 regular textGray>{i18n.t('Auth2fa.textNeverShareYour')}</Text>
          <DivSpace height-20 />
          <View flex-1 bottom centerH >
            <ButtonRounded
              onPress={onPressOverlay}
              disabled={showButtonModal}
            >
              <Text h11 semibold textBlue01>
                Volver a seguridad
              </Text>
            </ButtonRounded>
          </View>
        </View>
      </View>
    </Modal>

  )
};

export default ModalAuth2fa;
