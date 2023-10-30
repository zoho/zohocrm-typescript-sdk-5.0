import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class DeleteAttachment
{
    public static async deleteAttachment(moduleAPIName: string, recordId: bigint, attachmentId: bigint) {
        //example
        // let moduleAPIName = "Leads";
        // let recordId = 34096432267003n;
        // let attachmentId = 34096432267024n;
        let attachmentsOperations: ZOHOCRMSDK.Attachments.AttachmentsOperations = new ZOHOCRMSDK.Attachments.AttachmentsOperations();
        //Call deleteAttachment method that takes attachmentId as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Attachments.ActionHandler.MasterModel> = await attachmentsOperations.deleteAttachment(attachmentId, recordId, moduleAPIName);
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
        await DeleteAttachment.deleteAttachment( "Leads", BigInt("44028001507174"), BigInt("44028001628003"));
    }
}
DeleteAttachment.initializeAndCall()