import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import i18n from '@utils/i18n';
import {
  Text,
  View,
  DivSpace,
  NavigationBar,
  BoxCardLevel
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import Styles from './styles';



const BuyPoints = ({ navigation }) => {
  const cardsLevels = [{description:'Mejor Oferta',price: 500,points: 123},{description:'Más Vendido',price: 300,points: 243},{description:'',price: 300,points: 243},{description:'Más Vendido',price: 300,points: 243}];

  const handlePressNext = async () => { 
    navigation.navigate('DetailBuyPoints');
    
  };
  return (
    <SignUpWrapper>
      <SafeAreaView style={Styles.viewInfoCntc} forceInset={{top: 'always'}}>
        <NavigationBar
          disableExtraTop
          onBack={() => navigation.goBack()}
          body={i18n.t('buyPoints.component.titleBuyPoints')}
          onClose={null}
        />
        <ScrollView>
          <View marginH-20 marginV-20>
            <Text h16 white>{i18n.t('levels.component.textIncreaseRapidly')}</Text>
            <Text h16 white bold>{i18n.t('levels.component.textYourLevel')}</Text>
            <DivSpace height-10 />
            <Text h12 white>{i18n.t('levels.component.textInAdditionTo')}{' '}<Text h12 bold>{i18n.t('levels.component.textIncreaseYourLevel')}</Text></Text>
            <DivSpace height-20/>
            {cardsLevels.map((item, key) =>
              <View>
                <BoxCardLevel title={item.description} price={item.price} points={item.points} onPress={handlePressNext} />
                <DivSpace height-15/>
              </View> 
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SignUpWrapper>
  );
};

export default BuyPoints;
