import React from 'react';
import { TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import QRCodeScanner from 'react-native-qrcode-scanner';

import View from '@components/View';
import ButtonRounded from '@components/ButtonRounded';
import ImageComponent from '@components/ImageComponent';
import DivSpace from '@components/DivSpace';
import Text from '@components/Text';
import Marker from '@components/QrCodeReader/components/Marker';
import Styles from '@components/QrCodeReader/styles';

import QRWhite from '@assets/icons/qr-white.png';
import BackWhite from '@assets/icons/back-white.png';

const QrCodeReader = ({
  title,
  description,
  buttonText,
  onRead,
  onPressLeftControl,
  onPressRightControl,
  onPressButton,
  leftControlIcon,
  rightControlIcon
}) => {

  return (
    <>
      <View style={Styles.header}>
        <View row>
          <TouchableOpacity
            style={Styles.headerButton}
            onPress={onPressLeftControl}
          >
            {onPressLeftControl && (
              <>
                <DivSpace width-23 />
                <ImageComponent
                  white
                  source={leftControlIcon ? leftControlIcon : BackWhite}
                  width={scale(35)}
                  height={scale(35)}
                />
              </>
            )}
          </TouchableOpacity>
          <View flex-1>
            <Text h12 medium center>
              {title}
            </Text>
          </View>
          <TouchableOpacity
            style={Styles.headerButton}
            onPress={onPressRightControl}
          >
            {onPressRightControl && (
              <>
                <ImageComponent
                  source={rightControlIcon ? rightControlIcon : QRWhite}
                  width={scale(35)}
                  height={scale(35)}
                />
                <DivSpace width-23 />
              </>
            )}
          </TouchableOpacity>
        </View>
        <DivSpace height-21 />
      </View>
      <QRCodeScanner
        onRead={onRead}
        reactivate={true}
        reactivateTimeout={3000}
        showMarker={true}
        cameraStyle={Styles.camera}
        customMarker={<Marker />}
      />
      <View style={Styles.footer} centerH>
        <DivSpace height-20 />
        <Text h11 center>
          {description}
        </Text>
        <DivSpace height-18 />
        {onPressButton === null ?
          null
          :<ButtonRounded
            style={Styles.footerButton}
            onPress={onPressButton}
            white
          >
            <Text semibold h10 bgBlue02>
              {buttonText}
            </Text>
          </ButtonRounded>}
      </View>
    </>
  );
};

export default QrCodeReader;
