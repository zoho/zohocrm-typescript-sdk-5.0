import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class DeleteGroup
{
    static async deleteGroup(groupId: bigint)
    {
        let userGroupOperations : ZOHOCRMSDK.GroupsUser.UserGroupsOperations= new ZOHOCRMSDK.GroupsUser.UserGroupsOperations();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.GroupsUser.ActionHandler.MasterModel>= await userGroupOperations.deleteGroup(groupId);
        if (response != null)
        {
            console.log("Status Code : " + response.getStatusCode() + "\n");
            let actionHandler : ZOHOCRMSDK.GroupsUser.ActionHandler.MasterModel= response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.GroupsUser.ActionWrapper)
            {
                let actionWrapper : ZOHOCRMSDK.GroupsUser.ActionWrapper= actionHandler;
                let actionResponses :  ZOHOCRMSDK.GroupsUser.ActionResponse.MasterModel[] = actionWrapper.getUserGroups();
                if (actionResponses != null)
                {
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.GroupsUser.SuccessResponse)
                        {
                            let successResponse: ZOHOCRMSDK.GroupsUser.SuccessResponse  = actionResponse;
                            console.log("Status: " + successResponse.getStatus().getValue() + "\n");
                            console.log("Code: " + successResponse.getCode().getValue() + "\n");
                            console.log("Details  \n");
                            let details  : Map<string, any> = successResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key) + "\n");
                                });
                            }
                            console.log("Message: " + successResponse.getMessage());
                        }
                        else if (actionResponse instanceof ZOHOCRMSDK.GroupsUser.APIException)
                        {
                            let exception:ZOHOCRMSDK.GroupsUser.APIException = actionResponse;
                            console.log("Status: " + exception.getStatus().getValue() +"\n");
                            console.log("Code: " + exception.getCode().getValue() + "\n");
                            console.log("Details \n");
                            let details : Map<string, any>= exception.getDetails();
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
            else if (actionHandler instanceof ZOHOCRMSDK.GroupsUser.APIException)
            {
                let exception: ZOHOCRMSDK.GroupsUser.APIException = actionHandler;
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
        await DeleteGroup.deleteGroup(BigInt("44028001627112"));
    }
}
DeleteGroup.initializeAndCall();
