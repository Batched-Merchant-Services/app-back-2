import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import {ButtonSquareGradient, DivSpace, Text, View, ImageComponent } from '@components';
import Styles from './styles';
import rowRight from '@assets/icons/rowRight.png';

const buttonOption = ({ label, image, onPress,disabled }) => {
  
  return (
    <TouchableOpacity onPress={onPress}>
      <ButtonSquareGradient size ={110} disabled={disabled} style={ Styles.heightLinear } >
        <DivSpace height-14/>
        <View flex-1 style={{ width:'90%'}}>
          <Text h11 >
            {label}
          </Text>
          <DivSpace height-5 />
          <View width-20 height-1 style={{borderColor:'#D8D8D8',borderWidth:1}}/>
          <DivSpace height-10 />
          <View flex-1 row bottom marginB-15 >
            <View flex-1>
              <ImageComponent source={image} width={35} height={35} />
            </View>
            <View flex-1 bottom style={{flex: 0.4}}>
              <ImageComponent source={rowRight} width={12} height={12} />
            </View>
          </View>
        </View>
      </ButtonSquareGradient>
    </TouchableOpacity>
  );
};

buttonOption.propTypes = {
  label  : PropTypes.string,
  image  : PropTypes.any,
  onPress: PropTypes.func
};

export default buttonOption;
