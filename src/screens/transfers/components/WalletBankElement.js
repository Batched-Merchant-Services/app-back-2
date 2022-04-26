import React,{useState} from 'react';
import i18n from '@utils/i18n';
import { scale, verticalScale } from 'react-native-size-matters';
import { Text, View, DivSpace, ImageComponent, ButtonRounded,ModalDisabled } from '@components';
import Styles from '@screens/transfers/styles';
import WalletBank from '@assets/transfers/wallet-bank.png';
import IconWarning from '../../../utils/iconSVG/IconWarning';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';

const WalletBankElement = ({
  isProfileComplete,
  navigation
}) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const [showModal,setShowModal] = useState(false);
  function handleTransferWalletBank() {
    navigation.navigate('TransferWalletBank');
    setShowModal(true);
  }
  
 
  return (
    <View textBlueDark style={Styles.carouselItem} centerH>
      <DivSpace height-28 />
      <ImageComponent source={WalletBank} width={99} height={40} />
      <DivSpace height-100 />
      <View width-190>
        <Text h14 white center>
          <Text bold white>
            {i18n.t('transfers.component.walletTransferDescription1')}{' '}
          </Text>
          <Text regular white>
            {i18n.t('transfers.component.walletTransferDescription2')}
          </Text>
        </Text>
      </View>
      {!isProfileComplete ? (
        <>
          <View flex-1 bottom paddingH-25>
            <View paddingH-30>
              <ButtonRounded sm inactive onPress={handleTransferWalletBank}>
                <Text h10 semibold>
                  {i18n.t('transfers.component.next')}
                </Text>
              </ButtonRounded>
            </View>
            <DivSpace height-40 />
            <Text h10 white center >
              {i18n.t('transfers.component.textYourBalanceWillBeReflectedIn')}
            </Text>
            <DivSpace height-40 />
          </View>
         
        </>
      ) : (
        <>
          <DivSpace height-21 />
          <IconWarning width={scale(10)} height={verticalScale(10)}  fill={brandTheme?.bgBlue06??Colors?.bgBlue06}/>
          <View width-177>
            <Text h12 center orange>
              {i18n.t('transfers.component.incompleteProfile1')}{' '}
              <Text semibold white>
                {i18n.t('transfers.component.incompleteProfile2')}{' '}
              </Text>
              {i18n.t('transfers.component.incompleteProfile3')}
            </Text>
          </View>
          <DivSpace height-43 />
          <ButtonRounded size="md" blue>
            <Text h10 semibold>
              {i18n.t('transfers.component.complete')}
            </Text>
          </ButtonRounded>
        </>
      )}
      <ModalDisabled isOpen={showModal} navigation={navigation}/>
    </View>
  );
};

export default WalletBankElement;
