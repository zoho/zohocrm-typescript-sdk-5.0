import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetStatus
{
    static async getStatus()
    {
        let usersTransferDeleteOperation : ZOHOCRMSDK.DeleteTransferUsers.UsersTransferDeleteOperations= new ZOHOCRMSDK.DeleteTransferUsers.UsersTransferDeleteOperations();
        let paraminstance : ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        await paraminstance.add(ZOHOCRMSDK.DeleteTransferUsers.GetStatusParam.JOB_ID, BigInt("44028001627150"));
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.DeleteTransferUsers.ResponseHandler.MasterModel>= await usersTransferDeleteOperation.getStatus(paraminstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler = response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.DeleteTransferUsers.ResponseWrapper) {
                let transferAndDelete: ZOHOCRMSDK.DeleteTransferUsers.Status[] = responseHandler.getTransferAndDelete();
                if (transferAndDelete != null) {
                    transferAndDelete.forEach(status => {
                        console.log("TransferAndDelete Status : " + status.getStatus());
                    });
                }
            }else if (responseHandler instanceof ZOHOCRMSDK.DeleteTransferUsers.APIException) {
                    console.log("Status: " + responseHandler.getStatus().getValue());
                    console.log("Code: " + responseHandler.getCode().getValue());
                    console.log("Details");
                    let details: Map<string, any> = responseHandler.getDetails();
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + responseHandler.getMessage());
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
        await GetStatus.getStatus();
    }
}
GetStatus.initializeAndCall();
