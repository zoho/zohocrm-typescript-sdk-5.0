import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetSharedRecordDetails
{
    public static async getSharedRecordDetails(moduleAPIName: string, recordId: bigint) {
        //example
        //let moduleAPIName = "Contacts";
        //let recordId = 34096432112011n;
        let sharedRecordsOperations: ZOHOCRMSDK.RecordsShare.ShareRecordsOperations = new ZOHOCRMSDK.RecordsShare.ShareRecordsOperations(recordId, moduleAPIName);
        let paramInstance: ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        /* Possible parameters of Get Shared Record Details operation */
        await paramInstance.add(ZOHOCRMSDK.RecordsShare.GetSharedRecordDetailsParam.VIEW, "summary");
        // await paramInstance.add(GetSharedRecordDetailsParam.SHAREDTO, "3409643302031");
        //Call getSharedRecordDetails method that takes ParameterMap instance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.RecordsShare.ResponseHandler.MasterModel> = await sharedRecordsOperations.getSharedRecordDetails(paramInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject: ZOHOCRMSDK.RecordsShare.ResponseHandler.MasterModel = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.RecordsShare.ResponseWrapper) {
                    let shareRecords: ZOHOCRMSDK.RecordsShare.ShareRecord[] = responseObject.getShare();
                    shareRecords.forEach(shareRecord => {
                        console.log("ShareRecord ShareRelatedRecords: " + shareRecord.getShareRelatedRecords().toString());
                        let sharedThrough: ZOHOCRMSDK.RecordsShare.SharedThrough = shareRecord.getSharedThrough();
                        if (sharedThrough != null) {
                            console.log("ShareRecord SharedThrough EntityName: " + sharedThrough.getEntityName());
                            let module: ZOHOCRMSDK.RecordsShare.Module = sharedThrough.getModule();
                            if (module != null) {
                                console.log("ShareRecord SharedThrough Module ID: " + module.getId().toString());
                                console.log("ShareRecord SharedThrough Module Name: " + module.getName());
                            }
                            console.log("ShareRecord SharedThrough ID: " + sharedThrough.getId());
                        }
                        console.log("ShareRecord SharedTime: " + shareRecord.getSharedTime().toString());
                        console.log("ShareRecord Permission: " + shareRecord.getPermission().toString());
                        let sharedBy: ZOHOCRMSDK.Users.Users = shareRecord.getSharedBy();
                        if (sharedBy != null) {
                            console.log("ShareRecord SharedBy-ID: " + sharedBy.getId());
                            console.log("ShareRecord SharedBy-FullName: " + sharedBy.getFullName());
                            console.log("ShareRecord SharedBy-Zuid: " + sharedBy.getZuid());
                        }
                        let user: ZOHOCRMSDK.Users.Users = shareRecord.getUser();
                        if (user != null) {
                            console.log("ShareRecord User-ID: " + user.getId());
                            console.log("ShareRecord User-FullName: " + user.getFullName());
                            console.log("ShareRecord User-Zuid: " + user.getZuid());
                        }
                    });
                    let shareableUsers: ZOHOCRMSDK.Users.Users[] = responseObject.getShareableUser();
                    if (shareableUsers != null) {
                        shareableUsers.forEach(shareableUser => {
                            console.log("Shareable User User-ID: " + shareableUser.getId());
                            console.log("Shareable User User-FullName: " + shareableUser.getFullName());
                            console.log("Shareable User User-Zuid: " + shareableUser.getZuid());
                        });
                    }
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
        await GetSharedRecordDetails.getSharedRecordDetails("Leads", BigInt("44028001647093"));
    }
}
GetSharedRecordDetails.initializeAndCall();
