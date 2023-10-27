import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class UpdateUsersUnavailabilities
{
    static async updateUsersUnavailabilityHours()
    {
        let usersOperations : ZOHOCRMSDK.UnavailabilityUsers.UsersUnavailabilityOperations = new ZOHOCRMSDK.UnavailabilityUsers.UsersUnavailabilityOperations();
        let request : ZOHOCRMSDK.UnavailabilityUsers.BodyWrapper = new ZOHOCRMSDK.UnavailabilityUsers.BodyWrapper();
        let userList : ZOHOCRMSDK.UnavailabilityUsers.UsersUnavailability[] = [];
        let  user1 : ZOHOCRMSDK.UnavailabilityUsers.UsersUnavailability = new ZOHOCRMSDK.UnavailabilityUsers.UsersUnavailability();
        user1.setComments("Unavailable");
        user1.setId(BigInt("31293800343001"));
        let  from = new Date(2023, 11, 12, 10, 12, 23 );
        user1.setFrom(from);
        let  to = new Date(2023, 11, 13, 10, 12, 23);
        user1.setTo(to);
        let user : ZOHOCRMSDK.UnavailabilityUsers.User = new ZOHOCRMSDK.UnavailabilityUsers.User();
        user.setId(BigInt("31293800232001"));
        await user1.setUser(user);
        userList.push(user1);
        request.setUsersUnavailability(userList);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.UnavailabilityUsers.ActionHandler.MasterModel>= await usersOperations.updateUsersUnavailabilites(request);
        if(response != null)
        {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject : ZOHOCRMSDK.UnavailabilityUsers.ActionHandler.MasterModel= response.getObject();
            if(responseObject != null)
            {
                if(responseObject instanceof  ZOHOCRMSDK.UnavailabilityUsers.ActionWrapper)
                {
                    let actionResponses : ZOHOCRMSDK.UnavailabilityUsers.ActionResponse.MasterModel[] = responseObject.getUsersUnavailability();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.UnavailabilityUsers.SuccessResponse)
                        {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details : Map<string, any> = actionResponse.getDetails();
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
                            let details :  Map<string, any> = actionResponse.getDetails();
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
        await UpdateUsersUnavailabilities.updateUsersUnavailabilityHours();
    }
}
UpdateUsersUnavailabilities.initializeAndCall();
