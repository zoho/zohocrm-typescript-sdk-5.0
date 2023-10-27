import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetTerritories{
    public static async getTerritories() {
        let territoriesOperations: ZOHOCRMSDK.Territories.TerritoriesOperations = new ZOHOCRMSDK.Territories.TerritoriesOperations();
        //Call getTerritories method
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Territories.ResponseHandler.MasterModel> = await territoriesOperations.getTerritories();
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject: ZOHOCRMSDK.Territories.ResponseHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Territories.ResponseWrapper) {
                    let territories: ZOHOCRMSDK.Territories.Territories[] = responseObject.getTerritories();
                    territories.forEach(territory => {
                        console.log("Territory CreatedTime: " + territory.getCreatedTime());
                        console.log("Territory ModifiedTime: " + territory.getModifiedTime());
                        let manager: ZOHOCRMSDK.Territories.Manager = territory.getManager();
                        if (manager != null) {
                            console.log("Territory Manager User-Name: " + manager.getName());
                            console.log("Territory Manager User-ID: " + manager.getId());
                        }
                        let criteria: ZOHOCRMSDK.Territories.Criteria = territory.getAccountRuleCriteria();
                        if (criteria != null) {
                            this.printCriteria(criteria);
                        }
                        console.log("Territory Name: " + territory.getName());
                        let modifiedBy: ZOHOCRMSDK.Users.MinifiedUser = territory.getModifiedBy();
                        if (modifiedBy != null) {
                            console.log("Territory Modified By User-Name: " + modifiedBy.getName());
                            console.log("Territory Modified By User-ID: " + modifiedBy.getId());
                        }
                        console.log("Territory Description: " + territory.getDescription());
                        console.log("Territory ID: " + territory.getId());
                        let createdBy: ZOHOCRMSDK.Users.MinifiedUser = territory.getCreatedBy();
                        if (createdBy != null) {
                            console.log("Territory Created By User-Name: " + createdBy.getName());
                            console.log("Territory Created By User-ID: " + createdBy.getId());
                        }
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.Territories.APIException) {
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
    }
    private static async printCriteria(criteria: ZOHOCRMSDK.Territories.Criteria ) {
        if (criteria.getComparator() != null) {
            console.log("Territory Criteria Comparator: " + criteria.getComparator());
        }
        if (criteria.getField() != null) {
            console.log("Territory Criteria Field: " + criteria.getField());
        }
        if (criteria.getValue() != null) {
            console.log("Territory Criteria Value: " + criteria.getValue().toString());
        }
        let criteriaGroup: ZOHOCRMSDK.Territories.Criteria[] = criteria.getGroup();
        if (criteriaGroup != null) {
            criteriaGroup.forEach(eachCriteria => {
                this.printCriteria(eachCriteria);
            });
        }
        if (criteria.getGroupOperator() != null) {
            console.log("Territory Criteria Group Operator: " + criteria.getGroupOperator());
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
        await GetTerritories.getTerritories();
    }
}
GetTerritories.initializeAndCall();
