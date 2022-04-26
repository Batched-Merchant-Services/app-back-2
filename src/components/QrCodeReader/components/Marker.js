import React from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import View from '@components/View';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';


const Marker = () => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  return (
    <View style={{ width: scale(220), height: verticalScale(250) }}>
      <View row>
        <View
          flex-1
          style={{
            borderLeftWidth: 2,
            borderTopWidth : 2,
            borderTopColor : brandTheme.white??Colors?.white,
            borderLeftColor: brandTheme.white??Colors?.white,
            width          : scale(59),
            height         : verticalScale(59)
          }}
        />
        <View flex-2 />
        <View
          flex-1
          right
          style={{
            borderRightWidth: 2,
            borderTopWidth  : 2,
            borderTopColor  : brandTheme.white??Colors?.white,
            borderRightColor: brandTheme.white??Colors?.white,
            width           : scale(59),
            height          : verticalScale(59)
          }}
        />
      </View>
      <View flex-1 />
      <View row>
        <View
          flex-1
          style={{
            borderLeftWidth  : 2,
            borderBottomWidth: 2,
            borderBottomColor: brandTheme.white??Colors?.white,
            borderLeftColor  : brandTheme.white??Colors?.white,
            width            : scale(59),
            height           : verticalScale(59)
          }}
        />
        <View flex-2 />
        <View
          flex-1
          right
          style={{
            borderRightWidth : 2,
            borderBottomWidth: 2,
            borderBottomColor: brandTheme.white??Colors?.white,
            borderRightColor : brandTheme.white??Colors?.white,
            width            : scale(59),
            height           : verticalScale(59)
          }}
        />
      </View>
    </View>
  );
};

export default Marker;
