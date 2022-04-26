import React, { useState,useEffect } from 'react';
import i18n from '@utils/i18n';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { scale, verticalScale } from 'react-native-size-matters';
import { View, DivSpace, NavigationBar } from '@components';
import { getAcountUulala } from '@utils/api/switch';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import LocalStorage from '@utils/localStorage';
import WalletBankElement from '@screens/transfers/components/WalletBankElement';
import BankWalletElement from '@screens/transfers/components/BankWalletElement';
import Colors from '@styles/Colors';

import { useSelector } from 'react-redux';
const CAROUSEL_ITEMS = [
  { element: WalletBankElement },
  { element: BankWalletElement }
];

const Transfers = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;

  const [activeSlide, setActiveSlide] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    getInfoTransfer();
  }, []);

  async function getInfoTransfer () {
    const token = await LocalStorage.get('auth_token');
    const response = await getAcountUulala(token);
    if (response.code < 400) {
      setData(response.data);
    }else{
      setData([]);
    }
  }


  function renderItem({ item: { element: Element } }) {
    return <Element {...data} navigation={navigation} />;
  }

  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView forceInset={{top: 'always'}}>
        <NavigationBar
          disableExtraTop
          onBack={() => navigation.goBack()}
          body={i18n.t('transfers.component.title')}
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
                paddingVertical  : verticalScale(14)
              }}
              dotsLength={CAROUSEL_ITEMS.length}
              activeDotIndex={activeSlide}
              dotStyle={[{backgroundColor: brandTheme.bgOrange02??Colors.bgOrange02}]}
              inactiveDotStyle={[{backgroundColor: brandTheme.bgBlue06??Colors.bgBlue06}]}
              inactiveDotOpacity={1}
              inactiveDotScale={1}
            />
          </View>
        </View>
      </SafeAreaView>
    </SignUpWrapper>
  );
};

export default Transfers;
