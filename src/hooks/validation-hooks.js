import { useState } from 'react';
import Validate from '@utils/validate';

/**
 * Use a validated input value
 *
 * @param {String} name name of the input
 * @param {Any} initialValue initial value
 * @param {String} changeHandlerName change handler name
 */


export const useValidatedInput = (
  name,
  initialValue,
  { changeHandlerName = 'onChangeText',changeHandlerSelect = 'onSelect', validationParams = [] } = {}
) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState(false);

  function handleChangeText(text) {
    if (touched) {
      setError(Validate(name, value,...validationParams));
    }
    setValue(text);
  }

  function handleChangeSelect(text) {
    if (text.name === '') {
      setError(Validate(name, value, ...validationParams));
    } else {
      setError(Validate(text.name, text.value, ...validationParams));
      setValue(text);
    }
  }

  function onBlur() {
    setTouched(true);
    setError(Validate(name, value, ...validationParams));
  }

  function isValid() {
    return !Validate(name, value, ...validationParams);
  }

  return {
    [changeHandlerSelect]: handleChangeSelect,
    [changeHandlerName]  : handleChangeText,
    error,
    isValid,
    onBlur,
    value
  };
};

export const isFormValid = (...fields) => fields.every(f => f.isValid());
