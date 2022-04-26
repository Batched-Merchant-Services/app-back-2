export const SET_IS_DRAWER_OPEN = 'SET_DRAWER_STATE';
export const SET_IS_MODAL_OPEN = 'SET_IS_MODAL_OPEN';
export const SWITCH_THEME = 'SWITCH_THEME';
export const THEME = 'THEME';

const initialState = {
  drawerState: 'closing',
  modalState : 'closing',
  baseTheme  : [],
  Theme      : null,
  items      : []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

  case SET_IS_DRAWER_OPEN:
    return action.payload
      ? { ...state, drawerState: action.payload }
      : state;

  case SET_IS_MODAL_OPEN:
    return action.payload
      ? { ...state, modalState: action.payload }
      : state;
  case THEME:
    return action.payload
      ? { ...state, Theme: action.payload }
      : state;
  case SWITCH_THEME:
    return {
      ...state,
      baseTheme: [...state, action.payload]
    };
  default:
    return state;
  }
  

}
