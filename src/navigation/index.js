import { Dimensions } from 'react-native';
import React from 'react';
import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator
} from 'react-navigation';
// import { createBottomTabNavigator } from 'react-navigation-tabs';

import { signInScreens, signOutScreens } from './registerScreens';
import { MenuTabs } from '@components';
import SideMenu from '@screens/SideMenu';
import DrawerAware from './DrawerAware';


import i18n from '@utils/i18n';
const TabBarComponent = (props) => (<MenuTabs {...props} />);

const MenuBottom = createBottomTabNavigator(
  {
    ...signInScreens.TabsMenu
  },
  { 
    defaultNavigationOptions: ({ navigation,screenProps }) => ({
      tabBarComponent:({ ...props }) => { 
        return <TabBarComponent {...props}/>;
      }
    }),
    backBehavior: 'none',
    //initialRouteName: 'MyWallet'
  },
);



const Navigator = createStackNavigator(
  {
    MenuTabsNavigation: {
      screen: MenuBottom
    },
    ...signInScreens.signMenu
  },
  {
    //initialRouteName: 'Welcome',
    headerMode: 'none',
  }
);

const SignedInStackNavigation = DrawerAware(Navigator);

SignedInStackNavigation.router = Navigator.router;
const SignedInNav = createDrawerNavigator(
  {
    SignedInStackNavigation: {
      screen: SignedInStackNavigation
    },
  },
  {
    drawerWidth          : Dimensions.get('window').width / 2 + 38,
    contentComponent     : SideMenu,
    edgeWidth            : 0,
    drawerPosition       : 'left',
    drawerType           : 'slide',
    overlayColor         : 'rgba(255,255,254, 0)',
    drawerBackgroundColor: 'rgba(255,255,254, 0)'
  }
  
);

const SignedOutNav = createStackNavigator(
  { ...signOutScreens },
  {
    headerMode      : 'none',
    initialRouteName: 'WelcomeNew'
  }
); 

const AppNavigator = createSwitchNavigator(
  {
    SignedInNav: {
      screen           : SignedInNav,
      navigationOptions: ({ navigation: { state },navigation}) => {
        global.store.dispatch({
          type   : 'SET_DRAWER_STATE',
          payload: state.drawerMovementDirection,
        });
      }
    },
    SignedOutNav: {
      screen           : SignedOutNav ,
      navigationOptions: ({ navigation: { state } }) => {
      }
    }
  },
  { initialRouteName: 'SignedOutNav' }
);
const AppContainer = createAppContainer(AppNavigator);


export default AppContainer;
