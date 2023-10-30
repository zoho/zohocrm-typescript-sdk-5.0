import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetGroups
{
    static async getGroups()
    {
        let userGroupOperations : ZOHOCRMSDK.GroupsUser.UserGroupsOperations= new ZOHOCRMSDK.GroupsUser.UserGroupsOperations();
        let paramInstance : ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        await paramInstance.add(ZOHOCRMSDK.GroupsUser.GetGroupsParam.INCLUDE, "include");
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.GroupsUser.ResponseHandler.MasterModel>= await userGroupOperations.getGroups(paramInstance);
        if (response != null)
        {
            console.log("Status Code: " + response.getStatusCode() + "\n");
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler : ZOHOCRMSDK.GroupsUser.ResponseHandler.MasterModel= response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.GroupsUser.ResponseWrapper)
            {
                let responseWrapper : ZOHOCRMSDK.GroupsUser.ResponseWrapper = responseHandler;
                let users :  ZOHOCRMSDK.GroupsUser.Groups[] = responseWrapper.getUserGroups();
                if (users != null)
                {
                    users.forEach(user => {
                        let createdBy :  ZOHOCRMSDK.GroupsUser.Owner = user.getCreatedBy();
                        if (createdBy != null)
                        {
                            console.log("UserGroups Created By User-Name: " + createdBy.getName() + "\n");
                            console.log("UserGroups Created By User-Id: " + createdBy.getId() + "\n");
                        }
                        let modifiedBy :  ZOHOCRMSDK.GroupsUser.Owner = user.getModifiedBy();
                        if (modifiedBy != null)
                        {
                            console.log("UserGroups Modified By User-Name: " + modifiedBy.getName() + "\n");
                            console.log("UserGroups Modified By User-Id: " + modifiedBy.getId() + "\n");
                        }
                        console.log("User ModifiedTime : " + user.getModifiedTime() + "\n");
                        console.log("User CreatedTime : " + user.getCreatedTime() + "\n");
                        console.log("UserGroups Description : " + user.getDescription() + "\n");
                        console.log("User Id : " + user.getId() + "\n");
                        console.log("User Name : " + user.getName() + "\n");
                        let sources :  ZOHOCRMSDK.GroupsUser.Sources[] = user.getSources();
                        if (sources != null)
                        {
                            sources.forEach(source => {
                                console.log("UserGroups Sources Type :" + source.getType().getValue() + "\n");
                                let source1 :  ZOHOCRMSDK.GroupsUser.Source = source.getSource();
                                if(source1 != null)
                                {
                                    console.log("UserGroups Sources Id: " + source1.getId() + "\n");
                                }
                                console.log("UserGroups Sources SubOrdinates: " + source.getSubordinates() + "\m");
                                console.log("UserGroups Sources SubTerritories: " + source.getSubTerritories() + "\m");
                            });
                        }
                        let info :  ZOHOCRMSDK.GroupsUser.Info  =responseWrapper.getInfo();
                        if (info != null)
                        {
                            if (info.getPerPage() != null)
                            {
                                console.log("User Info PerPage: " + info.getPerPage() + "\n");
                            }
                            if (info.getCount() != null)
                            {
                                console.log("User Info Count: " + info.getCount() + "\n");
                            }
                            if (info.getPage() != null)
                            {
                                console.log("User Info Page: " + info.getPage() + "\n");
                            }
                            if (info.getMoreRecords() != null)
                            {
                                console.log("User Info MoreRecords: " + info.getMoreRecords() + "\n");
                            }
                        }
                    });
                }
            }
            else if (responseHandler instanceof ZOHOCRMSDK.GroupsUser.APIException)
            {
                let exception : ZOHOCRMSDK.GroupsUser.APIException = responseHandler;
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
        await GetGroups.getGroups();
    }
}
GetGroups.initializeAndCall();
