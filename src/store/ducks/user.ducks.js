import Colors from '@styles/Colors';
// Actions
const TOGGLE_LOGIN_WITH_FINGERPRINT = 'user/TOGGLE_LOGIN_WITH_FINGERPRINT';
const USER_REGISTRATION = 'user/USER_REGISTRATION';
const USER_PAYMENTS = 'user/USER_PAYMENTS';
const USER_CRYPTO = 'user/USER_CRYPTO';
const DELETE_ITEM = 'user/DELETE_ITEM';
const ADD_ITEM = 'user/ADD_ITEM';
const ADD_CONTACTS = 'user/ADD_CONTACTS';
const DELETE_CONTACTS = 'user/DELETE_CONTACTS';
const ADD_THEME = 'user/ADD_THEME';
const CLEAR_THEME = 'user/CLEAR_THEME';
const ADD_CHANGES_2FA = 'user/ADD_CHANGES_2FA';
const ADD_TYPE_2FA = 'user/ADD_TYPE_2FA';
const IS_TWO_FACTOR = 'user/IS_TWO_FACTOR';
const PAGE_NAVIGATION_2FA = 'user/PAGE_NAVIGATION_2FA';
const SAVE_INFO_USER_GRAPH = 'user/SAVE_INFO_USER_GRAPH';


const initialState = {

    loginWithFingerPrint: false,
    FavPayServices: [],
    FavPayContacts: [],
    Theme: { colors: Colors },
    ClearTheme: [],
    stateModalInfo2fa: false,
    type2fa: 0,
    isTwoFactor: false,
    pageNavigation2fa: null,
    dataUserGraph: null,
    dataCompany: []
};


let noteID = 0;
let contactID = 0;

// Reducer
function reducer(state = initialState, action) {
    switch (action.type) {

        case TOGGLE_LOGIN_WITH_FINGERPRINT:
            return {
                ...state,
                loginWithFingerPrint: action.payload
            };
        case USER_REGISTRATION:
            return {
                ...state,
                ...action.data
            };
        case USER_PAYMENTS:
            return {
                ...state,
                ...action.data
            };
        case USER_CRYPTO:
            return {
                ...state,
                ...action.data
            };
        case ADD_ITEM:

            const favService = state.FavPayServices;
            let roots = favService?.filter((item) => {
                const billedIdSaved = item.data.data.biller_id;
                const billedIdAction = action.item.data.data.biller_id;
                const saved = billedIdSaved !== billedIdAction;
                return saved;
            });
            return {
                ...state,
                FavPayServices: [...roots, action.item]
            };

        case DELETE_ITEM:
            return {
                ...state,
                FavPayServices: [...state.FavPayServices?.filter((item, index) => index !== action.item)]
            };

        case ADD_CONTACTS:
            const favContacts = state.FavPayContacts;
            let contacts = favContacts?.filter((item) => {
                const phoneSaved = item.phone;
                const phoneAction = action.item.phone;
                const savedContact = phoneSaved !== phoneAction;
                return savedContact;
            });
            return {
                ...state,
                FavPayContacts: [...contacts, action.item]
            };

        case DELETE_CONTACTS:
            return {
                ...state,
                FavPayContacts: [...state.FavPayContacts?.filter((item) => item.phone !== action.item.phone)]
            };

        case ADD_THEME:
            return action.payload
                ? { ...state, Theme: action.payload }
                : state;


        case ADD_CHANGES_2FA:
            return action.payload
                ? { ...state, stateModalInfo2fa: action.payload }
                : state;

        case ADD_TYPE_2FA:
            return action.payload
                ? { ...state, type2fa: action.payload }
                : state;

        case IS_TWO_FACTOR:
            return action.payload
                ? { ...state, isTwoFactor: action.payload }
                : state;

        case PAGE_NAVIGATION_2FA:
            return action.payload
                ? { ...state, pageNavigation2fa: action.payload }
                : state;


        case SAVE_INFO_USER_GRAPH:
            console.log('save info user graph:', action);
            return action.payload
                ? { ...state, dataUserGraph: action.payload }
                : state;


        case CLEAR_THEME:
            return action.payload
                ? { ...state, Theme: action.payload }
                : state;

        default:
            return state;
    }

}

// Action creators
export function toggleLoginWithFingerprint(payload) {
    return { type: TOGGLE_LOGIN_WITH_FINGERPRINT, payload };
}
export const addItem = item => ({
    type: ADD_ITEM,
    id: noteID++,
    item
});

export const addContact = item => ({
    type: ADD_CONTACTS,
    id: contactID++,
    item
});

export const deleteContacts = item => ({
    type: DELETE_CONTACTS,
    item
});

export const deleteItem = item => ({
    type: DELETE_ITEM,
    item
});

export function saveUserRegistration(data) {
    return { type: USER_REGISTRATION, data };
}

export function saveUser(data) {
    return dispatch => {
        console.log('dispatch saveUser', data, dispatch)
        dispatch(
            (data)
        );
    };
}
export function InfoPayment(data) {
    return { type: USER_PAYMENTS, data };
}

export function saveInfoPayment(data) {
    return dispatch => {
        dispatch(
            InfoPayment(data)
        );
    };
}

export function InfoCrypto(data) {
    return { type: USER_CRYPTO, data };
}


export function Theme(payload) {
    return { type: ADD_THEME, payload };
}

export function App2fa(payload) {
    return { type: ADD_CHANGES_2FA, payload };
}
export function Type2fa(payload) {
    return { type: ADD_TYPE_2FA, payload };
}

export function IsTwoFactor(payload) {
    return { type: IS_TWO_FACTOR, payload };
}

export function Page2fa(payload) {
    return { type: PAGE_NAVIGATION_2FA, payload };
}

export function SaveInfoUserGraph(payload) {
    return { type: SAVE_INFO_USER_GRAPH, payload };
}

export function saveTheme(payload) {
    return dispatch => {
        dispatch(
            Theme(payload)
        );
    };
}

export function saveInfoCrypto(data) {
    return dispatch => {
        dispatch(
            InfoCrypto(data)
        );
    };
}

export function save2fa(payload) {
    return dispatch => {
        dispatch(
            App2fa(payload)
        );
    };
};


export function type2fa(payload) {
    return dispatch => {
        dispatch(
            Type2fa(payload)
        );
    };
};

export function isTwoFactor(payload) {
    return dispatch => {
        dispatch(
            IsTwoFactor(payload)
        );
    };
}

export function page2fa(payload) {
    return dispatch => {
        dispatch(
            Page2fa(payload)
        );
    };
};

export function saveInfoUserGraph(payload) {
    return dispatch => {
        dispatch(
            SaveInfoUserGraph(payload)
        );
    };
};

export default reducer;