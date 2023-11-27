import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class TransferAndDeleteTerritory
{
    static async transferAndDeleteTerritorry(id:bigint)
    {
        let territoriesOperations : ZOHOCRMSDK.Territories.TerritoriesOperations= new ZOHOCRMSDK.Territories.TerritoriesOperations();
        let request : ZOHOCRMSDK.Territories.TransferBodyWrapper = new ZOHOCRMSDK.Territories.TransferBodyWrapper();
        let territories : ZOHOCRMSDK.Territories.TransferTerritory[] = [];
        let territory : ZOHOCRMSDK.Territories.TransferTerritory = new ZOHOCRMSDK.Territories.TransferTerritory();
        territory.setTransferToId(BigInt("4402805235"));
        territory.setDeletePreviousForecasts(false);
        territories.push(territory);
        request.setTerritories(territories);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Territories.ActionHandler.MasterModel>= await territoriesOperations.transferAndDeleteTerritory(id, request);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let actionHandler : ZOHOCRMSDK.Territories.ActionHandler.MasterModel= response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.Territories.ActionWrapper)
            {
                let actionResponses:  ZOHOCRMSDK.Territories.ActionResponse.MasterModel[]  = actionHandler.getTerritories();
                if (actionResponses != null)
                {
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Territories.SuccessResponse)
                        {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details :Map<string, any> = actionResponse.getDetails();
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
                            let details : Map<string, any>  = actionResponse.getDetails();
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
        await TransferAndDeleteTerritory.transferAndDeleteTerritorry(BigInt("34234234"));
    }
}
TransferAndDeleteTerritory.initializeAndCall();
