import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetAssociatedUsersCount
{
    static async getAssociateUsersCount()
    {
        let userGroupOperations: ZOHOCRMSDK.GroupsUser.UserGroupsOperations = new ZOHOCRMSDK.GroupsUser.UserGroupsOperations();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.GroupsUser.ResponseHandler.MasterModel>= await userGroupOperations.getAssociatedUsersCount();
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject : ZOHOCRMSDK.GroupsUser.ResponseHandler.MasterModel= response.getObject();
            if (responseObject instanceof ZOHOCRMSDK.GroupsUser.AssociatedUserCount)
            {
                let associatedUsersCount : ZOHOCRMSDK.GroupsUser.AssociatedUser[]= responseObject.getAssociatedUsersCount();
                associatedUsersCount.forEach(associatedUser => {
                    console.log("AssociatedUSersCount Name : " + associatedUser.getCount());
                    let userGroup : ZOHOCRMSDK.GroupsUser.UserGroup= associatedUser.getUserGroup();
                    if (userGroup != null)
                    {
                        console.log("AssociatedUsersCount Name " + userGroup.getName());
                        console.log("AssociatedUsersCount ID " + userGroup.getId());
                    }
                });
                let info : ZOHOCRMSDK.GroupsUser.Info = responseObject.getInfo();
                if (info != null)
                {
                    if (info.getPerPage() != null)
                    {
                        console.log("Territory Info PerPage: " + info.getPerPage().toString());
                    }
                    if (info.getCount() != null)
                    {
                        console.log("Territory Info Count: " + info.getCount().toString());
                    }
                    if (info.getPage() != null)
                    {
                        console.log("Territory Info Page: " + info.getPage().toString());
                    }
                    if (info.getMoreRecords() != null)
                    {
                        console.log("Territory Info MoreRecords: " + info.getMoreRecords().toString());
                    }
                }
            }
            else if (responseObject instanceof ZOHOCRMSDK.GroupsUser.APIException) {
                console.log("Status: " + responseObject.getStatus().getValue());
                console.log("Code: " + responseObject.getCode().getValue());
                console.log("Details");
                let details: Map<string, any> = responseObject.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + responseObject.getMessage());
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
        await GetAssociatedUsersCount.getAssociateUsersCount();
    }
}
GetAssociatedUsersCount.initializeAndCall();
