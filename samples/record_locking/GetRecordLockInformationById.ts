import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetRecordLockInformationById
{
    public static async getRecordLockInformationById(moduleAPIName: string, recordId: bigint, lockId : bigint)
    {
        let recordLockingOperations : ZOHOCRMSDK.LockingRecord.RecordLockingOperations = new ZOHOCRMSDK.LockingRecord.RecordLockingOperations();
        let paramInstance : ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        await paramInstance.add(ZOHOCRMSDK.LockingRecord.getrecordlockinformation_by_idParam.FIELDS, "Locked_By__s");
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.LockingRecord.ResponseHandler.MasterModel> = await recordLockingOperations.getRecordLockInformation_by_id(lockId, recordId, moduleAPIName);
        if (response != null)
        {
            console.log("Status Code : " + response.getStatusCode().toString());
            if ([204, 304].includes(response.getStatusCode()))
            {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified")
                return;
            }
            let response_object = response.getObject();
            if (response_object != null && response_object instanceof ZOHOCRMSDK.LockingRecord.ResponseWrapper)
            {
                let recordList : ZOHOCRMSDK.LockingRecord.RecordLock[] = response_object.getData();
                recordList.forEach(record=>
                {
                    let key_values :  Map<string, any> = record.getKeyValues();
                    Array.from(key_values.keys()).forEach(key=>{
                        let value = key_values.get(key);
                        if (value instanceof ZOHOCRMSDK.LockingRecord.LockedForS)
                        {
                            console.log(key + " : ");
                            console.log("Locked_For__S name : " + value.getName());
                            console.log("Locked_For__s id : " + value.getId());
                            let module : Map<String, any>  = value.getModule();
                            if (module != null)
                            {
                                console.log("Locked_For__s module : ");
                                Array.from(module.keys()).forEach(key1=>{
                                    console.log(key1 + " : " + module.get(key1).toString());
                                });
                            }
                        }
                        else if (value instanceof ZOHOCRMSDK.Users.MinifiedUser)
                        {
                            console.log(key + " : ");
                            console.log("name : " + value.getName());
                            console.log("id : " + value.getId().toString());
                        }
                        else if (value instanceof ZOHOCRMSDK.Choice) {
                            console.log(key + " : ");
                            console.log(value.getValue());
                        }
                        else if (value instanceof Map)
                        {
                            console.log(key + " : ");
                            Array.from(value.keys()).forEach(key2=>{
                                console.log(key2 + " : " + value.get(key2).toString());
                            });
                        }
                        else if (value != null){
                            console.log(key + " : " + value.toString());
                        }
                    });
                });
                let info = response_object.getInfo();
                if (info != null){
                    if (info.getPerPage() != null) {
                        console.log('Record Info PerPage: ' + info.getPerPage().toString())
                    }
                    if (info.getPage() != null) {
                        console.log('Record Info Page: ' + info.getPage().toString())
                    }
                    if (info.getCount() != null) {
                        console.log('Record Info Count: ' + info.getCount().toString())
                    }
                    if (info.getMoreRecords() != null)
                        console.log('Record Info MoreRecords: ' + info.getMoreRecords().toString())
                }
            }
            else if (response_object instanceof ZOHOCRMSDK.LockingRecord.APIException) {
                console.log("Status: " + response_object.getStatus().getValue());
                console.log("Code: " + response_object.getCode().getValue());
                console.log("Details");
                let details = response_object.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + response_object.getMessage().getValue());
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
        await GetRecordLockInformationById.getRecordLockInformationById("Leads", BigInt("44028001787377"), BigInt("44028001830024"));
    }
}
GetRecordLockInformationById.initializeAndCall();
