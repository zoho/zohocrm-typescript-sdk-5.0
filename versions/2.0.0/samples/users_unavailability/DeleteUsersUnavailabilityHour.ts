import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class DeleteUsersUnavailabilityHour
{
    static async deleteUsersUnavailabilityHour(id: string)
    {
        let usersOperations : ZOHOCRMSDK.UnavailabilityUsers.UsersUnavailabilityOperations = new ZOHOCRMSDK.UnavailabilityUsers.UsersUnavailabilityOperations();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.UnavailabilityUsers.ActionHandler.MasterModel> = await usersOperations.deleteUserUnavailabilityHour(id);
        if (response != null)
        {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if(responseObject instanceof ZOHOCRMSDK.UnavailabilityUsers.ActionWrapper)
            {
                let actionResponses : ZOHOCRMSDK.UnavailabilityUsers.ActionResponse.MasterModel[] = responseObject.getUsersUnavailability();
                actionResponses.forEach(actionResponse => {
                    if(actionResponse instanceof ZOHOCRMSDK.UnavailabilityUsers.SuccessResponse)
                    {
                        console.log("Status: " + actionResponse.getStatus().getValue());
                        console.log("Code: " + actionResponse.getCode().getValue());
                        console.log("Details");
                        let details :  Map<string, any> = actionResponse.getDetails();
                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key));
                            });
                        }
                        console.log("Message: " + actionResponse.getMessage().getValue());
                    }
                    else if (actionResponse instanceof ZOHOCRMSDK.UnavailabilityUsers.APIException)
                    {
                        console.log("Status: " + actionResponse.getStatus().getValue());
                        console.log("Code: " + actionResponse.getCode().getValue());
                        console.log("Details");
                        let details = actionResponse.getDetails();
                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key));
                            });
                        }
                        console.log("Message: " + actionResponse.getMessage().getValue());
                    }
                });
            }
            else if(responseObject instanceof ZOHOCRMSDK.UnavailabilityUsers.APIException)
            {
                console.log("Status: " + responseObject.getStatus().getValue());
                console.log("Code: " + responseObject.getCode().getValue());
                let details = responseObject.getDetails();
                console.log("Details: ");
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + responseObject.getMessage().getValue());
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
        await DeleteUsersUnavailabilityHour.deleteUsersUnavailabilityHour("44028001413002");
    }
}
DeleteUsersUnavailabilityHour.initializeAndCall();
