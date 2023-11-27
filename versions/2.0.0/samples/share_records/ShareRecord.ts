import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class ShareRecord
{
    public static async shareRecord(moduleAPIName: string, recordId: bigint) {
        //example
        //let moduleAPIName = "Contacts";
        // let recordId = 34096432112011n;
        let sharedRecordsOperations: ZOHOCRMSDK.RecordsShare.ShareRecordsOperations = new ZOHOCRMSDK.RecordsShare.ShareRecordsOperations(recordId, moduleAPIName);
        let request: ZOHOCRMSDK.RecordsShare.BodyWrapper = new ZOHOCRMSDK.RecordsShare.BodyWrapper();
        //Array to hold ShareRecord instances
        let shareList: ZOHOCRMSDK.RecordsShare.ShareRecord[] = [];
        let share1: ZOHOCRMSDK.RecordsShare.ShareRecord = new ZOHOCRMSDK.RecordsShare.ShareRecord();
        for (let i = 0; i < 9; i++)
        {
            share1 = new ZOHOCRMSDK.RecordsShare.ShareRecord();
            share1.setShareRelatedRecords(true);
            share1.setPermission(new ZOHOCRMSDK.Choice("read_write"));
            let user = new ZOHOCRMSDK.Users.Users();
            user.setId(BigInt("3477061173021"));
            await share1.setUser(user);
            let sharedWith = new ZOHOCRMSDK.Users.Users();
            sharedWith.setId(BigInt("44028001307102"));
            sharedWith.addKeyValue("type", "groups");
            await share1.setSharedWith(sharedWith);
            share1.setType(new ZOHOCRMSDK.Choice("private"));
            shareList.push(share1);
        }
        share1.setShareRelatedRecords(true);
        share1.setPermission(new ZOHOCRMSDK.Choice("read_write"));
        let user = new ZOHOCRMSDK.Users.Users();
        user.setId(BigInt('440280254001'));
        await share1.setUser(user);
        let sharedWith = new ZOHOCRMSDK.Users.Users();
        sharedWith.setId(BigInt("44028001307102"));
        sharedWith.addKeyValue("type", "groups");
        await share1.setSharedWith(sharedWith);
        share1.setType(new ZOHOCRMSDK.Choice("private"));
        shareList.push(share1);
        request.setNotify(true);
        request.setShare(shareList);
        //Call shareRecord method that takes ZOHOCRMSDK.ShareRecords.BodyWrapper instance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.RecordsShare.ActionHandler.MasterModel> = await sharedRecordsOperations.shareRecord(request);
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
        await ShareRecord.shareRecord("Leads", BigInt("44028001647093"));
    }
}
ShareRecord.initializeAndCall();
