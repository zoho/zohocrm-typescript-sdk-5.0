import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class UpdateTerritories
{
    static async updateTerritories()
    {
        let territoriesOperations : ZOHOCRMSDK.Territories.TerritoriesOperations= new ZOHOCRMSDK.Territories.TerritoriesOperations();
        let request : ZOHOCRMSDK.Territories.BodyWrapper = new ZOHOCRMSDK.Territories.BodyWrapper();
        let territories : ZOHOCRMSDK.Territories.Territories[] = [];
        let territory : ZOHOCRMSDK.Territories.Territories = new ZOHOCRMSDK.Territories.Territories();
        territory.setName("territoryName");
        territory.setId(BigInt("33423423243"));
        let criteria : ZOHOCRMSDK.Territories.Criteria = new ZOHOCRMSDK.Territories.Criteria();
        criteria.setComparator("equal");
        criteria.setValue("name");
        let field : ZOHOCRMSDK.Territories.Field = new ZOHOCRMSDK.Territories.Field();
        field.setAPIName("Account_Name");
        field.setId(BigInt("440280605"));
        await criteria.setField(field);
        await territory.setAccountRuleCriteria(criteria);
        let criteria1 : ZOHOCRMSDK.Territories.Criteria = new ZOHOCRMSDK.Territories.Criteria();
        criteria1.setComparator("not_between");
        let value : string[] = [];
        value.push("2023-08-10");
        value.push("2023-08-30");
        criteria1.setValue(value);
        let field1 : ZOHOCRMSDK.Territories.Field = new ZOHOCRMSDK.Territories.Field();
        field1.setAPIName("Closing_Date");
        field1.setId(BigInt("423213231223411"));
        await criteria1.setField(field1);
        await territory.setDealRuleCriteria(criteria1);
        territory.setDescription("description");
        territory.setPermissionType(new ZOHOCRMSDK.Choice("read_only"));
        let reportingTo : ZOHOCRMSDK.Territories.ReportingTo = new ZOHOCRMSDK.Territories.ReportingTo();
        reportingTo.setId(BigInt("440280305227"));
        await territory.setReportingTo(reportingTo);
        let manager = new ZOHOCRMSDK.Territories.Manager();
        manager.setId(BigInt("440280139411"));
        await territory.setManager(manager);
        territories.push(territory);
        request.setTerritories(territories);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Territories.ActionHandler.MasterModel> = await territoriesOperations.updateTerritories(request);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let actionHandler : ZOHOCRMSDK.Territories.ActionHandler.MasterModel = response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.Territories.ActionWrapper)
            {
                let actionResponses :  ZOHOCRMSDK.Territories.ActionResponse.MasterModel[] = actionHandler.getTerritories();
                if (actionResponses != null)
                {
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Territories.SuccessResponse)
                        {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details : Map<string, any>= actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage());
                        } else if (actionResponse instanceof ZOHOCRMSDK.Territories.APIException) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details : Map<string, any> = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage());
                        }
                    });
                }
            }
            else if (actionHandler instanceof ZOHOCRMSDK.Territories.APIException) {
                console.log("Status: " + actionHandler.getStatus().getValue());
                console.log("Code: " + actionHandler.getCode().getValue());
                console.log("Details");
                let details : Map<string, any> = actionHandler.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + actionHandler.getMessage());
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
        await UpdateTerritories.updateTerritories();
    }
}
UpdateTerritories.initializeAndCall();
