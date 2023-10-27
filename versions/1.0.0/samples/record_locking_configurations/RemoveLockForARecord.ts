import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class RemoveLockForARecord
{
    public static async removeLockForARecord(moduleAPIName : string, recordId : bigint, lockId: bigint)
    {
        let recordLockingOperations : ZOHOCRMSDK.LockingRecord.RecordLockingOperations = new ZOHOCRMSDK.LockingRecord.RecordLockingOperations();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.LockingRecord.ActionHandler.MasterModel> = await recordLockingOperations.removeLockForARecord(lockId, recordId, moduleAPIName);
        if (response != null)
        {
            console.log("Status Code: " + response.getStatusCode().toString());
            let responseObject = response.getObject();
            if (responseObject != null){
                if (responseObject instanceof ZOHOCRMSDK.LockingRecord.ActionWrapper){
                    let actionResponseList : ZOHOCRMSDK.LockingRecord.ActionResponse.MasterModel[] = responseObject.getData();
                    actionResponseList.forEach(actionResponse=>{
                        if (actionResponse instanceof ZOHOCRMSDK.LockingRecord.SuccessResponse) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.LockingRecord.APIException) {
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
        await RemoveLockForARecord.removeLockForARecord("Leads", BigInt("44028001787377"), BigInt("44028001830024"));
    }
}
RemoveLockForARecord.initializeAndCall();