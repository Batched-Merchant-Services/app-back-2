import React from 'react';
import PropTypes from 'prop-types';
import Ripple from 'react-native-material-ripple';
import { scale, verticalScale } from 'react-native-size-matters';
//import { DrawerActions } from 'react-navigation-drawer';
import { Platform } from 'react-native';
import { Text, ImageComponent, View,BoxGradient } from '@components';
const Menu = require('@assets/icons/menu.png');
const logo = require('@assets/brand/SAAVY.png');
const notifications = require('@assets/icons/notifications.png');

const RegularContainer = ({ children }) => {
  return (
    <View row height-40 style={{marginTop: (Platform.OS === 'ios') ? 0 : verticalScale(30)}}>
      {children}
    </View>
  );
};

const renderIcon = action => {
  if (typeof action === 'function') {
    return (
      <Ripple
        style={{
          alignItems    : 'center',
          justifyContent: 'center',
          width         : verticalScale(30),
          height        : verticalScale(30),
          left          : scale(20),
          borderRadius  : verticalScale(35)
        }}
        onPress={action}
        underlayColor={'transparent'}
      >
        <View>
          <ImageComponent
            bgBlue06
            source={Menu}
            height={verticalScale(28)}
            width={scale(22)}
          />
        </View>
      </Ripple>
    );
  }
  return null;
};

const renderBody = (body,brandTheme) => {
  if (typeof body === 'string') {
    return (
      <Text h12 medium title center>
        {body}
      </Text>
    );
  }
  return ( 
    <ImageComponent
      source={brandTheme?.uulalaLogo?brandTheme?.uulalaLogo:logo}
      height={verticalScale(15)}
      width={scale(60)}
    />
  );
};

const renderNotification = click => {
  return (
    <Ripple
      style={{
        alignItems    : 'center',
        justifyContent: 'center',
        width         : verticalScale(30),
        height        : verticalScale(30),
        left          : scale(10),
        borderRadius  : verticalScale(35)
      }}
      onPress={click}
      underlayColor={'transparent'}
    >
      <BoxGradient size={30} invalid >
        <ImageComponent
          white
          source={notifications}
          height={verticalScale(17)}
          width={scale(17)}
        />
      </BoxGradient>
      
    </Ripple>
  );
};

const NavigatorHeader = ({ avatarProfile, body, navigation,brandTheme }) => {
  const Container = RegularContainer;

  function drawerTriggerPress() {
    navigation.dispatch(navigation.openDrawer());
  }
  function openNotification() {
    //navigation.navigate('Notifications');
  }
 
  return (
    <Container>
      <View height-40 width-50>
        {renderIcon(drawerTriggerPress)}
      </View>

      <View flex-1 centerH centerV>
        {renderBody(body,brandTheme)}
      </View>
      <View height-40 width-50>
        {/* {renderNotification(openNotification)} */}
      </View>
    </Container>
  );
};

NavigatorHeader.propTypes = {
  avatarProfile   : PropTypes.func,
  body            : PropTypes.any,
  withTransparency: PropTypes.bool
};

export default NavigatorHeader;
