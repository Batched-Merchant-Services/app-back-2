import {
  UPDATE_PROFILE_AVATAR,
  UPDATE_PROFILE_AVATAR_SUCCESS,
  UPDATE_PROFILE_INFO,
  UPDATE_PROFILE_INFO_SUCCESS,
  CREATE_ADDRESS,
  CREATE_ADDRESS_SUCCESS,
  CREATE_KYC,
  CREATE_KYC_SUCCESS,
  EDIT_ADDRESS,
  EDIT_ADDRESS_SUCCESS,
  EDIT_KYC,
  EDIT_KYC_SUCCESS,
  GET_COUNTRIES,
  GET_COUNTRIES_SUCCESS,
  GET_STATE,
  GET_STATE_SUCCESS,
  TYPE_IDENTIFICATION,
  TYPE_IDENTIFICATION_SUCCESS,
  PROFILE_ERROR,
  CLEAN_ERROR_PROFILE
} from '../constants';
import { CHANGE_PROFILE_PICTURE,EDIT_INFO_USER } from '@utils/api/queries/profile.queries';
import { toggleSnackbarOpen } from './appGraph.actions';
import { apiGraph } from '@utils/api/graphClient';
import LocalStorage from '@utils/localStorage';
import i18n from '@utils/i18n';
import { getDataUser } from './userGraph.actions';
import { GRAPHQL_API } from '@utils/api/constants';
import { CREATE_ADDRESS_QUERY, EDIT_ADDRESS_QUERY, GET_COUNTRIES_QUERY, GET_STATE_QUERY } from '../../utils/api/queries/profile.queries';
import { EDIT_KYC_QUERY } from '../../utils/api/queries/profile.queries';
import { CREATE_KYC_QUERY } from '../../utils/api/queries/profile.queries';
import { GET_TYPE_IDENTIFICATION } from '../../utils/api/queries/profile.queries';


