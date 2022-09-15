import React from 'react';
import {  SafeAreaView } from 'react-native';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import Styles from './styles';
import logoUulala from '@assets/cards/logoViewCard.png';
import { scale, verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import {
  ImageComponent,
  View,
  NavigationBar,
  Text,
  DivSpace,
  BoxVirtualCard
} from '@components';

const ViewCard = ({ navigation }) =>   {
  const params = navigation.getParam('info');
  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView style={{ flex: 1}} forceInset={{top: 'always'}}>
        <NavigationBar
          onBack={() => navigation.goBack()}
          body={i18n.t('myCards.component.titleViewCard')}
          onClose={null}
        />
        <View flex-1 centerH>
          <DivSpace height-10/>
          <Text medium h14 bgBlue06 center>{i18n.t('myCards.component.textCardAvailable')}</Text>
          <DivSpace height-35/>
          <BoxVirtualCard {...params}/>
        </View>
        {/* <View centerH style={Styles.imageBottom}>
          <ImageComponent
            source={logoUulala}
            width={scale(330)}
            height={verticalScale(238)}
          />
        </View> */}
        <Text white h12 center>{i18n.t('myCards.component.modalTextClickOnAny')}</Text>
        <DivSpace height-30/>
      </SafeAreaView>
    </SignUpWrapper>
  );
};

export default ViewCard;
