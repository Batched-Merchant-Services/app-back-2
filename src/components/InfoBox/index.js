import React from 'react';
import { View } from '@components';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';
import styles from './styles';

const InfoBox = ({ children, containerStyle = {}, ...rest }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  return (
    <View style={[styles.containerView,containerStyle,{backgroundColor: brandTheme.bgGray??Colors?.bgGray}]}>
      {children}
    </View>
  );
};

export default InfoBox;
