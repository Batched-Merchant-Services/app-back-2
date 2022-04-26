import React, { useState, Fragment } from 'react';
import { scale } from 'react-native-size-matters';
import Ripple from 'react-native-material-ripple';
import { View, BoxGradient, Text, DivSpace } from '@components';
import * as Animatable from 'react-native-animatable';
import { withNavigationFocus } from 'react-navigation';
import ModalSwift from '@screens/myCards/components/ModalSwift';
import i18n from '@utils/i18n';
import Styles from '../styles';
import { useSelector } from 'react-redux';
import IconRequestCash from '@utils/iconSVG/IconRequestCash';
import IconLetter from '@utils/iconSVG/IconLetter';
import IconHistory from '@utils/iconSVG/IconHistory';
import Colors from '@styles/Colors';
import IconBook from '@utils/iconSVG/IconBook';


const CardRequestCard = ({ navigation, dataVirtual }) => {
  const [isSwift, setIsSwift] = useState(false);
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;




  function handleRechargePress() {
    navigation.navigate('RechargeCard', { dataBackup: dataVirtual });
  }

  function handleHistoricTransaction() {
    navigation.navigate('Historics', { page: 'card', dataBackup: dataVirtual });
  }

  function handleUpdateCard() {
    navigation.navigate('UpdateVirtualCard', { page: 'card', dataBackup: dataVirtual });
  }


  function handleInstruction() {
    setIsSwift(true);
  }
  const handleOncloseModal = () => {
    setIsSwift(false);
  };

  return (
    <View style={{ width: '100%' }}>
      {navigation.isFocused() && <View
        style={Styles.animation}
        textBlue01
        marginT-17
        marginH-10
        height-106
        paddingV-16
        row
      >
        {!dataVirtual?.statusRequestCard && (
          <Animatable.View style={Styles.containerButton} animation="flipInX" delay={150}>
            <Ripple rippleDuration={800} style={{ flex: 1 }} onPress={handleInstruction}>
              <View flex-1 centerH>
                <BoxGradient blue size={scale(41)}>
                  <IconBook width={26} height={26} fill={brandTheme?.orange ?? Colors?.orange} fillSecondary={brandTheme?.white ?? Colors?.white} />
                </BoxGradient>
                <DivSpace height-6 />
                <Text h10 medium center white>
                  {i18n.t('myCards.component.buttonVirtualCardInstructions')}
                </Text>
              </View>
            </Ripple>
          </Animatable.View>
        )}
        {dataVirtual?.statusRequestCard && (
          <Fragment>
            <Animatable.View style={Styles.containerButton} animation="flipInX" >
              <Ripple style={{ flex: 1 }} onPress={handleRechargePress}>
                <View flex-1 centerH>
                  <BoxGradient blue size={scale(41)}>
                    <IconRequestCash width={30} height={30} fill={brandTheme?.orange ?? Colors?.orange} fillSecondary={brandTheme?.white ?? Colors?.white} />
                  </BoxGradient>
                  <DivSpace height-6 />
                  <Text h10 medium center white>
                    {i18n.t('myCards.component.rechargeAction')}
                  </Text>
                </View>
              </Ripple>
            </Animatable.View>
            <Animatable.View style={Styles.containerButton} animation="flipInX" delay={150}>
              <Ripple rippleDuration={800} style={{ flex: 1 }} onPress={handleHistoricTransaction}>
                <View flex-1 centerH>
                  <BoxGradient blue size={scale(41)}>
                    <IconHistory width={26} height={26} fill={brandTheme?.orange ?? Colors?.orange} fillSecondary={brandTheme?.white ?? Colors?.white} />
                  </BoxGradient>
                  <DivSpace height-6 />
                  <Text h10 medium center white>
                    {i18n.t('myCards.component.movementsAction')}
                  </Text>
                </View>
              </Ripple>
            </Animatable.View>
            <Animatable.View style={Styles.containerButton} animation="flipInX" delay={300}>
              <Ripple style={{ flex: 1 }} onPress={handleUpdateCard}>
                <View flex-1 centerH>
                  <BoxGradient blue size={scale(41)}>
                    <IconLetter width={26} height={26} fill={brandTheme?.orange ?? Colors?.orange} fillSecondary={brandTheme?.white ?? Colors?.white} />
                  </BoxGradient>
                  <DivSpace height-6 />
                  <Text h10 medium center white>
                    {i18n.t('myCards.component.updateCardAction')}
                  </Text>
                </View>
              </Ripple>
            </Animatable.View>
          </Fragment>
        )}
      </View>}
      {isSwift && (
        <ModalSwift
          isOpen={true}
          onClose={handleOncloseModal}
          navigation={navigation}
          page={'listAction'} />
      )}
    </View>
  );
};

export default withNavigationFocus(CardRequestCard);
