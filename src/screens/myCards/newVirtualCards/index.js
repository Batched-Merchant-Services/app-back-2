import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { scale, verticalScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-navigation';
import i18n from '@utils/i18n';
import { Dimensions } from 'react-native';
import {
  DivSpace,
  NavigationBar,
  View
} from '@components';
import Styles from './styles';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import InfoVirtualStepOne from './InfoVirtualStepOne';
import InfoVirtualStepTwo from './InfoVirtualStepTwo';
import InfoVirtualStepThree from './InfoVirtualStepThree';

const CAROUSEL_ITEMS = [
  { element: InfoVirtualStepOne},
  { element: InfoVirtualStepTwo },
  { element: InfoVirtualStepThree },
];

const newVirtualCards = ({ navigation }) => {
  const dispatch = useDispatch();
  const redux = useSelector((state) => state); 
  const [activeSlide, setActiveSlide] = useState(0);

  function renderItem({ item: { element: Element } }) {
    return <Element navigation={navigation} />;
  }

  function handleBackPress() {
    navigation.goBack();
  }

  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView style={Styles.wrapper}>
      <NavigationBar
        onBack={handleBackPress}
        body={i18n.t('myCards.component.generateVirtualCard.titleNewVirtualCard')}
      />
        <DivSpace height-50 />
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
              removeClippedSubviews={false} 
            />
            <Pagination
              containerStyle={{
                paddingHorizontal: 0,
                paddingVertical  : verticalScale(14),
              }}
              dotsLength={CAROUSEL_ITEMS.length}
              activeDotIndex={activeSlide}
              dotStyle={Styles.dotStyle}
              inactiveDotStyle={Styles.inactiveDotStyle}
              inactiveDotOpacity={1}
              inactiveDotScale={1}
            />
          </View>
        </View>
      </SafeAreaView>
    </SignUpWrapper>
  );
};
export default newVirtualCards;
