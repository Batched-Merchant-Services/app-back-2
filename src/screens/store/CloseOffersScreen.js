import React, { useRef, useState } from 'react';

import MapViewDirections from 'react-native-maps-directions';

import {
    View,
    Map,
    UserMarker,

    Text,
    DivSpace,
    Link,
    ButtonRounded
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import MapHeader from '@screens/store/components/MapHeader';
import MapLocationButton from '@screens/store/components/MapLocationButton';
import Styles from '@screens/store/styles';
import { useUserLocation } from '@hooks/location-hooks';
import Placeholder from '@assets/internationalPayments/placeholder.png';
/* Mock data */
import Data from './CloseOffersScreen.data';

const CloseOffersScreens = ({ navigation }) => {
    const mapView = useRef(null);
    const MarkersComponent = useRef(null);
    const [isNavigating, setIsNavigating] = useState(false);
    const [markerTo, setMarkerTo] = useState(null);
    const [location, centerLocation] = useUserLocation(mapView);

    function handleLocationPress() {
        centerLocation();
    }

    function handleMarkerPress(marker) {
        setIsNavigating(true);
        setMarkerTo(marker);
    }

    function handleMapPress(e) {
        if (e.nativeEvent.action !== 'marker-press' && !isNavigating) {
            MarkersComponent.current.clearSelectedMarker();
            setIsNavigating(false);
            setMarkerTo(null);
        }
    }

    function handleCancelPress() {
        MarkersComponent.current.clearSelectedMarker();
        setIsNavigating(false);
        setMarkerTo(null);
    }

    function handleContinuePress() {
        navigation.navigate('StoreScanQR');
    }

    return (
        <SignUpWrapper
            style={{ height: '100%' }}
            forceInset={{ top: 'never', bottom: 'never' }}
        >
            <View flex-1>
                <MapHeader navigation={navigation} isNavigating={isNavigating} />
                <Map region={Data.region} ref={mapView} onPress={handleMapPress}>
                    {isNavigating && location && (
                        <MapViewDirections
                            origin={location.coords}
                            destination={markerTo.coordinate}
                            mode="WALKING"
                            apikey={'AIzaSyCne_6P6rhrGcVxrBboFolwpgdEf1JF5F4'}
                            strokeColor={'#F7AE50'}
                            strokeWidth={3}
                        />
                    )}

                    {location !== null && (
                        <UserMarker source={Placeholder} coordinate={location.coords} />
                    )}
                </Map>

                <View style={Styles.navigationFooter}>
                    <View right>
                        <MapLocationButton onPress={handleLocationPress} />
                    </View>
                    {isNavigating && (
                        <View
                            paddingT-16
                            paddingB-10
                            paddingH-20
                            white
                            style={Styles.navigationInfo}
                        >
                            <Text h12 textBlueDark medium>{markerTo.name}</Text>
                            <DivSpace height-7 />
                            <Text h10 textBlueDark regular>{markerTo.address}</Text>
                            <DivSpace height-12 />
                            <View centerV row style={{ justifyContent: 'space-between' }}>
                                <Link onPress={handleCancelPress}>
                                    <Text h12 textBlueDark>Cancelar</Text>
                                </Link>
                                <ButtonRounded style={{ height: 26 }} onPress={handleContinuePress}>
                                    <Text h10 semibold>
                                        Continuar Compra
                                    </Text>
                                </ButtonRounded>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </SignUpWrapper>
    );
};

export default CloseOffersScreens;
