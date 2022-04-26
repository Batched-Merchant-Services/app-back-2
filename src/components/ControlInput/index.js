import React, {useState} from 'react';
import { TouchableOpacity } from 'react-native';
import ImageComponent from '@components/ImageComponent';
import View from '@components/View';
import Text from '@components/Text';
import DivSpace from '@components/DivSpace';
import { moneyFormatter } from '@utils/formatters';
import Minus from '@assets/icons/minus.png';
import Plus from '@assets/icons/plus.png';

const ControlInput = ({label, value, onChangeText, options}) => {

  if(!value) {
    onChangeText(options[0]);
  }

  function handleMinusPress() {
    let currentIndex = options.indexOf(value);
    currentIndex = currentIndex === -1? 0 : currentIndex;
    const nextIndex = currentIndex <= 0? 0 : currentIndex - 1;
    onChangeText(options[nextIndex]);
  }

  function handlePlusPress() {
    let currentIndex = options.indexOf(value);
    currentIndex = currentIndex === -1? 0 : currentIndex;
    const nextIndex = currentIndex < options.length - 1? currentIndex + 1 : options.length - 1;
    onChangeText(options[nextIndex]);
  }

  return (
    <View>
      <Text h10 textGray center>{label}</Text>
      <View row centerH centerV>
        <TouchableOpacity onPress={handleMinusPress}>
          <ImageComponent source={Minus} width={35} height={35}/>
        </TouchableOpacity>
        <DivSpace width-30 />
        <View centerH>
          <Text h28 white>{moneyFormatter(value)}</Text>
        </View>
        <DivSpace width-30 />
        <TouchableOpacity onPress={handlePlusPress}>
          <ImageComponent source={Plus} width={35} height={35}/>
        </TouchableOpacity>
      </View>
      <Text h10 textGray center>MXN</Text>
    </View>
  );
};

export default ControlInput;