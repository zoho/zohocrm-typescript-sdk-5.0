import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetMassUpdateStatus{
    /**
     * This method is used to get the status of the mass update job scheduled previously and print the response.
     * @param {String} moduleAPIName  The API Name of the module to obtain status of Mass Update.
     * @param {String} jobId The ID of the job obtained from the response of Mass Update Records.
     */
    static async getMassUpdateStatus(moduleAPIName:string, jobId: string) {
        //example
        //let moduleAPIName = "module_api_name";
        //let jobId = "77002";
        let recordOperations : ZOHOCRMSDK.Record.RecordOperations = new ZOHOCRMSDK.Record.RecordOperations();
        let paramInstance : ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        /* Possible parameters for Get MassUpdate Status operation */
        await paramInstance.add(ZOHOCRMSDK.Record.GetMassUpdateStatusParam.JOB_ID, jobId);
        //Call getMassUpdateStatus method that takes ParameterMap instance and moduleAPIName as parameter
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Record.MassUpdateResponseHandler.MasterModel> = await recordOperations.getMassUpdateStatus(moduleAPIName, paramInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Record.MassUpdateResponseWrapper) {
                    let massUpdateResponses :  ZOHOCRMSDK.Record.MassUpdateResponse.MasterModel[] = responseObject.getData();
                    massUpdateResponses.forEach(massUpdateResponse => {
                        if (massUpdateResponse instanceof ZOHOCRMSDK.Record.MassUpdate) {
                            console.log("MassUpdate Status: " + massUpdateResponse.getStatus().getValue());
                            console.log("MassUpdate FailedCount: " + massUpdateResponse.getFailedCount().toString());
                            console.log("MassUpdate UpdatedCount: " + massUpdateResponse.getUpdatedCount().toString());
                            console.log("MassUpdate NotUpdatedCount: " + massUpdateResponse.getNotUpdatedCount());
                            console.log("MassUpdate TotalCount: " + massUpdateResponse.getTotalCount().toString());
                        }
                        else if (massUpdateResponse instanceof ZOHOCRMSDK.Record.APIException) {
                            console.log("Status: " + massUpdateResponse.getStatus().getValue());
                            console.log("Code: " + massUpdateResponse.getCode().getValue());
                            console.log("Details");
                            let details = massUpdateResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + massUpdateResponse.getMessage().getValue());
                        }
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.Record.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details : Map<string, any> = responseObject.getDetails();
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
        await GetMassUpdateStatus.getMassUpdateStatus("Leads", "3234242343");
    }
}
GetMassUpdateStatus.initializeAndCall();
