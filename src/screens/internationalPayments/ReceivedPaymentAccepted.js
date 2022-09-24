import React from 'react';
import { TouchableOpacity, Share } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { scale, moderateScale,verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import {
  View,
  DivSpace,
  NavigationBar,
  BoxBlue,
  ImageComponent,
  Text,
  ResizeImageAvatar,
  ButtonBackHome,
  BoxGradient
} from '@components';
import { moneyFormatter } from '@utils/formatters';
import imageConfirmation from '@assets/brand/imageConfirm.png';
import reloj from '@assets/icons/reloj.png';
import calendar from '@assets/icons/calendar.png';
import select from '@assets/icons/select.png';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import Styles from '@screens/nationalPayments/styles';
import { useSelector } from 'react-redux';

const ReceivedPaymentAccepted = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandThemeImages = userData?.Theme?.images;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const handlePressHome = () => {
    navigation.navigate('MyWallet');
  };

  return (
    <SignUpWrapper>
      <SafeAreaView style={Styles.viewInfoCntc} forceInset={{top: 'always'}}>
        <NavigationBar
          disableExtraTop
          onBack={() => navigation.goBack()}
          body={i18n.t('nationalPayments.component.titleConfirmation')}
          onClose={null}
        />
        <DivSpace height-15 />
        <BoxBlue>
          <View centerH flex-1>
            <DivSpace height-8 />
            <View right marginR-30 style={{ width: '100%' }}>
              <TouchableOpacity onPress={onShare} style={{ backgroundColor: '#232E65',borderRadius: verticalScale(30),padding: verticalScale(10)}}>
                <ImageComponent white source={select} width={scale(16)} height={scale(16)}  />
              </TouchableOpacity>
            </View>
            <DivSpace height-8 />
            <Text white h16 semibold>{i18n.t('nationalPayments.component.textSuccessfulP')}</Text>
            <DivSpace height-15 />
            <BoxGradient >
              <ImageComponent source={brandThemeImages?.imageConfirm?brandThemeImages?.imageConfirm:imageConfirmation} width={verticalScale(60)} height={verticalScale(60)} />
            </BoxGradient>
            <DivSpace height-15 />
            <Text h10 textGray>{i18n.t('nationalPayments.component.textAmount')}</Text>
            <Text medium h32 white>{moneyFormatter(245)}</Text>
            <Text h10 textGray>MXN</Text>
            <DivSpace height-15 />
            <View  textBlueDark row style={{ width: scale(201),height: moderateScale(35),borderRadius: 5}}>
              <View flex-1 centerH centerV row>
                <ImageComponent white source={reloj} width={scale(10)} height={moderateScale(10)}  />
                <DivSpace width-3 />
                <Text h12 white>01:24 PM</Text>
              </View>
              <View centerV>
                <View width-2 textBlueDark style={{ height: moderateScale(30)}}></View>
              </View>
              
              <View flex-1 centerH centerV row>
                <ImageComponent bgBlue06 source={calendar} width={scale(10)} height={moderateScale(10)}  />
                <DivSpace width-3 />
                <Text h12 white>15/08/2020</Text>
              </View>
            </View>
            <DivSpace height-15 />
            <ResizeImageAvatar
              source={''}
              width={60} 
              height={60}
            />
            <DivSpace height-15 />
            <Text h16 white semibold>FERNANDO MORALES</Text>
            <DivSpace height-5 />
            <Text H16 regular bgGray>015523033632</Text>
            <DivSpace height-5 />
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

export default ReceivedPaymentAccepted;
