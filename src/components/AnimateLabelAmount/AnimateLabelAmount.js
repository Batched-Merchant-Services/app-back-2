import React, { Fragment, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { TextInput, TouchableHighlight } from 'react-native';
import { useTimingValue } from '@hooks/animation-hooks';
import InputWrapper from '@components/AnimateLabelAmount/InputWrapper';
import FloatingLabel from '@components/AnimateLabelAmount/FloatingLabel';
import View from '@components/View';
import Text from '@components/Text';
import DivSpace from '@components/DivSpace';
import Colors from '@styles/Colors';
import i18n from '@utils/i18n';
import { useSelector } from 'react-redux';

import Styles from '@components/AnimateLabelAmount/styles';

const AnimateLabelAmount = ({
  label,
  error,
  value,
  secureTextEntry,
  onBlur,
  onChangeText,
  onFocus,
  raiseLabel,
  multiline,
  ...props
}) => {
  // Animation value for the label
  const redux = useSelector(state => state);
  const [scale, toMin, toMax] = useTimingValue({ min: 0, max: 1, time: 170 });
  const userData = redux.user;
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const [currencyUser]=useState(userData?userData.currencyUser:'');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);


  // On mount if theres a value, label should be up
  useEffect(() => {
    (value || raiseLabel) && toMax({ immediately: true });
  }, []);

  // Focus handler
  const handleFocus = () => {
    setIsFocused(true);
    toMax();
    onFocus && onFocus();
  };

  // Blur handler
  const handleBlur = () => {
    setIsFocused(false);
    (!value && !raiseLabel) && toMin();
    onBlur && onBlur();
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <TouchableHighlight onPress={focusInput} underlayColor={'transparent'}>
      <Fragment>
        <InputWrapper isFocused={isFocused} hasError={!!error}>
          {secureTextEntry && (
            <View style={Styles.secureTextWrapper}>
              <Text white style={Styles.secureText} numberOfLines={1} ellipsizeMode={'clip'}>
                {value.replace(/./g, '*')}
              </Text>
            </View>
          )}
          <FloatingLabel label={label} scale={scale} />
          <TextInput
            {...props}
            onChangeText={onChangeText}
            placeholder={i18n.t('generics.textEnterAmount')} 
            placeholderTextColor={ brandTheme.title??Colors?.title }
            ref={inputRef}
            blurOnSubmit
            onBlur={handleBlur}
            onFocus={handleFocus}
            selectionColor={brandTheme.white??Colors.white}
            style={[
              Styles.input,{color: brandTheme.white??Colors.white},
              ...(secureTextEntry ? [Styles.inputSecure,{color: brandTheme.white??Colors?.white}] : []),
            ]}
            secureTextEntry={secureTextEntry}
            value={value}
          />
         
        </InputWrapper>
        <DivSpace height-5 />
        <Text center h10 textGray>{currencyUser}</Text>
      </Fragment>
    </TouchableHighlight>
  );
};

AnimateLabelAmount.propTypes = {
  label          : PropTypes.string.isRequired,
  error          : PropTypes.string,
  secureTextEntry: PropTypes.bool,
  value          : PropTypes.any,
  onBlur         : PropTypes.func,
  onChangeText   : PropTypes.func,
  raiseLabel     : PropTypes.bool,
  onFocus        : PropTypes.func
};

export default AnimateLabelAmount;
