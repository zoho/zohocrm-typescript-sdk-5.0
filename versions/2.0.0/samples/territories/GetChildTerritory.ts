import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetChildTerritory
{
    static async getChildTerritory(id: bigint)
    {
        let territoriesOperations : ZOHOCRMSDK.Territories.TerritoriesOperations= new ZOHOCRMSDK.Territories.TerritoriesOperations();
        let paraminstance : ZOHOCRMSDK.ParameterMap= new ZOHOCRMSDK.ParameterMap();
        // await paraminstance.add(ZOHOCRMSDK.Territories.GetChildTerritoryParam.FILTERS, "");
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Territories.ResponseHandler.MasterModel> = await territoriesOperations.getChildTerritory(id, paraminstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler : ZOHOCRMSDK.Territories.ResponseHandler.MasterModel= response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.Territories.ResponseWrapper)
            {
                let territoriesList :  ZOHOCRMSDK.Territories.Territories[] = responseHandler.getTerritories();
                for (const territory of territoriesList) {
                    console.log("Territory CreatedTime: " + territory.getCreatedTime());
                    console.log("Territory ModifiedTime: " + territory.getModifiedTime());
                    let manager :  ZOHOCRMSDK.Territories.Manager = territory.getManager();
                    if (manager != null)
                    {
                        console.log("Territory Manager User-Name: " + manager.getName());
                        console.log("Territory Manager User-ID: " + manager.getId());
                    }
                    let accountRuleCriteria :  ZOHOCRMSDK.Territories.Criteria = territory.getAccountRuleCriteria();
                    if (accountRuleCriteria != null)
                    {
                        await GetChildTerritory.printCriteria(accountRuleCriteria);
                    }
                    let dealRuleCriteria :  ZOHOCRMSDK.Territories.Criteria = territory.getDealRuleCriteria();
                    if (dealRuleCriteria != null)
                    {
                        await GetChildTerritory.printCriteria(dealRuleCriteria);
                    }
                    console.log("Territory Name : " + territory.getName());
                    let modifiedBy :  ZOHOCRMSDK.Users.MinifiedUser = territory.getModifiedBy();
                    if (modifiedBy != null)
                    {
                        console.log("Territory Modified By User-Name: " + modifiedBy.getName());
                        console.log("Territory Modified By User-ID: " + modifiedBy.getId());
                    }
                    console.log("Territory Description: " + territory.getDescription());
                    console.log("Territory ID: " + territory.getId());
                    let createdBy : ZOHOCRMSDK.Users.MinifiedUser = territory.getCreatedBy();
                    if (createdBy != null)
                    {
                        console.log("Territory Created By User-Name: " + createdBy.getName());
                        console.log("Territory Created By User-ID: " + createdBy.getId());
                    }
                    let reportingTo :  ZOHOCRMSDK.Territories.ReportingTo = territory.getReportingTo();
                    if (reportingTo != null)
                    {
                        console.log("Territory reporting By Territory-Name: " + reportingTo.getName());
                        console.log("Territory reporting By Territory-ID: " + reportingTo.getId());
                    }
                    console.log("Territory permission type: " + territory.getPermissionType());
                }
            }
            else if (responseHandler instanceof ZOHOCRMSDK.Territories.APIException) {
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
    static async printCriteria(criteria: ZOHOCRMSDK.Territories.Criteria)
    {
        if (criteria.getComparator() != null)
        {
            console.log("CustomView Criteria Comparator: " + criteria.getComparator());
        }
        if (criteria.getField() != null)
        {
            console.log("CustomView Criteria field name: " + criteria.getField().getAPIName());
        }
        if (criteria.getValue() != null)
        {
            console.log("CustomView Criteria Value: " + criteria.getValue().toString());
        }
        let criteriaGroup = criteria.getGroup();
        if (criteriaGroup != null)
        {
            for (const criteria1 of criteriaGroup) {
                await GetChildTerritory.printCriteria(criteria1);
            }
        }
        if (criteria.getGroupOperator() != null)
        {
            console.log("CustomView Criteria Group Operator: " + criteria.getGroupOperator());
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
        await GetChildTerritory.getChildTerritory(BigInt("44028001305227"));
    }
}
GetChildTerritory.initializeAndCall();
