import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import LocalStorage from '@utils/localStorage';
import RNLanguages from 'react-native-languages';
import { Platform } from 'react-native';
import jwt from 'react-native-pure-jwt';
import i18n from '@utils/i18n';
import { PRODUCTION_API_URL, STAGING_API_URL, SECRET_API_KEY, USER_AGENT } from '@env';

/* TODO: change this url in production. */
const BASEURLSWITCH = PRODUCTION_API_URL;
const device = DeviceInfo.getUniqueId();
const buildNumber = DeviceInfo.getBuildNumber();
const versionNumber = DeviceInfo.getVersion();
const OS = Platform.OS;

var apiSavvyWallet = axios.create({
    baseURL: BASEURLSWITCH,
    headers: {
        device: device,
        'User-Agent': USER_AGENT,
        'Content-Type': 'application/json'
    }
});

apiSavvyWallet.interceptors.request.use(
    async config => {
        console.log('request', config);
        config.headers = { ...config.headers, 'Accept-Language': i18n?.language, 'app': 'savvy' };
        const authUrls = [];
        if (authUrls.includes(config.url)) {
            const token = await LocalStorage.get('session_token');
            config.headers = { ...config.headers, 'Authorization': token, 'Accept-Language': i18n?.language };
            return config;
        }
        return config;
    }, function (error) {
        console.error('✉️', error);
        return Promise.reject(error);
    }
);

const errorHandler = (error) => {
    console.log('errorHandler', error);
    if (error.config) {

    }
    return Promise.resolve({
        ...error.response.data,
        //status: error.response.status
    });
};

const successHandler = (response) => {
    console.log('successHandler', response);
    return response.data;
};

apiSavvyWallet.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
);

const bodyCrypto = async (data) => {
    const body = {
        data: await jwt.sign(data,
            SECRET_API_KEY,
            {
                alg: 'HS256'
            }
        )
            .then(match => {
                return match;
            })// token as the only argument
            .catch(error => errorHandler(error)) // possible errors
    };
    return await body;
};

const pinCrypto = async (data) => {
    const infoPin = await jwt.sign(data,
        SECRET_API_KEY,
        {
            alg: 'HS256'
        }
    )
        .then(match => {
            return match;
        })// token as the only argument
        .catch(error => errorHandler(error)); //possible errors
    return infoPin;
};

export const login = async (phoneNumber, password, Company) => {
    const companyValue = Company?.value ? Company?.value : '';
    console.log('Company', companyValue)
    const body = await bodyCrypto({
        phoneNumber,
        password,
        device,
        version: versionNumber,
        system: OS,
        build_number: buildNumber,
        group_id: companyValue
    });
    return await apiSavvyWallet.post(`/sessions/login`, body);
};


export const logOut = async (token) => {
    const body = {
    };
    const headers = {
        'Authorization': token,
    };
    return await apiSavvyWallet.post(`/sessions/logout`, body, { headers });
};


export const forgotPassword = async (email_phone, company) => {
    const companyValue = company?.value ? company?.value : '';

    const body = {
        email_phone,
        company_id: companyValue

    };

    return await apiSavvyWallet.post(`/sessions/recover_password`, body);
};


export const forgotYourPassword = async (password, confirmPassword, email, pin) => {

    const body = await bodyCrypto({
        password,
        confirmPassword,
        email,
        pin,

    });

    return await apiSavvyWallet.put(`/sessions/reset_password`, body);
};


export const signUp = async (email, phoneNumber, lada, groupId) => {
    const body = {
        email,
        phoneNumber,
        lada,
        groupId
    };
    return await apiSavvyWallet.post(`/users/register`, body);
};


export const validateCode = async (code, type) => {
    const Code = await pinCrypto({ code });
    const body = {
        code: Code,
        type,
    };
    return await apiSavvyWallet.post(`/codes/validate`, body);
};


export const resendCode = async (email, phoneNumber, lada) => {

    const body = {
        email,
        phoneNumber,
        lada,
    };
    return await apiSavvyWallet.put(`/codes/resend_code`, body);
};


