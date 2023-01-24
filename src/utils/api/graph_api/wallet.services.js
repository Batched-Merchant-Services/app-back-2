import { apiGraph } from "../graph";
import LocalStorage from '@utils/localStorage';
import { GRAPHQL_API } from "../constants";
import { GET_ACCOUNT_TRANSACTIONS_BY_DATE } from "../queries/wallet.queries";


export const getAccountTransactionsByDate = async (id, type, startDate, endDate) => {

    const token = await LocalStorage.get('auth_token');

    const variables = { token, id, type, startDate, endDate }
    return await apiGraph.post(GRAPHQL_API, { query: GET_ACCOUNT_TRANSACTIONS_BY_DATE, variables });
};