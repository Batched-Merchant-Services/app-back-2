import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import { GRAPH_PRODUCTION_API_URL,USER_AGENT } from '@env';
import { generateRSA,getTicks } from "@utils/api/encrypt";



/* TODO: change this url in production. */
const BASEURLGRAPH = GRAPH_PRODUCTION_API_URL;
const device = DeviceInfo.getUniqueId();


export const apiGraph = axios.create({
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
  return response?.data;
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