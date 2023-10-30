import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class DeleteTerritories
{
    static async deleteTerritories()
    {
        let territoriesOperations : ZOHOCRMSDK.Territories.TerritoriesOperations= new ZOHOCRMSDK.Territories.TerritoriesOperations();
        let paraminstance : ZOHOCRMSDK.ParameterMap= new ZOHOCRMSDK.ParameterMap();
        await paraminstance.add(ZOHOCRMSDK.Territories.DeleteTerritoriesParam.IDS, BigInt("44028001627103"));
        await paraminstance.add(ZOHOCRMSDK.Territories.DeleteTerritoriesParam.DELETE_PREVIOUS_FORECASTS, false);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Territories.ActionHandler.MasterModel> = await territoriesOperations.deleteTerritories(paraminstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let actionHandler : ZOHOCRMSDK.Territories.ActionHandler.MasterModel = response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.Territories.ActionWrapper)
            {
                let actionResponses :  ZOHOCRMSDK.Territories.ActionResponse.MasterModel[] = actionHandler.getTerritories();
                if (actionResponses != null)
                {
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Territories.SuccessResponse)
                        {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details : Map<string, any>= actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage());
                        } else if (actionResponse instanceof ZOHOCRMSDK.Territories.APIException) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details : Map<string, any> = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage());
                        }
                    });
                }
            }
            else if (actionHandler instanceof ZOHOCRMSDK.Territories.APIException) {
                console.log("Status: " + actionHandler.getStatus().getValue());
                console.log("Code: " + actionHandler.getCode().getValue());
                console.log("Details");
                let details : Map<string, any> = actionHandler.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + actionHandler.getMessage());
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
        await DeleteTerritories.deleteTerritories();
    }
}
DeleteTerritories.initializeAndCall();
