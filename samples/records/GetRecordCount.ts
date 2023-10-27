import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetRecordCount{
    static async getRecordCount() {
        let recordOperations : ZOHOCRMSDK.Record.RecordOperations= new ZOHOCRMSDK.Record.RecordOperations();
        let moduleAPIName = "Leads";
        let paramInstance: ZOHOCRMSDK.ParameterMap = new ZOHOCRMSDK.ParameterMap();
        await paramInstance.add(ZOHOCRMSDK.Record.RecordCountParam.EMAIL, "abc@gmail.com");
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Record.ResponseHandler.MasterModel>= await recordOperations.recordCount(moduleAPIName, paramInstance);
        if(response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let countHandler = response.getObject();
            if(countHandler instanceof ZOHOCRMSDK.Record.CountWrapper) {
                let countWrapper : ZOHOCRMSDK.Record.CountWrapper = countHandler;
                console.log("Record Count: " + countWrapper.getCount());
            }
            else if(countHandler instanceof ZOHOCRMSDK.Record.APIException)
            {
                let exception : ZOHOCRMSDK.Record.APIException = countHandler;
                console.log("Status: " + exception.getStatus().getValue());
                console.log("Code: " + exception.getCode().getValue());
                console.log("Details: " );
                let details = exception.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + exception.getMessage().getValue());
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
        await GetRecordCount.getRecordCount();
    }
}
GetRecordCount.initializeAndCall();
