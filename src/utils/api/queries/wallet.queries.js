export const GET_ACCOUNT_TRANSACTIONS_BY_DATE = `
query($token:String!, $id:Int!, $type:Int!, $startDate:DateTime, $endDate:DateTime) {
    getAccountTransactionsByDate(token:$token,id:$id,type:$type,startDate:$startDate,endDate:$endDate){
        id
        accountId
        transactionDate
        type
        amount
        finalBalance
        currencyCode
        exchageRate
        createdDate
        note {
            noteDescription
        }
    }
}
`;

