import React from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import { ImageComponent,View } from '@components';
import creditDirecty from '@assets/icons/creditDirecty.png';
import Styles from './styles';

const BoxImageCredit = ({
  containerStyle = {},
  
}) => {


  return (
    <View centerH centerV width-105 height-45 marginR-10 white style={[Styles.creditImage,containerStyle]}>
      <ImageComponent
        source={creditDirecty}
        width={scale(89)}
        height={verticalScale(27)}
      />
    </View>
  );
};


export default BoxImageCredit;

