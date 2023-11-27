import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class UpdateTerritoryUsers
{
    static async updateTerritoryUsers(territory : bigint)
    {
        let territoryUsersOperations : ZOHOCRMSDK.TerritoryUsers.TerritoryUsersOperations= new ZOHOCRMSDK.TerritoryUsers.TerritoryUsersOperations();
        let request : ZOHOCRMSDK.TerritoryUsers.BodyWrapper= new ZOHOCRMSDK.TerritoryUsers.BodyWrapper();
        let users : ZOHOCRMSDK.Users.Users[] = [];
        let user : ZOHOCRMSDK.Users.Users = new ZOHOCRMSDK.Users.Users();
        user.setId(BigInt("24234344"));
        users.push(user);
        request.setUsers(users);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.TerritoryUsers.ActionHandler.MasterModel> = await territoryUsersOperations.updateTerritoryUsers(territory, request);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let actionHandler : ZOHOCRMSDK.TerritoryUsers.ActionHandler.MasterModel = response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.TerritoryUsers.ActionWrapper)
            {
                let actionResponses : ZOHOCRMSDK.TerritoryUsers.ActionResponse.MasterModel[] = actionHandler.getUsers();
                if (actionResponses != null)
                {
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.TerritoryUsers.SuccessResponse)
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
                        } else if (actionResponse instanceof ZOHOCRMSDK.TerritoryUsers.APIException) {
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
            else if (actionHandler instanceof ZOHOCRMSDK.TerritoryUsers.APIException) {
                console.log("Status: " + actionHandler.getStatus().getValue());
                console.log("Code: " + actionHandler.getCode().getValue());
                console.log("Details");
                let details : Map<string, any>= actionHandler.getDetails();
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
        await UpdateTerritoryUsers.updateTerritoryUsers(BigInt("3243423423"));
    }
}
UpdateTerritoryUsers.initializeAndCall();
