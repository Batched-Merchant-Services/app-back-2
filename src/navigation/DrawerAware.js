import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Styles from '@navigation/styles';
import { View } from '@components';
import { useTimingValue } from '@hooks/animation-hooks';
import Colors from '@styles/Colors';
const DrawerAware = Navigator => {
  const _DrawerAware = ({ navigation, ...props }) => {
    const drawerState = useSelector(state => state?.app?.drawerState);
    const redux = useSelector(state => state);
    const appData = redux.user;
    const brandTheme = appData?.Theme?.colors;

    const [scale, toMin, toMax] = useTimingValue({ min: 0, max: 1, time: 400 });

    useEffect(() => {
      if (drawerState === 'opening') toMax();
      else toMin();
    }, [drawerState]);

    return (
      <View style={{backgroundColor: brandTheme?.textBlue01??Colors.textBlue01}} flex-1>
        <View
          animated
          style={[
            Styles.container,
            {
              left: scale.interpolate({
                inputRange : [0, 1],
                outputRange: [0, 40]
              }),
              transform: [
                {
                  scaleX: scale.interpolate({
                    inputRange : [0, 1],
                    outputRange: [1, 0.75]
                  })
                },
                {
                  scaleY: scale.interpolate({
                    inputRange : [0, 1],
                    outputRange: [1, 0.75]
                  })
                }
              ],
              shadowOpacity: scale.interpolate({
                inputRange : [0, 1],
                outputRange: [0, 0.95]
              })
            }
          ]}
        >
          <Navigator navigation={navigation} {...props} />
        </View>
      </View>
    );
  };

  return _DrawerAware;
};

export default DrawerAware;
