import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class UploadAttachments
{
    public static async uploadAttachments(moduleAPIName: string, recordId: bigint, absoluteFilePath: string) {
        //example
        // let moduleAPIName = "Leads";
        // let recordId = 34096432267003n;
        // let absoluteFilePath = "/Users/user-name/Documents/image.jpg";
        let attachmentsOperations: ZOHOCRMSDK.Attachments.AttachmentsOperations = new ZOHOCRMSDK.Attachments.AttachmentsOperations();
        let fileBodyWrapper: ZOHOCRMSDK.Attachments.FileBodyWrapper = new ZOHOCRMSDK.Attachments.FileBodyWrapper();
        /** StreamWrapper can be initialized in any of the following ways */
        /**
         * param 1 -> fileName
         * param 2 -> Read Stream.
         */
        // let streamWrapper: ZOHOCRMSDK.StreamWrapper = new ZOHOCRMSDK.StreamWrapper(undefined, fs.createReadStream(absoluteFilePath));
        /**
         * param 1 -> fileName
         * param 2 -> Read Stream
         * param 3 -> Absolute File Path of the file to be attached
         */
        let streamWrapper = new ZOHOCRMSDK.StreamWrapper(undefined, undefined, absoluteFilePath);
        fileBodyWrapper.setFile(streamWrapper);
        //Call uploadAttachment method that takes FileBodyWrapper instance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Attachments.ActionHandler.MasterModel> = await attachmentsOperations.createAttachment(recordId, moduleAPIName, fileBodyWrapper);
        if (response !== null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject: ZOHOCRMSDK.Attachments.ActionHandler.MasterModel = response.getObject();
            if (responseObject !== null) {
                if (responseObject instanceof ZOHOCRMSDK.Attachments.ActionWrapper) {
                    let actionResponses: ZOHOCRMSDK.Attachments.ActionResponse.MasterModel[] = responseObject.getData();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Attachments.SuccessResponse) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details: Map<string, any> = actionResponse.getDetails();
                            if (details !== null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage());
                        }
                        else if (actionResponse instanceof ZOHOCRMSDK.Attachments.APIException) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details: Map<string, any> = actionResponse.getDetails();
                            if (details !== null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage());
                        }
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.Attachments.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details: Map<string, any> = responseObject.getDetails();
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
        await UploadAttachments.uploadAttachments( "Leads", BigInt("440281661043"), "/Users/Docs/test.txt")
    }
}
UploadAttachments.initializeAndCall()
