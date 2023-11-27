import * as path from "path";
import * as fs from "fs";
import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class DownloadBulkWriteResult
{
    public static async downloadBulkWriteResult(downloadUrl: string, destinationFolder: string) {
        //example
        //let downloadUrl = "https://download-accl.zoho.com/v2/crm/6735/bulk-write/347706122009/347706122009.zip";
        //let destinationFolder = "/Users/user_name/Documents";
        let bulkWriteOperations: ZOHOCRMSDK.BulkWrite.BulkWriteOperations = new ZOHOCRMSDK.BulkWrite.BulkWriteOperations();
        //Call downloadBulkWriteResult method that takes downloadUrl as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.BulkWrite.ResponseHandler.MasterModel> = await bulkWriteOperations.downloadBulkWriteResult(downloadUrl);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject: ZOHOCRMSDK.BulkWrite.ResponseHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.BulkWrite.FileBodyWrapper) {
                    let streamWrapper: ZOHOCRMSDK.StreamWrapper = responseObject.getFile();
                    let name: string | undefined = streamWrapper.getName();
                    if (name !== undefined) {
                        //Construct the file name by joining the destinationFolder and the name from StreamWrapper instance
                        let fileName = path.join(destinationFolder, name);
                        let readStream = streamWrapper.getStream();
                        if (readStream !== undefined && readStream instanceof Buffer) {
                            //Write the stream to the destination file.
                            fs.writeFileSync(fileName, readStream);
                        }
                    }
                }
                else if (responseObject instanceof ZOHOCRMSDK.BulkWrite.APIException) {
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
        let downloadUrl = "https://download-accl.zoho.com/v2/crm/6735/bulk-write/34770619/347706122009.zip";
        let destinationFolder = "/Users/user_name/Documents";
        await DownloadBulkWriteResult.downloadBulkWriteResult(downloadUrl, destinationFolder);
    }
}
DownloadBulkWriteResult.initializeAndCall()
