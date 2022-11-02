export const CREATE_ADDRESS_QUERY = `
mutation ($token:String!, $data:[AccountsAddressInputType]!)
	{  
		createAccountsAddresses(token:$token,data: $data)
		{
      accountId
      id
		}
	}`;

export const EDIT_ADDRESS_QUERY = `
mutation ($token:String!, $data:[AccountsAddressEditInputType]!)
  {  
    editAccountsAddresses(token:$token,data: $data)
    {
      accountId
      id
    }
  }`;

export const CREATE_KYC_QUERY = `
mutation ($token:String!, $data:AccountsKycInputType!)
	{  
    createAccountsKyc(token:$token,data: $data)
    {
        accountId
        id
    }
	}`;

export const EDIT_KYC_QUERY = `
mutation ($token:String!, $data:AccountsKycEditInputType!)
	{	  
    editAccountsKyc(token:$token,data: $data)
    {
        accountId
        id
    }
  }`;

export const EDIT_INFO_USER = `
mutation ($token:String!, $data:AccountDataInputType!)
{  
    editAccountData(token:$token,data: $data)
    {        
        id
    }
}`;

export const CHANGE_PROFILE_PICTURE =`
mutation($token:String!,$id:String!,$image:String!)
{
  setPictureChange(token:$token,id:$id,image:$image)
}`;

export const GET_COUNTRIES_QUERY = `
query {
  getCountries{
     countryNumber
     englishName
     iso2
     iso3
     iso4217
     currency
     phoneCode
     status
     emoji
     icon
     capital
  }
}`;

export const GET_STATE_QUERY = `
query ($id:Int!){
  getCountry(id:$id){
     countryNumber
     englishName
     iso2
     iso3
     iso4217
     currency
     phoneCode
     status
     emoji
     icon
     capital
     states
     region
  }
}`;

export const GET_TYPE_IDENTIFICATION = `
query ($token:String!,$id:String!,$languaje:Int!){
  getUserCombo(token:$token,id:$id, languaje:$languaje){
      value
      description
  }
}`;



