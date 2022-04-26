import React from 'react';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import Ripple from 'react-native-material-ripple';
import Colors from '@styles/Colors';
import { Text, DivSpace, View, BoxGradient, ImageComponent } from '@components';
import { useSelector } from 'react-redux';
import Styles from '@screens/store/styles';

const CategoryOption = ({ badge, label, image, width, height, onPress, white }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;

  return (
    <View flex-1 centerH>
      <Ripple onPress={onPress}>
        <View centerH width-110>
          <DivSpace height-8 flex-1></DivSpace>
          {badge && (
            <BoxGradient size={30} orange style={[Styles.categoryBadge,{borderColor: brandTheme?.white??Colors.white}]}>
              <Text h14 semibold white>
                {badge}
              </Text>
            </BoxGradient>
          )}
          <BoxGradient size={61} white={white}>
            <ImageComponent source={image} width={scale(width)} height={scale(height)} />
          </BoxGradient>
          <DivSpace height-18 />
          <Text center h12 medium>
            {label}
          </Text>
        </View>
      </Ripple>
    </View>
  );
};

CategoryOption.propTypes = {
  badge  : PropTypes.number,
  label  : PropTypes.string.isRequired,
  image  : PropTypes.any,
  onPress: PropTypes.func,
  width  : PropTypes.number,
  height : PropTypes.number
};

export default CategoryOption;
