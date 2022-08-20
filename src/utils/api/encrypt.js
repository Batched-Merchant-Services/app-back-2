import { PUBLIC_KEY } from '@env';
import { getUTCDateString } from "@utils/formatters";


export const generateRSA = (text) => {
  try {
    var JSEncrypt = require('jsencrypt');
    const pub_key =' -----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrfWPRGsWnWzxRun7hzrqxdJ88133zwnJ8K9lD2DaJpyWfKpRt6VPbNQB9N1oFjYO8UkbmDTxI/RoA95Syse52T02smwTKvLqXuLSstcLCPPSYsr3tHaI0STU/Ta0UujffiEC9sXzk70xkIOiBeJAxKaSWZMjyLl8go5mHCF71nwIDAQAB-----END PUBLIC KEY-----';
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


