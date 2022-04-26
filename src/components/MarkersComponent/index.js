import React from 'react';
import MapView  from 'react-native-maps';
import { scale,verticalScale } from 'react-native-size-matters';
import userMarker from '@assets/icons/map/pinUser.png';
import kioskoMarker from '@assets/icons/map/pinKios.png';
import {
  ImageComponent,
  View,
  Text,
  InfoBox,
  DivSpace,
  ButtonNext
} from '@components';
import Styles from './styles';
import i18n from '@utils/i18n';


const MarkersComponent = ({ navigation, children, coordinates, onPress , showInfoBox , ...props}) => {
  
  function renderMarkerIcon(marker) {
    return(
      <ImageComponent
        source={ marker.type === 'user' ? userMarker: kioskoMarker }
        width={scale(30)}
        height={verticalScale(30)}
      />
    ); 
  }
  
  
  return(
    <View>
      {coordinates.map((marker, index) => (
        <MapView.Marker key={index}
          style={Styles.markers}
          title={marker.title} 
          coordinate={marker.coordinate}
          {...props}
        >
          {renderMarkerIcon(marker)}
          <MapView.Callout tooltip style={{flex: 1, minWidth: scale(240)}} onPress={onPress}>
            <InfoBox>
              <View flex-1 paddingH-10>
                <DivSpace height-12 />
                <Text h12 semibold blueDark>{marker.title}</Text>
                <DivSpace height-10 />
                <Text h10 blueDark>{i18n.t('establecimientosATM.component.textDescription')}</Text>
                <DivSpace height-20 />
              </View>
            </InfoBox>
            <View right marginR-10 style={{ marginTop: -20 }}>
              <ButtonNext gradientStyle={{ width: verticalScale(27), height: verticalScale(27) }}/>
            </View>
          </MapView.Callout>
        </MapView.Marker>
        
      ))}
    </View>
  );
    
};

export default MarkersComponent;