import { apiGraph } from "../graph";
import { GET_ORDER_CARDS, SET_ORDER_ACTIVE_STATUS_CARD, SET_ORDER_SUSPEND_STATUS_CARD } from "../queries/card.queries";
import LocalStorage from '@utils/localStorage';
import { GRAPHQL_API } from "../constants";

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