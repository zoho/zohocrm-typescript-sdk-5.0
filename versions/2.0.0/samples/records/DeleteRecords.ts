import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class DeleteRecords{
    /**
     * <h3> Delete Records</h3>
     * This method is used to delete records of a module and print the response.
     * @param {String} moduleAPIName The API Name of the module to delete records.
     * @param {Array} recordIds The array of record IDs to be deleted
     */
    static async deleteRecords(moduleAPIName: string, recordIds: string[]) {
        //example
        //let moduleAPIName = "module_api_name";
        // let recordIds = [3756050n, 3729017n, 3989009n];
        let recordOperations : ZOHOCRMSDK.Record.RecordOperations = new ZOHOCRMSDK.Record.RecordOperations();
        let paramInstance : ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        /* Possible parameters for Delete Records operation */
        for (let recordId of recordIds) {
            await paramInstance.add(ZOHOCRMSDK.Record.DeleteRecordsParam.IDS, recordId);
        }
        await paramInstance.add(ZOHOCRMSDK.Record.DeleteRecordsParam.WF_TRIGGER, true);
        let headerInstance : ZOHOCRMSDK.HeaderMap = new ZOHOCRMSDK.HeaderMap();
        // headerInstance.add(DeleteRecordsHeader.X_EXTERNAL, "Leads.External");
        //Call deleteRecords method that takes paramInstance and moduleAPIName as parameter.
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Record.ActionHandler.MasterModel>= await recordOperations.deleteRecords(moduleAPIName, paramInstance, headerInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Record.ActionWrapper) {
                    let actionResponses :  ZOHOCRMSDK.Record.ActionResponse.MasterModel[] = responseObject.getData();
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
        await DeleteRecords.deleteRecords("Leads", ["3234242343"]);
    }
}
DeleteRecords.initializeAndCall();
