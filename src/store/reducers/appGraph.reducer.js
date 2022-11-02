import {
  TOGGLE_SNACKBAR_OPEN,
  TOGGLE_SNACKBAR_CLOSE,
  SET_ERROR_APP
} from '../constants';

const initialState = {
  loading: false,
  toggleSnackbar: false,
  changeStatus: 0,
  changeSeconds: 0,
  showStatusTimers: 'blueDark',
  dataHistorySave: [],
  page: 0,
  statusUserActive: false,
  snackbarMessage: null,
  typeSnack: 'error',
  getAppResources: null,
  stateModalInfo2fa:false,
  showError: false,
  error: {},
  success: {},
}


export default appGraphReducer = (state = initialState, action) => {
  switch (action.type) {
      case TOGGLE_SNACKBAR_OPEN:
          return {
              ...state,
              toggleSnackbar: true,
              snackbarMessage: action.message,
              typeSnack: action.typeSnack
          };

      case TOGGLE_SNACKBAR_CLOSE:
          return {
              ...state,
              toggleSnackbar: false,
              snackbarMessage: null,
          };

      case SET_ERROR_APP:
          return {
              ...state,
              loading: false,
              getAppResources: null,
              error: action.payload,
              showError: true,
              success: {},
          };
      default:
          return state
  }
}