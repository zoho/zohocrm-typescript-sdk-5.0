import * as fs from "fs";
import * as path from "path";
import * as ZOHOCRMSDK  from "@zohocrm/typescript-sdk-5.0"
class FieldAttachment {
    static async getFieldAttachments(moduleAPIName: string, recordId: bigint, fieldsAttachmentId: bigint, destinationFolder: string) {
        let fieldAttachmentsOperations: ZOHOCRMSDK.AttachmentsField.FieldAttachmentsOperations = new ZOHOCRMSDK.AttachmentsField.FieldAttachmentsOperations(moduleAPIName, recordId, fieldsAttachmentId);
        //Call getFieldAttachments method
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.AttachmentsField.ResponseHandler.MasterModel> = await fieldAttachmentsOperations.getFieldAttachments();
        if (response != null) {
            console.log("Status code " + response.getStatusCode());
            if (response.getStatusCode() == 204) {
                console.log("No Content\n");
                return;
            }
            let responseObject: ZOHOCRMSDK.AttachmentsField.ResponseHandler.MasterModel = response.getObject();
            if (responseObject instanceof ZOHOCRMSDK.AttachmentsField.FileBodyWrapper) {
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
            else if (responseObject instanceof ZOHOCRMSDK.AttachmentsField.APIException) {
                console.log("Status: " + responseObject.getStatus().getValue());
                console.log("Code: " + responseObject.getCode().getValue());
                let details : Map<string, any> = responseObject.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + responseObject.getMessage());
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
        let recordId : bigint= BigInt("44028774074");
        let fieldsAttachmentId : bigint= BigInt("440281629083");
        let destinationFolder :string= "/Users/sample-application/file";
        await FieldAttachment.getFieldAttachments(moduleAPIName,recordId,fieldsAttachmentId,destinationFolder);
    }
}
FieldAttachment.initializeAndCall()
