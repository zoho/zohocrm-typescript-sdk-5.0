import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class DeleteAttachments
{
    public static async deleteAttachments(moduleAPIName: string, recordId: bigint, attachmentIds: bigint[]) {
        //example
        // let moduleAPIName = "Leads";
        // let recordId = 34096432267003n;
        // let attachmentIds = [34096432267024n, 34096432267034n, 34096432267198n]
        let attachmentsOperations: ZOHOCRMSDK.Attachments.AttachmentsOperations = new ZOHOCRMSDK.Attachments.AttachmentsOperations();
        let paramInstance: ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        for (let attachmentId of attachmentIds) {
            //Add the ids to parameter map instance
            await paramInstance.add(ZOHOCRMSDK.Attachments.DeleteAttachmentsParam.IDS, attachmentId);
        }
        //Call deleteAttachments method that takes paramInstance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Attachments.ActionHandler.MasterModel> = await attachmentsOperations.deleteAttachments(recordId, moduleAPIName, paramInstance);
        if (response !== null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject: ZOHOCRMSDK.Attachments.ActionHandler.MasterModel = response.getObject();
            if (responseObject !== null) {
                if (responseObject instanceof ZOHOCRMSDK.Attachments.ActionWrapper) {
                    let actionResponses = responseObject.getData();
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
        await DeleteAttachments.deleteAttachments( "Leads", BigInt("44028001661043"), [BigInt("44028001729007")])
    }
}
DeleteAttachments.initializeAndCall()
