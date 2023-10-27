import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetCustomView
{
    public static async getCustomView(moduleAPIName: string, customViewId: bigint) {
        //example
        // let moduleAPIName = "Leads"
        // let customViewId = 3409643087507n;
        let customViewsOperations: ZOHOCRMSDK.CustomViews.CustomViewsOperations = new ZOHOCRMSDK.CustomViews.CustomViewsOperations();
        let paramInstance : ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap()
        await paramInstance.add(ZOHOCRMSDK.CustomViews.GetCustomViewParam.MODULE, moduleAPIName);
        //Call getCustomView method that takes customViewId as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.CustomViews.ResponseHandler.MasterModel> = await customViewsOperations.getCustomView(customViewId, paramInstance);
        if (response !== null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject: ZOHOCRMSDK.CustomViews.ResponseHandler.MasterModel = response.getObject();
            if (responseObject !== null) {
                if (responseObject instanceof ZOHOCRMSDK.CustomViews.BodyWrapper) {
                    let customViews: ZOHOCRMSDK.CustomViews.CustomView[] = responseObject.getCustomViews();
                    for (let customView of customViews) {
                        console.log("CustomView ID: " + customView.getId());
                        console.log("CustomView Name: " + customView.getName());
                        console.log("CustomView DisplayValue: " + customView.getDisplayValue());
                        console.log("CustomView SystemName: " + customView.getSystemName());
                        let criteria: ZOHOCRMSDK.CustomViews.Criteria = customView.getCriteria();
                        if (criteria !== null && criteria !== undefined) {
                            await this.printCriteria(criteria);
                        }
                        console.log("CustomView SortBy: " + customView.getSortBy());
                        console.log("CustomView Default: " + customView.getDefault());
                        console.log("CustomView SystemDefined: " + customView.getSystemDefined().toString());
                        console.log("CustomView Category: " + customView.getCategory());
                        let fields: ZOHOCRMSDK.CustomViews.Fields[] = customView.getFields();
                        if (fields != undefined && fields !== null) {
                            console.log("Fields");
                            fields.forEach(field => {
                                console.log("CustomView Field: " + field.getAPIName());
                                console.log("CustomView Field: " + field.getId());
                            });
                        }
                        if (customView.getFavorite() !== null) {
                            console.log("CustomView Favorite: " + customView.getFavorite());
                        }
                        if (customView.getSortOrder() !== null) {
                            console.log("CustomView SortOrder: " + customView.getSortOrder());
                        }
                    }
                    let info: ZOHOCRMSDK.CustomViews.Info = responseObject.getInfo();
                    if (info !== null) {
                        let translation: ZOHOCRMSDK.CustomViews.Translation = info.getTranslation();
                        if (translation !== null) {
                            console.log("Translation details");
                            console.log("PublicViews: " + translation.getPublicViews());
                            console.log("OtherUsersViews: " + translation.getOtherUsersViews());
                            console.log("SharedWithMe: " + translation.getSharedWithMe());
                            console.log("CreatedByMe: " + translation.getCreatedByMe());
                        }
                    }
                }
                else if (responseObject instanceof ZOHOCRMSDK.CustomViews.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details: Map<string, any> = responseObject.getDetails();
                    if (details !== null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + responseObject.getMessage());
                }
            }
        }
    }
    private static async printCriteria(criteria: ZOHOCRMSDK.CustomViews.Criteria) {
        if (criteria.getComparator() !== undefined) {
            console.log("CustomView Criteria Comparator: " + criteria.getComparator());
        }
        if (criteria.getField() !== undefined) {
            console.log("CustomView Criteria Field: " + criteria.getField().getAPIName());
            console.log("CustomView Criteria Field: " + criteria.getField().getId());
        }
        if (criteria.getValue() !== undefined) {
            console.log("CustomView Criteria Value: " + criteria.getValue().toString());
        }
        let criteriaGroup: ZOHOCRMSDK.CustomViews.Criteria[] = criteria.getGroup();
        if (criteriaGroup !== null && criteriaGroup !== undefined) {
            criteriaGroup.forEach(eachCriteria => {
                this.printCriteria(eachCriteria);
            });
        }
        if (criteria.getGroupOperator() !== undefined) {
            console.log("CustomView Criteria Group Operator: " + criteria.getGroupOperator());
        }
    }
    static async initializeAndCall(){
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
        await GetCustomView.getCustomView("Leads", BigInt("440280892044"));
    }
}
GetCustomView.initializeAndCall()