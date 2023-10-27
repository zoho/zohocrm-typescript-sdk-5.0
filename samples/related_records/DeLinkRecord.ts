import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class DeLinkRecord
{
    public static async deLinkRecord(moduleAPIName: string, recordId: bigint, relatedListAPIName: string, relatedListId: bigint) {
        //example
        // let moduleAPIName = "Products";
        // let recordId = 3409643798007n;
        // let relatedModuleAPIName = "Price_Books";
        // let relatedListId = 34096432414001n;
        let relatedRecordsOperations: ZOHOCRMSDK.RecordsRelated.RelatedRecordsOperations = new ZOHOCRMSDK.RecordsRelated.RelatedRecordsOperations(relatedListAPIName, moduleAPIName);
        //Call delinkRecord method that takes relatedListId as parameter.
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.RecordsRelated.ActionHandler.MasterModel> = await relatedRecordsOperations.delinkRecord(relatedListId, recordId);
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
        let recordId: bigint = BigInt("3433323432");
        let relatedListAPIName: string = "Notes";
        let relatedListId: bigint = BigInt("33223");
        await DeLinkRecord.deLinkRecord(moduleAPIName, recordId, relatedListAPIName, relatedListId);
    }
}
DeLinkRecord.initializeAndCall();
