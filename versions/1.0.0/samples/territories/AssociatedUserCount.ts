import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class AssociatedUserCount
{
    static async getassociateUserCount()
    {
        let territoriesOperations : ZOHOCRMSDK.Territories.TerritoriesOperations= new ZOHOCRMSDK.Territories.TerritoriesOperations();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Territories.ResponseHandler.MasterModel>= await territoriesOperations.getAssociatedUserCount();
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject : ZOHOCRMSDK.Territories.ActionHandler.MasterModel= response.getObject();
            if (responseObject instanceof ZOHOCRMSDK.Territories.AssociatedUsersCountWrapper)
            {
                let territoryList :  ZOHOCRMSDK.Territories.AssociatedUsersCount[] = responseObject.getAssociatedUsersCount();
                territoryList.forEach(territoryCount => {
                    console.log("AssociatedUSersCount Name: " + territoryCount.getCount());
                    let territory :  ZOHOCRMSDK.Territories.MinifiedTerritory = territoryCount.getTerritory();
                    if (territory != null)
                    {
                        console.log("AssociatedUsersCount Name" + territory.getName());
                        console.log("AssociatedUsersCount ID" + territory.getId());
                        console.log("AssociatedUsersCount Subordinates" + territory.getSubordinates());
                    }
                });
                let info :  ZOHOCRMSDK.Territories.Info = responseObject.getInfo();
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
            else if (responseObject instanceof ZOHOCRMSDK.Territories.APIException) {
                console.log("Status: " + responseObject.getStatus().getValue());
                console.log("Code: " + responseObject.getCode().getValue());
                console.log("Details");
                let details : Map<string, any> = responseObject.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + responseObject.getMessage());
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
        await AssociatedUserCount.getassociateUserCount();
    }
}
AssociatedUserCount.initializeAndCall();
