import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class UploadFiles
{
    public static async uploadFiles(absoluteFilePath: string) {
        let fileOperations: ZOHOCRMSDK.Files.FilesOperations = new ZOHOCRMSDK.Files.FilesOperations();
        let request: ZOHOCRMSDK.Files.BodyWrapper = new ZOHOCRMSDK.Files.BodyWrapper();
        let paramInstance: ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        await paramInstance.add(ZOHOCRMSDK.Files.UploadFilesParam.TYPE, "inline");
        /** StreamWrapper can be initialized in any of the following ways */
        /**
         * param 1 -> fileName
         * param 2 -> Read Stream.
         */
        // let streamWrapper1 = new ZOHOCRMSDK.StreamWrapper(null, fs.createReadStream("/Users/user_name/Desktop/file1.txt"));
        // let streamWrapper3 = new ZOHOCRMSDK.StreamWrapper(null, fs.createReadStream("/Users/user_name/Desktop/file2.txt"));
        /**
         * param 1 -> fileName
         * param 2 -> Read Stream
         * param 3 -> Absolute File Path of the file to be attached
         */
        let streamWrapper2 = new ZOHOCRMSDK.StreamWrapper(undefined, undefined, absoluteFilePath);
        let files: ZOHOCRMSDK.StreamWrapper[] = [];
        files.push(streamWrapper2);
        request.setFile(files);
        //Call uploadFile method that takes BodyWrapper instance and ParameterMap instance as parameter.
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Files.ActionHandler.MasterModel> = await fileOperations.uploadFiles(request, paramInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject: ZOHOCRMSDK.Files.ActionHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Files.ActionWrapper) {
                    let actionResponses: ZOHOCRMSDK.Files.ActionResponse.MasterModel[] = responseObject.getData();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Files.SuccessResponse) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details: Map<string, any> = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage());
                        }
                        else if (actionResponse instanceof ZOHOCRMSDK.Files.APIException) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details: Map<string, any> = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage());
                        }
                    });
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
        await UploadFiles.uploadFiles("/Users/user_name/Desktop/download.png");
    }
}
UploadFiles.initializeAndCall()
