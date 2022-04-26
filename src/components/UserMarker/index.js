import React from 'react';
import MapView from 'react-native-maps';
import { ImageComponent } from '@components';

const UserMarker = ({ coordinate, source, ...props }) => {
  return (
    <MapView.Marker coordinate={coordinate} {...props}>
      <ImageComponent source={source} height={30} width={30} />
    </MapView.Marker>
  );
};

export default UserMarker;
