import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class CheckStatus
{
    static async checkStatus(jobId: bigint, module: string)
    {
        let massChangeOwnerOperations : ZOHOCRMSDK.ChangeMassOwner.MassChangeOwnerOperations= new ZOHOCRMSDK.ChangeMassOwner.MassChangeOwnerOperations();
        let paramInstance : ZOHOCRMSDK.ParameterMap= new ZOHOCRMSDK.ParameterMap();
        await paramInstance.add(ZOHOCRMSDK.ChangeMassOwner.CheckStatusParam.JOB_ID, jobId);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.ChangeMassOwner.ResponseHandler.MasterModel>= await massChangeOwnerOperations.checkStatus(module, paramInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode() + "\n");
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler : ZOHOCRMSDK.ChangeMassOwner.ResponseHandler.MasterModel= response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.ChangeMassOwner.ResponseWrapper) {
                let responseWrapper : ZOHOCRMSDK.ChangeMassOwner.ResponseWrapper= responseHandler;
                let status :  ZOHOCRMSDK.ChangeMassOwner.Status[] = responseWrapper.getData();
                status.forEach(status1 => {
                    console.log("MassChangeOwner TotalCount : " + status1.getTotalCount() + '\n');
                    console.log("MassChangeOwner UpdatedCount : " + status1.getUpdatedCount() + '\n');
                    console.log("MassChangeOwner NotUpdatedCount : " + status1.getNotUpdatedCount() + '\n');
                    console.log("MassChangeOwner FailedCount : " + status1.getFailedCount() + '\n');
                    console.log("MassChangeOwner Status : " + status1.getStatus() + '\n');
                });
            } else if (responseHandler instanceof ZOHOCRMSDK.ChangeMassOwner.APIException) {
                let exception : ZOHOCRMSDK.ChangeMassOwner.APIException = responseHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
                console.log("Code: " + exception.getCode().getValue() + "\n");
                console.log("Details: ");
                let details : Map<string, any> = exception.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key) + "\n");
                    });
                }
                console.log("Message: " + exception.getMessage());
            }
        }
    }
    static async initializeAndCall() {
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
        let jonId : bigint= BigInt("44028001632013");
        let module: string = "Calls";
        await CheckStatus.checkStatus(jonId, module);
    }
}
CheckStatus.initializeAndCall();