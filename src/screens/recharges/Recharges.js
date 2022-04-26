import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, TouchableOpacity, Platform, PermissionsAndroid } from 'react-native';
import { scale } from 'react-native-size-matters';
import Carousel from 'react-native-snap-carousel';
import MapViewDirections from 'react-native-maps-directions';
import {
  DivSpace,
  View,
  Map,
  NoticeToast,
  Text,
  ImageComponent,
  ButtonRounded,
  UserMarker,
  MarkersComponent,
  InfoBox,
  Link,
  ModalDisabled
} from '@components';
import ItemP2P from '@screens/recharges/components/ItemP2P';
import ItemBank from '@screens/recharges/components/ItemBank';
import ItemATM from '@screens/recharges/components/ItemATM';
import InfoBoxQR from '@screens/recharges/components/InfoBoxQR';
import NavigationHeader from '@screens/recharges/components/NavigationHeader';
import LocationButton from '@screens/recharges/components/LocationButton';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import StartInactive from '@assets/icons/startInactive.png';
import ModalQrATM from '@screens/recharges/components/ModalQrATM';
import ModalRechargeQR from '@screens/recharges/components/ModalRechargeQR';
import ModalRechargeUser from '@screens/recharges/components/ModalRechargeUser';
import ModalRechargeReceived from '@screens/recharges/components/ModalRechargeReceived';
import Styles from '@screens/recharges/styles';
import i18n from '@utils/i18n';
import Placeholder from '@assets/internationalPayments/placeholder.png';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const CAROUSEL_ITEMS = [
  { element: ItemP2P },
  { element: ItemATM },
  { element: ItemBank }
];

