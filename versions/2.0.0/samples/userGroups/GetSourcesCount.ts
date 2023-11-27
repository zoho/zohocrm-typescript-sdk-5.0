import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetSourcesCount
{
    static async getSourcesCount(groupId: bigint)
    {
        let userGroupOperations : ZOHOCRMSDK.GroupsUser.UserGroupsOperations = new ZOHOCRMSDK.GroupsUser.UserGroupsOperations();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.GroupsUser.ResponseHandler.MasterModel>= await userGroupOperations.getSourcesCount(groupId);
        if (response != null)
        {
            console.log("Status Code: " + response.getStatusCode() + "\n");
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler: ZOHOCRMSDK.GroupsUser.ResponseHandler.MasterModel = response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.GroupsUser.SourcesCountWrapper)
            {
                let responseWrapper : ZOHOCRMSDK.GroupsUser.SourcesCountWrapper= responseHandler;
                let sourcesCount :  ZOHOCRMSDK.GroupsUser.SourcesCount[] = responseWrapper.getSourcesCount();
                if (sourcesCount != null)
                {
                    sourcesCount.forEach(sourceCount => {
                        console.log("Sources Count Territories : " + sourceCount.getTerritories() + "\n");
                        console.log("Sources Count Roles : " + sourceCount.getRoles() + "\n");
                        console.log("Sources Count Groups : " + sourceCount.getGroups() + "\n");
                        let users :  ZOHOCRMSDK.GroupsUser.Users = sourceCount.getUsers();
                        if (users != null)
                        {
                            console.log("Sources Users Inactive : " + users.getInactive() + "\n");
                            console.log("Sources Users Deleted : " + users.getDeleted() + "\n");
                            console.log("Sources Users Active : " + users.getActive() + "\n");
                        }
                    });
                }
            }
            else if (responseHandler instanceof ZOHOCRMSDK.GroupsUser.APIException)
            {
                let exception :  ZOHOCRMSDK.GroupsUser.APIException= responseHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
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
        await GetSourcesCount.getSourcesCount(BigInt("44028001307102"));
    }
}
GetSourcesCount.initializeAndCall();
