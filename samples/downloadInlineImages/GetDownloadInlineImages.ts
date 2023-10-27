import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
import * as path from "path";
import * as fs from "fs";
class GetDownloadInlineImages
{
    static async getDownloadInlineImages(module:string, recordId:bigint, userId:bigint, messageId:string, id:string, destinationFolder:string)
    {
        let downloadInlineImagesOperations = new ZOHOCRMSDK.DownloadImagesInline.DownloadInlineImagesOperations();
        let paraminstance = new ZOHOCRMSDK.ParameterMap();
        await paraminstance.add(ZOHOCRMSDK.DownloadImagesInline.GetDownloadInlineImagesParam.ID, id);
        await paraminstance.add(ZOHOCRMSDK.DownloadImagesInline.GetDownloadInlineImagesParam.MESSAGE_ID, messageId);
        await paraminstance.add(ZOHOCRMSDK.DownloadImagesInline.GetDownloadInlineImagesParam.USER_ID, userId);
        let response = await downloadInlineImagesOperations.getDownloadInlineImages(recordId, module, paraminstance);
        if (response != null)
        {
            console.log("Status Code: " + response.getStatusCode());
            if (response.getStatusCode() == 204) {
                console.log("No Content");
                return;
            }
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.DownloadImagesInline.FileBodyWrapper) {
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
                else if (responseObject instanceof ZOHOCRMSDK.DownloadImagesInline.APIException) {
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
    static async initializeAmdCall() {
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
        let recordId : bigint= BigInt("440774074");
        let module : string= "leads";
        let userId : bigint= BigInt("440200254001");
        let messageId : string= "c6085fae06cb90ed59cd3793ccd16fcea97f201b3";
        let destinationFolder : string= "/Users/sample-application/file";
        let id : string= "2b409f51493fd56dfc78c833fd38e9506e1119667564d7d1017304deeb964d78a3321";
        await GetDownloadInlineImages.getDownloadInlineImages(module, recordId, userId, messageId, id, destinationFolder);
    }
}
GetDownloadInlineImages.initializeAmdCall();