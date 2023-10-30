import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class RemoveTerritoriesFromRecord{
    static async removeTerritoriesFromRecord(moduleAPIName: string, id: bigint) {
        //example
        //let moduleAPIName = "Leads";
        //let recordId = 34770615177002L;
        let recordOperations : ZOHOCRMSDK.Record.RecordOperations= new ZOHOCRMSDK.Record.RecordOperations();
        let request : ZOHOCRMSDK.Record.BodyWrapper = new ZOHOCRMSDK.Record.BodyWrapper();
        //List of Record instances
        let records : ZOHOCRMSDK.Record.Record[] = [];
        let record1 : ZOHOCRMSDK.Record.Record = new ZOHOCRMSDK.Record.Record();
        /*
         * Call addKeyValue method that takes two arguments
         * 1 . A string that is the Field's API Name
         * 2 . Value
         */
        let territory : ZOHOCRMSDK.Record.Territory = new ZOHOCRMSDK.Record.Territory();
        territory.setId(BigInt("34770613051397"));
        record1.addKeyValue("Territories", [territory]);
        //Add Record instance to the list
        records.push(record1);
        request.setData(records);
        //Call removeTerritoriesFromRecord method that takes moduleAPIName, recordId and BodyWrapper instance as parameter
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Record.ActionHandler.MasterModel>= await recordOperations.removeTerritoriesFromRecord(moduleAPIName, id, request);
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
        await RemoveTerritoriesFromRecord.removeTerritoriesFromRecord("Leads", BigInt("3234242343"));
    }
}
RemoveTerritoriesFromRecord.initializeAndCall();
