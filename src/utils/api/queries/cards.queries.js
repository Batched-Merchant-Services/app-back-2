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