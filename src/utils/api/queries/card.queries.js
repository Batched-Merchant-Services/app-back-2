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

