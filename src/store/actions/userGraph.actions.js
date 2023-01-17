import {
    GET_USER_DATA,
    GET_USER_DATA_SUCCESS,
    SET_FILE_URL,
    SET_FILE_URL_SUCCESS,
    SET_FILE_URL_ERROR,
    SET_FILE_FRONT,
    SET_FILE_BACK,
    SET_FILE_ADDRESS,
    SET_FILE_SELFIE,
    SET_FILE_FRONT_SUCCESS,
    SET_FILE_BACK_SUCCESS,
    SET_FILE_ADDRESS_SUCCESS,
    SET_FILE_SELFIE_SUCCESS,
    CLEAN_DATA_FILE,
    USER_ERROR,
    CLEAN_DATA_USER
} from '../constants';

import { GET_USER_BATCHED, SET_FILE } from '@utils/api/queries/user.queries';
import { GRAPHQL_API } from '@utils/api/constants';
import LocalStorage from '@utils/localStorage';
import { toggleSnackbarOpen } from './appGraph.actions';
import { apiGraph } from '@utils/api/graphClient';


export const getDataUser = () => async (dispatch) => {
    const token = await LocalStorage.get('auth_token');
    const uuid = await LocalStorage.get('uuid');
    try {
        dispatch({ type: GET_USER_DATA });
        const variables = {
            token: token,
            field: 'id',
            id: uuid
        }
        apiGraph.post(GRAPHQL_API, {
            query: GET_USER_BATCHED, variables
        }).then(async (response) => {
            // console.log('getDataUser', response)
            if (response.data) {


                dispatch({
                    type: GET_USER_DATA_SUCCESS, payload:

                    {
                        ...response?.data?.getUsersByField[0],
                        clients: {
                            ...response?.data?.getUsersByField[0].clients[0]
                        },
                        usersProfile: {
                            ...response?.data?.getUsersByField[0].usersProfile[0],

                            accounts: {
                                ...response?.data?.getUsersByField[0].usersProfile[0].accounts,
                                // address: {
                                //     ...response?.data?.getUsersByField[0].usersProfile[0].accounts.address[0]
                                // },
                                kyc: {
                                    ...response?.data?.getUsersByField[0].usersProfile[0].accounts.kyc[0]
                                }
                            }
                        }
                    }
                });
            }
        }).catch((error) => {
            dispatch({ type: USER_ERROR, payload: error });
            dispatch(toggleSnackbarOpen(error));
        })
    } catch (error) {
        console.log('error', error)
        dispatch({ type: USER_ERROR, payload: error });
        dispatch(toggleSnackbarOpen(error));
    }

};

export const setFile = ({ nameFile, resultBase }) => async (dispatch) => {
    const token = await LocalStorage.get('auth_token');
    try {
        dispatch({ type: SET_FILE_URL });
        apiGraph.post(
            GRAPHQL_API, {
            query: SET_FILE,
            variables: {
                token: token,
                fileName: nameFile,
                file64: resultBase
            }
        }).then(async (response) => {
            console.log('response?.data?.data', response)
            if (response.data) {
                dispatch({ type: SET_FILE_URL_SUCCESS, payload: response?.data['setFile'] });
            }
        }).catch((error) => {
            dispatch({ type: SET_FILE_URL_ERROR, payload: error });
            dispatch(toggleSnackbarOpen(error));
        })
    } catch (error) {
        console.log('error', error)
        dispatch({ type: SET_FILE_URL_ERROR, payload: error });
        dispatch(toggleSnackbarOpen(error));
    }
};

export const setFileFront = ({ nameFile, resultBase }) => async (dispatch) => {
    const token = await LocalStorage.get('auth_token');
    try {
        dispatch({ type: SET_FILE_FRONT });

        apiGraph.post(
            GRAPHQL_API, {
            query: SET_FILE,
            variables: {
                token: token,
                fileName: nameFile,
                file64: resultBase
            }
        }).then(async (response) => {

            if (response.data) {
                dispatch({ type: SET_FILE_FRONT_SUCCESS, payload: response?.data['setFile'] });
            }
        }).catch((error) => {

            dispatch({ type: SET_FILE_URL_ERROR, payload: error });
            dispatch(toggleSnackbarOpen(error));
        })
    } catch (error) {
        dispatch({ type: SET_FILE_URL_ERROR, payload: error });
        dispatch(toggleSnackbarOpen(error));
    }
};



export const setFileBack = ({ nameFile, resultBase }) => async (dispatch) => {
    const token = await LocalStorage.get('auth_token');
    try {
        dispatch({ type: SET_FILE_BACK });
        apiGraph.post(
            GRAPHQL_API, {
            query: SET_FILE,
            variables: {
                token: token,
                fileName: nameFile,
                file64: resultBase
            }
        }).then(async (response) => {
            if (response.data) {
                dispatch({ type: SET_FILE_BACK_SUCCESS, payload: response?.data['setFile'] });
            }
        }).catch((error) => {
            dispatch({ type: SET_FILE_URL_ERROR, payload: error });
            dispatch(toggleSnackbarOpen(error));
        })
    } catch (error) {
        dispatch({ type: SET_FILE_URL_ERROR, payload: error });
        dispatch(toggleSnackbarOpen(error));
    }
};



export const setFileAddress = ({ nameFile, resultBase }) => async (dispatch) => {
    const token = await LocalStorage.get('auth_token');
    try {
        dispatch({ type: SET_FILE_ADDRESS });
        apiGraph.post(
            GRAPHQL_API, {
            query: SET_FILE,
            variables: {
                token: token,
                fileName: nameFile,
                file64: resultBase
            }
        }).then(async (response) => {
            if (response.data) {
                dispatch({ type: SET_FILE_ADDRESS_SUCCESS, payload: response?.data['setFile'] });
            }
        }).catch((error) => {
            dispatch({ type: SET_FILE_URL_ERROR, payload: error });
            dispatch(toggleSnackbarOpen(error));
        })
    } catch (error) {
        dispatch({ type: SET_FILE_URL_ERROR, payload: error });
        dispatch(toggleSnackbarOpen(error));
    }
};



export const setFileSelfie = ({ nameFile, resultBase }) => async (dispatch) => {
    const token = await LocalStorage.get('auth_token');
    try {
        dispatch({ type: SET_FILE_SELFIE });
        apiGraph.post(
            GRAPHQL_API, {
            query: SET_FILE,
            variables: {
                token: token,
                fileName: nameFile,
                file64: resultBase
            }
        }).then(async (response) => {
            if (response.data) {
                dispatch({ type: SET_FILE_SELFIE_SUCCESS, payload: response?.data['setFile'] });
            }
        }).catch((error) => {
            dispatch({ type: SET_FILE_URL_ERROR, payload: error });
            dispatch(toggleSnackbarOpen(error));
        })
    } catch (error) {
        dispatch({ type: SET_FILE_URL_ERROR, payload: error });
        dispatch(toggleSnackbarOpen(error));
    }
};



export const cleanDataUser = () => async (dispatch) => {
    return dispatch({ type: CLEAN_DATA_USER })
};

export const cleanDataFile = () => async (dispatch) => {
    return dispatch({ type: CLEAN_DATA_FILE })
};


