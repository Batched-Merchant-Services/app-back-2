import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from '@components';
import { verticalScale,scale } from 'react-native-size-matters';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';


const MenuTabLabel = ({ _, focused,text,Invalid, ...props }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  return (
    <View
      centerH
      style={{
        width          :'100%',
        height         : verticalScale(15),
        justifyContent : 'flex-end',
        backgroundColor: focused ? brandTheme.textBlue01??Colors?.textBlue01 : 'transparent'
      }}
    >
      <Text
        h12
        style={{
          color     : Invalid? brandTheme.title??Colors?.title: focused ? brandTheme.bgOrange02??Colors.bgOrange02 :  brandTheme.textBlue01??Colors?.textBlue01,
          fontWeight: focused ? '600' : '100'
        }}
      >
        {text}
      </Text>
      {/* <View style={{ width: verticalScale(40),backgroundColor: focused ? brandTheme.orange??Colors?.orange: 'transparent',height: verticalScale(3)}}/> */}
    </View>
  )};

MenuTabLabel.propTypes = {
  text: PropTypes.any
};

export default MenuTabLabel;
