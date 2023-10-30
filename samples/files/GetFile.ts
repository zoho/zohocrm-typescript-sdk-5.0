import * as path from "path";
import * as fs from "fs";
import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetFile
{
    public static async getFile(id: string, destinationFolder: string) {
        //example
        //let id = "ae9c7cefa418aec1d6a5cc2d9ab35c3231aae3bfeef7d5e00a54b7563c0dd42b";
        //let destinationFolder = "/Users/user_name/Desktop"
        let fileOperations: ZOHOCRMSDK.Files.FilesOperations = new ZOHOCRMSDK.Files.FilesOperations();
        let paramInstance: ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        //Add the id to ParameterMap instance
        await paramInstance.add(ZOHOCRMSDK.Files.GetFileParam.ID, id);
        //Call getFile method that takes ParameterMap instance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Files.ResponseHandler.MasterModel> = await fileOperations.getFile(paramInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject: ZOHOCRMSDK.Files.ResponseHandler.MasterModel = response.getObject();
            if (responseObject !== null) {
                if (responseObject instanceof ZOHOCRMSDK.Files.FileBodyWrapper) {
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
                else if (responseObject instanceof ZOHOCRMSDK.Files.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details: Map<string, any> = responseObject.getDetails();
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
        let id : string = "c6085fae06cbd7b75001d8044e44c56ea3f571bfea62fe";
        let destinationFolder : string = "/Users/sample-application/file";
        await GetFile.getFile(id, destinationFolder);
    }
}
GetFile.initializeAndCall()
