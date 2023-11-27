import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class MassUpdateRecords{
    /**
     * This method is used to update the values of specific fields for multiple records and print the response.
     * @param {String} moduleAPIName The API Name of the module to mass update records.
     */
    static async massUpdateRecords(moduleAPIName: string) {
        //example
        //let moduleAPIName = "module_api_name";
        let recordOperations : ZOHOCRMSDK.Record.RecordOperations= new ZOHOCRMSDK.Record.RecordOperations();
        let request : ZOHOCRMSDK.Record.MassUpdateBodyWrapper= new ZOHOCRMSDK.Record.MassUpdateBodyWrapper();
        //Array to hold Record instances
        let recordsArray : ZOHOCRMSDK.Record.Record[] = [];
        let record : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        await record.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.CITY, "Chennai");
        //Add the record instance to array
        recordsArray.push(record);
        request.setData(recordsArray);
        // request.setCvid("34096430087501");
        let ids = ["44028001660021","44028001507174"];
        request.setIds(ids);
        request.setOverWrite(true);
        let territory = new ZOHOCRMSDK.Record.MassUpdateTerritory();
        territory.setId(BigInt("34096430505351"));
        request.setTerritory(territory);
        //Call massUpdateRecords method that takes MassUpdateBodyWrapper instance, ModuleAPIName as parameter.
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Record.MassUpdateActionHandler.MasterModel>= await recordOperations.massUpdateRecords(moduleAPIName, request);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Record.MassUpdateActionWrapper) {
                    let massUpdateActionResponses :  ZOHOCRMSDK.Record.MassUpdateActionResponse.MasterModel[] = responseObject.getData();
                    massUpdateActionResponses.forEach(massUpdateActionResponse => {
                        if (massUpdateActionResponse instanceof ZOHOCRMSDK.Record.MassUpdateSuccessResponse) {
                            console.log("Status: " + massUpdateActionResponse.getStatus().getValue());
                            console.log("Code: " + massUpdateActionResponse.getCode().getValue());
                            console.log("Details");
                            let details = massUpdateActionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + massUpdateActionResponse.getMessage().getValue());
                        }
                        else if (massUpdateActionResponse instanceof ZOHOCRMSDK.Record.APIException) {
                            console.log("Status: " + massUpdateActionResponse.getStatus().getValue());
                            console.log("Code: " + massUpdateActionResponse.getCode().getValue());
                            console.log("Details");
                            let details = massUpdateActionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + massUpdateActionResponse.getMessage().getValue());
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
        await MassUpdateRecords.massUpdateRecords("Leads");
    }
}
MassUpdateRecords.initializeAndCall();
