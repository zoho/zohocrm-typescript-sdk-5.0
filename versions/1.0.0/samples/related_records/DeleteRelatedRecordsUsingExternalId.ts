import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class DeleteRelatedRecordsUsingExternalId
{
    public static async deleteRelatedRecordsUsingExternalId(moduleAPIName: string, externalValue: string, relatedListAPIName: string, relatedListIds: string[]) {
        //example
        // let moduleAPIName = "Products";
        // let recordId = 3409643798007n;
        // let relatedModuleAPIName = "Price_Books";
        // let relatedIds = [34096432414001n, 34096432414002n, 34096432414020n];
        let xExternal = "Leads.External,Products.Products_External";
        let relatedRecordsOperations: ZOHOCRMSDK.RecordsRelated.RelatedRecordsOperations = new ZOHOCRMSDK.RecordsRelated.RelatedRecordsOperations(relatedListAPIName, moduleAPIName, xExternal);
        let paramInstance: ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        /* Possible parameters of Delink Records operation */
        for (let relatedListId of relatedListIds) {
            await paramInstance.add(ZOHOCRMSDK.RecordsRelated.DelinkRecordsParam.IDS, relatedListId);
        }
        //Call deleteRelatedRecordsUsingExternalId method that takes ZOHOCRMSDK.ParameterMap instance as parameter.
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.RecordsRelated.ActionHandler.MasterModel> = await relatedRecordsOperations.deleteRelatedRecordsUsingExternalId(externalValue, paramInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject: ZOHOCRMSDK.RecordsRelated.ActionHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.RecordsRelated.ActionWrapper) {
                    let actionResponses: ZOHOCRMSDK.RecordsRelated.ActionResponse.MasterModel[] = responseObject.getData();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.RecordsRelated.SuccessResponse) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details: Map<string, any> = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                        else if (actionResponse instanceof ZOHOCRMSDK.RecordsRelated.APIException) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details: Map<string, any> = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.RecordsRelated.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details: Map<string, any> = responseObject.getDetails();
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + responseObject.getMessage().getValue());
                }
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
        let moduleAPIName: string = "Leads";
        let externalValue: string = "externalvalue";
        let relatedListAPIName: string = "Notes";
        let relatedListIds: string[] = ["334234234", "32343423434"];
        await DeleteRelatedRecordsUsingExternalId.deleteRelatedRecordsUsingExternalId(moduleAPIName, externalValue, relatedListAPIName, relatedListIds);
    }
}
DeleteRelatedRecordsUsingExternalId.initializeAndCall();
