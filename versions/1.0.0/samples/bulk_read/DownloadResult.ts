import * as path from "path";
import * as fs from "fs";
import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class DownloadResult
{
    public static async downloadResult(jobId: bigint, destinationFolder: string) {
        //example
        //String jobId = 34096432461001n;
        //String destinationFolder = "/Users/user_name/Documents";
        let bulkReadOperations: ZOHOCRMSDK.BulkRead.BulkReadOperations = new ZOHOCRMSDK.BulkRead.BulkReadOperations();
        //Call downloadResult method that takes jobId as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.BulkRead.ResponseHandler.MasterModel> = await bulkReadOperations.downloadResult(jobId);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject: ZOHOCRMSDK.BulkRead.ResponseHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.BulkRead.FileBodyWrapper) {
                    let streamWrapper = responseObject.getFile();
                    let name: string | undefined = streamWrapper.getName();
                    if (name !== undefined) {
                        //Construct the file name by joining the destinationFolder and the name from StreamWrapper instance
                        let fileName = path.join(destinationFolder, name);
                        let readStream: Buffer | fs.ReadStream | undefined = streamWrapper.getStream();
                        if (readStream !== undefined && readStream instanceof Buffer) {
                            //Write the stream to the destination file.
                            fs.writeFileSync(fileName, readStream);
                        }
                    }
                }
                else if (responseObject instanceof ZOHOCRMSDK.BulkRead.APIException) {
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
        await DownloadResult.downloadResult(BigInt("3434234234234"), "users/docs/file");
    }
}
DownloadResult.initializeAndCall()
