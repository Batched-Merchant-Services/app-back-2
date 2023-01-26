export const GET_ACCOUNTS_PARAMETER = `
query ($token:String!,$parameter:String!){
    getAccountsParameter(token:$token,parameter:$parameter)
}
`

export const GET_URL_ACCOUNTS = `
query ($environment:String!,$company:Int!){
    getUrlAccounts(environment:$environment,company:$company){                
        value
    }
}`