import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
import * as  path from "path";
import * as fs from "fs";
export class DownloadBackedUpData
{
    static async downlaodBackedUpData(downloadURL : string, destinationFolder : string)
    {
        let backupOperations: ZOHOCRMSDK.Backup.BackupOperations = new ZOHOCRMSDK.Backup.BackupOperations();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Backup.ActionHandler.MasterModel> = await backupOperations.downloadBackedUpData(downloadURL);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if (response.getStatusCode() == 204) {
                console.log("No Content");
                return;
            }
            let responseObject : ZOHOCRMSDK.Backup.ActionHandler.MasterModel= response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Backup.FileBodyWrapper) {
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
                else if (responseObject instanceof ZOHOCRMSDK.Backup.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details = responseObject.getDetails();
                    if (details != null) {
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
            .clientSecret("client_sercet")
            .grantToken("grant_token")
            .build();
        await (await new ZOHOCRMSDK.InitializeBuilder())
            .environment(environment)
            .token(token)
            .initialize();
        let downloadURL = 'https://download-accl.zoho.com/v2/crm/123456789/backup/3652397003/Data_001.zip';
        let destinationFolder = "Users/sdk-sample/file";
        await DownloadBackedUpData.downlaodBackedUpData(downloadURL, destinationFolder)
    }
}
DownloadBackedUpData.initializeAndCall();