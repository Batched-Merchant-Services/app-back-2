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

export const initialState = {
	isLoadingData: false,
	showErrorUser: false,
	successDataUser:false,
	isLoadingFile: false,
	showErrorFile: false,
	setFile: null,
	successFileFront: false,
	successFileBack: false,
	successFileAddress: false,
	successFileSelfie: false,
	fileFront: null,
	fileBack: null,
	fileAddress: null,
	fileSelfie: null,
	dataUser: [],
	error: {},
	errorFile: {}

};

export default usergraphReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_DATA:
			return { ...state, isLoadingData: true, showErrorUser: false,successDataUser:false };

		case GET_USER_DATA_SUCCESS:
			return {
				...state,
				isLoadingData: false,
				showErrorUser: false,
				successDataUser:true,
				dataUser: action.payload,
				error: {},
			};
			case SET_FILE_URL:
				return { ...state, isLoadingFile: true, showErrorUser: false };
			case SET_FILE_URL_SUCCESS:
				return {
					...state,
					isLoadingFile: false,
					showErrorUser: false,
					setFile: action.payload,
					error: {},
				};
				case SET_FILE_FRONT:
			return { ...state, isLoadingFile: true, showErrorUser: false,successFileFront:false };
		case SET_FILE_FRONT_SUCCESS:
			return {
				...state,
				isLoadingFile: false,
				showErrorUser: false,
				successFileFront:true,
				fileFront: action.payload,
				error: {}
			};
			case SET_FILE_BACK:
				return { ...state, isLoadingFile: true, showErrorUser: false,successFileBack:false };
		case SET_FILE_BACK_SUCCESS:
			return {
				...state,
				isLoadingFile: false,
				showErrorUser: false,
				successFileBack:true,
				fileBack: action.payload,
				error: {}
			};
			case SET_FILE_ADDRESS:
				return { ...state, isLoadingFile: true, showErrorUser: false,successFileAddress:false };
		case SET_FILE_ADDRESS_SUCCESS:
			return {
				...state,
				isLoadingFile: false,
				showErrorUser: false,
				successFileAddress:true,
				fileAddress: action.payload,
				error: {}
			};
			case SET_FILE_SELFIE:
				return { ...state, isLoadingFile: true, showErrorUser: false,successFileSelfie:false };
			case SET_FILE_SELFIE_SUCCESS:
			return {
				...state,
				isLoadingFile: false,
				showErrorUser: false,
				successFileSelfie:true,
				fileSelfie: action.payload,
				error: {}
			};
			case SET_FILE_URL_ERROR:
				return {
					...state,
					isLoadingData: false,
					showErrorFile: true,
					errorFile: action.payload,
				};
		
		case USER_ERROR:
			return {
				...state,
				isLoadingData: false,
				showErrorUser: true,
				error: action.payload,
			};

		case CLEAN_DATA_USER:
			return {
				...state,
				isLoadingData: false,
				showErrorUser: false,
				showErrorFile: false,
				successDataUser:false,
				dataUser: null,
				error: {},
				errorFile: {}
			};
		case CLEAN_DATA_FILE:
			return {
				...state,
				isLoadingData: false,
				showErrorUser: false,
				showErrorFile: false,
				successFileFront:false,
				successFileBack:false,
				successFileAddress:false,
				successFileSelfie:false,
				successDataUser:false,
				setFile: null,
				fileFront: null,
				fileBack: null,
				fileAddress: null,
				fileSelfie: null,
				error: {},
				errorFile: {}
			};
		default:
			return state;
	}
};
