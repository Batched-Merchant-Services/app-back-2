import React, { useEffect, useState } from 'react';
import {
  DivSpace,
  ImageComponent,
  NavigationBar,
  Text,
  View,
  Link
} from '@components';
import { SafeAreaView, ScrollView, Switch,TouchableOpacity } from 'react-native';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { useSelector, useDispatch } from 'react-redux';
import i18n from '@utils/i18n';
import { scale, verticalScale } from 'react-native-size-matters';
import securityLock from '@assets/brand/securityLock.png';
import rowRight from '@assets/icons/rowRight.png';
import Colors from '@styles/Colors';
import { Page2fa } from '../../store/ducks/user.ducks';

const Auth2fa = ({ navigation, route, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const params = navigation.getParam('page');
  const [isEnabledApp, setIsEnabledApp] = useState(false);
  const [isEnabledEmail, setIsEnabledEmail] = useState(false);
  const [isEnabledSMS, setIsEnabledSMS] = useState(false);

  useEffect(() => {
    console.log('params',params)
    dispatch(Page2fa(params))
    switch (appData?.type2fa) {
      case 1:
        setIsEnabledApp(true);
        break;
      case 2:
        setIsEnabledSMS(true);
        break;
      case 3:
        setIsEnabledEmail(true);
        break;
    }
  }, []);




  const toggleSwitchApp = () => {
    setIsEnabledApp(true);
    setIsEnabledEmail(false);
    setIsEnabledSMS(false);
    navigation.navigate("TwoFactorInstructions")
  }

  const toggleSwitchEmail = () => {
    setIsEnabledEmail(true);
    setIsEnabledApp(false);
    setIsEnabledSMS(false);
    navigation.navigate("Auth2faEmail")
  }

  const toggleSwitchSMS = () => {
    setIsEnabledSMS(true);
    setIsEnabledEmail(false);
    setIsEnabledApp(false);
    navigation.navigate("Auth2faSms");
  }

  const handleGoToOptions = () => {
    navigation.navigate("TwoFactorOptions");

  }

  const handleChangePass = () => {
    navigation.navigate('ChangePasswordInside');
  }



  return (
    <SignUpWrapper >
      <SafeAreaView forceInset={{ top: 'always' }}>
        <NavigationBar
          onBack={() => params !== 'Login'? navigation.goBack(): navigation.navigate("Login")}
          body={i18n.t('Auth2fa.titleSecurity')}
        />
        <ScrollView scrollEventThrottle={16}>
          <DivSpace height-10 />
          <View flex-1 marginH-20>
            <View textBlue01 padding-20 height-240 style={{borderRadius:8}}>
              <Text h13 white center>{i18n.t('Auth2fa.textSecurityOfYourAccount')}</Text>
              <DivSpace height-5 />
              <Text h11 white center>{i18n.t('Auth2fa.textForUsYourSafetyIs')}</Text>
              <DivSpace height-10 />
              <View centerH>
                <ImageComponent
                  source={securityLock}
                  width={scale(100)}
                  height={verticalScale(100)}
                />
              </View>
              <DivSpace height-10 />
              <TouchableOpacity style={{flex:1, alignItems:'center',flexDirection:'row'}} onPress={()=>navigation.navigate("DeleteAccount")}>
                <View flex-1 >
                  <Text h11 white>Eliminar cuenta</Text>
                </View>
                <View right bgBlue01 padding-5 centerV centerH style={{ borderRadius: scale(30), width: scale(30), height: scale(30) }}>
                  <ImageComponent
                    white
                    source={rowRight}
                    width={scale(12)}
                    height={verticalScale(12)}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <DivSpace height-15 />
            <View textBlue01 padding-15  style={{borderRadius:8}}>
              <Text h11 white>{i18n.t('Auth2fa.textEvenIfSomeoneGets')}{' '}<Text semibold white>{i18n.t('Auth2fa.textEachLoginWillBe')}</Text>{' '}{i18n.t('Auth2fa.textThatYouWillGetWhen')}</Text>
              <DivSpace height-15 />
              <View row paddingV-12>
                <View flex-1 left>
                  <Text h14 regular white >{i18n.t('Auth2fa.textTwoFactorAuthenticationApp')}</Text>
                  <DivSpace height-10 />
                  <Link onPress={handleGoToOptions}>
                    <Text h12 orange semibold>{i18n.t('Auth2fa.linkOptions')}</Text>
                  </Link>
                </View>
                <View right >
                  <Switch
                    trackColor={{ false: Colors.textGray, true: Colors.orange }}
                    thumbColor={Colors.textBlue01}
                    onValueChange={toggleSwitchApp}
                    value={isEnabledApp}
                  />
                </View>
              </View>
              <DivSpace height-10 />
              <View flex-1 height-1 disabled/>
              <DivSpace height-10 />
              <View row paddingV-12>
                <View flex-1 left>
                  <Text h14 regular white >{i18n.t('Auth2fa.textAuthenticationVia')}{' '}<Text white semibold>{i18n.t('Auth2fa.textSMS')}</Text></Text>
                </View>
                <View right>
                  <Switch
                    trackColor={{ false: Colors.textGray, true: Colors.orange }}
                    thumbColor={Colors.textBlue01}
                    onValueChange={toggleSwitchSMS}
                    value={isEnabledSMS}
                  />
                </View>
              </View>
              <DivSpace height-10 />
              <View flex-1 height-1 disabled/>
              <DivSpace height-10 />
              <View row paddingV-12>
                <View flex-1 left>
                  <Text h14 regular white>{i18n.t('Auth2fa.textAuthenticationVia')}{' '}<Text white semibold>{i18n.t('Auth2fa.textEmail')}</Text></Text>
                </View>
                <View right>
                  <Switch
                    trackColor={{ false: Colors.textGray, true: Colors.orange }}
                    thumbColor={Colors.textBlue01}
                    onValueChange={toggleSwitchEmail}
                    value={isEnabledEmail}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SignUpWrapper>
  );
}


export default Auth2fa;