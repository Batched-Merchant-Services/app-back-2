import React, { NativeModules, Platform } from 'react-native'
import { AsyncStorage } from 'react-native';

const deviceLanguage = 'en_US'

console.log('device language', deviceLanguage);
const sliceLanguage = deviceLanguage.slice(0, 2);

export default {
    init: Function.prototype,
    type: 'languageDetector',
    async: true,
    detect: (callback) => {
        AsyncStorage.getItem('lang').then((value) => {
            const lng = (value) ? value : null;
            const selectLanguage = lng || sliceLanguage;
            callback(selectLanguage);
        }).then(res => {
        });
    },
    cacheUserLanguage: function (lng) {
        return lng;
    }
};

