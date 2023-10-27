import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class MassDeleteByCvid
{
    static async massDeleteByCvid(moduleAPIName: string)
    {
        let massDeleteCvidOperations : ZOHOCRMSDK.CvidDeleteMass.MassDeleteCvidOperations = new ZOHOCRMSDK.CvidDeleteMass.MassDeleteCvidOperations(moduleAPIName);
        let bodyWrapper : ZOHOCRMSDK.CvidDeleteMass.CvidBodyWrapper= new ZOHOCRMSDK.CvidDeleteMass.CvidBodyWrapper();
        bodyWrapper.setCvid(BigInt("440280191296"));
        let territory : ZOHOCRMSDK.CvidDeleteMass.Territory = new ZOHOCRMSDK.CvidDeleteMass.Territory();
        territory.setId(BigInt("0"));
        territory.setIncludeChild(true);
        await bodyWrapper.setTerritory(territory);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.CvidDeleteMass.ActionHandler.MasterModel>= await massDeleteCvidOperations.massDeleteByCvid(bodyWrapper);
        if (response != null)
        {
            console.log("Status Code: " + response.getStatusCode() + "\n");
            let actionHandler: ZOHOCRMSDK.CvidDeleteMass.ActionHandler.MasterModel = response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.CvidDeleteMass.ActionWrapper) {
                let actionWrapper: ZOHOCRMSDK.CvidDeleteMass.ActionWrapper = actionHandler;
                let actionResponses : ZOHOCRMSDK.CvidDeleteMass.ActionResponse.MasterModel[] = actionWrapper.getData();
                if (actionResponses != null) {
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.CvidDeleteMass.SuccessResponse) {
                            let successResponse : ZOHOCRMSDK.CvidDeleteMass.SuccessResponse = actionResponse;
                            console.log("Status: " + successResponse.getStatus().getValue() + "\n");
                            console.log("Code: " + successResponse.getCode().getValue() + "\n");
                            console.log("Details: ");
                            let details : Map<string, any>= successResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key) + "\n");
                                });
                            }
                            console.log("Message: " + successResponse.getMessage());
                        }
                        else if (actionResponse instanceof ZOHOCRMSDK.CvidDeleteMass.MassDeleteScheduled)
                        {
                            let successResponse : ZOHOCRMSDK.CvidDeleteMass.MassDeleteScheduled = actionResponse;
                            console.log("Status: " + successResponse.getStatus().getValue() + "\n");
                            console.log("Code: " + successResponse.getCode().getValue() + "\n");
                            console.log("Details: ");
                            let details : Map<string, any> = successResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key) + "\n");
                                });
                            }
                            console.log("Message: " + successResponse.getMessage());
                        }
                        if (actionResponse instanceof ZOHOCRMSDK.CvidDeleteMass.APIException) {
                            let exception: ZOHOCRMSDK.CvidDeleteMass.APIException  = actionResponse;
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
            }
            else if (actionHandler instanceof ZOHOCRMSDK.CvidDeleteMass.APIException)
            {
                let exception: ZOHOCRMSDK.CvidDeleteMass.APIException = actionHandler;
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
    static async initializeAndCall()
    {
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
        let moduleAPIName : string= "Calls";
        await MassDeleteByCvid.massDeleteByCvid(moduleAPIName);
    }
}
MassDeleteByCvid.initializeAndCall();
