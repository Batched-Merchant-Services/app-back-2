import React, { useState } from 'react';

import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { scale, verticalScale } from 'react-native-size-matters';

import i18n from '@utils/i18n';
import { View,  DivSpace, NavigationBar } from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import Credits from '@screens/nationalPayments/components/PaymentsContacts';
import PaymentsBetweenUsers from '@screens/nationalPayments/components/PaymentsBetweenUsers';
import Colors from '@styles/Colors';
import { useSelector } from 'react-redux';
import Styles from '@screens/nationalPayments/styles';


const CAROUSEL_ITEMS = [
  { element: Credits},
  { element: PaymentsBetweenUsers },
];

const PaymentUsers = ({navigation}) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  const [activeSlide, setActiveSlide] = useState(0);

  // TODO: Load real data...
  const user = {
    name         : '',
    newOffers    : 15,
    level        : 12,
    actualPoints : 234,
    remainPoints : 226,
    nextLevel    : 13,
    percentage   : 65,
    notifications: 6
  };
  
  function renderItem({ item: { element: Element } }) {
    return <Element {...user} navigation={navigation} />;
  }

  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView style={Styles.wrapper} forceInset={{top: 'always'}}>
        <NavigationBar
          onBack={() => navigation.goBack()}
          body={i18n.t('nationalPayments.component.title')}
          onClose={null}
        />
        <DivSpace height-37 />
        <View centerV>
          <View>
            <Carousel
              loop={false}
              data={CAROUSEL_ITEMS}
              renderItem={renderItem}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={scale(285)}
              inactiveSlideOpacity={1}
              onSnapToItem={index => setActiveSlide(index)}
            />
            <Pagination
              containerStyle={{
                paddingHorizontal: 0,
                paddingVertical  : verticalScale(14),
              }}
              dotsLength={CAROUSEL_ITEMS.length}
              activeDotIndex={activeSlide}
              dotStyle={[{backgroundColor: brandTheme?.orange??Colors.orange}]}
              inactiveDotStyle={[{backgroundColor: brandTheme?.white??Colors.white}]}
              inactiveDotOpacity={1}
              inactiveDotScale={1}
            />
          </View>
        </View>
      </SafeAreaView>
    </SignUpWrapper>
  );
};

export default PaymentUsers;
