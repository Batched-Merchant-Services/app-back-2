import React,{useState} from 'react';
import { SafeAreaView } from 'react-navigation';

import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { NavigationBar, DivSpace, BoxBlue,View,Text,BoxGradient,ImageComponent,Link,ButtonRounded } from '@components';
import { scale,verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import buyOption from '@assets/store/buy.png';
import copy from '@assets/icons/copy.png';
import Styles from './styles';

const ConfirmationBuyStore = ({ navigation }) => {
  const [buyCredit] = useState(true);

  function handleBack() {
    navigation.navigate('ShoppingList');
  }
  
  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView style={Styles.wrapper} forceInset={{top: 'always'}}>
        <NavigationBar
          disableExtraTop
          onBack={() => navigation.goBack()}
          body={'Confirmación'}
        />
        <DivSpace height-15 />
        <BoxBlue>
          <View centerH flex-1 marginH-30>
            <DivSpace height-33/>
            <Text h16 medium white center>{buyCredit? i18n.t('store.component.textSuccessfulPurchase'):i18n.t('store.component.textPurchaseOnCredit')}</Text>
            <DivSpace height-30 />
            <BoxGradient size = {82} >
              <ImageComponent
                source={buyOption}
                width={verticalScale(60)}
                height={verticalScale(60)}
              />
            </BoxGradient>
            <DivSpace height-30 />
            <Text h12 white center>{i18n.t('store.component.textContinueYourPurchase')}</Text>
            <DivSpace height-10 />
            <Text h12 textGray center medium>Liverpool</Text>
            <DivSpace height-10 />
            <Text h16 white center semibold>WEFHPICS83</Text>
            <DivSpace height-10 />
            <View row>
              <ImageComponent
                white
                source={copy}
                width={scale(18)}
                height={verticalScale(18)}
              />
              <DivSpace width-5 />
              <Link onPress={() => {}}>
                <Text h10 medium title>
                  {i18n.t('store.component.linkCopyCode')}
                </Text>
              </Link>
            </View>
            <DivSpace height-10 />
            <Text h10 textGray center>{i18n.t('store.component.textYouCanFind')}<Text semibold>{i18n.t('store.component.textMySavedPurchases')}</Text>{i18n.t('store.component.textIfYouWant')}</Text>
            <DivSpace height-30 />
            <View  centerH>
              <ButtonRounded size='lg'>
                <Text h10 semibold>
                  {i18n.t('store.component.buttonSupplierSite')}
                </Text>
              </ButtonRounded>
              <DivSpace height-20/>
              <ButtonRounded size='lg' blue onPress={handleBack}>
                <Text h10 semibold>
                  {i18n.t('store.component.buttonGoBackUp')}
                </Text>
              </ButtonRounded>
            </View>
          </View>
      
        </BoxBlue>
      </SafeAreaView>
    </SignUpWrapper>
  );
};

export default ConfirmationBuyStore;
