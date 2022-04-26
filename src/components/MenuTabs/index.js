import React from 'react';
import PropTypes from 'prop-types';
import { View } from '@components';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';
import CustomTabBarIcon from './CustomTabBarIcon';




const MenuTabs = ({ ...props }) => {

  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  const {navigation} = props; 
  const routes = navigation.state.routes;
  
  const navigationHandler = (routeName) => {
    navigation.navigate(routeName);
  };


console.log('routes',routes)
  return (
    <View row style={{ backgroundColor: brandTheme.bgOrange02 ?? Colors.bgOrange02}} >
      {routes.length > 0 &&(
        routes.map((route, index) => (
          <View flex-1 centerH>
            <CustomTabBarIcon
              key={route.key}
              routeName={route.routeName}
              onPress={() => navigationHandler(route.routeName)}
              focused={navigation.state.index === index}
              index={index}
            />
          </View>
        ))
      )}
    </View>
  );
};

MenuTabs.propTypes = {
  onPress: PropTypes.func,
};

export default MenuTabs;
