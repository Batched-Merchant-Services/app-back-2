import React, { useEffect, useState } from 'react';
import { View, Text, ButtonRounded, DivSpace, Link, ImageComponent } from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-native';
import i18n from '@utils/i18n';
import { scale, verticalScale } from 'react-native-size-matters';
import IconCode from '@assets/brand/iconCode.png';
import { save2fa } from '../../store/ducks/user.ducks';

const ModalAuth2fa = ({ visible, onRequestClose, getData, onPressOverlay, navigation,login,onPressLater,...props }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.user;
  const authData = redux?.auth;
  const brandTheme = appData?.Theme?.colors;
  const [showButtonModal, setShowButtonModal] = useState(true);




  useEffect(() => {
    setTimeout(() => {
      setShowButtonModal(false);
    }, 5000);
  }, [showButtonModal]);


  function handleGoToActivate() {
    navigation.navigate('Auth2fa',{page: login?'Login':''});
    onPressOverlay();
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View flex-1 centerV centerH style={{ backgroundColor: 'rgba(0, 0, 0, 0.30)' }}>
        <View centerH centerV textBlue01 padding-20 style={{ width: '92%', height: '83%', borderRadius: 8 }}>
          <DivSpace height-30 />
          <Text h14 regular textGray center>{i18n.t('Auth2fa.textActivateTwoFactorAuthentication')}</Text>
          <View centerH>
            <ImageComponent
              source={IconCode}
              width={scale(140)}
              height={verticalScale(140)}
            />
          </View>
          <DivSpace height-10 />
          <Text h12 light textGray center>{i18n.t('Auth2fa.textAddMoreSecurity')}</Text>
          <DivSpace height-20 />
          <Text h12 light textGray center>{i18n.t('Auth2fa.textInCaseOfMakingAMovement')}</Text>
          <DivSpace height-20 />
          <View flex-1 bottom centerH >
            <ButtonRounded
             onPress={handleGoToActivate}
            >
              <Text h11 semibold textBlue01>
                {i18n.t('Auth2fa.textActivate')}
              </Text>
            </ButtonRounded>
            <DivSpace height-20 />
            {login&&(
              <Link onPress={onPressLater}>
                <Text h12 orange left>{i18n.t('Auth2fa.textActivateLater')}</Text>
              </Link>
            )}
          </View>
          <DivSpace height-40 />
        </View>
      </View>
    </Modal>

  )
};

export default ModalAuth2fa;
