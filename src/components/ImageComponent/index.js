import React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import StyleHelper from '@utils/styleHelper';
import styles from './styles';
import { useSelector} from 'react-redux';
import ImagesBrand from '@screens/Images';

const ImageComponent = ({ source, height, width, tintColor, imageStyle = {}, ...props }) => {

  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const brandThemeImages = appData?.Theme?.images;

  const imageValue = {
    ...StyleHelper.extractImageValue(source,brandThemeImages)
  };
  const baseStyle = {
    ...StyleHelper.extractTintColorValue(props,brandTheme)
  };

  return (
    <View style={{ height, width }}>
      <Image
        source={imageValue.source??{uri: imageValue.uri }}
        style={[
          styles.imageContainer, 
          imageStyle,
          baseStyle,
          ...(tintColor ? [{ tintColor: tintColor}] : [])
        
        ]}
        {...props}
      />
    </View>
  );
};

ImageComponent.propTypes = {
  height: PropTypes.number.isRequired,
  width : PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ])
};

export default ImageComponent;
