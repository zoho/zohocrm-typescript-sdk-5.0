import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class UpdateSharePermissions
{
    public static async updateSharePermissions(moduleAPIName: string, recordId: bigint) {
        //example
        //let moduleAPIName = "Contacts";
        // let recordId = 34096432112011n;
        let sharedRecordsOperations: ZOHOCRMSDK.RecordsShare.ShareRecordsOperations = new ZOHOCRMSDK.RecordsShare.ShareRecordsOperations(recordId, moduleAPIName);
        let request: ZOHOCRMSDK.RecordsShare.BodyWrapper = new ZOHOCRMSDK.RecordsShare.BodyWrapper();
        //Array to hold ShareRecord instances
        let shareRecordArray: ZOHOCRMSDK.RecordsShare.ShareRecord[] = [];
        let shareRecord: ZOHOCRMSDK.RecordsShare.ShareRecord = new ZOHOCRMSDK.RecordsShare.ShareRecord();
        shareRecord.setPermission(new ZOHOCRMSDK.Choice<string>("full_access"));
        shareRecord.setShareRelatedRecords(true);
        let user: ZOHOCRMSDK.Users.Users = new ZOHOCRMSDK.Users.Users();
        user.setId(BigInt("3477065791024"));
        shareRecord.setUser(user);
        //Add the instance to array
        shareRecordArray.push(shareRecord);
        request.setShare(shareRecordArray);
        //Call updateSharePermissions method that takes ZOHOCRMSDK.ShareRecords.BodyWrapper instance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.RecordsShare.ActionHandler.MasterModel> = await sharedRecordsOperations.updateSharePermissions(request);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject: ZOHOCRMSDK.RecordsShare.ActionHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.RecordsShare.ActionWrapper) {
                    let actionResponses: ZOHOCRMSDK.RecordsShare.ActionResponse.MasterModel[] = responseObject.getShare();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.RecordsShare.SuccessResponse) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details: Map<string, any> = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                        else if (actionResponse instanceof ZOHOCRMSDK.RecordsShare.APIException) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details: Map<string, any> = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.RecordsShare.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details: Map<string, any> = responseObject.getDetails();
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
        await UpdateSharePermissions.updateSharePermissions("Leads", BigInt("3424234232"));
    }
}
UpdateSharePermissions.initializeAndCall()