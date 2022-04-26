const red = '#DA0D0D';
const green = '#00C79B';
const bgOrange01 = '#FFCE00';/**/
const bgOrange02 = '#C99875';/**/
const orange = '#A94712';
const textGray = '#4D4D4D';
const bgGray = '#99A0AA';
const white = '#202020';
const bgBlue06 = '#A94712'; 
const bgBlue07 = '#FF937B';
const textBlueDark = '#F0E1CE';
const textBlue01 = '#FFFFFF';
const bgBlue01 = '#EEEEEE';
const bgBlue02 = '#F6F6F6';
const disabled = '#C9C9C9';
const title =  '#C99875';

const Colors = {
  red,
  bgOrange01,
  bgOrange02,
  textBlueDark,
  textGray,
  white,
  orange,
  textBlue01,
  disabled,
  title,
  bgBlue02,
  bgBlue06,
  bgGray,
  bgBlue01,
  bgBlue07,
  green, 
  get: value => {
    if (Colors[value]) {
      const returnValue = { color: Colors[value] };
      return returnValue;
    }
    return null;
  }
};

export default Colors;

