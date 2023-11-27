import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
class UpdateFiscalYear
{
    static async updateFiscalYear()
    {
        let fiscalYearOperations : ZOHOCRMSDK.FiscalYear.FiscalYearOperations= new ZOHOCRMSDK.FiscalYear.FiscalYearOperations();
        let request : ZOHOCRMSDK.FiscalYear.BodyWrapper= new ZOHOCRMSDK.FiscalYear.BodyWrapper();
        let fiscalYear : ZOHOCRMSDK.FiscalYear.Year= new ZOHOCRMSDK.FiscalYear.Year();
        fiscalYear.setStartMonth(new ZOHOCRMSDK.Choice("May"));
        fiscalYear.setDisplayBasedOn(new ZOHOCRMSDK.Choice("start_month"));
        await request.setFiscalYear(fiscalYear);
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.FiscalYear.ActionHandler.MasterModel>= await fiscalYearOperations.updateFiscalYear(request);
        if (response != null)
        {
            console.log("Status code : " + response.getStatusCode() + "\n");
            let actionHandler : ZOHOCRMSDK.FiscalYear.ActionHandler.MasterModel = response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.FiscalYear.ActionWrapper)
            {
                let actionWrapper : ZOHOCRMSDK.FiscalYear.ActionWrapper = actionHandler;
                let actionResponse : ZOHOCRMSDK.FiscalYear.ActionResponse.MasterModel = actionWrapper.getFiscalYear();
                if (actionResponse instanceof ZOHOCRMSDK.FiscalYear.SuccessResponse)
                {
                    let successResponse : ZOHOCRMSDK.FiscalYear.SuccessResponse= actionResponse;
                    console.log("Status: " + successResponse.getStatus().getValue() + "\n");
                    console.log("Code: " + successResponse.getCode().getValue() + "\n");
                    console.log("Details: ");
                    let details : Map<string, any>= actionResponse.getDetails();
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key) + "\n");
                        });
                    }
                    console.log("Message: " + successResponse.getMessage());
                }
                if (actionResponse instanceof ZOHOCRMSDK.FiscalYear.APIException)
                {
                    let exception : ZOHOCRMSDK.FiscalYear.APIException = actionResponse;
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
            else if (actionHandler instanceof ZOHOCRMSDK.FiscalYear.APIException)
            {
                let exception : ZOHOCRMSDK.FiscalYear.APIException = actionHandler;
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
        await UpdateFiscalYear.updateFiscalYear();
    }
}
UpdateFiscalYear.initializeAndCall();