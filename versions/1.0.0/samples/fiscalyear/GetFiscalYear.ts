import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class GetFiscalYear
{
    static async getFiscalYear()
    {
        let fiscalYearOperations : ZOHOCRMSDK.FiscalYear.FiscalYearOperations = new ZOHOCRMSDK.FiscalYear.FiscalYearOperations();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.FiscalYear.ResponseHandler.MasterModel>= await fiscalYearOperations.getFiscalYear();
        if (response != null)
        {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode()))
            {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject : ZOHOCRMSDK.FiscalYear.ResponseHandler.MasterModel = response.getObject();
            if (responseObject != null)
            {
                if (responseObject instanceof ZOHOCRMSDK.FiscalYear.ResponseWrapper)
                {
                    let fiscalYear : ZOHOCRMSDK.FiscalYear.Year = responseObject.getFiscalYear();
                    if (fiscalYear != null)
                    {
                        console.log("FiscalYear StartMonth : " + fiscalYear.getStartMonth().getValue());
                        console.log("FiscalYear DisplayBasedOn : " + fiscalYear.getDisplayBasedOn().getValue());
                        console.log("FiscalYear Id : " + fiscalYear.getId());
                    }
                }
                else if(responseObject instanceof ZOHOCRMSDK.FiscalYear.APIException)
                {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    let details : Map<string, any> = responseObject.getDetails();
                    console.log("Details: ");
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + responseObject.getMessage());
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
        await GetFiscalYear.getFiscalYear();
    }
}
GetFiscalYear.initializeAndCall();