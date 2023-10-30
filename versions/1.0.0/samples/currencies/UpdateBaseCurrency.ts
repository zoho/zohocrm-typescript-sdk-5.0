import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class UpdateBaseCurrency
{
    public static async updateBaseCurrency() {
        let currenciesOperations: ZOHOCRMSDK.Currencies.CurrenciesOperations = new ZOHOCRMSDK.Currencies.CurrenciesOperations();
        let request: ZOHOCRMSDK.Currencies.BaseCurrencyWrapper = new ZOHOCRMSDK.Currencies.BaseCurrencyWrapper();
        let currency: ZOHOCRMSDK.Currencies.BaseCurrency = new ZOHOCRMSDK.Currencies.BaseCurrency();
        //true: Display ISO code before the currency value.
        //false: Display ISO code after the currency value.
        currency.setPrefixSymbol(true);
        currency.setSymbol("Af");
        currency.setExchangeRate("1.00");
        currency.setId(BigInt("34770616008002"));
        let format: ZOHOCRMSDK.Currencies.Format = new ZOHOCRMSDK.Currencies.Format();
        //It can be a Period or Comma, depending on the base currency.
        format.setDecimalSeparator(new ZOHOCRMSDK.Choice("Period"));
        //It can be a Period, Comma, or Space, depending on the base currency.
        format.setThousandSeparator(new ZOHOCRMSDK.Choice("Comma"));
        format.setDecimalPlaces(new ZOHOCRMSDK.Choice("2"));
        currency.setFormat(format);
        request.setBaseCurrency(currency);
        //Call updateBaseCurrency method that takes BodyWrapper instance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Currencies.ActionHandler.MasterModel> = await currenciesOperations.updateBaseCurrency(request);
        if (response !== null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject: ZOHOCRMSDK.Currencies.ActionHandler.MasterModel = response.getObject();
            if (responseObject !== null) {
                if (responseObject instanceof ZOHOCRMSDK.Currencies.BaseCurrencyActionWrapper) {
                    let actionResponse: ZOHOCRMSDK.Currencies.ActionResponse.MasterModel = responseObject.getBaseCurrency();
                    if (actionResponse instanceof ZOHOCRMSDK.Currencies.SuccessResponse) {
                        console.log("Status: " + actionResponse.getStatus().getValue());
                        console.log("Code: " + actionResponse.getCode().getValue());
                        console.log("Details");
                        let details: Map<string, any> = actionResponse.getDetails();
                        if (details !== null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key));
                            });
                        }
                        console.log("Message: " + actionResponse.getMessage());
                    }
                    else if (actionResponse instanceof ZOHOCRMSDK.Currencies.APIException) {
                        console.log("Status: " + actionResponse.getStatus().getValue());
                        console.log("Code: " + actionResponse.getCode().getValue());
                        console.log("Details");
                        let details: Map<string, any> = actionResponse.getDetails();
                        if (details !== null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key));
                            });
                        }
                        console.log("Message: " + actionResponse.getMessage());
                    }
                }
                else if (responseObject instanceof ZOHOCRMSDK.Currencies.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details: Map<string, any> = responseObject.getDetails();
                    if (details !== null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + responseObject.getMessage());
                }
            }
        }
    }
    static async initializeAndCall(){
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
        await UpdateBaseCurrency.updateBaseCurrency();
    }
}
UpdateBaseCurrency.initializeAndCall()
