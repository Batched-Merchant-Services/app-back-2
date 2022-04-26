import React, { NativeModules,Platform } from 'react-native'
import { AsyncStorage } from 'react-native';

const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;    
const sliceLanguage = deviceLanguage.slice(0,2);

console.log('sliceLanguage',sliceLanguage)
export default {
  init  : Function.prototype,
  type  : 'languageDetector',
  async : true,
  detect: (callback) => { 
    AsyncStorage.getItem('lang').then((value) => {
      const lng = (value) ? value: null;
      const selectLanguage = lng || sliceLanguage;
      callback(selectLanguage);
    }).then(res => {
    });  
  },
  cacheUserLanguage: function(lng) {
    return  lng;
  }
};

