import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class FromAddresses
{
    static async getEmailAddresses()
    {
        let sendMailOperations : ZOHOCRMSDK.AddressesFrom.FromAddressesOperations= new ZOHOCRMSDK.AddressesFrom.FromAddressesOperations();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.AddressesFrom.ResponseHandler.MasterModel>= await sendMailOperations.getFromAddresses();
        if (response != null)
        {
            console.log("Status Code: " + response.getStatusCode() + "\n");
            if ([204, 304].includes(response.getStatusCode()))
            {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler : ZOHOCRMSDK.AddressesFrom.ResponseHandler.MasterModel= response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.AddressesFrom.ResponseWrapper)
            {
                let responseWrapper : ZOHOCRMSDK.AddressesFrom.ResponseWrapper= responseHandler;
                let userAddresses : ZOHOCRMSDK.AddressesFrom.Address[] = responseWrapper.getFromAddresses();
                userAddresses.forEach(userAddress => {
                    console.log("UserAddress Email: " + userAddress.getEmail() + "\n");
                    console.log("UserAddress Type: " + userAddress.getType() + "\n");
                    console.log("UserAddress UserName: " + userAddress.getUserName() + "\n");
                    console.log("UserAddress Default: " + userAddress.getDefault() + "\n");
                });
            }
            else if (responseHandler instanceof ZOHOCRMSDK.AddressesFrom.APIException)
            {
                let exception: ZOHOCRMSDK.AddressesFrom.APIException = responseHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
                console.log("Code: " + exception.getCode().getValue() + "\n");
                console.log("Details: ");
                let details : Map<string, any> = exception.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key) + "\n");
                    });
                }
                console.log("Message: " + exception.getMessage());
            }
        }
    }
    static async initializeAndCall() {
        let environment: ZOHOCRMSDK.Environment = ZOHOCRMSDK.USDataCenter.PRODUCTION();
        let token : ZOHOCRMSDK.OAuthToken = new ZOHOCRMSDK.OAuthBuilder()
            .clientId("client_id")
            .clientSecret("client_secret")
            .grantToken("grant_token")
            .build();
        await (await new ZOHOCRMSDK.InitializeBuilder())
            .environment(environment)
            .token(token)
            .initialize();
        await FromAddresses.getEmailAddresses();
    }
}
FromAddresses.initializeAndCall();