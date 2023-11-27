import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class UpdateRelatedRecordsUsingExternalId
{
    public static async updateRelatedRecordsUsingExternalId(moduleAPIName: string, externalValue: string, relatedListAPIName: string) {
        //example
        //let moduleAPIName = "Products";
        // let externalvalue = "3409643798007n";
        // let relatedModuleAPIName = "Price_Books";
        let xExternal = "Leads.External,Products.Products_External";
        let relatedRecordsOperations: ZOHOCRMSDK.RecordsRelated.RelatedRecordsOperations = new ZOHOCRMSDK.RecordsRelated.RelatedRecordsOperations(relatedListAPIName, moduleAPIName, xExternal);
        let request: ZOHOCRMSDK.RecordsRelated.BodyWrapper = new ZOHOCRMSDK.RecordsRelated.BodyWrapper();
        //Array to hold Record instances
        let recordsArray: ZOHOCRMSDK.Record.Record[] = [];
        let record1: ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        /*
         * Call addKeyValue method that takes two arguments
         * 1 -> A string that is the Field's API Name
         * 2 -> Value
         */
        record1.addKeyValue("Products_External", "AutomatedSDK");
        //Add Record instance to the array
        recordsArray.push(record1);
        let record2: ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        /*
         * Call addKeyValue method that takes two arguments
         * 1 -> A string that is the Field's API Name
         * 2 -> Value
         */
        record2.addKeyValue("Products_External", "Products_External");
        //Add Record instance to the array
        recordsArray.push(record2);
        request.setData(recordsArray);
        //Call updateRelatedRecordsUsingExternalId method that takes externalValue and ZOHOCRMSDK.RelatedRecords.BodyWrapper instance
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.RecordsRelated.ActionHandler.MasterModel> = await relatedRecordsOperations.updateRelatedRecordsUsingExternalId(externalValue, request);
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
        let moduleAPIName :string= "Products";
        let externalValue : string= "3409643798007";
        let relatedModuleAPIName : string= "Price_Books";
        await UpdateRelatedRecordsUsingExternalId.updateRelatedRecordsUsingExternalId(moduleAPIName, externalValue, relatedModuleAPIName);
    }
}
UpdateRelatedRecordsUsingExternalId.initializeAndCall();
