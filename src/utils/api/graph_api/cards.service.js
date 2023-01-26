import { apiGraph } from "../graph";
import LocalStorage from '@utils/localStorage';
import { CREATE_TRANSACTION_TO_ACCOUNT, GET_ORDER_CARDS, SET_ORDER_ACTIVE_STATUS_CARD, SET_ORDER_PIN_DIRECT_RENDER_BY_ID, SET_ORDER_SUSPEND_STATUS_CARD } from "../queries/card.queries";
import { GRAPHQL_API } from "../constants";
import { GET_ORDER_ACCOUNT_TRANSACTIONS } from "../queries/cards.queries";

export const getOrderCards = async () => {

    const token = await LocalStorage.get('auth_token');

    const variables = {
        token: token,
    }
    return await apiGraph.post(GRAPHQL_API, { query: GET_ORDER_CARDS, variables });
};

export const changeStatusCard = async (active, id) => {

    console.log('changeStatusCard', active, id)

    const token = await LocalStorage.get('auth_token');

    const variables = {
        token,
        id
    }

    return await apiGraph.post(GRAPHQL_API, { query: active ? SET_ORDER_ACTIVE_STATUS_CARD : SET_ORDER_SUSPEND_STATUS_CARD, variables });
};


export const setOrderPinDirectRenderById = async (code, id, pin) => {



    console.log('setOrderPinDirectRenderById', code, pin, id)

    const token = await LocalStorage.get('auth_token');

    const variables = {
        token,
        code,
        id,
        pin
    }

    return await apiGraph.post(GRAPHQL_API, { query: SET_ORDER_PIN_DIRECT_RENDER_BY_ID, variables });
};

export const getOrderAccountTransactions = async (id, page, limit, startdate, enddate) => {



    console.log('getOrderAccountTransactions', page, limit, startdate, enddate)

    const token = await LocalStorage.get('auth_token');

    const variables = { token, id, page, limit, startdate, enddate };

    return await apiGraph.post(GRAPHQL_API, { query: GET_ORDER_ACCOUNT_TRANSACTIONS, variables });
};


export const transferWalletToCard = async (code, account, amount, feeId, cardNumber) => {

    console.log('createTransactionToAccount');

    return createTransactionToAccount(code, account, amount, `Transfer from wallet to card ended ${cardNumber}`, feeId, false, true)
}

export const createTransactionToAccount = async (code, account, amount, description, feeId, isPayTokens, isPayToCard) => {
    const token = await LocalStorage.get('auth_token');

    const variables = { token, code, account, amount, description, feeId, isPayTokens, isPayToCard };

    return await apiGraph.post(GRAPHQL_API, { query: CREATE_TRANSACTION_TO_ACCOUNT, variables });

}