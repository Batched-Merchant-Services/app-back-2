import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import { useSelector } from 'react-redux';
import {
  View,
  DivSpace,
  NavigationBar,
  BoxBlue,
  ImageComponent,
  Text,
  ButtonBackHome,
  BoxGradient
} from '@components';
import { moneyFormatter,formatDate } from '@utils/formatters';
import imageConfirmation from '@assets/brand/imageConfirm.png';
import reloj from '@assets/icons/reloj.png';
import calendar from '@assets/icons/calendar.png';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import Styles from '@screens/nationalPayments/styles';

const ContactInformation = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandThemeImages = userData?.Theme?.images;
  const clabe = navigation.getParam('clabe');
  const bank = navigation.getParam('bank');
  const data = navigation.getParam('data');
  const handlePressHome = () => {
    navigation.navigate('MyWallet');
  };
  
  return (
    <SignUpWrapper>
      <SafeAreaView style={Styles.viewInfoCntc} forceInset={{top: 'always'}}>
        <NavigationBar
          disableExtraTop
          onBack={null}
          body={i18n.t('transfers.component.confirmation')}
          onClose={null}
        />
        <DivSpace height-15 />
        <BoxBlue>
          <View centerH flex-1>
            <DivSpace height-23 />
            <Text white h16 semibold>
              {i18n.t('transfers.component.success')}
            </Text>
            <DivSpace height-15 />
            <BoxGradient>
              <ImageComponent
                source={brandThemeImages?.imageConfirm?brandThemeImages?.imageConfirm:imageConfirmation}
                width={verticalScale(60)}
                height={verticalScale(60)}
              />
            </BoxGradient>
            <DivSpace height-15 />
            <Text h10 textGray>
              {i18n.t('transfers.component.textAmount')}
            </Text>
            <Text medium h32 white>
              {moneyFormatter(data.amount)}
            </Text>
            <Text h10 textGray>
              {data.currency}
            </Text>
            <DivSpace height-15 />
            <View center>
              <Text h10 white center>
                {i18n.t('transfers.component.textAccountNumber')}
              </Text>
              <DivSpace height-5 />
              <Text h12 white medium center>
                {clabe}
              </Text>
              <DivSpace height-5 />
              <Text h10 white medium center>
                {bank}
              </Text>
            </View>
            <DivSpace height-15 />
            <View
              row
              bgBlue07
              style={{
                width       : scale(201),
                height      : moderateScale(35),
                borderRadius: 5
              }}
            >
              <View flex-1 centerH centerV row>
                <ImageComponent
                  white
                  source={reloj}
                  width={scale(10)}
                  height={moderateScale(10)}
                />
                <DivSpace width-3 />
                <Text h12 white>
                  {data.hour}{' '}
                </Text>
              </View>
              <View centerV>
                <View
                  width-2
                  textBlueDark
                  style={{
                    height         : moderateScale(30)
                  }}
                />
              </View>
              <View flex-1 centerH centerV row>
                <ImageComponent
                  bgBlue06
                  source={calendar}
                  width={scale(10)}
                  height={moderateScale(10)}
                />
                <DivSpace width-3 />
                <Text h12 white>
                  {formatDate(data.date)}
                </Text>
              </View>
            </View>
            <DivSpace height-15 />
            <Text h10 white>
              {i18n.t('transfers.component.comission')}
            </Text>
            <Text h10 white>
              {moneyFormatter(data.fee)} {data.currency}
            </Text>
            <DivSpace height-21 />
            <View width-178>
              <Text h12 white center>
                {i18n.t('transfers.component.balanceDescription1')}{' '}
                <Text semibold white>
                  {i18n.t('transfers.component.balanceDescription2')}
                </Text>
              </Text>
            </View>
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

export default ContactInformation;
