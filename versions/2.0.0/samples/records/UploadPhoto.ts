import * as fs from "fs";
import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class UploadPhoto{
    /**
     * This method is used to attach a photo to a record. You must include the file in the request
     * @param {String} moduleAPIName The API Name of the record's module
     * @param {BigInt} recordId The ID of the record
     * @param {String} absoluteFilePath The absolute file path of the file to be uploaded
     */
    static async uploadPhoto(moduleAPIName: string, recordId: bigint, absoluteFilePath: string) {
        //example
        //let moduleAPIName = "module_api_name";
        //let recordId = 177002n;
        //let absoluteFilePath = "/Users/user_name/Desktop/image.png";
        let recordOperations : ZOHOCRMSDK.Record.RecordOperations= new ZOHOCRMSDK.Record.RecordOperations();
        let request : ZOHOCRMSDK.Record.FileBodyWrapper= new ZOHOCRMSDK.Record.FileBodyWrapper();
        /** StreamWrapper can be initialized in any of the following ways */
        /**
         * param 1 . fileName
         * param 2 . Read Stream.
         */
        let streamWrapper: ZOHOCRMSDK.StreamWrapper = new ZOHOCRMSDK.StreamWrapper(undefined, fs.createReadStream(absoluteFilePath));
        /**
         * param 1 . fileName
         * param 2 . Read Stream
         * param 3 . Absolute File Path of the file to be attached
         */
        // let streamWrapper = new StreamWrapper(null, null, absoluteFilePath);
        request.setFile(streamWrapper);
        //Call uploadPhoto method that takes FileBodyWrapper instance, moduleAPIName and recordId as parameter
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Record.ActionHandler.MasterModel>= await recordOperations.uploadPhoto(recordId, moduleAPIName, request);
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
        let moduleAPIName : string= "leads";
        let recordId : bigint= BigInt("44021660021");
        let absolutePath : string= "/Users/Desktop/test.png";
        await UploadPhoto.uploadPhoto(moduleAPIName,recordId,absolutePath);    }
}
UploadPhoto.initializeAndCall();
