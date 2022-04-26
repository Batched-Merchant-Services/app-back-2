import React from 'react';
import { View } from 'react-native';
import StyleHelper from '@utils/styleHelper';

const DivSpace = props => {
  const baseStyle = {
    ...StyleHelper.extractHeight(props) || { height: 20 },
    ...StyleHelper.extractWidth(props) || { width: 20 },
  };

  return <View style={baseStyle}></View>;
};

export default DivSpace;