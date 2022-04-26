import React,{useState} from 'react';
import { SafeAreaView } from 'react-navigation';
import { moneyFormatter } from '@utils/formatters';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import * as Animatable from 'react-native-animatable';
import { NavigationBar, DivSpace, BoxBlue,View,Text,BoxGradient,ImageComponent,Link,ButtonRounded } from '@components';
import { scale,verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import buyOption from '@assets/store/buy.png';
import copy from '@assets/icons/copy.png';
import uber from '@assets/giftCards/uber.png';
import Styles from './styles';

const SuccessfulPurchase = ({ navigation }) => {
  const [buyCredit] = useState(false);

  function handleBack() {
    navigation.navigate('GiftCardsList');
  }
  function handleCopyCode() {
    navigation.navigate('GiftCardsList');
  }
  
  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView style={Styles.wrapper} forceInset={{top: 'always'}}>
        <NavigationBar
          disableExtraTop
          onBack={() => navigation.goBack()}
          body={i18n.t('giftCards.component.titleSuPurchase')}
        />
        <DivSpace height-15 />
        <BoxBlue>
          <View centerH flex-1 marginH-30>
            <DivSpace height-33/>
            <Text h16 medium white center>{buyCredit? i18n.t('giftCards.component.titleSuPurchase'):''}</Text>
            { buyCredit ?
              <View>
                <DivSpace height-30 />
                <BoxGradient size = {82} >
                  <ImageComponent
                    source={buyOption}
                    width={verticalScale(60)}
                    height={verticalScale(60)}
                  />
                </BoxGradient>
              </View> :
              <View centerH>
                <DivSpace height-15 />
                <Animatable.View animation="zoomIn" delay={300} >
                  <View width-229 height-135 centerV centerH style={Styles.containerImageProv}>
                    <ImageComponent
                      source={uber}
                      width={scale(160)}
                      height={verticalScale(58)}
                    />
                  </View>
                </Animatable.View>
              </View>
            
            }
            
            <DivSpace height-30 />
            <Text h12 white center>{buyCredit?i18n.t('giftCards.component.titleReadyToCard'):i18n.t('giftCards.component.textBalanceAvailable')}</Text>
            <DivSpace height-10 />
            {!buyCredit ?
              <View>
                <Text h24 white center semibold>{moneyFormatter(1000)}</Text>
                <DivSpace height-10 />
              </View>
              :
              null
            }
            <Text h12 textGray center medium>Uber</Text>
            <DivSpace height-10 />
            <Text h16 white center semibold>WEFHPICS83</Text>
            <DivSpace height-10 />
            {buyCredit ?
              <View centerH>
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
                      {i18n.t('giftCards.component.buttonViewCard')}
                    </Text>
                  </ButtonRounded>
                  <DivSpace height-20/>
                  <ButtonRounded size='lg' blue onPress={handleBack}>
                    <Text h10  semibold>
                      {i18n.t('giftCards.component.buttonBackToHome')}
                    </Text>
                  </ButtonRounded>
                </View>
              </View> :
              <View centerH >
                <View bgBlue06 centerV width-154 height-18 style={{ borderRadius: 30 }}>
                  <Text center h10 medium white>Validéz 03/21</Text>
                </View>
                <DivSpace height-30 />
                <ButtonRounded size='lg' onPress={handleCopyCode}>
                  <Text h10 semibold>
                    {i18n.t('giftCards.component.buttonCopyCode')}
                  </Text>
                </ButtonRounded>
                <DivSpace height-30 />
                <Text h10 white semibold>{i18n.t('giftCards.component.textOnceTheCode')}</Text>
                <Text h10 white center>{i18n.t('giftCards.component.textYouCanUse')}{' '}<Text bold white>Uber</Text>{' '}{i18n.t('giftCards.component.textOrShareIt')}</Text>
              </View>
            }
          </View>
      
        </BoxBlue>
      </SafeAreaView>
    </SignUpWrapper>
  );
};

export default SuccessfulPurchase;
