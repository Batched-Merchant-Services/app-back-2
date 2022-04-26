import React from 'react';
import PropTypes from 'prop-types';
import { ImageComponent, View } from '@components';
import { verticalScale,scale } from 'react-native-size-matters';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';

const MenuTabIcon = ({ _, focused,icon,Invalid, iconFocuse, ...props }) => {

  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  return (
    <View
      centerH
      centerV
    >
      <ImageComponent
        tintColor={Invalid? brandTheme.title??Colors?.title: focused ? brandTheme.bgOrange02??Colors?.bgOrange02 : brandTheme.textBlue01??Colors?.textBlue01}
        source={focused ? icon : iconFocuse}
        height={verticalScale(39)}
        width={scale(39)}
      />
    </View>
  )};

MenuTabIcon.propTypes = {
  children: PropTypes.any
};

export default MenuTabIcon;

{/* <View
  centerH
  centerV
  style={{
    width          : verticalScale(42),
    height         : verticalScale(42),
    borderRadius   : verticalScale(21),
    backgroundColor: focused ? brandTheme.textBlue01??Colors?.textBlue01 : 'transparent'
  }}
>
  <ImageComponent
    tintColor={Invalid? brandTheme.title??Colors?.title: focused ? brandTheme.white??Colors?.white : brandTheme.bgBlue06??Colors?.bgBlue06}
    source={focused ? icon : iconFocuse}
    height={verticalScale(23)}
    width={scale(25)}
  />
</View> */}