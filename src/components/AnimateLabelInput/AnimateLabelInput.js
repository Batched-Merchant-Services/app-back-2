import React, { Fragment, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { TextInput, TouchableHighlight,TouchableOpacity,Platform } from 'react-native';
import { useTimingValue } from '@hooks/animation-hooks';
import InputWrapper from '@components/AnimateLabelInput/InputWrapper';
import TextInputError from '@components/AnimateLabelInput/TextInputError';
import FloatingLabel from '@components/AnimateLabelInput/FloatingLabel';
import View from '@components/View';
import Text from '@components/Text';
import Colors from '@styles/Colors';
import Styles from '@components/AnimateLabelInput/styles';
import { useSelector } from 'react-redux';
import IconShowPassword from '../../utils/iconSVG/IconShowPassword';
import IconHidePassword from '../../utils/iconSVG/IconHidePassword';

const AnimateLabelInput = ({
  label,
  error,
  value,
  secureTextEntry,
  onBlur,
  onChangeText,
  onFocus,
  multiInput,
  multiline,
  numberOfLines,
  borderLight,
  style = {},
  containerStyle = {},
  ...props
}) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  // Animation value for the label
  const [scale, toMin, toMax] = useTimingValue({ min: 0, max: 1, time: 170 });
  const [isFocused, setIsFocused] = useState(false);
  const [showPass, setShowPass] = useState(secureTextEntry);
  const inputRef = useRef(null);
  // On mount if theres a value, label should be up
  useEffect(() => {
    value && toMax({ immediately: true });
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
    !value && toMin();
    onBlur && onBlur();
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  const handleChangePass = () => {
    setShowPass(!showPass);
  };
 
  if (value) {
    toMax();
  }

  return (
    <>
        <TouchableHighlight  onPress={focusInput} underlayColor={'transparent'}>
          <Fragment>
            <InputWrapper
              {...props}
              numberOfLines={numberOfLines}
              multiInput={multiInput}
              isFocused={isFocused}
              hasError={!!error}
              borderLight={borderLight}
              multiline={multiline}
              containerStyle={containerStyle}
            >
              <FloatingLabel label={label} scale={scale} />
              {!secureTextEntry && (
                <TextInput
                  {...props}
                  onChangeText={onChangeText}
                  ref={inputRef}
                  blurOnSubmit
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  selectionColor={brandTheme.white??Colors.white}
                  style={[
                    Styles.input,{color: brandTheme.white??Colors.white},
                    ...(Platform.OS === 'android'?showPass ? [Styles.inputSecure] : []:[]),
                    style
                  ]}
                  secureTextEntry={showPass}
                  value={value}
                  multiline={multiline}
                  numberOfLines={numberOfLines}
                  
                />
              )}
              {secureTextEntry && (
                <View row>
                  <View flex-1>
                    <TextInput
                      {...props}
                      onChangeText={onChangeText}
                      ref={inputRef}
                      blurOnSubmit
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      selectionColor={brandTheme.white??Colors.white}
                      style={[
                        Styles.input,{color: brandTheme.white??Colors.white},
                        ...(Platform.OS === 'android'? showPass ? [Styles.inputSecure] : []:[]),
                        style
                      ]}
                      secureTextEntry={showPass}
                      value={value}
                      multiline={multiline}
                      numberOfLines={numberOfLines}
                    />
                  </View>
                  <View paddingB-9>
                    {secureTextEntry && (
                      <TouchableOpacity
                        onPress={handleChangePass}
                        style={Styles.containerShow}
                      >
                        {showPass ? 
                          <IconShowPassword width={21} height={21}  fill={brandTheme?.bgBlue06??Colors?.bgBlue06}/>: 
                          <IconHidePassword width={21} height={21}  fill={brandTheme?.bgBlue06??Colors?.bgBlue06}/>
                        }
                      </TouchableOpacity>)}
                  </View>
                </View>
              )}
            </InputWrapper>
            <TextInputError error={error} />
          </Fragment>
        </TouchableHighlight>
    </>
  );
};

AnimateLabelInput.propTypes = {
  label          : PropTypes.string.isRequired,
  error          : PropTypes.string,
  secureTextEntry: PropTypes.bool,
  value          : PropTypes.any,
  onBlur         : PropTypes.func,
  onChangeText   : PropTypes.func,
  onFocus        : PropTypes.func
};

export default AnimateLabelInput;
