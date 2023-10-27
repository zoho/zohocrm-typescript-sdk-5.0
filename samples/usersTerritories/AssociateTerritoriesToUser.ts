import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class AssociateTerritoriesToUser
{
    static async associateTerritoriesToUser(userId: bigint)
    {
        let userTerritoriesOperations : ZOHOCRMSDK.TerritoriesUsers.UsersTerritoriesOperations = new ZOHOCRMSDK.TerritoriesUsers.UsersTerritoriesOperations();
        let request : ZOHOCRMSDK.TerritoriesUsers.BodyWrapper = new ZOHOCRMSDK.TerritoriesUsers.BodyWrapper();
        let usersTerritoryList : ZOHOCRMSDK.TerritoriesUsers.Territory[] = [];
        let territory: ZOHOCRMSDK.TerritoriesUsers.Territory  = new ZOHOCRMSDK.TerritoriesUsers.Territory();
        territory.setId(BigInt("44028001647202"));
        usersTerritoryList.push(territory);
        request.setTerritories(usersTerritoryList);
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.TerritoriesUsers.ActionHandler.MasterModel> =await userTerritoriesOperations.associateTerritoriesToUser(userId, request);
        if (response != null)
        {
            console.log("Status Code : " + response.getStatusCode() + "\n");
            let actionHandler : ZOHOCRMSDK.TerritoriesUsers.ActionHandler.MasterModel = response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.TerritoriesUsers.ActionWrapper)
            {
                let actionWrapper = actionHandler;
                let actionResponses :  ZOHOCRMSDK.TerritoriesUsers.ActionResponse.MasterModel[] = actionWrapper.getTerritories();
                if (actionResponses != null)
                {
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.TerritoriesUsers.SuccessResponse)
                        {
                            let successResponse : ZOHOCRMSDK.TerritoriesUsers.SuccessResponse = actionResponse;
                            console.log("Status: " + successResponse.getStatus().getValue() + "\n");
                            console.log("Code: " + successResponse.getCode().getValue() + "\n");
                            console.log("Details  \n");
                            let details : Map<string, any> = successResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key) + "\n");
                                });
                            }
                            console.log("Message: " + successResponse.getMessage());
                        }
                        else if (actionResponse instanceof ZOHOCRMSDK.TerritoriesUsers.APIException)
                        {
                            let exception : ZOHOCRMSDK.TerritoriesUsers.APIException = actionResponse;
                            console.log("Status: " + exception.getStatus().getValue() +"\n");
                            console.log("Code: " + exception.getCode().getValue() + "\n");
                            console.log("Details \n");
                            let details :  Map<string, any> = exception.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key) + "\n");
                                });
                            }
                            console.log("Message: " +  exception.getMessage());
                        }
                    });
                }
            }
            else if (actionHandler instanceof ZOHOCRMSDK.TerritoriesUsers.APIException)
            {
                let exception : ZOHOCRMSDK.TerritoriesUsers.APIException = actionHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
                console.log("Code: " + exception.getCode().getValue() + "\n");
                console.log("Details \n");
                let details :  Map<string, any> = exception.getDetails();
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
        await AssociateTerritoriesToUser.associateTerritoriesToUser(BigInt("44028001647189"));
    }
}
AssociateTerritoriesToUser.initializeAndCall();
