import React, {useState,useRef} from 'react';
import StoreDetailOfert from '@screens/store/components/StoreDetailOfert';
import i18n from '@utils/i18n';
import { ScrollView, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Styles from './styles';
import Colors from '@styles/Colors';
import { useSelector } from 'react-redux';
import {
  View,
  NavigationBar,
  DivSpace,
  Text,
  ImageComponent,
  ButtonFloating
} from '@components';
import arrowDown from '@assets/icons/arrowDown.png';
const EntertainmentItems = [
  {
    descount       : '25%',
    expires        : '5 junio 2020',
    typeOfer       : 'Credit',
    level          : 3,
    fifteenPayments: '3',
    balance        : '850',
    description    : 'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua consectetur adipiscing elit, sed do eiusmod. '
  }
];

const StoreCashPurchase = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;

  const scrollView = useRef(null);
  const page = navigation.getParam('page');
  const ofert= page ? {...EntertainmentItems[0]} :navigation.getParam('ofer');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTwo, setIsOpenTwo] = useState(false);
  const [isOpenThree, setIsOpenThree] = useState(false);
  const [region ] = useState({ latitude: 19.3957714,longitude: -99.1788413,latitudeDelta: 0.0922,longitudeDelta: 0.0421 });

  function handlePress(state) {
    setIsOpen(!isOpen);

  }
  function handlePressTwo(state) {
    setIsOpenTwo(!isOpenTwo);

  }
  function handlePressThree(state) {
    setIsOpenThree(!isOpenThree);

  }
  const handleGoUpPress = () =>
    scrollView.current.scrollTo({ x: 0, y: 0, animated: true });

  return (
    <View bgBlue01 style={{ height: '100%' }}> 
      <ScrollView ref={scrollView}>
        <View flex-1>
          <StoreDetailOfert ofert={ofert}  page={page} navigation={navigation} />
        </View>
        <View flex-1 bgGray paddingH-15>
          <DivSpace height-30 />
          <Text medium bgBlue02 h12>
            {i18n.t('store.component.textHighlights')}
          </Text>
          <DivSpace height-10 />
          <Text h9 disabled>
            Phasellus facilisis neque sit amet enim convallis venenatis
            Curabitur commodo augue in eros molestie rhoncus
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
            Praesent eu facilisis lorem
            Nulla sed elit quis leo aliquet ornare
          </Text>
          <DivSpace height-10 />
          <Text medium bgBlue02 h12>
            {i18n.t('store.component.textRedeemInstructions')}
          </Text>
          <DivSpace height-10 />
          <Text h9 disabled>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget metus sem. Phasellus aliquam urna in nunc molestie, congue fringilla mi bibendum. Curabitur in sapien molestie eros dapibus maximus. Aenean quis nisl eget mi dapibus gravida. Nam placerat, velit non consectetur lobortis, nibh ex dictum ipsum, eu accumsan tellus eros ac mauris. Quisque at facilisis massa. Nulla vestibulum justo id bibendum ullamcorper. Curabitur fringilla tristique dui in tempus. 
          </Text>
          <DivSpace height-10 />
          <TouchableOpacity onPress={handlePress}>
            <View row marginV-15 >
              <View flex-1 >
                <Text h12 medium bgBlue02>{i18n.t('store.component.textTermsAndConditions')}</Text>
              </View>
              <ImageComponent bgBlue02 source={arrowDown} width={15} height={15} />
            </View>
            {isOpen && (
              <View>
                <Text h9 disabled>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget metus sem.</Text>
                <DivSpace height-8 />
              </View>
            )}
          </TouchableOpacity>
          <View height-1 bgGray/>
          <TouchableOpacity  onPress={handlePressTwo} >
            <View row marginV-15>
              <View flex-1 >
                <Text h12 medium bgBlue02>{i18n.t('store.component.textAboutTheProvider')}</Text>
              </View>
              <ImageComponent bgBlue02 source={arrowDown} width={15} height={15} />
            </View>
            {isOpenTwo && (
              <View>
                <Text h9 disabled>Lorem two ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget metus sem.</Text>
                <DivSpace height-8 />
              </View>
            )}
          </TouchableOpacity>
          <View height-1 bgGray/>
          <TouchableOpacity onPress={handlePressThree}>
            <View row marginV-15>
              <View flex-1 >
                <Text h12 medium bgBlue02>{i18n.t('store.component.textAboutRomeCorner')}</Text>
              </View>
              <ImageComponent bgBlue02source={arrowDown} width={15} height={15} />
            </View>
            {isOpenThree && (
              <View>
                <Text h9 disabled>Madison Square Garden is located at 4 Pennsylvania Plaza in New York City and opened on February 11, 1968. MSG is one of the oldest sporting venues in New York and one of the last NBA and NHL arenas named after a corporate sponsor.</Text>
                <DivSpace height-8 />
              </View>
            )}
          </TouchableOpacity>
          <DivSpace height-15 />
          <Text h12 medium bgBlue02>4 Pennsylvania Plaza {'\n'} New York, New York 10001  {'\n'}United States</Text>
          <DivSpace height-10 />
          <View>
            <MapView
              style={[Styles.styleMap,{borderColor: brandTheme?.textGray??Colors.textGray}]}
              provider={PROVIDER_GOOGLE}
              showsCompass={true}
              followsUserLocation={true}
              zoomEnabled={true}
              cacheEnabled={true}
              showsBuildings={true}
              initialRegion={region}
            >
              <MapView.Marker
                coordinate={ region }
              />
            </MapView>
          </View>
          <DivSpace height-30 />
        </View>
      </ScrollView> 
      <View style={Styles.navigator}>
        <NavigationBar
          onBack={() => navigation.goBack()}
          body={i18n.t('store.component.titleOfferCashPption')}
        />
      </View>
      <View centerH style={Styles.viewBtnFloating}>
        <ButtonFloating onPress={handleGoUpPress} />
      </View>
    </View>
  );
};

export default StoreCashPurchase;