export const completeRegister = async (password, code, pin) => {
    const body = await bodyCrypto({
        password,
        code,
        pin
    });

    return await apiSavvyWallet.post(`/users/register/complete`, body);
};


export const onboarding = async (token, firstName, middleName, lastName, gender, birthday, curp, securityLabel, securityValue, answer, term, phoneNumber, email, lada) => {
    const security_question = await pinCrypto({
        question: securityLabel,
        question_value: securityValue,
        answer: answer
    });

    const headers = {
        'Authorization': token,
    };

    const body = {
        firstName,
        middleName,
        lastName,
        gender,
        birthday,
        curp,
        security_question: security_question,
        term,
        phoneNumber,
        email,
        lada
    };
    return await apiSavvyWallet.put(`/sessions/onboarding`, body, { headers });
};


export const verifyToken = async (token) => {

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.get(`/sessions/validate`, { headers });
};


export const getBalances = async (token) => {

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.get(`/users/balances`, { headers });
};


export const getHistoriTransactions = async (token, id) => {

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.get(`/transactions`, { headers });
};


export const getHistoriId = async (token, id) => {

    const headers = {
        'Authorization': token,
    };
    return await apiSavvyWallet.get(`/transactions?proxy_key=${id}`, { headers });
};


export const validateCompanyCode = async (code) => {
    const body = {
        code,
    };
    return await apiSavvyWallet.get(`/companies/${code}`, body);
};


export const catalogCountry = async () => {

    return await apiSavvyWallet.get(`/catalogs/countries`);
};


export const payToContacts = async (token, phoneNumber, amount, pin, description) => {
    const Pin = await pinCrypto({ pin });

    const headers = {
        'Authorization': token,
    };

    const body = {
        phone: phoneNumber,
        amount: amount,
        code: pin,
        note: description,
        two_factor: true
    };

    return await apiSavvyWallet.post(`/core/transactions/contact`, await body, { headers });
};


export const scanQrCode = async (token, externalId, amount, note, pin) => {
    const Pin = await pinCrypto({ pin });

    const headers = {
        'Authorization': token,
    };

    const body = {
        externalId: externalId,
        amount: amount,
        note: note,
        code: pin,
        two_factor: true
    };

    return await apiSavvyWallet.post(`/core/transactions/qr`, await body, { headers });
};


export const userExternalId = async (token, externalId) => {

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.get(`/users?id=${externalId}&bankInformation=true&info=true&securityQuestion=true&kyc=true&address=true`, { headers });
};


export const getCards = async (token) => {

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.get(`/cards`, { headers });
};


export const changueStatus = async (token, status, id) => {

    const headers = {
        'Authorization': token,
    };
    const body = {
        status: status,
        proxyKey: id

    };
    return await apiSavvyWallet.put(`/cards/change_status`, body, { headers });
};


export const CardActivation = async (token, proxyKey, pin) => {
    const Pin = await pinCrypto({ pin });

    const headers = {
        'Authorization': token,
    };

    const body = {
        proxyKey: proxyKey,
        pin: pin,
    };

    return await apiSavvyWallet.put(`/cards/set_pin`, body, { headers });
};


export const validateCardInformation = async (token, proxyKey, cardNumber, expDate, cvv) => {

    const headers = {
        'Authorization': token,
    };
    const body = {
        proxyKey: proxyKey,
        cardNumber: cardNumber,
        expDate: expDate,
        cvv: cvv
    };
    return await apiSavvyWallet.post(`/cards/activate`, body, { headers });
};


export const cardCancel = async (token, proxyKey, pin) => {
    const Pin = await pinCrypto({ pin });

    const headers = {
        'Authorization': token,
    };

    const body = {
        proxyKey: proxyKey,
        code: pin,
        two_factor: true
    };
    return await apiSavvyWallet.post(`/cards/cancel`, body, { headers });
};


