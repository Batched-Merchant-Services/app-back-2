import { useState, useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';

export function useUserLocation(mapView) {
  const [userLocation, setUserLocation] = useState(null);

  function centerLocation() {
    userLocation
      && userLocation.coords
      && mapView.current.animateToRegion(
        {
          ...userLocation.coords,
          latitudeDelta : 0.006,
          longitudeDelta: 0.007
        },
        1000
      );
  }

  useEffect(() => {
    let watchId;

    (async () => {
      if (Platform.OS === 'ios') {
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
      });
    })();

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return [userLocation, centerLocation];
}
