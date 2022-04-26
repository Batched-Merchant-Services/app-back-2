import React from 'react';
import PropTypes from 'prop-types';

import { Text, View } from '@components';
import Styles from '@screens/levels/styles';

const PaginationDot = ({ index, activeSlide }) => {
  const activeLine = index < activeSlide;
  const activeDot = index <= activeSlide;
  return (
    <View width-18 flex-1>
      <View
        centerV
        centerH
        width-18
        height-18
        style={[Styles.dot, activeDot ? Styles.activeDot : Styles.inactiveDot]}
      >
        <Text h8 semibold white>
          {String(index + 1).padStart(2, '0')}
        </Text>
      </View>
      <View
        flex-1
        style={[
          Styles.dotLine,
          activeLine ? Styles.activeDotLine : Styles.inactiveDotLine
        ]}
      />
    </View>
  );
};

PaginationDot.propTypes = {
  index      : PropTypes.number,
  activeSlide: PropTypes.number.isRequired
};

export default PaginationDot;