export const reloadCard = async (token, proxyKey, pin, amount, description, type) => {
    const Pin = await pinCrypto({ pin });
    const headers = {
        'Authorization': token,
    };

    const body = {
        proxyKey: proxyKey,
        code: pin,
        amount: amount,
        description: description,
        type_card: type,
        two_factor: true
    };

    return await apiSavvyWallet.post(`/cards/deposit`, await body, { headers });
};



export const requestCard = async (token) => {

    const headers = {
        'Authorization': token,
    };
    const body = {

    };

    return await apiSavvyWallet.post(`/cards`, body, { headers });
};


export const requestCardVirtual = async (token, amount) => {

    const headers = {
        'Authorization': token,
    };
    const body = {
        amount: amount
    };

    return await apiSavvyWallet.post(`/cards/virtual`, body, { headers });
};


export const getFee = async (token, type) => {

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.get(`/cards/fee?type=${type}`, { headers });
};


export const associateCard = async (token, cardNumber, expDate, cvv) => {

    const headers = {
        'Authorization': token,
    };
    const body = {
        cardNumber: cardNumber,
        expDate: expDate,
        cvv: cvv
    };
    return await apiSavvyWallet.post(`/cards/add_card`, body, { headers });
};


export const updateUserContactInfo = async (token, city, suburb, country, state, street, number, zipCode, shortName, addressId) => {

    const headers = {
        'Authorization': token,
    };

    const body = {

        typeAddress: 'home',
        city: city,
        suburb: suburb,
        country: country,
        state: state,
        street: street,
        number: number,
        zipCode: zipCode,
        addressId: addressId,
        shortName: shortName
    };
    return await apiSavvyWallet.put(`/addresses`, body, { headers });
};


export const createAddress = async (token, city, suburb, country, state, street, number, zipCode, shortName) => {

    const headers = {
        'Authorization': token,
    };

    const body = {

        typeAddress: 'home',
        city: city,
        suburb: suburb,
        country: country,
        state: state,
        street: street,
        number: number,
        zipCode: zipCode,
        shortName: shortName
    };
    return await apiSavvyWallet.post(`/addresses`, body, { headers });
};


export const getBankCatalog = async () => {

    return await apiSavvyWallet.get(`/catalogs/banks`);
};


export const getStateCatalog = async () => {

    return await apiSavvyWallet.get(`/catalogs/regions/MX`);
};

export const getIdentificationsCatalog = async () => {

    const valueLanguage = i18n?.language === 'es' ? 2 : 3;
    const valueCountry = i18n?.language === 'es' ? 484 : 840;

    return await apiSavvyWallet.get(`/catalogs/combos/Identificacion-${valueCountry}/${valueLanguage}`);
};


export const updateUser = async (token, firstName, middleName, lastName, gender, birthday, curp, rfc) => {

    const headers = {
        'Authorization': token,
    };

    const body = {
        firstName,
        middleName,
        lastName,
        gender,
        birthday,
        curp,
        rfc
    };
    return await apiSavvyWallet.put(`/users`, body, { headers });
};


export const updateProfileImage = async (token, avatarImage) => {

    const headers = {
        'Authorization': token,
    };

    const body = {
        avatarImage
    };
    return await apiSavvyWallet.put(`/users`, body, { headers });
};


export const updateUserOfficialIdentify = async (token, front, back, selfie, typeIdentification, documentId, addressId, Id) => {

    const headers = {
        'Authorization': token,
    };

    const body = {
        kyc: {
            frontId: front,
            backId: back,
            faceId: selfie,
            typeIdentification: typeIdentification,
            documentId: documentId,
            addressId: addressId,
            id: Id
        },
    };
    return await apiSavvyWallet.put(`/users`, body, { headers });
};


export const updateUserBankInformation = async (token, nameBank, accountNumber, routingNumber, Id) => {

    const headers = {
        'Authorization': token,
    };

    const body = {
        bankInformation: {
            bank: nameBank,
            accountNumber: accountNumber,
            routingNumber: routingNumber,
            id: Id
        },
    };
    return await apiSavvyWallet.put(`/users`, body, { headers });
};


