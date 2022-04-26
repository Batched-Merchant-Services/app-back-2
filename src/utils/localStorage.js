/* 
  React Native Library for securely storing keys to iOS and Android devices
  in KeyChain and KeyStore respectively
*/
import RNSecureKeyStore, { ACCESSIBLE } from 'react-native-secure-key-store';

const set = (key, value) =>
  RNSecureKeyStore.set(key, value, {
    accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY
  });
 
const get = key => RNSecureKeyStore.get(key);

const remove = key => RNSecureKeyStore.remove(key);


export default { set, get, remove };
