import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetSources
{
    static async getSources(groupId: bigint)
    {
        let userGroupOperations : ZOHOCRMSDK.GroupsUser.UserGroupsOperations= new ZOHOCRMSDK.GroupsUser.UserGroupsOperations();
        let paramInstance : ZOHOCRMSDK.ParameterMap= new ZOHOCRMSDK.ParameterMap();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.GroupsUser.ResponseHandler.MasterModel> = await userGroupOperations.getSources(groupId, paramInstance);
        if (response != null)
        {
            console.log("Status Code: " + response.getStatusCode() + "\n");
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler : ZOHOCRMSDK.GroupsUser.ResponseHandler.MasterModel = response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.GroupsUser.SourcesWrapper)
            {
                let responseWrapper : ZOHOCRMSDK.GroupsUser.SourcesWrapper= responseHandler;
                let sources :  ZOHOCRMSDK.GroupsUser.Sources[] = responseWrapper.getSources();
                if (sources != null)
                {
                    sources.forEach(source => {
                        let source1 = source.getSource();
                        if (source1 != null)
                        {
                            console.log("Sources User_name : " + source1.getName() + "\n" );
                            console.log("Sources User_Id : " + source1.getId() + "\n" );
                        }
                        console.log("Sources Type: " + source.getType().getValue() + "\n");
                        console.log("Sources Subordinates: " + source.getSubordinates() + "\n");
                    });
                }
                let info :  ZOHOCRMSDK.GroupsUser.Info = responseWrapper.getInfo();
                if (info != null)
                {
                    if (info.getPerPage() != null)
                    {
                        console.log("Sources Info PerPage: " + info.getPerPage() + "\n");
                    }
                    if (info.getCount() != null)
                    {
                        console.log("Sources Info Count: " + info.getCount() + "\n");
                    }
                    if (info.getPage() != null)
                    {
                        console.log("Sources Info Page: " + info.getPage() + "\n");
                    }
                    if (info.getMoreRecords() != null)
                    {
                        console.log("Sources Info MoreRecords: " + info.getMoreRecords() + "\n");
                    }
                }
            }
            else if (responseHandler instanceof ZOHOCRMSDK.GroupsUser.APIException)
            {
                let exception : ZOHOCRMSDK.GroupsUser.APIException = responseHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
                console.log("Code: " + exception.getCode().getValue() + "\n");
                console.log("Details \n");
                let details : Map<string, any>= exception.getDetails();
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
        await GetSources.getSources(BigInt("44028001307102"));}
}
GetSources.initializeAndCall();
