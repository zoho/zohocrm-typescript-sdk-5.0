import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class DeleteRecordUsingExternalId {
    /**
     * <h3> Delete Record Using External Id </h3>
     * This method is used to delete a single record of a module with ID and print the response.
     * @param {String} moduleAPIName The API Name of the record's module.
     * @param {String} externalFieldValue
     */
    static async deleteRecordUsingExternalId(moduleAPIName: string, externalFieldValue: string) {
        //API Name of the module to delete record
        //let moduleAPIName = "module_api_name";
        //let externalFieldValue = "34770615177002";
        let recordOperations : ZOHOCRMSDK.Record.RecordOperations= new ZOHOCRMSDK.Record.RecordOperations();
        let paramInstance : ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        //Possible parameters for Delete Record operation
        await paramInstance.add(ZOHOCRMSDK.Record.DeleteRecordParam.WF_TRIGGER, true);
        let headerInstance : ZOHOCRMSDK.HeaderMap = new ZOHOCRMSDK.HeaderMap();
        await headerInstance.add(ZOHOCRMSDK.Record.DeleteRecordHeader.X_EXTERNAL, "Leads.External");
        //Call deleteRecordUsingExternalId method that takes recordId, ModuleAPIName, paramInstance and headerInstance as parameter.
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Record.ActionHandler.MasterModel>= await recordOperations.deleteRecordUsingExternalId(externalFieldValue, moduleAPIName, paramInstance, headerInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Record.ActionWrapper) {
                    let actionResponses : ZOHOCRMSDK.Record.ActionResponse.MasterModel[] = responseObject.getData();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Record.SuccessResponse) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                        else if (actionResponse instanceof ZOHOCRMSDK.Record.APIException) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.Record.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details = responseObject.getDetails();
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
        await DeleteRecordUsingExternalId.deleteRecordUsingExternalId("Leads", "12345");
    }
}
DeleteRecordUsingExternalId.initializeAndCall();
