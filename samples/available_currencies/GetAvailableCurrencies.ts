import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class GetAvailableCurrencies
{
    public static async getAvailableCurrnecies()
    {
        let currenciesOpertions :ZOHOCRMSDK.AvailableCurrencies.AvailableCurrenciesOperations= new ZOHOCRMSDK.AvailableCurrencies.AvailableCurrenciesOperations();
        let response : ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.AvailableCurrencies.ResponseHandler.MasterModel> = await currenciesOpertions.getAvailableCurrencies();
        if (response != null)
        {
            console.log("Status code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode()))
            {
                console.log(response.getStatusCode() == 204 ? "No Content\n" : "Not Modified\n");
                return;
            }
            let responseHandler : ZOHOCRMSDK.AvailableCurrencies.ResponseHandler.MasterModel = response.getObject();
            if (responseHandler instanceof  ZOHOCRMSDK.AvailableCurrencies.ResponseWrapper)
            {
                let responseWrapper :ZOHOCRMSDK.AvailableCurrencies.ResponseWrapper= responseHandler;
                let currenciesList : ZOHOCRMSDK.AvailableCurrencies.Currency[] = responseWrapper.getAvailableCurrencies();
                currenciesList.forEach(currency => {
                    console.log ("Currency DisplayValue: " + currency.getDisplayValue() + "\n");
                    console.log ("Currency DecimalSeparator: " + currency.getDecimalSeparator() + "\n");
                    console.log ("Currency Symbol: " + currency.getSymbol() + "\n");
                    console.log ("Currency ThousandSeparator: " + currency.getThousandSeparator() + "\n");
                    console.log ("Currency IsoCode: " + currency.getIsoCode() + "\n");
                    console.log ("Currency DisplayName: " + currency.getDisplayName() + "\n");
                    console.log ("Currency DecimalPlaces: " + currency.getDecimalPlaces() + "\n");
                });
            }
            else if (responseHandler instanceof ZOHOCRMSDK.AvailableCurrencies.APIException)
            {
                let exception : ZOHOCRMSDK.AvailableCurrencies.APIException= responseHandler;
                console.log("Status: " + exception.getStatus().getValue() + "\n");
                console.log("Code: " + exception.getCode().getValue() + "\n");
                console.log("Details: ");
                let details = exception.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key) + "\n");
                    });
                }
                console.log("Message: " + exception.getMessage());
            }
        }
    }
    public static async initializeAndCall()
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
        await GetAvailableCurrencies.getAvailableCurrnecies()
    }
}
GetAvailableCurrencies.initializeAndCall()
