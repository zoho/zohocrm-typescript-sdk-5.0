import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetMassDeleteStatus
{
    static async getMassDeleteStatus(jobId: bigint, moduleAPIName: string)
    {
        let massDeleteCvidoperations : ZOHOCRMSDK.CvidDeleteMass.MassDeleteCvidOperations= new ZOHOCRMSDK.CvidDeleteMass.MassDeleteCvidOperations(moduleAPIName);
        let paramInstance : ZOHOCRMSDK.ParameterMap= new ZOHOCRMSDK.ParameterMap();
        await paramInstance.add(ZOHOCRMSDK.CvidDeleteMass.GetMassDeleteStatusParam.JOB_ID, jobId);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.CvidDeleteMass.ResponseHandler.MasterModel> = await massDeleteCvidoperations.getMassDeleteStatus(paramInstance);
        if (response != null)
        {
            console.log("Status Code : " + response.getStatusCode() + '\n');
            if ([204, 304].includes(response.getStatusCode()))
            {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler : ZOHOCRMSDK.CvidDeleteMass.ResponseHandler.MasterModel = response.getObject();
            if (responseHandler instanceof  ZOHOCRMSDK.CvidDeleteMass.ResponseWrapper){
                let responseWrapper : ZOHOCRMSDK.CvidDeleteMass.ResponseWrapper= responseHandler;
                let status :ZOHOCRMSDK.CvidDeleteMass.Status[] = responseWrapper.getData();
                status.forEach(status1 => {
                    console.log("MassDelete TotalCount : " + status1.getTotalCount() + "\n");
                    console.log("MassDelete ConvertedCount : " + status1.getDeletedCount() + "\n");
                    console.log("MassDelete FailedCount : " + status1.getFailedCount() + "\n");
                    console.log("MassDelete Status : " + status1.getStatus().getValue() + "\n");
                });
            }
            else if (responseHandler instanceof ZOHOCRMSDK.CvidDeleteMass.APIException)
            {
                let exception : ZOHOCRMSDK.CvidDeleteMass.APIException = responseHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
                console.log("Code: " + exception.getCode().getValue() + "\n");
                console.log("Details: ");
                let details : Map<string, any> = exception.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key) + "\n");
                    });
                }
                console.log("Message: " +  exception.getMessage());
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
        let id : bigint= BigInt("44028001629140");
        let moduleAPIName : string= "Calls";
        await GetMassDeleteStatus.getMassDeleteStatus(id, moduleAPIName);
    }
}
GetMassDeleteStatus.initializeAndCall();
