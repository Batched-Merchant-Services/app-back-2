export const GRAPHQL_API = 'https://graph.batchedservices.com/AccessPointAccountsApi/graphql';


export const LOGIN_QUERY = `
query ($user:String!,$password:String!,$languaje:Int!,$id:String!,$groupid:Int!,$reference:String!){
  getLoggin(user: $user, password:$password,languaje:$languaje, id:$id,groupid:$groupid,reference:$reference){
      token
      uuid
      timeOut
      locked
      isTwoFactor
      type2fa
      phoneNumber
      email
      left
      deviceStatus        
  }
}`;




export const LOGIN_TWO_FACTOR_QUERY = `
query ($token:String!,$code:String!){
  getLogginTwoFactor(token: $token, code:$code){
      token
      uuid
      timeOut
      isTwoFactor
      type2fa
  }
}`;


export const CHANGE_TYPE_AUTHENTICATION = `
mutation ($token:String!,$type:Int!){
  setPrimary2fa(token: $token, type:$type)     
}`

export const ACTIVATION_THIRD_PARTY = `
mutation ($token:String!,$code:String!,$isPrimary:Boolean!){
  setEnabled2faThirdParty(token: $token, code:$code,isPrimary:$isPrimary)     
}`

export const ACTIVATION_SMS = `
mutation ($token:String!,$code:String!,$isPrimary:Boolean!){
  setEnabled2faSms(token: $token, code:$code,isPrimary:$isPrimary)     
}`

export const ACTIVATION_EMAIL = `
mutation ($token:String!,$code:String!,$isPrimary:Boolean!){
  setEnabled2faEmail(token: $token, code:$code,isPrimary:$isPrimary)     
}`

export const AUTHENTICATION_TWO_FACTORS = `
query($token:String!) {
  getSecurityCode(token:$token)
}`
//SMS
export const AUTHENTICATION_TWO_FACTORS_SMS = `
query($token:String!) {
  getSecurityCodeDirect(token:$token)
}`
//EMAIL
export const AUTHENTICATION_TWO_FACTORS_EMAIL = `
query($token:String!) {
  getSecurityCodeDirectSES(token:$token)
}`

export const AUTHENTICATION_TWO_FACTORS_QR = `
query ($token:String!){
  getImageTwoFactor(token: $token)
  {
      secretCode
      qrCodeUrl
  }
}`


export const GET_DATA_USER = `
query($token:String!,$field:String!,$id:String!){
  getUsersByField(token:$token,field:$field,id:$id)
  {
        id
        email
        phoneNumber
        lada
        clients {
            id
            externalId
            status
            activationDate
            officeId
            firstName
            middleName
            lastName
            fullName
            displayName
            mobileNo
            dateOfBirth
            emailAddress
            statusPayroll 
            account {
                id
                accountNo
                externalId
                clientId
                groupId
                currencyCode
                balance {
                    year
                    account
                    deposit
                    withdrawal
                    total
                    currency
                }
                transactions{
                    id
                    accountId 
                    transactionDate
                    type
                    amount
                    finalBalance
                    currencyCode
                    exchageRate
                    createdDate
                    note{
                        id
                        clientId
                        groupId
                        accountId
                        transactionId
                        noteDescription
                    }
                } 
            }
            
        }
        usersProfile
        {
            userID
            id
            status
            name
            accountId
            roleId
            accounts
            {
                id
                term
                status
                firstName
                avatarImage
                lastName
                secondLastName
                phoneNumber
                middleName
                email
                clientId
                currency
                gender
                alias
                birthday
                nationalId
                otherNationalId
                countryCode
                externalId
                pin
                customerId
                isComplete
                address
                {
                    id
                    city
                    suburb
                    country
                    state
                    street
                    number
                    typeAddress
                    zipCode
                    shortName
                    isComplete
                }
                    kyc{
                        id
                        typeIdentification
                        frontId
                        backId
                        kycid
                        faceId
                        documentId
                        status
                        isComplete
                    }
                   
            }

        }
    }
}`;

export const SET_FORGOT_PASSWORD = `
  mutation($company:Int!, $email:String!,$phone:String!,$type:Int! ){
    setRecoveryPwd(company:$company,email:$email,phone:$phone, type:$type)
}`;


export const SET_CONFIRM_PASSWORD = `
mutation($token:String!,$code:String!,$password:String!,$confirmPassword:String!){
  setResetPwd(token:$token,code:$code,password:$password,confirmPassword:$confirmPassword)
}`;
