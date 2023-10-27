import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetCustomViews
{
    public static async getCustomViews(moduleAPIName: string) {
        //example
        //let moduleAPIName = "Leads";
        let customViewsOperations: ZOHOCRMSDK.CustomViews.CustomViewsOperations = new ZOHOCRMSDK.CustomViews.CustomViewsOperations();
        let paramInstance: ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        //Possible parameters of Get CustomViews operation
        await paramInstance.add(ZOHOCRMSDK.CustomViews.GetCustomViewsParam.MODULE, moduleAPIName);
        //Call getCustomViews method that takes ParameterMap instance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.CustomViews.ResponseHandler.MasterModel> = await customViewsOperations.getCustomViews(paramInstance);
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
                    customViews.forEach(customView => {
                        console.log("CustomView ID: " + customView.getId());
                        console.log("CustomView Name: " + customView.getName());
                        console.log("CustomView DisplayValue: " + customView.getDisplayValue());
                        console.log("CustomView Default: " + customView.getDefault());
                        console.log("CustomView SystemName: " + customView.getSystemName());
                        console.log("CustomView SystemDefined: " + customView.getSystemDefined().toString());
                        console.log("CustomView Category: " + customView.getCategory());
                        if (customView.getFavorite() !== null) {
                            console.log("CustomView Favorite: " + customView.getFavorite());
                        }
                    });
                    let info: ZOHOCRMSDK.CustomViews.Info = responseObject.getInfo();
                    if (info !== null) {
                        console.log("CustomView Info");
                        if (info.getPerPage() !== null) {
                            console.log("CustomView PerPage: " + info.getPerPage().toString());
                        }
                        if (info.getDefault() !== null) {
                            console.log("Default: " + info.getDefault());
                        }
                        if (info.getCount() !== null) {
                            console.log("Count: " + info.getCount().toString());
                        }
                        let translation: ZOHOCRMSDK.CustomViews.Translation = info.getTranslation();
                        if (translation !== null) {
                            console.log("Translation details");
                            console.log("PublicViews: " + translation.getPublicViews());
                            console.log("OtherUsersViews: " + translation.getOtherUsersViews());
                            console.log("SharedWithMe: " + translation.getSharedWithMe());
                            console.log("CreatedByMe: " + translation.getCreatedByMe());
                        }
                        if (info.getPage() !== null) {
                            console.log("Page: " + info.getPage().toString());
                        }
                        if (info.getMoreRecords() !== null) {
                            console.log("MoreRecords: " + info.getMoreRecords().toString());
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
        await GetCustomViews.getCustomViews("Leads");
    }
}
GetCustomViews.initializeAndCall()
