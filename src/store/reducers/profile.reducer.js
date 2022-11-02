import {
  UPDATE_PROFILE_AVATAR,
  UPDATE_PROFILE_AVATAR_SUCCESS,
  UPDATE_PROFILE_INFO,
  UPDATE_PROFILE_INFO_SUCCESS,
  CREATE_ADDRESS,
  CREATE_ADDRESS_SUCCESS,
  EDIT_ADDRESS,
  EDIT_ADDRESS_SUCCESS,
  GET_COUNTRIES,
  GET_COUNTRIES_SUCCESS,
  GET_STATE,
  GET_STATE_SUCCESS,
  CREATE_KYC,
  CREATE_KYC_SUCCESS,
  EDIT_KYC,
  EDIT_KYC_SUCCESS,
  TYPE_IDENTIFICATION,
  TYPE_IDENTIFICATION_SUCCESS,
  CLEAN_ERROR_PROFILE,
  PROFILE_ERROR
} from '../constants';

export const initialState = {
  isLoadingProfile: false,
  isLoadingEditKYC: false,
  isLoadingCreateKYC: false,
  successUpdateAvatar: false,
  successUpdateInfo: false,
  successCreateAddress: false,
  successEditAddress: false,
  successCreateKYC: false,
  successEditKYC: false,
  successTypeIdentification: false,
  finishGetCountries: false,
  finishGetState: false,
  stateAddress: null,
  typeState: '',
  countries: null,
  imageProfile: null,
  dropDownIdentification: null,
  dataUpdateProfile: null,
  dataCreateAddress: null,
  dataCreateKYC: null,
  errorProfile: false,
  showError: false,
  error: {},
  success: {},


};

export default profileReducer = (state = initialState, action) => {
  console.log('action',action.type)
  switch (action.type) {
    case UPDATE_PROFILE_AVATAR:
      return { ...state, isLoadingProfile: true, errorProfile: false };
    case UPDATE_PROFILE_AVATAR_SUCCESS:
      return {
        ...state,
        isLoadingProfile: false,
        successUpdateAvatar: true,
        errorProfile: false,
        imageProfile: action.payload,
        error: {}
      };
    case UPDATE_PROFILE_INFO:
      return { ...state, isLoadingProfile: true, errorProfile: false, successUpdateInfo: false };
    case UPDATE_PROFILE_INFO_SUCCESS:
      return {
        ...state,
        isLoadingProfile: false,
        successUpdateInfo: true,
        errorProfile: false,
        dataUpdateProfile: action.payload,
        error: {}
      };
    case CREATE_ADDRESS:
      return { ...state, isLoadingProfile: true, errorProfile: false,successCreateAddress:false };
    case CREATE_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoadingProfile: false,
        successCreateAddress: true,
        errorProfile: false,
        dataCreateAddress: action.payload,
        error: {}
      };
    case EDIT_ADDRESS:
      return { ...state, isLoadingProfile: true, errorProfile: false,successEditAddress:false };
    case EDIT_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoadingProfile: false,
        successEditAddress: true,
        errorProfile: false,
        dataCreateAddress: action.payload,
        error: {}
      };
    case CREATE_KYC:
      return { ...state, isLoadingCreateKYC: true, errorProfile: false, successCreateKYC: false };
    case CREATE_KYC_SUCCESS:
      return {
        ...state,
        isLoadingCreateKYC: false,
        successCreateKYC: true,
        errorProfile: false,
        dataCreateKYC: action.payload,
        error: {}
      };
    case EDIT_KYC:
      return { ...state, isLoadingEditKYC: true, errorProfile: false, successEditKYC: false };
    case EDIT_KYC_SUCCESS:
      return {
        ...state,
        isLoadingEditKYC: false,
        successEditKYC: true,
        errorProfile: false,
        dataCreateKYC: action.payload,
        error: {}
      };
    case GET_COUNTRIES:
      return { ...state, isLoadingProfile: true, errorProfile: false, finishGetCountries: false };

    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        isLoadingProfile: false,
        finishGetCountries: true,
        errorProfile: false,
        countries: action.payload,
        error: {},
        success: {},
      };
    case GET_STATE:
      return { ...state, isLoadingProfile: true, errorProfile: false, finishGetState: false };

    case GET_STATE_SUCCESS:
      return {
        ...state,
        isLoadingProfile: false,
        finishGetState: true,
        errorProfile: false,
        stateAddress: action.payload,
        typeState: action.typeState,
        error: {},
        success: {},
      };
    case TYPE_IDENTIFICATION:
      return { ...state, isLoadingProfile: true, errorProfile: false };
    case TYPE_IDENTIFICATION_SUCCESS:
      return {
        ...state,
        isLoadingProfile: false,
        successTypeIdentification: true,
        errorProfile: false,
        dropDownIdentification: action.payload,
        error: {}
      };
    case PROFILE_ERROR:
      return {
        ...state,
        isLoadingProfile: false,
        finishProfileSuccess: false,
        successCreateAddress:false,
        successEditAddress:false,
        successUpdateAvatar: false,
        successUpdateInfo: false,
        isLoadingEditKYC: false,
        isLoadingCreateKYC: false,
        showError: true,
        error: action.payload,
        success: {},
      };
    case CLEAN_ERROR_PROFILE:
      return {
        ...state,
        successUpdateAvatar: false,
        isLoadingProfile: false,
        finishProfileSuccess: false,
        showError: false,
        successUpdateInfo: false,
        successCreateAddress:false,
        successEditAddress:false,
        successCreateKYC: false,
        successEditKYC: false, 
        error: {},
      };
    default:
      return state;
  }
};

