import React from 'react';
import PropTypes from 'prop-types';
import { ImageComponent } from '@components';
import { verticalScale } from 'react-native-size-matters';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';
import styles from './styles';

const ResizeImageAvatar = ({ source, height, width,...props }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  return (
    <ImageComponent source={source} imageStyle={[styles.imageContainer,{ backgroundColor: brandTheme.white??Colors?.white,borderRadius: verticalScale(width)/2}]} width={verticalScale(width)} height={verticalScale(height)} />
  );
};

ResizeImageAvatar.propTypes = {
  height: PropTypes.number.isRequired,
  width : PropTypes.number.isRequired,
};

export default ResizeImageAvatar;
