import React from 'react';

import { NavigationBar, Text, DivSpace, View } from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import * as Animatable from 'react-native-animatable';
import { withNavigationFocus } from 'react-navigation';
import i18n from '@utils/i18n';
import CategoryOption from '@screens/store/components/CategoryOption';
import BlackFriday from '@assets/store/blackfriday.png';
import Gastronomy from '@assets/store/gastronomy.png';
import Health from '@assets/store/health.png';
import Products from '@assets/store/products.png';
import Travel from '@assets/store/travel.png';
import Beauty from '@assets/store/beauty.png';
import Services from '@assets/store/services.png';
import Entertainment from '@assets/store/entertainment.png';

const StoreCategoryScreen = ({ navigation }) => {

  function handleCategoryPress() {
    return navigation.navigate('ShoppingList');
  }

  return (
    <SignUpWrapper>
      <NavigationBar
        disableExtraTop
        onBack={() => navigation.goBack()}
        body={'Categories'}
        onClose={null}
      />
      <DivSpace height-35 />
      {navigation.isFocused() && <View>
        <View row height-100>
          <Animatable.View style={{flex:1, alignItems:'center', justifyContent:'center'}}  animation="fadeInUp">
            <CategoryOption
              onPress={handleCategoryPress}
              badge={12}
              image={BlackFriday}
              label={'Featured'}
              width={72}
              height={41}
              white
            />
          </Animatable.View>
          <Animatable.View style={{flex:1, alignItems:'center', justifyContent:'center'}}  animation="fadeInUp" delay={150}>
            <CategoryOption
              onPress={handleCategoryPress}
              badge={182}
              image={Gastronomy}
              label={'Gastronomy'}
              width={33}
              height={33}
            />
          </Animatable.View>
          <Animatable.View style={{flex:1, alignItems:'center', justifyContent:'center'}}  animation="fadeInUp" delay={300}>
            <CategoryOption
              onPress={handleCategoryPress}
              badge={34}
              image={Health}
              label={'Health & Wellness'}
              width={32}
              height={32}
            />
          </Animatable.View>
        </View>
        <DivSpace height-45 />
        <View row height-100>
          <Animatable.View style={{flex:1, alignItems:'center', justifyContent:'center'}}  animation="fadeInUp" delay={450}>
            <CategoryOption
              onPress={handleCategoryPress}
              badge={26}
              image={Products}
              label={'Products'}
              width={32}
              height={30}
            />
          </Animatable.View>
          <Animatable.View style={{flex:1, alignItems:'center', justifyContent:'center'}}  animation="fadeInUp" delay={600}>
            <CategoryOption
              onPress={handleCategoryPress}
              badge={18}
              image={Travel}
              label={'Travel'}
              width={35}
              height={35}
            />
          </Animatable.View>
          <Animatable.View style={{flex:1, alignItems:'center', justifyContent:'center'}}  animation="fadeInUp" delay={750}>
            <CategoryOption
              onPress={handleCategoryPress}
              badge={13}
              image={Beauty}
              label={'Beauty'}
              width={28}
              height={37}
            />
          </Animatable.View>
        </View>
        <DivSpace height-45 />
        <View row height-100>
          <Animatable.View style={{flex:1, alignItems:'center', justifyContent:'center'}}  animation="fadeInUp" delay={900}>
            <CategoryOption
              onPress={handleCategoryPress}
              badge={15}
              image={Services}
              label={'Services'}
              width={32}
              height={30}
            />
          </Animatable.View>
          <Animatable.View style={{flex:1, alignItems:'center', justifyContent:'center'}}  animation="fadeInUp" delay={1050}>
            <CategoryOption
              onPress={handleCategoryPress}
              badge={12}
              image={Entertainment}
              label={'Entertainment'}
              width={35}
              height={35}
            />
          </Animatable.View>
        </View>
      </View>}
    </SignUpWrapper>
  );
};

export default withNavigationFocus(StoreCategoryScreen);
