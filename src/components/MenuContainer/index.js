import React from 'react';
import View from '@components/View';
import Styles from './styles';

const MenuContainer = ({ children,boxStyles }) => {

  return (
    <View centerH centerV textBlue01 style={[Styles.viewLastLevel,boxStyles]}>
      {children}
    </View>
  );
};

export default MenuContainer;
