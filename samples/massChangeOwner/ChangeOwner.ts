import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class ChangeOwner
{
    static async changeOwner(moduleAPIName: string)
    {
        let massChangeOwnerOperations : ZOHOCRMSDK.ChangeMassOwner.MassChangeOwnerOperations= new ZOHOCRMSDK.ChangeMassOwner.MassChangeOwnerOperations();
        let bodyWrapper :ZOHOCRMSDK.ChangeMassOwner.BodyWrapper = new ZOHOCRMSDK.ChangeMassOwner.BodyWrapper();
        bodyWrapper.setCvid(BigInt("440280191296"));
        let owner : ZOHOCRMSDK.ChangeMassOwner.Owner = new ZOHOCRMSDK.ChangeMassOwner.Owner();
        owner.setId(BigInt("440280254001"));
        await bodyWrapper.setOwner(owner);
        let terrirtory : ZOHOCRMSDK.ChangeMassOwner.Territory = new ZOHOCRMSDK.ChangeMassOwner.Territory();
        terrirtory.setId(BigInt("435238954372342"));
        await bodyWrapper.setTerritory(terrirtory);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.ChangeMassOwner.ActionHandler.MasterModel>= await massChangeOwnerOperations.changeOwner(moduleAPIName, bodyWrapper);
        if (response != null)
        {
            console.log("Status Code: " + response.getStatusCode() + "\n");
            let actionHandler : ZOHOCRMSDK.ChangeMassOwner.ActionHandler.MasterModel= response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.ChangeMassOwner.ActionWrapper) {
                let actionWrapper :ZOHOCRMSDK.ChangeMassOwner.ActionWrapper= actionHandler;
                let actionResponses : ZOHOCRMSDK.ChangeMassOwner.ActionResponse.MasterModel[]= actionWrapper.getData();
                if (actionResponses != null) {
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.ChangeMassOwner.SuccessResponse) {
                            let successResponse : ZOHOCRMSDK.ChangeMassOwner.SuccessResponse = actionResponse;
                            console.log("Status: " + successResponse.getStatus().getValue() + "\n");
                            console.log("Code: " + successResponse.getCode().getValue() + "\n");
                            console.log("Details: ");
                            let details : Map<string, any>= actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key) + "\n");
                                });
                            }
                            console.log("Message: " + successResponse.getMessage());
                        }
                        if (actionResponse instanceof ZOHOCRMSDK.ChangeMassOwner.APIException) {
                            let exception : ZOHOCRMSDK.ChangeMassOwner.APIException= actionResponse;
                            console.log("Status: " + exception.getStatus().getValue() + "\n");
                            console.log("Code: " + exception.getCode().getValue() + "\n");
                            console.log("Details: ");
                            let details : Map<string, any>= exception.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key) + "\n");
                                });
                            }
                            console.log("Message: " + exception.getMessage());
                        }
                    });
                }
            } else if (actionHandler instanceof ZOHOCRMSDK.ChangeMassOwner.APIException) {
                let exception : ZOHOCRMSDK.ChangeMassOwner.APIException = actionHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
                console.log("Code: " + exception.getCode().getValue() + "\n");
                console.log("Details: ");
                let details : Map<string, any>= exception.getDetails();
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
        await ChangeOwner.changeOwner("Calls");
    }
}
ChangeOwner.initializeAndCall();
