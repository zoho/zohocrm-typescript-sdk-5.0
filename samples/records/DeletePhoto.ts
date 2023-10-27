import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class DeletePhoto{
    /**
     * This method is used to delete a photo from a record in a module.
     * @param {String} moduleAPIName The API Name of the record's module
     * @param {BigInt} recordId The ID of the record to delete photo
     */
    static async deletePhoto(moduleAPIName: string, recordId: bigint) {
        //example
        //let moduleAPIName = "module_api_name";
        //let recordId = 005177002n;
        let recordOperations : ZOHOCRMSDK.Record.RecordOperations= new ZOHOCRMSDK.Record.RecordOperations();
        //Call deletePhoto method that takes moduleAPIName and recordId as parameter
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Record.FileHandler.MasterModel>= await recordOperations.deletePhoto(recordId, moduleAPIName);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Record.SuccessResponse) {
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
        await DeletePhoto.deletePhoto("Leads", BigInt("44028001660021"));
    }
}
DeletePhoto.initializeAndCall();
