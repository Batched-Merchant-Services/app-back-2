import { apiGraph } from "../graph";
import LocalStorage from '@utils/localStorage';
import { GRAPHQL_API } from "../constants";
import { GET_ACCOUNTS_PARAMETER, GET_URL_ACCOUNTS } from "../queries/utils.queries";

export const getAccountsParameter = async (parameter) => {
    const token = await LocalStorage.get("auth_token");

    const variables = {
        token,
        parameter
    };
    return await apiGraph.post(GRAPHQL_API, {
        query: GET_ACCOUNTS_PARAMETER,
        variables,
    });
};


export const getUrlAccounts = async (environment, company) => {
    const token = await LocalStorage.get("auth_token");

    const variables = {
        token, environment, company
    };
    return await apiGraph.post(GRAPHQL_API, {
        query: GET_URL_ACCOUNTS,
        variables,
    });
};