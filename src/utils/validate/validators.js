
const Validators = {
  presence: value => {
    if (value === undefined) {
      return false;
    } else {
      if (value.name) {
        const name = value.name === 'Please select one option' || value.name === 'Selecciona una opción' ? true : false;
        if (name) {
          return true;
        }else{
          return false;
        }
      }else{
        value = String(value).trim();
        return value.length ? false : true;
      }
    }
  },
  format: (value, pattern) => {
    value = String(value);
    return pattern.test(value.trim());
  },
  length: (value, min = 0, max = 999) => {
    value = String(value);
    return value.length >= min && value.length <= max;
  },
  equality: (value, confirm) => {
    value = String(value);
    return value === confirm;
  }
};

export default Validators;
