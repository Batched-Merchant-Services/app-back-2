import React from 'react';

import { TouchableOpacity } from 'react-native';
import View from '@components/View';
import ImageComponent from '@components/ImageComponent';
import Styles from '@components/Checkbox/styles';
import Check from '@assets/icons/check.png';
import { scale, verticalScale } from 'react-native-size-matters';
import { useSelector} from 'react-redux';

const Checkbox = ({ checkedValue, error, onChange, value }) => {
  function handlePress() {
    onChange(value ? false : checkedValue);
  }
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={[
          Styles.wrapper,{borderColor: brandTheme?.textBlueDark},
          ...(error ? [{borderColor: brandTheme?.red}] : []),
          ...(value ? [{borderColor: brandTheme?.green,backgroundColor: brandTheme?.green}] : [])
        ]}
      >
        {value && <ImageComponent  white source={Check} width={scale(13)} height={verticalScale(10)} />}
      </View>
    </TouchableOpacity>
  );
};

export default Checkbox;
