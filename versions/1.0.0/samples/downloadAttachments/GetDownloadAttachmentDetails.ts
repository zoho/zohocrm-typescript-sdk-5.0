import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
import * as path from "path";
import * as fs from "fs";
class GetDownloadAttachmentDetails
{
    static async getDownloadAttachmentDetails(module: string, recordId: bigint, userId: bigint, messageId: string, destinationFolder: string)
    {
        let downlaodAttachmentOperations = new ZOHOCRMSDK.AttachmentsDownload.DownloadAttachmentsOperations();
        let paramInstance = new ZOHOCRMSDK.ParameterMap();
        await paramInstance.add(ZOHOCRMSDK.AttachmentsDownload.GetDownloadAttachmentsDetailsParam.MESSAGE_ID, messageId);
        await paramInstance.add(ZOHOCRMSDK.AttachmentsDownload.GetDownloadAttachmentsDetailsParam.USER_ID, userId);
        let response = await downlaodAttachmentOperations.getDownloadAttachmentsDetails(recordId, module, paramInstance);
        if (response != null)
        {
            console.log("Status Code: " + response.getStatusCode());
            if (response.getStatusCode() == 204) {
                console.log("No Content");
                return;
            }
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.AttachmentsDownload.FileBodyWrapper) {
                    let streamWrapper: ZOHOCRMSDK.StreamWrapper = responseObject.getFile();
                    let name: string | undefined = streamWrapper.getName();
                    if (name !== undefined) {
                        let fileName = path.join(destinationFolder, name);
                        let readStream: Buffer | fs.ReadStream | undefined = streamWrapper.getStream();
                        if (readStream !== undefined && readStream instanceof Buffer) {
                            fs.writeFileSync(fileName, readStream);
                        }
                    }
                }
                else if (responseObject instanceof ZOHOCRMSDK.AttachmentsDownload.APIException) {
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
    static async initializeAndCall() {
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
        let recordId : bigint= BigInt("44024774074");
        let moduleId : string= "leads";
        let userId : bigint= BigInt("44024254001");
        let messageId : string= "c608ab46b96231dc66a4f6a7b2b7b9e293aca1";
        let destinationFolder : string= "/Users/sample-application/file";
        await GetDownloadAttachmentDetails.getDownloadAttachmentDetails(moduleId, recordId, userId, messageId, destinationFolder);
    }
}
GetDownloadAttachmentDetails.initializeAndCall();
