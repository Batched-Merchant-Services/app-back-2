import ImageComponentr from 'react-native-image-resizer';
import ImgToBase64 from 'react-native-image-base64';

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
  const resizedImageUrl = await ImageComponentr.createResizedImage(path, 400, 400, 'JPEG', 100, 0, null);
  const base64 =  await ImgToBase64.getBase64String(resizedImageUrl.uri);
  return 'data:image/jpeg;base64,'+ base64;
};