const Recharges = ({ navigation }) => {
  const mapView = useRef(null);
  const [showModal] = useState(true);
  const [isRecharging, setIsRecharging] = useState(false);
  const [showCarousel, setShowCarousel] = useState(true);
  const [showInfoBox, setShowInfoBox] = useState(false);
  const [elementCarousel, setElementCarousel] = useState(false);
  const [isRechargeQRModalOpened, setIsRechargeQRModalOpened] = useState(false);
  const [isRechargeQRModal, setIsRechargeQRModal] = useState(false);
  const [isRechargeUserModalOpened, setIsRechargeUserModalOpened] = useState(false);
  const [isRechargeReceivedModalOpened, setIsRechargeReceivedModalOpened] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [ToastText, setToastText] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [P2PReceived, setP2PReceived] = useState(false);
  
  useEffect(() => {

    let watchId;

    (async () => {
      if(Platform.OS === 'ios') {
        await navigator.geolocation.requestAuthorization();
      } else {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title  : 'Location Accessing Permission',
            message: 'App needs access to your location'
          }
        );
      }
      watchId = navigator.geolocation.watchPosition(coords => {
        setUserLocation(coords);
        //setIsRechargeReceivedModalOpened(true);
      });
    })();
    
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const region = {
    latitude      : 19.392598,
    longitude     : -99.1754421,
    latitudeDelta : LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const userMarkers = [
    {
      coordinate: {
        latitude : 19.392598,
        longitude: -99.1754421
      },
      source: Placeholder
    },
    {
      coordinate: {
        latitude : 19.39576,
        longitude: -99.174411
      },
      source: Placeholder
    }
  ];

  const markers = [
    {
      coordinate: {
        latitude : 19.3925959,
        longitude: -99.1754421
      },
      type       : 'user',
      title      : 'Best Place',
      description: '1'
    },
    {
      coordinate: {
        latitude : 19.392764,
        longitude: -99.172909
      },
      type       : 'kiosko',
      title      : 'Second Best Place',
      description: '2'
    },
    {
      coordinate: {
        latitude : 19.39576,
        longitude: -99.174411
      },
      type       : 'kiosko',
      title      : 'Third Best Place',
      description: '3'
    },
    {
      coordinate: {
        latitude : 19.3924,
        longitude: -99.176685
      },
      type       : 'user',
      title      : 'Fourth Best Place',
      description: '4'
    }
  ];

  const data = {
    name    : 'Fernando Mendez',
    distance: '250m'
  };

  function handelCloseToast() {
    setShowToast(false);
  }

  function handelHideInfoBox() {
    setShowCarousel(false);
    setShowInfoBox(true);
  }

  function handelOpenToast(text) {
    setShowToast(true);
    setToastText(text);
  }

  function renderItem({ item: { element: Element }, index }) {
    return (
      <Element
        navigation={navigation}
        openToast={handelOpenToast}
        openModal={handelPressOpenModal}
        onP2P={() => {
          setIsRechargeUserModalOpened(true);
          setShowCarousel(false);
          setUserLocation(null);
        }}
      />
    );
  }

  function handelPressOpenModal(openModal) {
    setIsRechargeQRModal(openModal);
    setShowCarousel(false);
    setShowInfoBox(false);
  }

  function handelPressNext() {
    setIsRechargeQRModal(true);
    setShowInfoBox(false);
  }

  function handelCloseModal() {
    setIsRechargeQRModal(false);
    elementCarousel === 'ItemATM'
      ? setShowInfoBox(false)
      : setShowInfoBox(true);
    elementCarousel === 'ItemATM'
      ? setShowCarousel(true)
      : setShowCarousel(false);
  }

  function handlePressSignIn() {
    navigation.navigate('Login');
  }

  function handlePressLocation() {
    userLocation && userLocation.coords
      && mapView.current.animateToRegion(
        {
          ...userLocation.coords,
          latitudeDelta : 0.006,
          longitudeDelta: 0.007
        },
        1000
      );
  }

  function slideItem(index) {
    let itemCarousel = CAROUSEL_ITEMS.map((datum, index) => {
      return datum.element;
    });
    const nameItem = itemCarousel[index].name;
    setElementCarousel(nameItem);
  }
  return (
    <SignUpWrapper
      style={{ height: '100%' }}
      forceInset={{ top: 'never', bottom: 'never' }}
    >
      <View flex-1>
        <NavigationHeader navigation={navigation} isRecharging={isRecharging} />
        <NoticeToast text={ToastText} onClose={handelCloseToast} isOpen={showToast} />
        <Map region={region} ref={mapView}>
          {!showInfoBox && !isRecharging && !P2PReceived &&(
            <MarkersComponent
              navigation={navigation}
              onPress={handelHideInfoBox}
              coordinates={markers}
            />
          )}

          {isRecharging && P2PReceived && (
            <>
              <MapViewDirections
                origin={userMarkers[0].coordinate}
                destination={userMarkers[1].coordinate}
                mode="WALKING"
                apikey={'AIzaSyCne_6P6rhrGcVxrBboFolwpgdEf1JF5F4'}
                strokeColor={'#F7AE50'}
                strokeWidth={3}
              />

              <UserMarker
                source={userMarkers[0].source}
                coordinate={userMarkers[0].coordinate}
              />
            
              <UserMarker
                source={userMarkers[1].source}
                coordinate={userMarkers[1].coordinate}
              />
            </>
          )}
          {showInfoBox && (
            <>
              <MapViewDirections
                origin={userMarkers[0].coordinate}
                destination={userMarkers[1].coordinate}
                mode="WALKING"
                apikey={'AIzaSyCne_6P6rhrGcVxrBboFolwpgdEf1JF5F4'}
                strokeColor={'#F7AE50'}
                strokeWidth={3}
              />

              <UserMarker
                source={userMarkers[0].source}
                coordinate={userMarkers[0].coordinate}
              />

              {/* <UserMarker
                source={userMarkers[1].source}
                coordinate={userMarkers[1].coordinate}
              /> */}
            </>
          )}
          {userLocation !== null && (
            <UserMarker
              source={userMarkers[1].source}
              coordinate={userLocation.coords}
            />
          )}
        </Map>
        <LocationButton
          isRecharging={isRecharging || P2PReceived}
          showInfoBox={showInfoBox}
          onPress={handlePressLocation}
        />
        {!isRecharging && !P2PReceived
          && (showCarousel && (
            <View height-220 style={Styles.carousel} centerV>
              <View>
                <Carousel
                  loop={false}
                  data={CAROUSEL_ITEMS}
                  renderItem={renderItem}
                  sliderWidth={Dimensions.get('window').width}
                  itemWidth={scale(285)}
                  inactiveSlideOpacity={1}
                  onSnapToItem={index => slideItem(index)}
                />
              </View>
            </View>
          ))}
        {isRecharging && !isRechargeQRModalOpened && (
          <View height-181 style={Styles.rechargingWrapper}>
            <View height-114 white style={Styles.rechargingContainer}>
              <View row centerV centerH paddingH-15 paddingV-16>
                <View bgGray style={Styles.rechargingAvatar} />
                <DivSpace width-11 />
                <View flex-1>
                  <Text h14 textBlueDark semibold>
                    {data.name}
                  </Text>
                  <View row>
                    <ImageComponent
                      bgBlue06
                      source={StartInactive}
                      width={14}
                      height={14}
                    />
                    <DivSpace width-2 />
                    <ImageComponent
                      bgBlue06  
                      source={StartInactive}
                      width={14}
                      height={14}
                    />
                    <DivSpace width-2 />
                    <ImageComponent
                      bgBlue06
                      source={StartInactive}
                      width={14}
                      height={14}
                    />
                    <DivSpace width-2 />
                    <ImageComponent
                      bgBlue06
                      source={StartInactive}
                      width={14}
                      height={14}
                    />
                    <DivSpace width-2 />
                    <ImageComponent
                      bgBlue06
                      source={StartInactive}
                      width={14}
                      height={14}
                    />
                  </View>
                </View>
                <View>
                  <Text h10 textBlueDark>
                    {data.distance}
                  </Text>
                </View>
              </View>
              <DivSpace height-5 />
              <View row right paddingH-12 centerV>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('RechargeSuccessful');
                  }}
                >
                  <Text h14 semibold textBlueDark>
                    {i18n.t('recharges.component.call')}
                  </Text>
                </TouchableOpacity>
                <DivSpace width-18 />
                <ButtonRounded
                  onPress={() => {
                    setIsRechargeQRModalOpened(true);
                  }}
                >
                  <Text h10 semibold>
                    {i18n.t('recharges.component.showQR')}
                  </Text>
                </ButtonRounded>
              </View>
            </View>
          </View>
        )}
        {P2PReceived && !isRechargeReceivedModalOpened && (
          <View height-165 style={Styles.rechargingWrapper}>
            <InfoBoxQR data={data} onPress={() => navigation.navigate('ScanQrReceived') } onPressLink={()=>console.log('truelink')}/>
          </View> 
        )}
        {showInfoBox && (
          <View height-150 marginH-25 style={Styles.rechargingBoxInfo}>
            <InfoBox containerStyle={{ flex: 1 }}>
              <View flex-1 marginH-20>
                <DivSpace height-10 />
                <Text h14 semibold textBlueDark>
                  {i18n.t('establecimientosATM.component.textAtmBanamex')}
                </Text>
                <DivSpace height-10 />
                <Text h10 blueDark>
                  {i18n.t('establecimientosATM.component.textDescription')}
                </Text>
                <DivSpace height-10 />
                <View row>
                  <View flex-1 centerV>
                    <Link
                      linkStyle={{ color: '#485490', fontSize: 12 }}
                      onPress={handlePressSignIn}
                    >
                      {i18n.t(
                        'establecimientosATM.component.linkCancelNavigation'
                      )}
                    </Link>
                  </View>
                  <View flex-1>
                    <ButtonRounded onPress={handelPressNext}>
                      <Text h10 semibold>
                        {i18n.t('establecimientosATM.component.buttonRecharge')}
                      </Text>
                    </ButtonRounded>
                  </View>
                  <DivSpace height-10 />
                </View>
              </View>
            </InfoBox>
          </View>
        )}
      </View>
      
      
      <View style={Styles.rechargingBoxInfo}>
        <ModalQrATM
          isOpen={isRechargeQRModal}
          onClose={handelCloseModal}
          navigation={navigation}
        />
        <ModalRechargeQR
          isOpen={isRechargeQRModalOpened}
          onClose={() => setIsRechargeQRModalOpened(false)}
          navigation={navigation}
        />
        <ModalRechargeUser
          isOpen={isRechargeUserModalOpened}
          onClose={() => {
            setIsRechargeUserModalOpened(false);
            setIsRecharging(true);
          }}
          navigation={navigation}
        />
        <ModalRechargeReceived
          isOpen={isRechargeReceivedModalOpened}
          onClose={() => {
            setIsRechargeReceivedModalOpened(false);
            setP2PReceived(true);
          }}
          navigation={navigation}
        />
      </View>
      <ModalDisabled isOpen={showModal} navigation={navigation}/>
    </SignUpWrapper>
  );
};

export default Recharges;
