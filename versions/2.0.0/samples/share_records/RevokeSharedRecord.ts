import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class RevokeSharedRecord
{
    public static async revokeSharedRecord(moduleAPIName: string, recordId: bigint) {
        //example
        //let moduleAPIName = "Contacts";
        // let recordId = 34096432112011n;
        let shareRecordsOperations: ZOHOCRMSDK.RecordsShare.ShareRecordsOperations = new ZOHOCRMSDK.RecordsShare.ShareRecordsOperations(recordId, moduleAPIName);
        //Call revokeSharedRecord method
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.RecordsShare.DeleteActionHandler.MasterModel> = await shareRecordsOperations.revokeSharedRecord();
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.RecordsShare.DeleteActionWrapper) {
                    let deleteActionResponse: ZOHOCRMSDK.RecordsShare.DeleteActionResponse.MasterModel = responseObject.getShare();
                    if (deleteActionResponse instanceof ZOHOCRMSDK.RecordsShare.SuccessResponse) {
                        console.log("Status: " + deleteActionResponse.getStatus().getValue());
                        console.log("Code: " + deleteActionResponse.getCode().getValue());
                        console.log("Details");
                        let details: Map<string, any> = deleteActionResponse.getDetails();
                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key));
                            });
                        }
                        console.log("Message: " + deleteActionResponse.getMessage().getValue());
                    }
                    else if (deleteActionResponse instanceof ZOHOCRMSDK.RecordsShare.APIException) {
                        console.log("Status: " + deleteActionResponse.getStatus().getValue());
                        console.log("Code: " + deleteActionResponse.getCode().getValue());
                        console.log("Details");
                        let details: Map<string, any> = deleteActionResponse.getDetails();
                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key));
                            });
                        }
                        console.log("Message: " + deleteActionResponse.getMessage().getValue());
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
        await RevokeSharedRecord.revokeSharedRecord("Leads", BigInt("44028001647093"));
    }
}
RevokeSharedRecord.initializeAndCall();