export const updateAppConfirmationPin = async (token, pin) => {
    const Pin = await pinCrypto({ pin });
    const headers = {
        'Authorization': token,
    };
    const body = {
        pin: Pin
    };
    return await apiSavvyWallet.put(`/users`, body, { headers });
};


export const updateCurrency = async (token, currency) => {

    const headers = {
        'Authorization': token,
    };

    const body = {
        currency
    };
    return await apiSavvyWallet.put(`/users`, body, { headers });
};


export const updateUserJobInformation = async (token) => {

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.get(`/users/information_job`, { headers });
};


export const getAcountUulala = async (token) => {

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.get(`/uulala/accounts`, { headers });
};


export const getInfoTransfer = async (token) => {

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.get(`/users?balance=true&bankInformation=true`, { headers });
};


export const walletToAccount = async (token, amount, pin) => {
    const Pin = await pinCrypto({ pin });
    const headers = {
        'Authorization': token,
    };
    const body = {
        amount: amount,
        code: pin,
        two_factor: true
    };
    return await apiSavvyWallet.post(`/wallet/account`, await body, { headers });
};


export const generateCardVirtual = async (token, amount, reference) => {

    const headers = {
        'Authorization': token,
    };
    const body = {
        amount: amount,
        reference: reference,
    };
    return await apiSavvyWallet.post(`/cards/virtual`, body, { headers });
};


export const getVirtualCards = async (token) => {

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.get(`/cards?virtual=true`, { headers });
};


export const validatePin = async (token, pin) => {
    const headers = {
        'Authorization': token,
    };
    const body = {
        code: pin,
        two_factor: true
    };


    return await apiSavvyWallet.post(`/users/pin`, body, { headers });
};


export const changePasswordReset = async (token, password, passwordConfirm) => {

    const body = await bodyCrypto({
        password,
        passwordConfirm
    });

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.put(`/users/reset_password`, await body, { headers });
};

export const changePassword = async (token, password, passwordConfirm) => {

    const body = await bodyCrypto({
        password,
        passwordConfirm
    });

    const headers = {
        'Authorization': token,
    };
    return await apiSavvyWallet.put(`/users/reset_password`, await body, { headers });
};


export const catalogLanguages = async (token) => {

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.get(`/catalogs/languages`, { headers });
};


export const catalogTiket = async (token) => {

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.get(`/catalogs/type_tickets`, { headers });
};


export const createTiket = async (token, typeTicket, note) => {

    const headers = {
        'Authorization': token,
    };
    const body = {
        typeTicket: typeTicket,
        note: note
    };
    return await apiSavvyWallet.post(`/tickets`, body, { headers });
};


export const infoAboutSavvy = async (token) => {

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.get(`/information`, { headers });
};


export const getCatalogAccounts = async (token) => {

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.get(`/wallet/list`, { headers });
};


export const getTypeTransfer = async (token, typeTransfer) => {

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.get(`/wallet/list?options=${typeTransfer}`, { headers });
};


export const TransferWalletToCard = async (token, from, amount, to, typeTransfer, pin) => {
    const Pin = await pinCrypto({ pin });
    const headers = {
        'Authorization': token,
    };
    const body = {
        from: from,
        amount: amount,
        to: to,
        typeTransfer: typeTransfer,
        code: pin,
        note: '',
        two_factor: true
    };
    return await apiSavvyWallet.post(`/transactions/reloading/account`, await body, { headers });
};


export const getListServicesPay = async (token) => {

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.get(`/catalogs/carriers?filter=all`, { headers });
};


export const getListServicesCatalog = async (token) => {

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.get(`/catalogs/type/carriers`, { headers });
};


export const getFilterPays = async (token, id) => {

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.get(`/catalogs/carriers?type_biller_id=${id}&filter=all`, { headers });
};


export const createServicePayment = async (token, amount, sku_id, biller_id, type_sku, phone, reference, pin) => {
    const Pin = await pinCrypto({ pin });
    const headers = {
        'Authorization': token,
    };
    const body = {
        amount: amount,
        sku_id: sku_id,
        biller_id: biller_id,
        type_sku: type_sku,
        phone: phone,
        reference: reference,
        code: pin,
        two_factor: true
    };

    return await apiSavvyWallet.post(`/services_payments`, body, { headers });
};


