import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import Emoji from 'react-native-emoji';
import { moneyFormatter } from '@utils/formatters';
import { moderateScale } from 'react-native-size-matters';
import { scale, verticalScale } from 'react-native-size-matters';

import Text from '@components/Text';
import View from '@components/View';
import ImageComponent from '@components/ImageComponent';


function getSize(size) {
  return {
    ll: moderateScale(14, 0.3),
    sm: moderateScale(14, 0.3),
    md: moderateScale(15, 0.3),
    lg: moderateScale(15, 0.3)
  }[size];
}

const Option = ({ emoji, name, size, icon, balance,typeMoney, amount }) => {
  const otherProps = {
    ...(emoji ? { 'paddingL-5': true } : { 'paddingL-10': true })
  };

  const labelSize = `h${getSize(size)}`;

  return (
    <View row height-39 {...otherProps} style={{ width: '100%' }}>
      {emoji && (
        <View width-39 height-39 centerH centerV>
          <Emoji
            name={emoji}
            style={{ fontSize: moderateScale(Platform.OS === 'ios' ? 30 : 25) }}
          />
        </View>
      )}
      {icon !== ''  &&  icon !== undefined && (
        <View width-39 height-39 centerH centerV>
          <ImageComponent source={{ uri: icon }} width={scale(25)} height={verticalScale(21)} />
        </View>
      )}

      <View flex-1 height-39 centerV row>
        <View flex-1>
          <Text {...{ [labelSize]: true }} medium white>
            {amount? amount: name }
          </Text>
        </View>
        <View style={{ flex: balance? 1 :0, }} right marginR-30>
          <Text {...{ [labelSize]: true }} medium white center>
            {balance? moneyFormatter(balance): ''} {typeMoney? typeMoney: ''}
          </Text>
        </View>
      </View>
      
      
      
    </View>
  );
};

Option.propTypes = {
  emoji: PropTypes.string,
  label: PropTypes.string,
  size : PropTypes.oneOf(['ll', 'sm', 'md', 'lg'])
};

Option.defaultProps = {
  size: 'md'
};

export default Option;
