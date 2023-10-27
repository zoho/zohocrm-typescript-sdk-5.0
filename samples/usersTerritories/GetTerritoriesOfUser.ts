import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetTerritoriesOfUser
{
    static async getTerritoriesOfUser(userId: bigint)
    {
        let usersTerritoriesOperations : ZOHOCRMSDK.TerritoriesUsers.UsersTerritoriesOperations = new ZOHOCRMSDK.TerritoriesUsers.UsersTerritoriesOperations();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.TerritoriesUsers.ResponseHandler.MasterModel> = await usersTerritoriesOperations.getTerritoriesOfUser(userId);
        if (response != null)
        {
            console.log("Status Code: " +response.getStatusCode() + "\n");
            if ([204, 304].includes(response.getStatusCode()))
            {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler = response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.TerritoriesUsers.ResponseWrapper)
            {
                let responseWrapper = responseHandler;
                let userTerritory :  ZOHOCRMSDK.TerritoriesUsers.Territory[] = responseWrapper.getTerritories();
                userTerritory.forEach(territory=>{
                    console.log("User Territory Id: " + territory.getId() + "\n");
                    let manager :  ZOHOCRMSDK.TerritoriesUsers.Manager = territory.getManager();
                    if (manager != null)
                    {
                        console.log("User Territory Manager Name: " + manager.getName() + "\n");
                        console.log("User Territory Manager ID: " + manager.getId() + "\n");
                    }
                    let reportingTo : ZOHOCRMSDK.TerritoriesUsers.Manager = territory.getReportingTo();
                    if (reportingTo != null)
                    {
                        console.log("User Territory ReportingTo Name: " + reportingTo.getName() + "\n");
                        console.log("User Territory ReportingTo ID: " + reportingTo.getId() + "\n");
                    }
                    console.log("User Territory Name: " + territory.getName() + "\n");
                });
                let info : ZOHOCRMSDK.TerritoriesUsers.Info = responseWrapper.getInfo();
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
            }
            else if (responseHandler instanceof ZOHOCRMSDK.TerritoriesUsers.APIException)
            {
                let exception = responseHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
                console.log("Code: " + exception.getCode().getValue() + "\n");
                console.log("Details \n");
                let details : Map<string, any> = exception.getDetails();
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
        await GetTerritoriesOfUser.getTerritoriesOfUser(BigInt("440280254001"));
    }
}
GetTerritoriesOfUser.initializeAndCall();