export const validatePayment = async (token, amount, sku_id, biller_id, type_sku, phone, reference, pin) => {
    const Pin = await pinCrypto({ pin });
    const headers = {
        'Authorization': token,
    };
    const body = {
        amount: amount,
        sku_id: sku_id,
        biller_id: biller_id,
        type_sku: type_sku,
        phone: phone,
        reference: reference,
        code: pin,
        two_factor: true
    };

    return await apiSavvyWallet.post(`/services_payments/amount_due`, body, { headers });
};


export const getListWalletCrypto = async (token) => {

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.get(`/wallet/crypto`, { headers });
};


export const getListBuyCrypto = async (token) => {

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.get(`/wallet/list_currencies`, { headers });
};


export const getListCurrency = async (token) => {

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.get(`/catalogs/currencies`, { headers });
};


export const getSellCrypto = async (token, address, amount, type_crypto, type_amount, currency, pin) => {
    const Pin = await pinCrypto({ pin });
    const headers = {
        'Authorization': token,
    };
    const body = {
        address: address,
        amount: amount,
        type_crypto: type_crypto,
        type_amount: 'amount',
        currency: currency,
        code: pin,
        two_factor: true
    };

    return await apiSavvyWallet.post(`/wallet/sell_crypto`, body, { headers });
};


export const getBuyCrypto = async (token, amount, conversion_amount, currency, pin) => {
    const Pin = await pinCrypto({ pin });
    const headers = {
        'Authorization': token,
    };
    const body = {
        amount: amount,
        conversion_amount: conversion_amount,
        currency: currency,
        code: pin,
        two_factor: true
    };

    return await apiSavvyWallet.post(`/crypto/transfer_request`, body, { headers });
};


export const getChartCrypto = async (token, currency) => {

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.get(`/crypto_currencies/history/price?currency=${currency}&chart=new`, { headers });
};

// export const getChartCrypto = async (token,currency) => {

//   const headers = {
//     'Authorization': token,
//   };

//   return await apiSavvyWallet.get(`/crypto_currencies/history/price?currency=${currency}`,  { headers });
// };


export const getLiquidCrypto = async (token, currency) => {

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.get(`/liquid_currencies/payments?short_name=${currency}`, { headers });
};


export const liquidCrypto = async (token, amount, description, file, cryptocurrency_id, icon, name, short_name, address) => {

    const headers = {
        'Authorization': token,
    };

    const body = {
        amount: amount,
        description: description,
        file: file,
        cryptocurrency_id: cryptocurrency_id,
        icon: icon,
        name: name,
        short_name: short_name,
        address: address
    };

    return await apiSavvyWallet.post(`/liquid_currencies/payments`, body, { headers });
};


export const getAddress = async (token, currency) => {

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.get(`/wallet/crypto/${currency}`, { headers });
};

export const catalogSecurityQuestion = async () => {

    return await apiSavvyWallet.get(`/catalogs/security/questions?language=${i18n?.language}`);
};

export const sendCrypto = async (token, currency, amount, id, note, pin) => {
    const Pin = await pinCrypto({ pin });
    const headers = {
        'Authorization': token,
    };

    const body = {
        currency: currency,
        amount: amount,
        send_external_id: id,
        note: note,
        code: pin,
        two_factor: true
    };

    return await apiSavvyWallet.post(`/wallet/crypto/send`, body, { headers });
};

export const sendCryptoUsers = async (token, currency, amount, id, note, pin) => {
    const Pin = await pinCrypto({ pin });
    const headers = {
        'Authorization': token,
    };

    const body = {
        currency: currency,
        amount: amount,
        send_id: id,
        note: note,
        code: pin,
        two_factor: true
    };

    return await apiSavvyWallet.post(`/wallet/crypto/send`, body, { headers });
};

