export const GET_ORDER_CARDS = ` 
query ($token:String!)
{  
    getOrderCards(token:$token)
    {
        id
        cardAccountId        
        cardNumber
        cardExpiryDate
        cardStatus
        cardIsVirtual
        cardExternalId
        cardIsActive
        cardProvider
        cardBalance
        cardIsBlocked
        frontCard
        orderType
    }
}`;

export const SET_ORDER_SUSPEND_STATUS_CARD = `
mutation ($token:String!,$id:Int!)
{
    setOrderSuspendStatusCard(token:$token,id:$id)
}
`;

export const SET_ORDER_ACTIVE_STATUS_CARD = `
mutation ($token:String!,$id:Int!)
{
    setOrderActiveStatusCard(token:$token,id:$id)
}
`;

export const SET_ORDER_PIN_DIRECT_RENDER_BY_ID = `
mutation ($token:String!, $code:String!,$id:Int!,$pin:String!)
{
    setOrderPinDirectRenderById(token:$token,code:$code,id:$id,pin:$pin)
}
`

export const CREATE_TRANSACTION_TO_ACCOUNT = `
mutation ($token:String!,$code:String!, $account:Int!, $amount:Float!, $description:String!, $feeId:Int!, $isPayTokens:Boolean!, $isPayToCard:Boolean!)
{  
    createTransactionToAccount(token:$token,code:$code,account: $account,amount: $amount,description:$description,feeId: $feeId,isPayTokens: $isPayTokens,isPayToCard: $isPayToCard){
        id
    }
}
`
