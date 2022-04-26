import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Styles from './styles';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';

const PinInput = ({ value, error, onChangeText, pinLength = 6,contentStyle={},colorStyle={}, ...props }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  const values = value
    .padEnd(pinLength)
    .split('')
    .map(v => v.trim());

  const refs = values.map(v => null);
  const [focused, setFocused] = useState(null);

  const moveNext = (value, index) => {
    if (value && index < values.length - 1 && !values[index + 1].trim()) {
      refs[index + 1].focus();
    }
  };

  const makeHandleTextChange = index => text => {
    text = text.replace(/[^0-9]/g, '');

    if (text.length) {
      moveNext(text, index);
    }
    values[index] = text.length ? text : ' ';
    onChangeText(values.join(''));
  };

  const makeHandleFocus = index => () => setFocused(index);
  const handleBlur = () => setFocused(null);

  return (
    <View style={Styles.container}>
      {values.map((v, index, arr) => (
        <View
          key={index}
          style={{ marginRight: scale(index < arr.length - 1 ? 6 : 0) }}
        >
          <TextInput
            underlineColorAndroid="transparent"
            keyboardType={'number-pad'}
            returnKeyType={'done'}
            maxLength={1}
            value={v ? v : ''}
            style={[Styles.input,colorStyle?colorStyle:{color: brandTheme.white??Colors?.white}]}
            ref={input => (refs[index] = input)}
            onChangeText={makeHandleTextChange(index)}
            onFocus={makeHandleFocus(index)}
            onEndEditing={handleBlur}
            blurOnSubmit
            {...props}
          />
          <View
            style={[
              Styles.underLine,Object.keys(contentStyle).length > 0 ? contentStyle :{ backgroundColor: brandTheme.bgBlue06??Colors?.bgBlue06},
              ...(focused === index ? [{backgroundColor: brandTheme.orange??Colors?.orange}] : [])
            ]}
          />
        </View>
      ))}
    </View>
  );
};

PinInput.propTypes = {
  error       : PropTypes.string,
  value       : PropTypes.any,
  onChangeText: PropTypes.func
};

export default PinInput;
