import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetJobStatus
{
    static async getJobStatus(jobId: bigint)
    {
        let massCovertOperations : ZOHOCRMSDK.ConvertMass.MassConvertOperations= new ZOHOCRMSDK.ConvertMass.MassConvertOperations();
        let paramInstance : ZOHOCRMSDK.ParameterMap= new ZOHOCRMSDK.ParameterMap();
        await paramInstance.add(ZOHOCRMSDK.ConvertMass.GetJobStatusParam.JOB_ID, jobId);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.ConvertMass.ResponseHandler.MasterModel> = await massCovertOperations.getJobStatus(paramInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode() + "\n");
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler : ZOHOCRMSDK.ConvertMass.ResponseHandler.MasterModel= response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.ConvertMass.ResponseWrapper) {
                let responseWrapper : ZOHOCRMSDK.ConvertMass.ResponseWrapper = responseHandler;
                let status = responseWrapper.getData();
                status.forEach(status1 => {
                    console.log("MassConvert TotalCount : " + status1.getTotalCount() + '\n');
                    console.log("MassConvert ConvertedCount : " + status1.getConvertedCount() + '\n');
                    console.log("MassConvert NotConvertedCount: " + status1.getNotConvertedCount() + "\n");
                    console.log("MassConvert FailedCount : " + status1.getFailedCount() + '\n');
                    console.log("MassConvert Status : " + status1.getStatus() + '\n');
                });
            } else if (responseHandler instanceof ZOHOCRMSDK.ConvertMass.APIException) {
                let exception : ZOHOCRMSDK.ConvertMass.APIException = responseHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
                console.log("Code: " + exception.getCode().getValue() + "\n");
                console.log("Details: ");
                let details : Map<string, any>= exception.getDetails();
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
        await GetJobStatus.getJobStatus(BigInt("44028001627011"));
    }
}
GetJobStatus.initializeAndCall();