export const updateUserAvatar = ({ id, image }) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: UPDATE_PROFILE_AVATAR });
    apiGraph.post(
      GRAPHQL_API, {
      query: CHANGE_PROFILE_PICTURE,
      variables: {
        token: token,
        id   : id,
        image: image
      }
    }).then(async (response) => {
      console.log('updateUserAvatar',response)
      if (response.data) {
        dispatch({ type: UPDATE_PROFILE_AVATAR_SUCCESS, payload: response?.data['setPictureChange'] });
        dispatch(getDataUser());
        dispatch(toggleSnackbarOpen('Información Actualizada con Exito', 'success'));
      }
    }).catch((error) => {
      console.log('error',error)
      dispatch({ type: PROFILE_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    console.log('error',error)
    dispatch({ type: PROFILE_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
};

export const updateUserProfileInfo = ({dataProfile}) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: UPDATE_PROFILE_INFO });
    apiGraph.post(
      GRAPHQL_API, {
      query: EDIT_INFO_USER,
      variables: {
        token: token,
        data: dataProfile
      }
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: UPDATE_PROFILE_INFO_SUCCESS, payload: response?.data['editAccountData'] });
        dispatch(getDataUser());
        dispatch(toggleSnackbarOpen('Información Actualizada con Exito','success'));
      }
    }).catch((error) => {
      dispatch({ type: PROFILE_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    console.log('error',error)
    dispatch({ type: PROFILE_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
};

export const editKYC = ({ dataUpdateKYC }) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: EDIT_KYC });
   
    apiGraph.post(
      GRAPHQL_API, {
      query: EDIT_KYC_QUERY,
      variables: {
        token:token,
        data: dataUpdateKYC
      }
    }).then(async (response) => {
      console.log('response identity',response);
      if (response.data) {
        dispatch({ type: EDIT_KYC_SUCCESS, payload: response?.data['editAccountsKyc'] });
        dispatch(getDataUser());
        dispatch(toggleSnackbarOpen('Información Actualizada con Exito','success'));
      }
    }).catch((error) => {
      console.log('error 1 identity',error);
      dispatch({ type: PROFILE_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    console.log('error 2 identity',error);
    dispatch({ type: PROFILE_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
};


export const createKYC = ({dataCreateKYC}) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: CREATE_KYC });
    apiGraph.post(
      GRAPHQL_API, {
        query: CREATE_KYC_QUERY,
      variables: {
        token:token,
        data: dataCreateKYC
      }
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: CREATE_KYC_SUCCESS, payload: response?.data['editAccountsKyc'] });
         dispatch(getDataUser());
         dispatch(toggleSnackbarOpen('Información Actualizada con Exito','success'));
      }
    }).catch((error) => {
      console.log('error 1 identity',error);
      dispatch({ type: PROFILE_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    console.log('error 2 identity',error);
    dispatch({ type: PROFILE_ERROR, payload: error });
  }
};




export const createAddress = ({arrayAddress}) => async (dispatch) => {
  console.log('arrayAddress',arrayAddress)
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: CREATE_ADDRESS });
    apiGraph.post(
      GRAPHQL_API, {
      query: CREATE_ADDRESS_QUERY,
      variables: {
        token: token,
        data: arrayAddress
      }
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: CREATE_ADDRESS_SUCCESS, payload: response?.data['createAccountsAddress'] });
         dispatch(getDataUser());
         dispatch(toggleSnackbarOpen('Información Actualizada con Exito','success'));
      }
    }).catch((error) => {
      dispatch({ type: PROFILE_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    console.log('error',error)
    dispatch({ type: PROFILE_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
};

export const editAddress = ({ arrayUpdateAddress}) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  try {
    dispatch({ type: EDIT_ADDRESS });
    apiGraph.post(
      GRAPHQL_API, {
      query: EDIT_ADDRESS_QUERY,
      variables: {
        token:token,
        data: arrayUpdateAddress
      },
      fetchPolicy : 'network-only' ,  
      nextFetchPolicy : 'network-only'
    }).then(async (response) => {
      if (response.data) {
        dispatch({ type: EDIT_ADDRESS_SUCCESS, payload: response?.data['editAccountsAddress'] });
        dispatch(getDataUser());
        dispatch(toggleSnackbarOpen('Información Actualizada con Exito','success'));
      }
    }).catch((error) => {
      dispatch({ type: PROFILE_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    console.log('error',error)
    dispatch({ type: PROFILE_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
};


export const getCountries =() => async (dispatch) => {
  try {
    dispatch({ type: GET_COUNTRIES });
    apiGraph.post(
      GRAPHQL_API, {
      query: GET_COUNTRIES_QUERY,
    }).then(async (response) => {
      if (response.data) {
        nameCountry(response.data);
        dispatch({ type: GET_COUNTRIES_SUCCESS, payload: nameCountry(response.data) });
      }
    }).catch((error) => {
      dispatch({ type: PROFILE_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    con
    dispatch({ type: PROFILE_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
}


export const nameCountry= (data) =>  {
  const output = [];
  data['getCountries']?.forEach(country => {
    output.push(
      {
        value: country.countryNumber,
        name: `${country.englishName} +${country.phoneCode}`
      }
    )
  });
  return output;
};

export const getState =(id,type) => async (dispatch) => {
  console.log('id,type',id,type)
  try {
    dispatch({ type: GET_STATE });
    apiGraph.post(
      GRAPHQL_API, {
      query: GET_STATE_QUERY,
      variables: {
        id:id,
      },
    }).then(async (response) => {
      if (response.data) {
        nameCountry(response.data);
        dispatch({ type: GET_STATE_SUCCESS, payload: nameState(response.data),typeState:type });
      }
    }).catch((error) => {
      dispatch({ type: PROFILE_ERROR, payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    con
    dispatch({ type: PROFILE_ERROR, payload: error });
    dispatch(toggleSnackbarOpen(error));
  }
}


export const nameState= (data) =>  {
  const output = [];
  const states = data['getCountry'];
  const string = states?.states;
  const jsonParse =JSON.parse(string)
  console.log('jsonParse',jsonParse)
  jsonParse.forEach(stateAddress => {
    output.push(
      {
        value: stateAddress.code,
        name: `${stateAddress.name}`
      }
    )
  });
  return output;
};


export const getTypeIdentification = ({countryCode}) => async (dispatch) => {
  const token = await LocalStorage.get('auth_token');
  const valueLanguage = i18n?.language === 'es'? 2 : 3;
  const valueCountry = i18n?.language === 'es'? 484 : 840;
  try {
    dispatch({ type: TYPE_IDENTIFICATION });
    apiGraph.post(
      GRAPHQL_API, {
      query: GET_TYPE_IDENTIFICATION,
      variables: {
        token:token,
        id: `Identificacion-${valueCountry}`,
        languaje: valueLanguage
      }
    }).then(async (response) => {
      if (response.data) {
        nameTypeIdentification(response.data);
        dispatch({ type: TYPE_IDENTIFICATION_SUCCESS, payload: nameTypeIdentification(response.data)});
      }
    }).catch((error) => {
      dispatch({ type: PROFILE_ERROR , payload: error });
      dispatch(toggleSnackbarOpen(error));
    })
  } catch (error) {
    dispatch(toggleSnackbarOpen(error));
    dispatch({ type: PROFILE_ERROR, payload: error });
  }
};

export const nameTypeIdentification = (data) => {
  const typeIdentificationArray = [];
  data['getUserCombo'].forEach(typeIdentification => {

    typeIdentificationArray.push(
      {
        value: typeIdentification.value,
        name: `${i18n.t(typeIdentification.description)}`
      }
    )
  });
  return typeIdentificationArray;
};




export const cleanErrorProfile = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAN_ERROR_PROFILE })
  } catch (error) {
    dispatch({ type: PROFILE_ERROR, payload: error });
  }
};