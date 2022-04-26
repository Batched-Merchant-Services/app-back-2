import React from 'react';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import Ripple from 'react-native-material-ripple';
import { useSelector } from 'react-redux';
import { Text, DivSpace, View, BoxGradient, ImageComponent } from '@components';
import Colors from '@styles/Colors';
import Styles from '@screens/store/styles';

const StoreOption = ({ badge, label, image, onPress, width, height,invalid }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;

  return (
    <View flex-1 centerH>
      <Ripple onPress={onPress}>
        <View centerH width-125>
          <DivSpace height-1 flex-1></DivSpace>
          {badge && (
            <BoxGradient size={30} orange style={[Styles.badge,{borderColor: brandTheme?.white??Colors.white}]}>
              <Text h16 semibold white>
                {badge}
              </Text>
            </BoxGradient>
          )}
          <BoxGradient invalid={invalid} size={96}>
            <ImageComponent source={image} width={scale(width)} height={scale(height)} />
          </BoxGradient>
          <DivSpace height-18 />
          <Text center h12 medium white>
            {label}
          </Text>
        </View>
      </Ripple>
    </View>
  );
};

StoreOption.propTypes = {
  badge  : PropTypes.number,
  label  : PropTypes.string.isRequired,
  image  : PropTypes.any,
  onPress: PropTypes.func
};

export default StoreOption;
