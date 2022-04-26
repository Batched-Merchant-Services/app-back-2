import React,{useState} from 'react';
import { Animated,InteractionManager } from 'react-native';
import { View, Text } from '@components';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import Styles from '../styles';
const SwipeableElement = ({ onSwipeableLeftOpen,onSwipeableRightOpen, children }) => {

  const [heightA] = useState(new Animated.Value(95));

  const renderLeftActions = (progress, dragX) => {
    const trans = progress.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });

    return (
      <View style={[Styles.leftAction]}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Animated.View
            style={[
              {
                transform: [{ translateX: trans }],
              },
            ]}
          />
        </View>
      </View>
    );
  };
  

  const renderRightActions = (progress, dragX) => {
    const trans = progress.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });

    return (
      
      <View style={[Styles.rightAction]}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Animated.View
            style={[
              {
                transform: [{ translateX: trans }],
              },
            ]}
          />
        </View>
      </View>
    );
  };

  const updateRef = ref => {
    this._swipeableRow = ref;
  };

  const handleRemove = () => {
    InteractionManager.runAfterInteractions(() => {
      Animated.timing(heightA, {
        toValue : 0,
        delay   : 0,
        duration: 100,
      }).start(({ finished }) => {
        if (finished) {
          if (onSwipeableLeftOpen) {
            onSwipeableLeftOpen();
          }

          if (onSwipeableRightOpen) {
            onSwipeableRightOpen();
          }
        }
      });
    });
  };
  const renderDrawer = () => {
    return (
      <View width-100 height-100>
        <Text white>I am in the drawer!</Text>
      </View>
    );
  };
  return (
    <Swipeable
      ref={updateRef}
      friction={2}
      leftThreshold={80}
      rightThreshold={40}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableLeftOpen={handleRemove}
      onSwipeableRightOpen={handleRemove}
      onSwipeableWillOpen={() => null}
    >
      <Animated.View
        style={[Styles.animation,{height: heightA}]}
      >
        {children}
        <DrawerLayout
          drawerWidth={200}
          drawerPosition={DrawerLayout.positions.Right}
          drawerType='front'
          drawerBackgroundColor="#ddd"
          renderNavigationView={renderDrawer}>
         
        </DrawerLayout>
      </Animated.View>
    </Swipeable>
  );
};

export default SwipeableElement;
