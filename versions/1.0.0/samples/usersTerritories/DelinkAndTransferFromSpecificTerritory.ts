import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class DelinkAndTransferFromSpecificTerritory
{
    static async delinkAndTransferFromSpecificTerritory(userId: bigint, territoryId: bigint)
    {
        let userTerritoriesOperations : ZOHOCRMSDK.TerritoriesUsers.UsersTerritoriesOperations = new ZOHOCRMSDK.TerritoriesUsers.UsersTerritoriesOperations();
        let request : ZOHOCRMSDK.TerritoriesUsers.TransferWrapper = new ZOHOCRMSDK.TerritoriesUsers.TransferWrapper();
        let usersTerritoryList : ZOHOCRMSDK.TerritoriesUsers.TransferAndDelink[] = [];
        let territory :ZOHOCRMSDK.TerritoriesUsers.TransferAndDelink = new ZOHOCRMSDK.TerritoriesUsers.TransferAndDelink();
        let transferToUser : ZOHOCRMSDK.TerritoriesUsers.TransferToUser = new ZOHOCRMSDK.TerritoriesUsers.TransferToUser();
        transferToUser.setId(BigInt("44028001502002n"));
        await territory.setTransferToUser(transferToUser);
        usersTerritoryList.push(territory);
        request.setTransferAndDelink(usersTerritoryList);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.TerritoriesUsers.TransferActionHandler.MasterModel>= await userTerritoriesOperations.delinkAndTransferFromSpecificTerritory(territoryId, userId, request);
        if (response != null)
        {
            console.log("Status Code : " + response.getStatusCode() + "\n");
            let actionHandler = response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.TerritoriesUsers.TransferActionWrapper)
            {
                let actionWrapper = actionHandler;
                let actionResponses :  ZOHOCRMSDK.TerritoriesUsers.TransferActionResponse.MasterModel[] = actionWrapper.getTransferAndDelink();
                if (actionResponses != null)
                {
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.TerritoriesUsers.SuccessResponse)
                        {
                            let successResponse = actionResponse;
                            console.log("Status: " + successResponse.getStatus().getValue() + "\n");
                            console.log("Code: " + successResponse.getCode().getValue() + "\n");
                            console.log("Details  \n");
                            let details = successResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key) + "\n");
                                });
                            }
                            console.log("Message: " + successResponse.getMessage());
                        }
                        else if (actionResponse instanceof ZOHOCRMSDK.TerritoriesUsers.APIException)
                        {
                            let exception = actionResponse;
                            console.log("Status: " + exception.getStatus().getValue() +"\n");
                            console.log("Code: " + exception.getCode().getValue() + "\n");
                            console.log("Details \n");
                            let details = exception.getDetails();
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
            else if (actionHandler instanceof ZOHOCRMSDK.TerritoriesUsers.APIException)
            {
                let exception = actionHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
                console.log("Code: " + exception.getCode().getValue() + "\n");
                console.log("Details \n");
                let details = exception.getDetails();
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
        await DelinkAndTransferFromSpecificTerritory.delinkAndTransferFromSpecificTerritory(BigInt("44028001647189"), BigInt("44028001647202"));
    }
}
DelinkAndTransferFromSpecificTerritory.initializeAndCall();
