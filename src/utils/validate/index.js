
import Validators  from './validators';
import {Validations} from './validations';

const Validate = (fieldName, value, confirm = '') => {
  
  if (Validations.hasOwnProperty(fieldName)) {
    const object = Validations[fieldName];
    if (object.hasOwnProperty('presence')) {
      if (Validators.presence(value)) {
        return object.presence.message;
      }
    }

    if (object.hasOwnProperty('length')) {
      const lengthObj = object.length;
      const min = lengthObj.hasOwnProperty('minimum') ? lengthObj.minimum : 0;
      const max = lengthObj.hasOwnProperty('maximum') ? lengthObj.maximum : 99;

      if (!Validators.length(value, min, max)) {
        return lengthObj.message;
      }
    }

    if (object.hasOwnProperty('format')) {
      const formatObj = object.format;
      if (!Validators.format(value, formatObj.pattern)) {
        return formatObj.message;
      }
    }

    if (object.hasOwnProperty('equality')) {
      const equalityObj = object.equality;

      if (!Validators.equality(value, confirm)) {
        return equalityObj.message;
      }
    }
  }

  return null;
};

export default Validate;