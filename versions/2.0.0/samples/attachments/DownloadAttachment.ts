import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
import * as fs from "fs";
import * as path from "path";
export class DownloadAttachment
{
    public static async downloadAttachment(moduleAPIName: string, recordId: bigint, attachmentId: bigint, destinationFolder: string) {
        //example
        // let moduleAPIName = "Leads";
        // let recordId = 34096432267003n;
        // let attachmentId = 34096432267024n;
        // let destinationFolder = "/Users/user-name/Desktop";
        let attachmentsOperations: ZOHOCRMSDK.Attachments.AttachmentsOperations = new ZOHOCRMSDK.Attachments.AttachmentsOperations();
        //Call downloadAttachment method that takes attachmentId as parameters
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Attachments.ResponseHandler.MasterModel> = await attachmentsOperations.getAttachment(attachmentId, recordId, moduleAPIName);
        if (response !== null) {
            console.log("Status Code: " + response.getStatusCode());
            if (response.getStatusCode() == 204) {
                console.log("No Content");
                return;
            }
            let responseObject: ZOHOCRMSDK.Attachments.ResponseHandler.MasterModel = response.getObject();
            if (responseObject !== null) {
                if (responseObject instanceof ZOHOCRMSDK.Attachments.FileBodyWrapper) {
                    let streamWrapper: ZOHOCRMSDK.StreamWrapper = responseObject.getFile();
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
                else if (responseObject instanceof ZOHOCRMSDK.Attachments.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details = responseObject.getDetails();
                    if (details !== null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + responseObject.getMessage());
                }
            }
        }
    }
    public static async initializeAndCall()
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
        await DownloadAttachment.downloadAttachment( "Leads", BigInt("440281661043"), BigInt("440281729007"), "/Users/sample-application/file")
    }
}
DownloadAttachment.initializeAndCall()
