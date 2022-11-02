import ImageResizer from 'react-native-image-resizer';
import ImgToBase64 from 'react-native-image-base64';
import moment from 'moment';

export const formatDateGMT = stringDate => {
  const date = new Date(stringDate);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth()+1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${month}/${day}/${year}`;
};

export const formatDate = stringDate => {
  const date = new Date(stringDate);
  const year = date.getFullYear();
  const month = ('0' + (date.getUTCMonth()+1)).slice(-2);
  const day = ('0' + date.getUTCDate()).slice(-2);
  return `${month}/${day}/${year}`;
};

export const formatDateSend = stringDate => {
  const date = new Date(stringDate);
  const year = date.getFullYear();
  const month = ('0' + (date.getUTCMonth()+1)).slice(-2);
  const day = ('0' + date.getUTCDate()).slice(-2);
  return `${year}-${month}-${day}`;
};



export const getUTCDateString = ()  =>{
  let localDate = new Date();
  return new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), localDate.getHours(), localDate.getMinutes(), localDate.getSeconds(), localDate.getMilliseconds()));
}


// export const getUTCDateString = ()  =>{
//   let utcDate = new Date();
//   const year = utcDate.getUTCFullYear();
//   const month = ('0' + (utcDate.getUTCMonth()+1)).slice(-2);
//   const day = ('0' + utcDate.getUTCDate()).slice(-2);
//   const hours = ('0' + utcDate.getUTCHours()).slice(-2);
//   const mins = ('0' + utcDate.getUTCMinutes()).slice(-2);
//   const secs = ('0' + utcDate.getUTCSeconds()).slice(-2);
//   const milliseconds = utcDate.getUTCMilliseconds();
//   let response = `${year}-${ month}-${day} ${hours }:${ mins }:${ secs }:${ milliseconds }`
//   return response;
// }



export const addZeros = date => {
  let dateConvert = date.toString();
  dateConvert.length === 2 ? dateConvert = date : dateConvert = '0' + (date);
  return dateConvert;
};
export const moneyFormatter = (amount = 0) => {
  const fixedAmount = (Math.floor(amount * 100) / 100).toFixed(2);
  return '$' + fixedAmount.replace(/\d(?=(\d{3})+\.)/g, '$&,');
};
export const thousandsSeparator = (amount = 0) => {
  const fixedAmount = (Math.floor(amount * 100) / 100).toFixed(2);
  return fixedAmount.replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

export const formatCard = cardNumber => {
  if (cardNumber) {
    const chunks = String(cardNumber).match(/.{1,4}/g);
    return chunks.join(' ');
  }
  return '';
};

export const maskCardNumber = cardNumber => {
  if (cardNumber) {
    const chunks = String(cardNumber).match(/.{1,4}/g);
    const maskedArray = chunks.map((element, index) => {
      if (index === 1 || index === 2) {
        return element.replace(/[0-9]/g, '*');
      } else {
        return element;
      }
    });

    return maskedArray.join(' ');
  }
  return '';
};

export const formatCardExpiration = date => {
  if (date) {
    return date.substr(0, 2) + '/' + date.substr(2, 4);
  }
  return '';
};

export const upperCase = text => {
  if (text) {
    return text.toUpperCase();
  }
  return '';
};

export const convertImage = async(path) => {
  const resizedImageUrl = await ImageResizer.createResizedImage(path, 400, 400, 'JPEG', 100, 0, null);
  const base64 =  await ImgToBase64.getBase64String(resizedImageUrl.uri);
  return base64;
};



export const maskNumbers = cardNumber => {
  if (cardNumber) {
    const chunks = String(cardNumber).match(/.{0,3}/g);
    const maskedArray = chunks.map((element, index) => {
      if (index === 0 || index === 1) {
        return element.replace(/[0-9]/g, '*');
      } else {
        return element;
      }
    });

    return maskedArray.join('');
  }
  return '';
};

export const maskEmail = cardNumber => {
  if (cardNumber) {
    const chunks = String(cardNumber).match(/.{0,4}/g);
    const maskedArray = chunks.map((element, index) => {
      if (index === 0  || index === 1) {
        return element.replace(/[^0-9]+/g, "*");
       
      } else {
        return element;
      }
    });

    return maskedArray.join('');
  }
  return '';
};


export const twoDigits = value => {
  if (value) {
    const first2Num = Number.parseFloat(value).toFixed(3)
    return first2Num;
  }
  return '';
};

