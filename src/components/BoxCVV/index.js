import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View } from 'react-native';
import Styles from './styles';
import { DivSpace,TextInputError } from '@components';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';


const BoxCVV = ({ value, error, onChangeText, ...props }) => {

  const codeInputs = [];
  const [focused, setFocused] = useState(null);
  const [arrayOfCodes, setArrayOfCodes] = useState([]);
  const [codeInputRefs] = useState([]);
  const [length] = useState(3);

  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;


  const onInputCode = (text, id) => {
    let arrayOfCode = arrayOfCodes;
    text = text.replace(/[^0-9]/g, '');
    arrayOfCode[id] = text;
    if (text) {
      moveNextInput(id);
    }
    onChangeText(arrayOfCode.join(''));
  };

  const moveNextInput = (index) => {
    if (index < length - 1) {
      codeInputRefs[index + 1].focus();
    }
  };
  

  const onKeyPress = (event, id) => {
    /* TODO: https://github.com/facebook/react-native/issues/19507  */
    const { key } = event.nativeEvent;
    if (key === 'Backspace' && id > 0) {
      codeInputRefs[id - 1].focus();
    } else {
      const code = arrayOfCodes[id];
      if (code && key !== 'Backspace') {
        let arrayOfCode = arrayOfCodes;
        arrayOfCode[id] = key;
        setArrayOfCodes(arrayOfCode);
        if (id < length - 1) {
          codeInputRefs[id + 1].focus();
        } 
      }
    }
  };

  const makeHandleFocus = index => () => setFocused(index);
  const handleBlur = index => () => setFocused(index);


  for (let i = 0; i < length; i++) {
    let id = i;
    codeInputs.push(
      <React.Fragment key={id}>
        <View style={{ marginRight: i < length - 1 ? 5 : 0 }}>
          <TextInput
            underlineColorAndroid='transparent'
            keyboardType={'numeric'}
            returnKeyType={'done'}
            maxLength={1}
            value={arrayOfCodes[id] ? arrayOfCodes[id].toString() : ''}
            style={[Styles.input,{color: brandTheme.white??Colors.white}]}
            ref={input => {
              codeInputRefs[id] = input;
            }}
            onChangeText={text => onInputCode(text, id)}
            onKeyPress={e => onKeyPress(e,id)} 
            onFocus={makeHandleFocus(id)}
            onEndEditing={handleBlur(id)}
            blurOnSubmit
            {...props}
          />
          <View
            style={[
              Styles.underLine,{ backgroundColor: brandTheme.bgBlue06??Colors?.bgBlue06},
              ...(focused === id ? [{ backgroundColor: brandTheme.orange??Colors.orange}] : [])
            ]}
          />
          {(id + 1) % 4 === 0 && <DivSpace width-5 />}
        </View>
      </React.Fragment>
    );
  }
 
  return (
    <View>
      <View  style={Styles.container}>
        {codeInputs}
      </View>
      <DivSpace height-2/>
      <TextInputError error={error} />
    </View>
  );
};

BoxCVV.propTypes = {
  error       : PropTypes.string,
  value       : PropTypes.any,
  onChangeText: PropTypes.func,
  onFill      : PropTypes.func
};

export default BoxCVV;