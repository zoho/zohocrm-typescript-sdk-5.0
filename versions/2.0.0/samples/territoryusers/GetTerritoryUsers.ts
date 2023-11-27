import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetTerritoryUsers
{
    static async getTerritoryUsers(territory: bigint)
    {
        let territoryUsersOperations : ZOHOCRMSDK.TerritoryUsers.TerritoryUsersOperations= new ZOHOCRMSDK.TerritoryUsers.TerritoryUsersOperations();
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.TerritoryUsers.ResponseHandler.MasterModel> = await territoryUsersOperations.getTerritoryUsers(territory);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler : ZOHOCRMSDK.TerritoryUsers.ResponseHandler.MasterModel = response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.TerritoryUsers.ResponseWrapper)
            {
                let users : ZOHOCRMSDK.Users.Users[] = responseHandler.getUsers();
                if (users != null)
                {
                    users.forEach(user=> {
                        console.log("Territory user Id : " + user.getId());
                    });
                }
                let info : ZOHOCRMSDK.TerritoryUsers.Info = responseHandler.getInfo();
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
            else if (responseHandler instanceof ZOHOCRMSDK.TerritoryUsers.APIException) {
                console.log("Status: " + responseHandler.getStatus().getValue());
                console.log("Code: " + responseHandler.getCode().getValue());
                console.log("Details");
                let details : Map<string, any> = responseHandler.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + responseHandler.getMessage());
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
        await GetTerritoryUsers.getTerritoryUsers(BigInt("44028001305227"));
    }
}
GetTerritoryUsers.initializeAndCall();
