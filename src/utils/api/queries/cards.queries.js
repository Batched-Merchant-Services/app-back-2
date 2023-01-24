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

export const GET_ORDER_ACCOUNT_TRANSACTIONS = `
    query($token:String!,$id:Int!,$page:Int!,$limit:Int!,$startdate:DateTime!,$enddate:DateTime!) {
        getOrderAccountTransactions(token:$token,id:$id,page:$page,limit:$limit,startdate:$startdate,enddate:$enddate)
       {
           description
           amount
           type
           date
       }
    }
    `