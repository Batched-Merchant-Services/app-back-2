import React from 'react';
import { 
  View,
  Text,
  DivSpace,
  NavigationBar
} from '@components';

import { verticalScale } from 'react-native-size-matters';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import i18n from '@utils/i18n';
import Styles from './styles';
import PinView from 'react-native-pin-view';
import LocalStorage from '@utils/localStorage';
import Colors from '@styles/Colors';

const AppNewPin = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const data = navigation.getParam('data') || {};
  const next = navigation.getParam('next');

  const onComplete= async (inputtedPin, clear) =>{
    const PinConfirm = inputtedPin;
    await LocalStorage.set('AppConfirmationPin', PinConfirm);
    if(inputtedPin.length < 6){
      clear();
    }else{
      navigation.navigate('AppConfirmationPin', {next, data, page: 'AppNewPin'}); 
    }
  };
  
  return (
    <View flex-1 textBlueDark>
      <View style={Styles.containerPin}>
        <DivSpace height-30 />
        <NavigationBar
          body={i18n.t('AppNewPin.component.title')}
          onClose={null}
          Style={[Styles.buttonBack,{backgroundColor: brandTheme.textBlue01??Colors?.textBlue01 }]}
          textStyle={[Styles.textTitle,{color:brandTheme.white??Colors?.white}]}
        />
        <View paddingH-55>
          <DivSpace height-20 />
          <Text h12 textGray regular center>{i18n.t('AppNewPin.component.textYouWillUseIt')}</Text>
          <DivSpace height-10 />
          <Text h12 white regular center>{i18n.t('AppNewPin.component.textSixDigits')}:</Text>
        </View>
        <DivSpace height-15 />
        <PinView
          pinLength={6}
          buttonTextColor={brandTheme.textBlue01??Colors?.textBlue01}
          buttonBgColor={brandTheme.bgOrange02??Colors?.bgOrange02}
          inputBgColor={brandTheme.white??Colors?.white}
          inputBgOpacity={0.5}
          inputActiveBgColor={brandTheme.textBlue01??Colors?.textBlue01}
          onComplete={onComplete}
          inputViewStyle={{width: verticalScale(25), height: verticalScale(25)}}
        />
      </View>
    </View>
  );
};

export default withNavigationFocus(AppNewPin);
