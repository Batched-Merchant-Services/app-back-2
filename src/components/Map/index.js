import React from 'react';
import { Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import MapStyle from '@components/Map/map-style.json';
//pending
const Map = ({ children, onLayout, ...props }, ref) => {
  return (
    <MapView
      ref={ref}
      style={{
        width : Dimensions.get('window').width,
        height: Dimensions.get('window').height
      }}
      provider={PROVIDER_GOOGLE}
      customMapStyle={MapStyle}
      showsCompass={true}
      followsUserLocation={true}
      zoomEnabled={true}
      cacheEnabled={true}
      onLayout={onLayout}
      showsBuildings={true}
      {...props}
    >
      {children}
    </MapView>
  );
};

export default React.forwardRef(Map);