export const getListExchangeWallet = async (token, currency) => {

    const headers = {
        'Authorization': token
    };
    return await apiSavvyWallet.get(`/crypto/wallets?currency=${currency}`, { headers });
};

export const getCryptoFess = async (token) => {

    const headers = {
        'Authorization': token
    };
    return await apiSavvyWallet.get(`/wallet/fees`, { headers });
};


export const conversionCurrency = async (token, from_currency, to_currency, amount) => {

    const headers = {
        'Authorization': token,
    };

    const body = {
        from_currency: from_currency,
        to_currency: to_currency,
        amount: amount,
    };

    return await apiSavvyWallet.post(`/crypto/conversion`, body, { headers });
};


export const addNewAddress = async (token, currency, address, description, email) => {

    const headers = {
        'Authorization': token,
    };

    const body = {
        currency: currency,
        address: address,
        description: description,
        email: email
    };

    return await apiSavvyWallet.post(`/crypto/wallets/create`, body, { headers });
};

export const getUserInfoCrypto = async (token, id) => {

    const headers = {
        'Authorization': token
    };
    return await apiSavvyWallet.get(`/users?id=${id}&crypto=1`, { headers });
};

export const getTheme = async (token) => {

    const headers = {
        'Authorization': token
    };
    return await apiSavvyWallet.get(`/settings/theme?filter=savvy`, { headers });
};

///settings/theme?filter=random


//New Card Virtual

export const updateCardVirtual = async (token, cvv, card, id) => {

    const body = await bodyCrypto({
        id,
        cvv,
        card
    });

    const headers = {
        'Authorization': token
    };
    return await apiSavvyWallet.put(`/cards/update_virtual`, body, { headers });
};


export const createCardVirtual = async (token, amount, code) => {
    const Pin = await pinCrypto({ code });
    const body = {
        amount: amount,
        code: code,
        two_factor: true
    };

    const headers = {
        'Authorization': token
    };
    return await apiSavvyWallet.post(`/cards/virtual`, body, { headers });
};


export const getCardVirtual = async (token, proxyKey) => {

    const headers = {
        'Authorization': token
    };
    return await apiSavvyWallet.get(`/cards/${proxyKey}`, { headers });
};


export const setPinPhysicalCard = async (token, id) => {

    const headers = {
        'Authorization': token
    };
    return await apiSavvyWallet.get(`/cards/url_set_pin/${id}`, { headers });
};

export const getCompaniesQuery = async (emailPhone) => {

    return await apiSavvyWallet.get(`/catalogs/companies?email_phone=${emailPhone}&app=savvy`);
};

export const getCurrencySwap = async (token) => {

    const headers = {
        'Authorization': token
    };

    return await apiSavvyWallet.get(`/swap/available_currencies?swap=true`, { headers });
};

export const getFeeSendExternal = async (token) => {

    const headers = {
        'Authorization': token,
    };

    return await apiSavvyWallet.get(`/wallet/fees?t_fee=EXTERNAL_WALLET`, { headers });
};


export const getFeesSwap = async (token, currency) => {

    const headers = {
        'Authorization': token
    };

    return await apiSavvyWallet.get(`/swap/fees?currency=${currency}`, { headers });
};

export const createTRXSwap = async (token, fromCurrency, toCurrency, amount, pin) => {

    const headers = {
        'Authorization': token
    };

    const body = {
        from_currency: fromCurrency,
        to_currency: toCurrency,
        amount: amount,
        code: pin,
        two_factor: true
    };
    return await apiSavvyWallet.post(`/swap`, body, { headers });
};


export const validateSMS = async (token) => {

    const headers = {
        'Authorization': token
    };
    return await apiSavvyWallet.get(`/wallet/generate/pin/direct`, { headers });
};

export const validateEmail = async (token) => {

    const headers = {
        'Authorization': token
    };
    return await apiSavvyWallet.get(`/wallet/generate/pin/direct_ses`, { headers });
};



export const getSites = async (token) => {

    const headers = {
        'Authorization': token
    };

    return await apiSavvyWallet.get(`/users/get_url_web`, { headers });
};