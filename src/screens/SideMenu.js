import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import { scale } from 'react-native-size-matters';
//import {  DrawerActions } from '@react-navigation/native';
import { toggleLoginWithFingerprint } from '@store/ducks/user.ducks';
import i18n from '@utils/i18n';
import Ripple from 'react-native-material-ripple';
import Styles from '@screens/styles';
import Back from '@assets/icons/back-white.png';
import logoUulala from '@assets/brand/welcome_back.png';
import Angle from '@assets/icons/angle-right.png';
import rowDisabled from '@assets/icons/blueRowRight.png';
import Exit from '@assets/icons/exit.png';
import DeviceInfo from 'react-native-device-info';
import { useSelector,useDispatch } from 'react-redux';
import {saveTheme} from '@store/ducks/user.ducks';
import Colors from '@styles/Colors';
import { 
  Text,
  View,
  ImageComponent,
  DivSpace,
} from '@components';
import IconBorderRowLeft from '../utils/iconSVG/IconBorderRowLeft';


const SideMenu = ({ navigation }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const brandThemeImages = appData?.Theme?.images;


  function drawerTriggerPress() {
    navigation.dispatch(navigation.closeDrawer());
  }
  function handleMyProfile() {
    navigation.navigate('MyProfile');
  }
  function handlePressWelcome() {
    navigation.navigate('Welcome');
  }
  function handleContactPress() {
    navigation.navigate('Contact');
  }
  function handleConfiguration() {
    navigation.navigate('Configuration');
  }
  function handleAboutSavvy() {
    navigation.navigate('AboutSavvy');
  }

  function handleScanQRPress() {
    navigation.navigate('StoreScanQR');
  }

  async function handleExitPress() {
   
    global.store.dispatch({
      type   : 'SET_IS_MODAL_OPEN',
      payload: 'closing'
    }); 
    setTimeout(function(){
      navigation.navigate('Login'); 
    }, 1000);
    navigation.dispatch(navigation.closeDrawer()); 
  }

  return (
    <View flex-1  style={[Styles.menuWrapper,{backgroundColor: brandTheme?.textBlue01??Colors.textBlue01}]}>
      <View style={Styles.menuHeader} row centerV>
        <Ripple onPress={drawerTriggerPress} style={Styles.containerShow}>
          <IconBorderRowLeft width={30} height={30}  fill={brandTheme?.bgBlue06??Colors?.bgBlue06}/>
        </Ripple>
        <ImageComponent source={brandThemeImages?.uulalaLogo?brandThemeImages?.uulalaLogo:logoUulala} width={scale(76)} height={scale(24)} />
      </View>
      <DivSpace height-32 />
      <View>
        <Ripple style={Styles.menuEl} onPress={handleMyProfile}>
          <View
            style={Styles.menuText}
            row
            centerV
            paddingV-13
            paddingL-30
            paddingR-5
          >
            <Text h17 medium white>
              {i18n.t('sideMenu.component.profile')}
            </Text>
            <ImageComponent source={Angle} white width={scale(9)} height={scale(18)} />
          </View>
        </Ripple>
       
        <Ripple style={Styles.menuEl} onPress={handlePressWelcome}>
          <View
            style={Styles.menuText}
            row
            centerV
            paddingV-13
            paddingL-30
            paddingR-5
          >
            <Text h17 medium white>
              {i18n.t('sideMenu.component.welcome')}
            </Text>
            <ImageComponent source={Angle} white width={scale(9)} height={scale(18)} />
          </View>
        </Ripple>
        <Ripple style={Styles.menuEl} onPress={handleContactPress}>
          <View
            style={Styles.menuText}
            row
            centerV
            paddingV-13
            paddingL-30
            paddingR-5
          >
            <Text h17 medium white>
              {i18n.t('sideMenu.component.contact')}
            </Text>
            <ImageComponent source={Angle} white width={scale(9)} height={scale(18)} />
          </View>
        </Ripple>
        <Ripple style={Styles.menuEl} onPress={handleScanQRPress}>
          <View
            style={Styles.menuText}
            row
            centerV
            paddingV-13
            paddingL-30
            paddingR-5
          >
            <Text h17 medium white>
              {i18n.t('sideMenu.component.qr')}
            </Text>
            <ImageComponent source={Angle} white width={scale(9)} height={scale(18)} />
          </View>
        </Ripple>
        <Ripple style={Styles.menuEl} onPress={handleConfiguration}>
          <View
            style={Styles.menuText}
            row
            centerV
            paddingV-13
            paddingL-30
            paddingR-5
          >
            <Text h17 medium white>
              {i18n.t('sideMenu.component.configuration')}
            </Text>
            <ImageComponent source={Angle} white width={scale(9)} height={scale(18)} />
          </View>
        </Ripple>
      </View>
      <View flex-1 bottom marginB-40>
        <Ripple style={Styles.menuEl} onPress={handleExitPress}>
          <View
            style={Styles.menuText}
            row
            centerV
            paddingV-13
            paddingL-30
            paddingR-5
          >
            <Text h17 medium white>
              {i18n.t('sideMenu.component.exit')}
            </Text>
            <ImageComponent source={Exit} white width={scale(20)} height={scale(20)} />
          </View>
        </Ripple>
        <DivSpace height-15 />
        <View marginL-30>
          <Text regular h12 white>
            {DeviceInfo.getVersion()}{' '}B{DeviceInfo.getBuildNumber()}
          </Text>
        </View>
      </View>
    </View>
  );
};
const mapStateToProps = state => ({
  loginWithFingerPrint: state.user.loginWithFingerPrint,
  Theme               : state.user.Theme
});

const mapDispatchToProps = { toggleLoginWithFingerprint,saveTheme };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);
