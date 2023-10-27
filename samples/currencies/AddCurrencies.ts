import * as ZOHOCRMSDK from "@zohocrm/typescript-sdk-5.0";
export class AddCurrencies
{
    public static async addCurrencies() {
        let currenciesOperations: ZOHOCRMSDK.Currencies.CurrenciesOperations = new ZOHOCRMSDK.Currencies.CurrenciesOperations();
        let request: ZOHOCRMSDK.Currencies.BodyWrapper = new ZOHOCRMSDK.Currencies.BodyWrapper();
        //Array to hold ZOHOCRMSDK.Currencies.Currency instances
        let currencies: ZOHOCRMSDK.Currencies.Currency[] = [];
        let currency: ZOHOCRMSDK.Currencies.Currency = new ZOHOCRMSDK.Currencies.Currency();
        //true: Display ISO code before the currency value.
        //false: Display ISO code after the currency value.
        currency.setPrefixSymbol(true);
        currency.setName("Angolan Kwanza - AOA");
        currency.setIsoCode("AOA");
        currency.setSymbol("Kz");
        currency.setExchangeRate("20.0");
        //true: The currency is active.
        //false: The currency is inactive.
        currency.setIsActive(true);
        let format: ZOHOCRMSDK.Currencies.CurrencyFormat = new ZOHOCRMSDK.Currencies.CurrencyFormat();
        //It can be a Period or Comma, depending on the currency.
        format.setDecimalSeparator(new ZOHOCRMSDK.Choice("Period"));
        //It can be a Period, Comma, or Space, depending on the currency.
        format.setThousandSeparator(new ZOHOCRMSDK.Choice("Comma"));
        format.setDecimalPlaces(new ZOHOCRMSDK.Choice("2"));
        currency.setFormat(format);
        currencies.push(currency);
        request.setCurrencies(currencies);
        //Call addCurrencies method that takes BodyWrapper instance as parameter
        let response: ZOHOCRMSDK.APIResponse<ZOHOCRMSDK.Currencies.ActionHandler.MasterModel> = await currenciesOperations.createCurrencies(request);
        if (response !== null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject: ZOHOCRMSDK.Currencies.ActionHandler.MasterModel = response.getObject();
            if (responseObject !== null) {
                if (responseObject instanceof ZOHOCRMSDK.Currencies.ActionWrapper) {
                    let actionResponses: ZOHOCRMSDK.Currencies.ActionResponse.MasterModel[] = responseObject.getCurrencies();
                    actionResponses.forEach(actionResponse => {
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
                    });
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
        await AddCurrencies.addCurrencies();
    }
}
AddCurrencies.initializeAndCall();
