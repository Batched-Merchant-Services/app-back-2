import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import { GRAPH_PRODUCTION_API_URL,USER_AGENT } from '@env';
import { GRAPHQL_API,LOGIN_QUERY } from '@utils/api/constants';
import { generateRSA,getTicks } from "@utils/api/encrypt";
import { ACTIVATION_EMAIL, ACTIVATION_SMS, ACTIVATION_THIRD_PARTY, AUTHENTICATION_TWO_FACTORS_EMAIL, AUTHENTICATION_TWO_FACTORS_QR, AUTHENTICATION_TWO_FACTORS_SMS, GET_DATA_USER, LOGIN_TWO_FACTOR_QUERY, SET_CONFIRM_PASSWORD, SET_FORGOT_PASSWORD } from './constants';
import LocalStorage from '@utils/localStorage';


/* TODO: change this url in production. */
const BASEURLGRAPH = GRAPH_PRODUCTION_API_URL;
const device = DeviceInfo.getUniqueId();


var apiGraph = axios.create({
  baseURL: BASEURLGRAPH,
  headers: {
    'Content-Type': 'application/json',
    'Accept':'application/json',
    'User-Agent'  : USER_AGENT,
  }
});


const errorHandler = (error) => {
  console.log('error graph',error?.response)
  if(error.config) {
    
  }
  return Promise.resolve({
    ...error.response.data,
    //status: error.response.status
  });
};

const successHandler = (response) => {
  console.log('response', response);
  return response?.data?.data;
};


apiGraph.interceptors.request.use(
  async config => {
    console.log('request', config);
    config.headers = { ...config.headers,  'content-hash': generateRSA('AppSavyy' + '|' + getTicks())};
    return config;
  },function (error) {
    console.error('✉️', error);
    return  Promise.reject(error);
  }
);

apiGraph.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error)
);


export const loginGraph = async ( phoneNumber,password,Company ) => {
  const companyValue = Company?.value?Company?.value:'';
  const variables = {
    user: phoneNumber,
    password:  generateRSA(password),
    languaje: 3,
    id: generateRSA(device),
    groupid: companyValue,
    reference:''
  }
  
  return await apiGraph.post(GRAPHQL_API,{ query: LOGIN_QUERY,variables});
};

export const loginTwoFactor = async ( codeSecurity ) => {
  const token = await LocalStorage.get('auth_token');

  const variables = {
    token: token,
    code: codeSecurity
  }
  
  return await apiGraph.post(GRAPHQL_API,{ query: LOGIN_TWO_FACTOR_QUERY,variables});
};

export const getDataUser = async () => {

  const token = await LocalStorage.get('auth_token');
  const uuid  = await LocalStorage.get('uuid');

  const variables = {
    token:token,
    field:'id',
    id:uuid
  }
  console.log('variables',variables)
  return await apiGraph.post(GRAPHQL_API,{ query: GET_DATA_USER,variables});
};


export const getAuth2faQr = async () => {

  const token = await LocalStorage.get('auth_token');

  const variables = {
    token:token
  }
  return await apiGraph.post(GRAPHQL_API,{ query: AUTHENTICATION_TWO_FACTORS_QR,variables});
};

export const getCodeSms = async () => {

  const token = await LocalStorage.get('auth_token');

  const variables = {
    token:token,
  }
  return await apiGraph.post(GRAPHQL_API,{ query: AUTHENTICATION_TWO_FACTORS_SMS,variables});
};

export const getCodeEmail = async () => {

  const token = await LocalStorage.get('auth_token');

  const variables = {
    token:token,
  }
  return await apiGraph.post(GRAPHQL_API,{ query: AUTHENTICATION_TWO_FACTORS_EMAIL,variables});
};


export const setActivationSms = async (code) => {

  const token = await LocalStorage.get('auth_token');
  const variables = {
    token:token,
    code:code,
    isPrimary:true
  }
  return await apiGraph.post(GRAPHQL_API,{ query: ACTIVATION_SMS,variables});
};

export const setActivationEmail = async (code) => {

  const token = await LocalStorage.get('auth_token');
  const variables = {
    token:token,
    code:code,
    isPrimary:true
  }

  return await apiGraph.post(GRAPHQL_API,{ query: ACTIVATION_EMAIL,variables});
};

export const setActivationThirdParty = async (code) => {

  const token = await LocalStorage.get('auth_token');
  const variables = {
    token:token,
    code:code,
    isPrimary:true
  }

  return await apiGraph.post(GRAPHQL_API,{ query: ACTIVATION_THIRD_PARTY,variables});
};


export const setForgotPasswordInside = async (company,email,phone,type) => {

  const variables = {
    company:company,
    email:email,
    phone:phone,
    type: type
  }

  return await apiGraph.post(GRAPHQL_API,{ query: SET_FORGOT_PASSWORD,variables});
};

export const setConfirmPassword = async (type2fa,password,confirmPassword,pin,CodeLeft,Code) => {
  const variables = {
    token: type2fa === 1 ? CodeLeft : Code,
    code: pin,
    password: generateRSA(password),
    confirmPassword: generateRSA(confirmPassword)
  }


  return await apiGraph.post(GRAPHQL_API,{ query: SET_CONFIRM_PASSWORD,variables});
};

