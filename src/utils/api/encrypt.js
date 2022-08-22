import { PUBLIC_KEY } from '@env';
import { getUTCDateString } from "@utils/formatters";


export const generateRSA = (text) => {
  try {
    var JSEncrypt = require('jsencrypt');
    const pub_key = PUBLIC_KEY
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(pub_key);
    return encrypt.encrypt(text);
  } catch (error) {
    console.log('error',error)
  }

};

export const getTicks = () => {
  console.log('getTicks')
  try {
    let date = getUTCDateString();
    return (((date.getTime() + (date.getTimezoneOffset() * 60000)) * 10000) + 621355968000000000)
  } catch (error) {
    console.log('error',error)
  }

};


