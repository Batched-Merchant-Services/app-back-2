import React,{useEffect, useState} from 'react';
import { Dimensions, TouchableOpacity,Animated } from 'react-native';
import { scale } from 'react-native-size-matters';
import { View, ImageComponent } from '@components';
import Styles from '@screens/store/styles';

const ProviderContainer = ({ index,navigation, ...provider }) => {
  const data = {...provider};
  const [scaleValue]=useState(new Animated.Value(0));
  const width = (Dimensions.get('window').width - scale(70)) / 3;
  const height = width / 1.24;
  const logoWidth = width - scale(20);
  const logoHeight = height - scale(20);

  function handleProviderPress() {
    navigation.navigate('ProviderPayment',{ data });
  }

  useEffect(() => {
    const transformToBallAnimation = Animated.timing(
      scaleValue,
      {
        toValue : 1,
        duration: 1000,
        delay   : index * 60
      }
    );
    Animated.parallel([
      transformToBallAnimation,
    ]).start();
  }, [Animated]);

  return (
    <Animated.View style={{ opacity: scaleValue }}>
      <TouchableOpacity onPress={handleProviderPress}>
        <View
          marginB-10
          marginH-3
          white
          style={[
            Styles.providerContainer,
            {
              width,
              height
            }
          ]}
          centerV
          centerH
        >
          <ImageComponent source={{ uri: data.logo}} width={logoWidth} height={logoHeight} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ProviderContainer;
