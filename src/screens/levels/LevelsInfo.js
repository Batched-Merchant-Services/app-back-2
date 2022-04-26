import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {  verticalScale } from 'react-native-size-matters';
import {
  View,
  NavigationBar
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import PaginationDot from '@screens/levels/elements/PaginationDot';
import LevelInfoElement from '@screens/levels/elements/LevelInfoElement';
import i18n from '@utils/i18n';
import Styles from '@screens/levels/styles';

const LevelsInfo = ({ navigation }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const CAROUSEL_ITEMS = [
    {
      level     : 1,
      maxAmount : 3200,
      maxCredits: 'Cuatro',
      term      : 'Cinco pagos quincenales',
      points    : '876 - 987',
    },
    {
      level     : 2,
      maxAmount : 3200,
      maxCredits: 'Cuatro',
      term      : 'Cinco pagos quincenales',
      points    : '876 - 987',
    },
    {
      level     : 3,
      maxAmount : 3200,
      maxCredits: 'Cuatro',
      term      : 'Cinco pagos quincenales',
      points    : '876 - 987',
    },
    {
      level     : 4,
      maxAmount : 3200,
      maxCredits: 'Cuatro',
      term      : 'Cinco pagos quincenales',
      points    : '876 - 987',
    },
    {
      level     : 5,
      maxAmount : 3200,
      maxCredits: 'Cuatro',
      term      : 'Cinco pagos quincenales',
      points    : '876 - 987',
    },
    {
      level     : 6,
      maxAmount : 3200,
      maxCredits: 'Cuatro',
      term      : 'Cinco pagos quincenales',
      points    : '876 - 987',
    },
    {
      level     : 7,
      maxAmount : 3200,
      maxCredits: 'Cuatro',
      term      : 'Cinco pagos quincenales',
      points    : '876 - 987',
    },
    {
      level     : 8,
      maxAmount : 3200,
      maxCredits: 'Cuatro',
      term      : 'Cinco pagos quincenales',
      points    : '876 - 987',
    },
    {
      level     : 9,
      maxAmount : 3200,
      maxCredits: 'Cuatro',
      term      : 'Cinco pagos quincenales',
      points    : '876 - 987',
    },
    {
      level     : 10,
      maxAmount : 3200,
      maxCredits: 'Cuatro',
      term      : 'Cinco pagos quincenales',
      points    : '876 - 987',
    }
  ];

  function handlePressBack() {
    navigation.goBack();
  }

  function renderItem({ item }) {
    return <LevelInfoElement {...item} />;
  }

  return (
    <SignUpWrapper keyboardAware={false} forceInset={{ bottom: 'never' }}>
      <NavigationBar onBack={handlePressBack} body={i18n.t('levelDetails.component.title')}/>
      <View flex-1 row >
        <View width-60 style={Styles.paginationWrapper}>
          <Pagination
            containerStyle={Styles.paginationContainer}
            dotContainerStyle={Styles.dotContainer}
            dotsLength={CAROUSEL_ITEMS.length}
            activeDotIndex={activeSlide}
            dotStyle={Styles.dotStyle}
            inactiveDotStyle={Styles.inactiveDotStyle}
            inactiveDotOpacity={1}
            inactiveDotScale={1}
            vertical
            dotElement={<PaginationDot activeSlide={activeSlide} />}
            inactiveDotElement={<PaginationDot activeSlide={activeSlide} />}
          />
        </View>
        <View style={{ marginTop: -80 }}>
          <Carousel
            loop={false}
            inactiveSlideOpacity={1}
            layout={'stack'}
            data={CAROUSEL_ITEMS}
            renderItem={renderItem}
            itemHeight={verticalScale(410)}
            sliderHeight={Dimensions.get('window').height - verticalScale(100)}
            inactiveSlideScale={1}
            layoutCardOffset={40}
            onSnapToItem={index => setActiveSlide(index)}
            vertical
          />
        </View>
      </View>
    </SignUpWrapper>
  );
};

export default LevelsInfo;
