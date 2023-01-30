import { apiGraph } from "../graph";
import LocalStorage from '@utils/localStorage';
import { GRAPHQL_API } from "../constants";
import { GET_VALIDATE_SESSION } from "../queries/sesion.queries";

export const getValidateSession = async () => {

    const token = await LocalStorage.get('auth_token');

    const variables = {
        token: token
    }
    return await apiGraph.post(GRAPHQL_API, { query: GET_VALIDATE_SESSION, variables });
};