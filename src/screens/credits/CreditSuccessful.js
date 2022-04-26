import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import {
  View,
  DivSpace,
  NavigationBar,
  BoxBlue,
  ImageComponent,
  Text,
  ButtonBackHome,
  BoxGradient,
  Link
} from '@components';
import { moneyFormatter } from '@utils/formatters';
import imageConfirmation from '@assets/brand/imageConfirm.png';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import Styles from '@screens/nationalPayments/styles';
import { useSelector } from 'react-redux';

const CreditSuccessful = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandThemeImages = userData?.Theme?.images;
  const credit = navigation.getParam('credit');

  const handlePressHome = () => {
    navigation.navigate('MyWallet');
  };
  

  return (
    <SignUpWrapper>
      <SafeAreaView style={Styles.viewInfoCntc} forceInset={{top: 'always'}}>
        <NavigationBar
          disableExtraTop
          onBack={() => navigation.goBack()}
          body={i18n.t('transfers.component.confirmation')}
          onClose={null}
        />
        <DivSpace height-15 />
        <BoxBlue>
          <View centerH flex-1>
            <DivSpace height-23 />
            <Text center white h16 semibold width-200>
              {i18n.t('creditSuccessful.component.title')}
            </Text>
            <DivSpace height-25 />
            <BoxGradient>
              <ImageComponent
                source={brandThemeImages.imageConfirm?brandThemeImages?.imageConfirm:imageConfirmation}
                width={verticalScale(60)}
                height={verticalScale(60)}
              />
            </BoxGradient>
            <DivSpace height-25 />
            <Text h10 textGray>
              {i18n.t('transfers.component.textAmount')}
            </Text>
            <Text medium h32 white>
              {moneyFormatter(credit.amount)}
            </Text>
            <Text h10 textGray>
              {credit.coin}
            </Text>
            <DivSpace height-15 />
            <View center>
              <View width-228>
                <Text h12 white center>
                  {i18n.t('creditSuccessful.component.available1')}{' '}
                  <Text h12 white semibold>
                    {i18n.t('creditSuccessful.component.available2')}
                  </Text>
                </Text>
              </View>
              <DivSpace height-18 />
              <View width-228>
                <Text h12 white center>
                  {i18n.t('creditSuccessful.component.check1')}{' '}
                  <Text h12 white semibold>
                    {i18n.t('creditSuccessful.component.check2')}
                  </Text>
                </Text>
              </View>
            </View>
            <DivSpace height-34 />
            <Link onPress={handlePressHome}>{i18n.t('creditSuccessful.component.details')}</Link>
          </View>
          <View centerH centerV bottom>
            <ButtonBackHome onPress={handlePressHome} />
          </View>
          <DivSpace height-30 />
        </BoxBlue>
      </SafeAreaView>
    </SignUpWrapper>
  );
};

export default CreditSuccessful;
