import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class UploadLinkAttachment
{
    public static async uploadLinkAttachment(moduleAPIName: string, recordId: bigint, attachmentURL: string) {
        //example
        // let moduleAPIName = "Leads";
        // let recordId = 34096432267003n;
        // let attachmentURL = "https://5.imimg.com/data5/KJ/UP/MY-8655440/zoho-crm-500x500.png";
        let attachmentsOperations: ZOHOCRMSDK.Attachments.AttachmentsOperations = new ZOHOCRMSDK.Attachments.AttachmentsOperations();
        let paramInstance: ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        //Add the attachmentURL to parameter Instance
        await paramInstance.add(ZOHOCRMSDK.Attachments.UploadUrlAttachmentsParam.ATTACHMENTURL, attachmentURL);
        //Call uploadLinkAttachments method that takes paramInstance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Attachments.ActionHandler.MasterModel> = await attachmentsOperations.uploadUrlAttachments(recordId, moduleAPIName, paramInstance);
        if (response !== null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
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
            .clientSecret("client_sercet")
            .grantToken("grant_token")
            .build();
        await (await new ZOHOCRMSDK.InitializeBuilder())
            .environment(environment)
            .token(token)
            .initialize();
        await UploadLinkAttachment.uploadLinkAttachment( "Leads", BigInt("323232234234"), "https://5.imimg.com/data5/KJ/UP/MY-8655440/500x500.png")
    }
}
UploadLinkAttachment.initializeAndCall()
