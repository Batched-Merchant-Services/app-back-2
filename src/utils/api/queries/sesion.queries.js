export const GET_USER_COMPANIES = `
query($user:String!){
    getUserCompanies(user:$user)
    {
        value
        description
    }
}`;


export const GET_VALIDATE_SESSION = `
query($token:String!){
    getValidateSession(token:$token){
        token
        uuid
    }
}
`
