import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import MapView from 'react-native-maps';
import { scale, verticalScale } from 'react-native-size-matters';

import {
  ImageComponent,
  View,
  Text,
  InfoBox,
  DivSpace,
  ButtonNext
} from '@components';
import Store from '@assets/icons/map/pinStore.png';
import StoreActive from '@assets/icons/map/pinStoreActive.png';
import Vendor from '@assets/icons/map/vendor.png';
import Styles from './styles';
import i18n from '@utils/i18n';

const StoreMarker = ({ isActive }) => {
  return (
    <View centerH height-53 width-55 bottom>
      {!isActive && (
        <View style={{ position: 'absolute', top: 0 }} width-52 height-26>
          <ImageComponent
            source={Vendor}
            width={scale(52)}
            height={verticalScale(26)}
          />
        </View>
      )}

      <ImageComponent
        source={isActive ? StoreActive : Store}
        width={scale(30)}
        height={verticalScale(30)}
      />
    </View>
  );
};

class MarkersComponent extends React.Component {
  state = { selected: null };
  
  handleMarkerPress(marker, index) {
    this.setState({ selected: index });
    this.props.mapRef
      && this.props.mapRef.current.animateToRegion(
        {
          ...marker.coordinate,
          latitudeDelta : 0.006,
          longitudeDelta: 0.007
        },
        1000
      );
    this.props.onPress && this.props.onPress(marker);
  }

  clearSelectedMarker() {
    this.setState({ selected: null });
  }

  render({ mapRef, markers } = this.props) {
    return (
      <>
        {markers.map((marker, index) => (
          <MapView.Marker
            key={index}
            style={Styles.markers}
            coordinate={marker.coordinate}
            onPress={this.handleMarkerPress.bind(this, marker, index)}
          >
            <StoreMarker isActive={this.state.selected === index} />
            {/* <MapView.Callout tooltip style={{ minWidth: scale(240) }}>
            <InfoBox>
              <Text>Carousel</Text>
            </InfoBox>
          </MapView.Callout> */}
          </MapView.Marker>
        ))}
      </>
    );
  }
}

export default MarkersComponent;
