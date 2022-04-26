import React, { useState } from 'react';
import {   
  DivSpace,
  ImageComponent,
  NavigationBar,
  Text,
  View,
  BoxBlue,
  BoxGradient,
  ButtonRounded, } from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { verticalScale } from 'react-native-size-matters';
import { withNavigationFocus } from 'react-navigation';
import { moneyFormatter } from '@utils/formatters';
import { useSelector } from 'react-redux';
import cardWalletConf from '@assets/brand/cardWallet.png';
import rowRight from '@assets/icons/angle-right-orange.png';
import i18n from '@utils/i18n';


const TransBalanceConfirm = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandThemeImages = userData?.Theme?.images;
  const [currencyUser]=useState(userData?userData.currencyUser:'');
  const data = navigation.getParam('data') ;

  function handlePressLogin() {
    navigation.navigate('MyWallet');
  }

  return (
    <SignUpWrapper>
      <NavigationBar
        disableExtraTop
        onBack={null}
        body={i18n.t('homeWallet.component.Balances.textTitleConfirmation')}
        onClose={null}
      />
      <View flex-1 centerH>
        <DivSpace height-20 />
        <BoxBlue>
          <DivSpace height-40 />
          <View flex-1 centerH marginH-30>
            <Text center white h16 semibold>
              {i18n.t('homeWallet.component.Balances.textBalanceTransfer')}
            </Text>
            <DivSpace height-30 />
            <BoxGradient size={82}>
              <ImageComponent
                source={brandThemeImages?.cardWallet?brandThemeImages?.cardWallet:cardWalletConf}
                width={verticalScale(60)}
                height={verticalScale(60)}
              />
            </BoxGradient>
            <DivSpace height-25 />
            <View row centerH centerV>
              <Text center h12 textGray>
                {data.originName}
              </Text>
              <DivSpace width-5 />
              <ImageComponent
                white
                source={rowRight}
                width={verticalScale(6)}
                height={verticalScale(10)}
              />  
              <DivSpace width-5 />
              <Text center h12 textGray>
                {data.destinyName}
              </Text>
            </View>
            <DivSpace height-10 />
            <Text center h16 white bold>
              {moneyFormatter(data.amount)}
              <Text h16 orange>{' '}{currencyUser}</Text>
            </Text>
            <DivSpace height-40 />
            <Text center h10 textGray>
              {i18n.t('homeWallet.component.Balances.textTheTransferOf')}
            </Text>
            <View centerH bottom flex-1>
              <View centerH centerV bottom>
                <ButtonRounded onPress={handlePressLogin} size={'lg'}>
                  <Text h10 semibold>
                    {i18n.t(
                      'confirmationChangePassword.component.buttonToAccept'
                    )}
                  </Text>
                </ButtonRounded>
              </View>
              <DivSpace height-50 />
            </View>
          </View>
        </BoxBlue>
      </View>
    </SignUpWrapper>
  );
};

export default withNavigationFocus(TransBalanceConfirm);
