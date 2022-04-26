import React from 'react';
import View from '@components/View';
import Styles from '@components/Line/styles';
import Colors from '@styles/Colors';
//Pending
const Line = ({color}) => {
  return <View height-1 style={[Styles.line, (color? {backgroundColor: Colors[color]}: {})]} />;
};

export default Line;
