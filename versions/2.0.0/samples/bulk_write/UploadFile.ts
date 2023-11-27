import * as fs from "fs";
import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class UploadFile
{
    public static async uploadFile(orgID: string, absoluteFilePath: string) {
        //example
        //let orgID = "673573045";
        //let absoluteFilePath = "/Users/user_name/Documents/Leads.zip";
        let bulkWriteOperations: ZOHOCRMSDK.BulkWrite.BulkWriteOperations = new ZOHOCRMSDK.BulkWrite.BulkWriteOperations();
        let fileBodyWrapper: ZOHOCRMSDK.BulkWrite.FileBodyWrapper = new ZOHOCRMSDK.BulkWrite.FileBodyWrapper();
        /** StreamWrapper can be initialized in any of the following ways */
        /**
         * param 1 -> fileName
         * param 2 -> Read Stream.
         */
        let streamWrapper: ZOHOCRMSDK.StreamWrapper = new ZOHOCRMSDK.StreamWrapper(undefined, fs.createReadStream(absoluteFilePath));
        /**
         * param 1 -> fileName
         * param 2 -> Read Stream
         * param 3 -> Absolute File Path of the file to be attached
         */
        // let streamWrapper = new ZOHOCRMSDK.StreamWrapper(null, null, absoluteFilePath);
        fileBodyWrapper.setFile(streamWrapper);
        let headerInstance: ZOHOCRMSDK.HeaderMap = new ZOHOCRMSDK.HeaderMap();
        //To indicate that this a bulk write operation
        await headerInstance.add(ZOHOCRMSDK.BulkWrite.UploadFileHeader.FEATURE, "bulk-write");
        await headerInstance.add(ZOHOCRMSDK.BulkWrite.UploadFileHeader.X_CRM_ORG, orgID);
        //Call uploadFile method that takes FileBodyWrapper instance and headerInstance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.BulkWrite.ActionResponse.MasterModel> = await bulkWriteOperations.uploadFile(fileBodyWrapper, headerInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject: ZOHOCRMSDK.BulkWrite.ActionResponse.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.BulkWrite.SuccessResponse) {
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
                else if (responseObject instanceof ZOHOCRMSDK.BulkWrite.APIException) {
                    if (responseObject.getStatus() != null) {
                        console.log("Status: " + responseObject.getStatus().getValue());
                    }
                    if (responseObject.getCode() != null) {
                        console.log("Code: " + responseObject.getCode().getValue());
                    }
                    console.log("Details");
                    if (responseObject.getDetails() != null) {
                        let details: Map<string, any> = responseObject.getDetails();
                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key));
                            });
                        }
                    }
                    if (responseObject.getErrorMessage() != null) {
                        console.log("Error Message: " + responseObject.getErrorMessage().getValue());
                    }
                    console.log("ErrorCode: " + responseObject.getErrorCode());
                    if (responseObject.getXError() != null) {
                        console.log("XError: " + responseObject.getXError().getValue());
                    }
                    if (responseObject.getInfo() != null) {
                        console.log("Info: " + responseObject.getInfo().getValue());
                    }
                    if (responseObject.getXInfo() != null) {
                        console.log("XInfo: " + responseObject.getXInfo().getValue());
                    }
                    console.log("HttpStatus: " + responseObject.getHttpStatus());
                }
            }
        }
    }
    static async initializeAndCall(){
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
        await UploadFile.uploadFile("66372794", "/Users/Documents/Leads.zip");
    }
}
UploadFile.initializeAndCall()
