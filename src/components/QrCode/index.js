import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { scale, verticalScale } from 'react-native-size-matters';
import { DivSpace, View } from '@components';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';


const QrCode = ({ id, name, size }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  
  return (
    <View  padding-15 style={{overflow:'hidden' }}>
      <QRCode
        value={id?id:'undefined'}
        size={size? scale(size):scale(200)}
        quietZone={scale(30)}
      />
    </View>
  );
};

export default QrCode;
