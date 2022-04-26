import React from 'react';
import { View } from '@components';
import Styles from '@screens/recharges/styles';

const ItemWrapper = ({ icon, children }) => {
  return (
    <View style={Styles.itemWrapper} centerV>
      <View textBlueDark style={Styles.item}>
        <View centerH style={Styles.itemIconWrapper}>
          <View textBlueDark style={Styles.itemIcon} centerV centerH>
            {icon}
          </View>
          {children}
        </View>
      </View>
    </View>
  );
};

export default ItemWrapper;
